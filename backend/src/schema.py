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
    db
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
        
        if user or game is None:
            raise Exception("User or Game with the provided id does not exist")
        
        if game not in user.user_wishlist_games:
            user.user_wishlist_games.append(game)
            db.session.commit()
        else:
            raise Exception(f"{game.title} already exists in user wishlist.")
        
        return UpdateUserWishlistGames(user=user, ok=True, success_message=f"{game.title} successfully added to your wishlist")
    
class MyMutations(ObjectType):
    update_user_wishlist = UpdateUserWishlistGames.Field()


class Query(ObjectType):
    node = relay.Node.Field()

    all_games = SQLAlchemyConnectionField(Game)

    all_users = SQLAlchemyConnectionField(User)

    all_reviews = SQLAlchemyConnectionField(Review)

    one_game = Field(Game, id=Int())

    one_user = List(User, id=Int())

    # one_review = List(Review, id=Int())

    def resolve_one_game(self, info, id=None):
        game = GameModel.query.get(id)

        if game is None:
            raise Exception("Game does not exist")
        return game


schema = Schema(query=Query, mutation=MyMutations)
