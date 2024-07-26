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
from sqlalchemy import func, or_
from src.models import (
    User as UserModel,
    Game as GameModel,
    Purchase as PurchaseModel,
    Review as ReviewModel,
    PurchasedGame as purchasedGameModel,
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
    class Meta:
        model = ReviewModel
        interfaces = (relay.Node,)


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
    
    def resolve_in_bought_games(self, info):
        return self.in_bought_games
    
    def resolve_in_wishlist(self, info):
        return self.in_wishlist

class UpdateUserWishlistGames(Mutation):
    class Arguments:
        user_id = ID(required=True)
        game_id = ID(required=True)

    ok = Boolean()
    user = Field(lambda: User)
    success_message = String()

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
        toFollow = Boolean(required=True)

    ok = Boolean()
    status = String()

    @jwt_required()
    def mutate(self, info, follower_id, followee_id, toFollow):
        follower = UserModel.query.get(follower_id)
        followee = UserModel.query.get(followee_id)
        status = "pending"

        if follower is None:
            raise Exception("Follower with provided id does not exist")
        if followee is None:
            raise Exception("Followee with provided id does not exist")

        if toFollow:
            if follower in followee.following:
                raise Exception("You are already following this user")
            follower.following.append(followee)
            db.session.flush()
            status = "following"

        if not toFollow:
            follower.following.remove(followee)
            db.session.flush()
            status = "follow"

        db.session.commit()
        ok = True
        status = status

        return FollowerFollowee(ok=ok, status=status)
    
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
        new_user = UserModel(email=email, password_hash=hashed_password, username=username)
        db.session.add(new_user)
        db.session.commit()
        
        return SignUpMutation(ok=True, user=new_user, success_message="Signup successful")
    
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
            count = db.session.query(func.count(purchasedGameModel.game_id)).filter(purchasedGameModel.game_id == game_id).scalar()
            return AddToGames(ok=True, count=count)
        if game not in user.bought_games and game in user.user_wishlist_games:
            user.user_wishlist_games.remove(game)
            user.bought_games.append(game)
            db.session.commit()
            count = db.session.query(func.count(purchasedGameModel.game_id)).filter(purchasedGameModel.game_id == game_id).scalar()
            return AddToGames(ok=True, count=count)
        
        return AddToGames(ok=False, count=None, added=True)
    
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
            return AddToWishlist(ok=True, success_message="Game successfully added to wishlist")
        elif game not in user.user_wishlist_games and game in user.bought_games:
            user.bought_games.remove(game)
            user.user_wishlist_games.append(game)
            db.session.commit()
            return AddToWishlist(ok=True, success_message="Game successfully added to wishlist")
            
        return AddToWishlist(ok=False, success_message="")
            
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
        current_user_id = info.context.get('user_id')
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


class Query(ObjectType):
    node = relay.Node.Field()

    all_games = SQLAlchemyConnectionField(Game)

    all_users = SQLAlchemyConnectionField(User)

    all_reviews = SQLAlchemyConnectionField(Review)

    one_game = Field(Game, id=Int())

    one_user = Field(User, id=Int())

    my_games = List(Game, id=Int())

    my_wishlist_games = List(Game, id=Int())

    similar_user_games = List(Game, id=Int())

    search = List(SearchResultType, query=String(required=True))
    
    add_to_games = Field(Int, game_id=Int(), required=True)
    
    check_game = Field(lambda: GameCheckResult, game_id=Int(required=True), user_id=Int(required=True))
    
    
    def resolve_check_game(self, info, game_id, user_id):
        user = UserModel.query.get(user_id)
        game = GameModel.query.get(game_id)
        
        if not user:
            raise Exception("User with the provided id does not exist")
        if not game:
            raise Exception("Game with the provided id does not exist")
        in_bought_games = game in user.bought_games
        in_wishlist = game in user.user_wishlist_games
        
        return GameCheckResult(in_bought_games=in_bought_games, in_wishlist=in_wishlist)
    
    def resolve_add_to_games(self, info, game_id):
        count = db.session.query(func.count(purchasedGameModel.game_id)).filter(purchasedGameModel.game_id == game_id).scalar()
        return count

    def resolve_search(self, info, query):
        games = (
            db.session.query(GameModel)
            .filter(GameModel.title.ilike(f"%{query}%"))
            .all()
        )
        users = (
            db.session.query(UserModel)
            .filter(UserModel.username.ilike(f"%{query}%"))
            .all()
        )

        return games + users

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
