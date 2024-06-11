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
from src.models import (
    User as UserModel,
    Game as GameModel,
    Purchase as PurchaseModel,
    Review as ReviewModel,
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


class Query(ObjectType):
    node = relay.Node.Field()

    all_games = SQLAlchemyConnectionField(Game)

    all_users = SQLAlchemyConnectionField(User)

    all_reviews = SQLAlchemyConnectionField(Review)

    one_game = List(Game, id=Int())

    one_user = List(User, id=Int())

    # one_review = List(Review, id=Int())

    def resolve_one_game(self, info, id=None):
        game = GameModel.query.get(id)

        if game is None:
            raise Exception("Game does not exist")
        return game


schema = Schema(query=Query)
