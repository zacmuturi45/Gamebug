from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.ext.mutable import MutableList
from sqlalchemy.dialects.sqlite import JSON
import json


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
    user_wishlist_games = db.relationship(
        "Game", secondary=wishlist_game, back_populates="user_wishlist"
    )
    purchases = db.relationship("Purchase", backref="user", lazy=True)


class Game(db.Model):
    __tablename__ = "games"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    platforms = db.Column(db.String(1000), nullable=False)
    date_added = db.Column(db.DateTime, default=datetime.now())
    genres = db.Column(db.String(1000), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    chart = db.Column(db.String(100), default="Unranked")
    image_url = db.Column(db.String(255))
    video_url = db.Column(db.String(255))

    reviews = db.relationship("Review", backref="game", lazy=True)

    buyers = db.relationship(
        "User", secondary=purchased_game, back_populates="bought_games"
    )
    user_wishlist = db.relationship(
        "User", secondary=wishlist_game, back_populates="user_wishlist_games"
    )
    purchases = db.relationship("Purchase", backref="game", lazy=True)
    
    def get_platforms(self):
        return json.loads(self.platforms)
    
    def set_platforms(self, platforms):
        self.platforms = json.dumps(platforms)
        
    def get_genres(self):
        return json.loads(self.genres)
    
    def set_genres(self, genres):
        self.genres = json.dumps(genres)


class Purchase(db.Model):
    __tablename__ = "purchases"

    id = db.Column(db.Integer, primary_key=True)
    payment_method = db.Column(db.String(255), default="Visa")
    transaction_date = db.Column(db.DateTime, default=datetime.now())

    game_id = db.Column(db.Integer, db.ForeignKey("games.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)


class Review(db.Model):
    __tablename__ = "reviews"

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(1000), nullable=False)
    game_rating = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    game_id = db.Column(db.Integer, db.ForeignKey("games.id"), nullable=False)
