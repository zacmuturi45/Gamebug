from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData

metadata = MetaData(
    naming_convention={
        "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    }
)

db = SQLAlchemy(metadata=metadata)

purchased_game = db.Table(
    "purchased_games",
    db.Column("user_id", db.Integer, db.ForeignKey("users.id"), primary_key=True),
    db.Column("game_id", db.Integer, db.ForeignKey("games.id"), primary_key=True),
)

wishlist_game = db.Table(
    "wishlist_games",
    db.Column("user_id", db.Integer, db.ForeignKey("users.id"), primary_key=True),
    db.Column("game_id", db.Integer, db.ForeignKey("games.id"), primary_key=True),
)


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), unique=True, nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    isAdmin = db.Column(db.Boolean, default=False)

    reviews = db.relationship("Review", backref="user", lazy=True)

    bought_games = db.relationship(
        "Game", secondary=purchased_game, back_populates="buyers"
    )
    wishlist_game = db.relationship(
        "Game", secondary=wishlist_game, back_populates="user_wishlist"
    )
    purchases = db.relationship("Purchase", back_populates="user")


class Game(db.Model):
    __tablename__ = "games"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    platform = db.Column(db.String(255), nullable=False)
    date_added = db.Column(db.DateTime, default=datetime.now())
    genre = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    image_url = db.Column(db.String(255))
    video_url = db.Column(db.String(255))

    reviews = db.relationship("Review", backref="game", lazy=True)

    buyers = db.relationship(
        "User", secondary=purchased_game, back_populates="bought_games"
    )
    user_wishlist = db.relationship(
        "User", secondary=wishlist_game, back_populates="wishlist_game"
    )
    purchases = db.relationship("Purchase", back_populates="game")


class Purchase(db.Model):
    __tablename__ = "purchases"

    purchase_id = db.Column(db.Integer, primary_key=True)
    game_id = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, nullable=False)
    transaction_date = db.Column(db.DateTime, default=datetime.now())

    user = db.relationship("User", back_populates="purchases")
    game = db.relationship("Game", back_populates="purchases")


class Review(db.Model):
    __tablename__ = "reviews"

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(1000), nullable=False)
    game_rating = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    game_id = db.Column(db.Integer, db.ForeignKey("games.id"), nullable=False)
