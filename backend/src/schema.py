import json
from graphene import (
    Field,
    Int,
    List,
    String,
    relay,
    Schema,
    ObjectType,
    InputObjectType,
    Mutation,
    Boolean,
    ID,
    Union,
)
from graphene_sqlalchemy import SQLAlchemyConnectionField, SQLAlchemyObjectType
from sqlalchemy import func, or_, and_
from src.models import (
    ReviewLikes,
    User as UserModel,
    Game as GameModel,
    Purchase as PurchaseModel,
    Review as ReviewModel,
    PurchasedGame as purchasedGameModel,
    GameStatusCheck,
    db,
)

from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required


class User(SQLAlchemyObjectType):

    userid = Field(Int)

    class Meta:
        model = UserModel
        interfaces = (relay.Node,)

    def resolve_userid(self, info):
        return self.id


class Game(SQLAlchemyObjectType):

    gameid = Field(Int)
    gameAverageRating = Field(Int)

    class Meta:
        model = GameModel
        interfaces = (relay.Node,)

    def resolve_gameid(self, info):
        return self.id

    def resolve_gameAverageRating(self, info):
        averageRating = (
            db.session.query(func.avg(ReviewModel.game_rating))
            .filter_by(game_id=self.id)
            .scalar()
        )
        if averageRating is not None:
            averageRating = round(averageRating)
        return averageRating


class Review(SQLAlchemyObjectType):

    reviewid = Field(Int)

    class Meta:
        model = ReviewModel
        interfaces = (relay.Node,)

    def resolve_reviewid(self, info):
        return self.id


class Purchase(SQLAlchemyObjectType):
    class Meta:
        model = PurchaseModel
        interfaces = (relay.Node,)


class SearchResultType(Union):
    class Meta:
        types = (Game, User)


class BoughtGames(SQLAlchemyObjectType):
    class Meta:
        model = purchasedGameModel


class GameCheckResult(ObjectType):
    in_bought_games = Field(Boolean)
    in_wishlist = Field(Boolean)
    active_index = Field(Int)

    def resolve_in_bought_games(self, info):
        return self.in_bought_games

    def resolve_in_wishlist(self, info):
        return self.in_wishlist

    def resolve_active_index(self, info):
        return self.active_index


class GameRatingTypes(ObjectType):
    exceptional = Field(Int)
    recommend = Field(Int)
    meh = Field(Int)
    skip = Field(Int)

    def resolve_exceptional(self, info):
        return self.exceptional

    def resolve_recommend(self, info):
        return self.recommend

    def resolve_meh(self, info):
        return self.meh

    def resolve_skip(self, info):
        return self.skip


class ReviewCheck(ObjectType):
    check_review = Field(Boolean)
    checked_review = Field(lambda: Review)

    def resolve_check_review(self, info):
        return self.check_review

    def resolve_checked_review(self, info):
        return self.checked_review


class GameStatus(SQLAlchemyObjectType):
    class Meta:
        model = GameStatusCheck
        
class ToggleReviewLikeMutation(Mutation):
    class Arguments:
        review_id=Int(required=True)
        user_id=Int(required=True)
        to_like=Boolean(required=True)
        
    ok=Boolean()
    review=Field(Review)
    
    def mutate(self, info, review_id, user_id, to_like):
        existing_interaction = ReviewLikes.query.filter_by(review_id=review_id, user_id=user_id).first()
        review = ReviewModel.query.get(review_id)
        if not review:
            raise Exception("Review does not exist")
        
        if existing_interaction:
            if existing_interaction.to_like == to_like:
                db.session.delete(existing_interaction)
                if to_like:
                    review.likes -= 1
                else:
                    review.dislikes -= 1
            else:
                existing_interaction.to_like = to_like
                if to_like:
                    review.likes += 1
                    review.dislikes -= 1
                else:
                    review.likes -= 1
                    review.dislikes += 1
        else:
            new_interaction = ReviewLikes(
                review_id=review_id,
                user_id=user_id,
                to_like=to_like
            )
            db.session.add(new_interaction)
            if to_like:
                review.likes += 1
            else:
                review.dislikes += 1
                
        db.session.commit()
        return ToggleReviewLikeMutation(ok=True, review=review)


class UpdateGameStatus(Mutation):
    class Arguments:
        user_id = Int(required=True)
        game_id = Int(required=True)
        index = Int(required=True)

    ok = Boolean()
    active_index = Int()

    # @jwt_required()
    def mutate(root, info, user_id, game_id, index):
        user = UserModel.query.get(user_id)
        game = GameModel.query.get(game_id)
        status = GameStatusCheck.query.filter_by(
            game_id=game_id, user_id=user_id
        ).first()

        if user is None:
            raise Exception("User with the provided id does not exist")

        if game is None:
            raise Exception("Game with the provided id does not exist")
        if status is None:
            new_status = GameStatusCheck(game_id=game_id, user_id=user_id, status=index)
            db.session.add(new_status)
            db.session.commit()
            return UpdateGameStatus(ok=True, active_index=index)
        else:
            status.status = index
            db.session.commit()
            return UpdateGameStatus(ok=True, active_index=index)


class UpdateUserWishlistGames(Mutation):
    class Arguments:
        user_id = ID(required=True)
        game_id = ID(required=True)

    ok = Boolean()
    user = Field(lambda: User)
    success_message = String()

    @jwt_required()
    def mutate(root, info, user_id, game_id):
        user = UserModel.query.get(user_id)
        game = GameModel.query.get(game_id)

        if user is None:
            raise Exception("User with the provided id does not exist")

        if game is None:
            raise Exception("Game with the provided id does not exist")

        if game not in user.user_wishlist_games:
            user.user_wishlist_games.append(game)
            db.session.commit()
        else:
            raise Exception(f"{game.title} already exists in user wishlist.")

        return UpdateUserWishlistGames(
            user=user,
            ok=True,
            success_message=f"{game.title} successfully added to your wishlist",
        )


class FollowerFollowee(Mutation):
    class Arguments:
        follower_id = ID(required=True)
        followee_id = ID(required=True)

    ok = Boolean()
    status = String()

    def mutate(self, info, follower_id, followee_id):
        follower = UserModel.query.get(follower_id)
        followee = UserModel.query.get(followee_id)
        status = "pending"

        if follower is None:
            raise Exception("Follower with provided id does not exist")
        if followee is None:
            raise Exception("Followee with provided id does not exist")

        if followee in follower.following:
            follower.following.remove(followee)
            db.session.commit()
            status = "follow"
            return FollowerFollowee(ok=True, status=status)
        elif followee not in follower.following:
            follower.following.append(followee)
            db.session.commit()
            status = "unfollow"
            return FollowerFollowee(ok=True, status=status)


class SignUpMutation(Mutation):
    class Arguments:
        email = String(required=True)
        password = String(required=True)
        username = String(required=True)

    ok = Boolean()
    user = Field(lambda: User)
    success_message = String()

    def mutate(self, info, email, password, username):
        hashed_password = generate_password_hash(password)
        new_user = UserModel(
            email=email, password_hash=hashed_password, username=username
        )
        db.session.add(new_user)
        db.session.commit()

        return SignUpMutation(
            ok=True, user=new_user, success_message="Signup successful"
        )


class LoginMutation(Mutation):
    class Arguments:
        email = String(required=True)
        password = String(required=True)

    ok = Boolean()
    token = String()
    user = Field(lambda: User)

    def mutate(self, info, email, password):
        user = UserModel.query.filter_by(email=email).first()

        if user and check_password_hash(user.password_hash, password):
            token = create_access_token(identity=user.id)
            return LoginMutation(ok=True, token=token, user=user)
        if not user:
            raise Exception("User with the provided email does not exist")
        if not check_password_hash(user.password_hash, password):
            raise Exception("Wrong Password")

        return LoginMutation(ok=False, token=None)


class AddToGames(Mutation):
    class Arguments:
        game_id = Int()
        user_id = Int()

    ok = Boolean()
    count = Int()
    added = Boolean()
    userLibrary = Int()

    def mutate(self, info, game_id, user_id):
        user = UserModel.query.get(user_id)
        game = GameModel.query.get(game_id)

        if not user:
            raise Exception("User with the provided id does not exist")
        if not game:
            raise Exception("Game with the provided id does not exist")
        if game not in user.bought_games and game not in user.user_wishlist_games:
            user.bought_games.append(game)
            db.session.commit()
            count = (
                db.session.query(func.count(purchasedGameModel.game_id))
                .filter(purchasedGameModel.game_id == game_id)
                .scalar()
            )
            library = (
                db.session.query(func.count(purchasedGameModel.game_id))
                .filter(purchasedGameModel.user_id == user_id)
                .scalar()
            )
            return AddToGames(ok=True, count=count, userLibrary=library)
        if game not in user.bought_games and game in user.user_wishlist_games:
            user.user_wishlist_games.remove(game)
            user.bought_games.append(game)
            db.session.commit()
            count = (
                db.session.query(func.count(purchasedGameModel.game_id))
                .filter(purchasedGameModel.game_id == game_id)
                .scalar()
            )
            library = (
                db.session.query(func.count(purchasedGameModel.game_id))
                .filter(purchasedGameModel.user_id == user_id)
                .scalar()
            )
            return AddToGames(ok=True, count=count, userLibrary=library)
        library = (
            db.session.query(func.count(purchasedGameModel.game_id))
            .filter(purchasedGameModel.game_id == game_id)
            .scalar()
        )

        return AddToGames(ok=False, count=None, added=True, userLibrary=library)


class DeleteGame(Mutation):
    class Arguments:
        game_id = Int()
        user_id = Int()

    ok = Boolean()

    def mutate(self, info, game_id, user_id):
        user = UserModel.query.get(user_id)
        game = GameModel.query.get(game_id)

        if not user:
            raise Exception("User with the provided id does not exist")
        if not game:
            raise Exception("Game with the provided id does not exist")
        if game in user.bought_games:
            user.bought_games.remove(game)
            db.session.commit()
            return DeleteGame(ok=True)


class EditReview(Mutation):
    class Arguments:
        game_id = Int(required=True)
        user_id = Int(required=True)
        content = String()
        game_rating = Int()
        game_comment = String()

    ok = Boolean()
    new_review = Field(lambda: Review)

    def mutate(
        self, info, game_id, user_id, content=None, game_rating=None, game_comment=None
    ):
        user = UserModel.query.get(user_id)
        game = GameModel.query.get(game_id)
        ratingDict = {"Exceptional": 10, "Recommend": 7.5, "Meh": 5, "Skip": 2.5}

        if not user:
            raise Exception("User with the provided id does not exist")
        if not game:
            raise Exception("Game with the provided id does not exist")

        check_review = ReviewModel.query.filter_by(
            game_id=game_id, user_id=user_id
        ).first()

        if check_review:
            check_review.content = content
            check_review.game_comment = game_comment
            check_review.game_rating = ratingDict[game_comment]
            db.session.commit()
            return EditReview(ok=True, new_review=check_review)
        return EditReview(ok=False, new_review=None)


class AddReview(Mutation):
    class Arguments:
        game_id = Int(required=True)
        user_id = Int(required=True)
        content = String()
        game_rating = Int()
        game_comment = String()
        parent_id = Int()

    ok = Boolean()
    new_review = Field(lambda: Review)

    def mutate(
        self, info, game_id, user_id, content=None, game_rating=None, game_comment=None, parent_id=None
    ):
        user = UserModel.query.get(user_id)
        game = GameModel.query.get(game_id)
        ratingDict = {"Exceptional": 10, "Recommend": 7.5, "Meh": 5, "Skip": 2.5}

        if not user:
            raise Exception("User with the provided id does not exist")
        if not game:
            raise Exception("Game with the provided id does not exist")

        check_review = ReviewModel.query.filter_by(
            game_id=game_id, user_id=user_id
        ).first()

        if check_review:
            if content:
                check_review.content = content
            if game_rating:
                check_review.game_rating = game_rating
            if game_comment:
                check_review.game_comment = game_comment
            db.session.commit()
            return AddReview(ok=True, new_review=check_review)

        new_review = ReviewModel(game_id=game_id, user_id=user_id, content=content, parent_id=parent_id)

        if game_comment:
            new_review.game_comment = game_comment
            new_review.game_rating = ratingDict.get(game_comment, game_rating)

            db.session.add(new_review)
            db.session.commit()
            return AddReview(ok=True, new_review=new_review)


class AddToWishlist(Mutation):
    class Arguments:
        game_id = Int()
        user_id = Int()

    ok = Boolean()
    success_message = String()

    def mutate(self, info, game_id, user_id):
        user = UserModel.query.get(user_id)
        game = GameModel.query.get(game_id)

        if not user:
            raise Exception("User with the provided id does not exist")
        if not game:
            raise Exception("Game with the provided id does not exist")

        if game not in user.user_wishlist_games and game not in user.bought_games:
            user.user_wishlist_games.append(game)
            db.session.commit()
            return AddToWishlist(
                ok=True, success_message="Game successfully added to wishlist"
            )
        elif game not in user.user_wishlist_games and game in user.bought_games:
            user.bought_games.remove(game)
            user.user_wishlist_games.append(game)
            db.session.commit()
            return AddToWishlist(
                ok=True, success_message="Game successfully added to wishlist"
            )

        return AddToWishlist(ok=False, success_message="")


class DeleteReview(Mutation):
    class Arguments:
        user_id = Int(required=True)
        rev_id = Int(required=True)

    ok = Boolean()

    def mutate(root, info, user_id, rev_id):
        review = ReviewModel.query.filter_by(id=rev_id, user_id=user_id).first()
        user = UserModel.query.get(user_id)

        if user is None:
            raise Exception("User with provided id does not exist")
        if review is None:
            raise Exception("Review does not exist")

        db.session.delete(review)
        db.session.commit()
        return DeleteReview(ok=True)


class CartItemInput(InputObjectType):
    game_id = ID(required=True)
    quantity = Int(required=True)


class AddToPurchases(Mutation):
    class Arguments:
        user_id = ID(required=True)
        purchase_data = List(CartItemInput, required=True)

    ok = Boolean()
    success_message = String()

    def mutate(root, info, user_id, purchase_data):
        current_user_id = info.context.get("user_id")
        if current_user_id != user_id:
            raise Exception("You are not authorized to perform this action")

        user = UserModel.query.get(user_id)
        if user is None:
            raise Exception("User with provided id does not exist")

        for item in purchase_data:
            game = GameModel.query.get(item.game_id)
            if game is None:
                raise Exception(f"Game with id {item.game_id} does not exist")
            if game not in user.bought_games:
                user.bought_games.append(game)
                db.session.flush()

            for _ in range(item.quantity):
                purchase = PurchaseModel(game_id=game.id, user_id=user.id)
                db.session.add(purchase)
        db.session.commit()
        ok = True

        return AddToPurchases(
            ok=ok,
            success_message="Purchase was successful! Thank you for shopping with GameGo!",
        )


class MyMutations(ObjectType):
    update_user_wishlist_games = UpdateUserWishlistGames.Field()

    add_to_purchase = AddToPurchases.Field()

    follower_followee = FollowerFollowee.Field()

    signup = SignUpMutation.Field()

    login = LoginMutation.Field()

    add_to_games = AddToGames.Field()

    added_to_wishlist = AddToWishlist.Field()

    update_game_status = UpdateGameStatus.Field()

    delete_game = DeleteGame.Field()

    add_review = AddReview.Field()

    delete_review = DeleteReview.Field()

    edit_review = EditReview.Field()
    
    toggle_review_like = ToggleReviewLikeMutation.Field()


class Query(ObjectType):
    node = relay.Node.Field()

    all_games = SQLAlchemyConnectionField(Game)

    all_users = SQLAlchemyConnectionField(User)

    all_reviews = SQLAlchemyConnectionField(Review)

    one_game = Field(Game, id=Int())

    one_user = Field(User, id=Int())

    my_games = List(Game, id=Int())

    all_game_reviews = List(Review, game_id=Int())

    my_wishlist_games = List(Game, id=Int())

    similar_user_games = List(Game, id=Int())

    search = List(SearchResultType, query=String(required=True))

    add_to_games = Field(Int, game_id=Int(), required=True)

    check_ratings = Field(Int, game_id=Int(required=True))

    check_average_rating = Field(String, game_id=Int(required=True))

    check_library = Field(Int, game_id=Int(required=True), user_id=Int(required=True))
    
    check_game_status = Field(Int, game_id=Int(required=True), user_id=Int(required=True))

    check_follow_status = Field(
        String, follower_id=Int(required=True), followee_id=Int(required=True)
    )

    check_review = Field(
        lambda: ReviewCheck, game_id=Int(required=True), user_id=Int(required=True)
    )

    check_rating_types = Field(lambda: GameRatingTypes, game_id=Int(required=True))

    check_game = Field(
        lambda: GameCheckResult, game_id=Int(required=True), user_id=Int(required=True)
    )

    count_reviews = Field(Int, game_id=Int(required=True))

    user_with_game = List(User, id=Int())

    user_try = List(User, game_id=Int())
    
    def resolve_check_game_status(self, info, game_id, user_id):
        status = GameStatusCheck.query.filter_by(game_id=game_id, user_id=user_id).first()
        
        if not status:
            return 0
        else:
            return status.status

    def resolve_use_try(self, info, game_id):
        game = GameModel.query.get(game_id)

        if not game:
            raise Exception("Game with the provided id does not exist")
        return game.users

    def resolve_user_with_game(self, info, id=None):
        game = GameModel.query.get(id)

        if not game:
            raise Exception("Game with provided id does not exist")
        return game.buyers

    def resolve_check_follow_status(self, info, follower_id, followee_id):
        follower = UserModel.query.get(follower_id)

        followee = UserModel.query.get(followee_id)

        if not follower:
            raise Exception("Follower does not exist")
        if not followee:
            raise Exception("Followee does not exist")

        if followee in follower.following:
            return "Unfollow"
        return "Follow"

    def resolve_check_rating_types(self, info, game_id):
        exceptional = (
            db.session.query(func.count(ReviewModel.game_rating))
            .filter(and_(ReviewModel.game_rating > 7.5, ReviewModel.game_id == game_id))
            .scalar()
        )
        recommend = (
            db.session.query(func.count(ReviewModel.game_rating))
            .filter(
                and_(
                    ReviewModel.game_rating <= 7.5,
                    ReviewModel.game_rating > 5,
                    ReviewModel.game_id == game_id,
                )
            )
            .scalar()
        )
        meh = (
            db.session.query(func.count(ReviewModel.game_rating))
            .filter(
                and_(
                    ReviewModel.game_rating <= 5,
                    ReviewModel.game_rating > 2.5,
                    ReviewModel.game_id == game_id,
                )
            )
            .scalar()
        )
        skip = (
            db.session.query(func.count(ReviewModel.game_rating))
            .filter(
                and_(
                    ReviewModel.game_rating <= 2.5,
                    ReviewModel.game_rating > 0,
                    ReviewModel.game_id == game_id,
                )
            )
            .scalar()
        )

        return GameRatingTypes(
            exceptional=exceptional, recommend=recommend, meh=meh, skip=skip
        )

    def resolve_all_game_reviews(self, info, game_id):
        game = GameModel.query.get(game_id)

        if not game:
            raise Exception("Game with the provided id does not exist")
        return game.reviews

    def resolve_check_review(self, info, game_id, user_id):
        user = UserModel.query.get(user_id)
        game = GameModel.query.get(game_id)

        if not user:
            raise Exception("User with the provided id does not exist")
        if not game:
            raise Exception("Game with the provided id does not exist")

        review = ReviewModel.query.filter_by(game_id=game_id, user_id=user_id).first()

        if review:
            return ReviewCheck(check_review=True, checked_review=review)
        return ReviewCheck(check_review=False, checked_review=None)

    def resolve_check_game(self, info, game_id, user_id):
        user = UserModel.query.get(user_id)
        game = GameModel.query.get(game_id)
        status = GameStatusCheck.query.filter_by(
            game_id=game_id, user_id=user_id
        ).first()
        if status is None:
            status = 0
        else:
            status = status.status

        if not user:
            raise Exception("User with the provided id does not exist")
        if not game:
            raise Exception("Game with the provided id does not exist")
        in_bought_games = game in user.bought_games
        in_wishlist = game in user.user_wishlist_games
        active_index = status

        return GameCheckResult(
            in_bought_games=in_bought_games,
            in_wishlist=in_wishlist,
            active_index=active_index,
        )

    def resolve_add_to_games(self, info, game_id):
        count = (
            db.session.query(func.count(purchasedGameModel.game_id))
            .filter(purchasedGameModel.game_id == game_id)
            .scalar()
        )
        return count

    def resolve_count_reviews(self, info, game_id):
        count = (
            db.session.query(func.count(ReviewModel.user_id))
            .filter(ReviewModel.game_id == game_id)
            .scalar()
        )

        return count

    def resolve_check_library(self, info, game_id, user_id):
        count = (
            db.session.query(func.count(purchasedGameModel.game_id))
            .filter(purchasedGameModel.user_id == user_id)
            .scalar()
        )

        return count

    def resolve_check_average_rating(self, info, game_id):
        game = GameModel.query.get(game_id)

        if game is None:
            raise Exception("Game with provided id does not exist")

        game_rating = (
            db.session.query(func.avg(ReviewModel.game_rating))
            .filter_by(game_id=game.id)
            .scalar()
        )

        if game_rating <= 2.5:
            game_rating = "Skip"
        elif 2.5 < game_rating <= 5:
            game_rating = "Meh"
        elif 5 < game_rating <= 7.5:
            game_rating = "Recommend"
        elif 7.5 < game_rating <= 10:
            game_rating = "Exceptional"

        return game_rating

    def resolve_check_ratings(self, info, game_id):
        count = (
            db.session.query(func.count(ReviewModel.game_rating))
            .filter(ReviewModel.game_id == game_id)
            .scalar()
        )

        return count

    def resolve_search(self, info, query):
        users = (
            db.session.query(UserModel)
            .filter(UserModel.username.ilike(f"%{query}%"))
            .all()
        )

        games = (
            db.session.query(GameModel)
            .filter(GameModel.title.ilike(f"%{query}%"))
            .all()
        )

        if users is None:
            users = []
        if games is None:
            games = []

        return users + games

    def resolve_one_game(self, info, id=None):
        game = GameModel.query.get(id)

        if game is None:
            raise Exception("Game does not exist")
        return game

    def resolve_one_user(self, info, id=None):
        user = UserModel.query.get(id)

        if user is None:
            raise Exception("User with the provided id does not exist")
        return user

    def resolve_my_games(self, info, id=None):
        user = UserModel.query.get(id)

        if user is None:
            raise Exception("User with the provided id does not exist")
        return user.bought_games

    def resolve_my_wishlist_games(self, info, id=None):
        user = UserModel.query.get(id)

        if user is None:
            raise Exception("User with the provided id does not exist")
        return user.user_wishlist_games

    def resolve_similar_user_games(self, info, id=None):
        game = GameModel.query.get(id)

        if game is None:
            raise Exception("Game with the provided id does not exist")
        game_genre = game.genres
        game_average_rating = (
            db.session.query(func.avg(ReviewModel.game_rating))
            .filter_by(game_id=game.id)
            .scalar()
        )
        similar_game_genres = (
            db.session.query(GameModel)
            .join(ReviewModel)
            .filter(
                or_(*[GameModel.genres.any(genre) for genre in game_genre]),
                ReviewModel.game_rating > game_average_rating,
            )
            .all()
        )
        return similar_game_genres


schema = Schema(query=Query, mutation=MyMutations)
