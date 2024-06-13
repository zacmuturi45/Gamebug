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
)
from graphene_sqlalchemy import SQLAlchemyConnectionField, SQLAlchemyObjectType
from sqlalchemy import func
from src.models import (
    User as UserModel,
    Game as GameModel,
    Purchase as PurchaseModel,
    Review as ReviewModel,
    db,
)


class User(SQLAlchemyObjectType):
    class Meta:
        model = UserModel
        interfaces = (relay.Node,)


class Game(SQLAlchemyObjectType):
    class Meta:
        model = GameModel
        interfaces = (relay.Node,)


class Review(SQLAlchemyObjectType):
    class Meta:
        model = ReviewModel
        interfaces = (relay.Node,)


class Purchase(SQLAlchemyObjectType):
    class Meta:
        model = PurchaseModel
        interfaces = (relay.Node,)


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


class Query(ObjectType):
    node = relay.Node.Field()

    all_games = SQLAlchemyConnectionField(Game)

    all_users = SQLAlchemyConnectionField(User)

    all_reviews = SQLAlchemyConnectionField(Review)

    one_game = Field(Game, id=Int())

    one_user = List(User, id=Int())

    my_games = List(Game, id=Int())

    my_wishlist_games = List(Game, id=Int())

    similar_user_games = List(Game, id=Int())

    def resolve_one_game(self, info, id=None):
        game = GameModel.query.get(id)

        if game is None:
            raise Exception("Game does not exist")
        return game

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
        game_genre = game.genre
        game_average_rating = (
            db.session.query(func.avg(ReviewModel.game_rating))
            .filter_by(game_id=game.id)
            .scalar()
        )
        similar_game_genres = (
            db.session.query(GameModel)
            .join(ReviewModel)
            .filter(
                GameModel.genre == game_genre,
                ReviewModel.game_rating > game_average_rating,
            )
            .all()
        )
        return similar_game_genres


schema = Schema(query=Query, mutation=MyMutations)
