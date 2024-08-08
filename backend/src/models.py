from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.dialects.postgresql import ARRAY


metadata = MetaData(
    naming_convention={
        "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    }
)

db = SQLAlchemy(metadata=metadata)

wishlist_game = db.Table(
    "wishlist_games",
    db.Column("user_id", db.Integer, db.ForeignKey("users.id"), primary_key=True),
    db.Column("game_id", db.Integer, db.ForeignKey("games.id"), primary_key=True),
)

followers = db.Table(
    "followers",
    db.Column("follower_id", db.Integer, db.ForeignKey("users.id")),
    db.Column("followee_id", db.Integer, db.ForeignKey("users.id")),
)


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), unique=True, nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    profilePic = db.Column(db.String(255), default="GameGo/fifa24_gq5mew")
    isAdmin = db.Column(db.Boolean, default=False)
    password_hash = db.Column(db.String, nullable=False)

    reviews = db.relationship("Review", backref="user", lazy=True)

    bought_games = db.relationship(
        "Game", secondary="purchased_games", back_populates="buyers"
    )
    user_wishlist_games = db.relationship(
        "Game", secondary=wishlist_game, back_populates="user_wishlist"
    )
    purchases = db.relationship("Purchase", backref="user", lazy=True)

    user_game_status = db.relationship(
        "Game", secondary="game_status", back_populates="game_status_row"
    )

    following = db.relationship(
        "User",
        secondary=followers,
        primaryjoin=id == followers.c.follower_id,
        secondaryjoin=id == followers.c.followee_id,
        backref="followers",
    )

    review_likes = db.relationship("ReviewLikes", back_populates="user")


class Game(db.Model):
    __tablename__ = "games"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    platforms = db.Column(ARRAY(db.String), nullable=False)
    date_added = db.Column(db.DateTime, default=datetime.now)
    genres = db.Column(ARRAY(db.String), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    chart = db.Column(db.String(100), default="Unranked")
    image_url = db.Column(ARRAY(db.String), nullable=False)
    video_url = db.Column(db.String(255))
    followers = db.Column(db.Integer)
    following = db.Column(db.Integer)
    about = db.Column(db.String(1000), nullable=False)
    publisher = db.Column(db.String(250), nullable=False)
    age_rating = db.Column(db.String(), default="Not rated")
    developer = db.Column(db.String(), nullable=False)
    tags = db.Column(ARRAY(db.String), nullable=True)

    reviews = db.relationship("Review", backref="game", lazy=True)

    buyers = db.relationship(
        "User", secondary="purchased_games", back_populates="bought_games"
    )
    user_wishlist = db.relationship(
        "User", secondary=wishlist_game, back_populates="user_wishlist_games"
    )
    purchases = db.relationship("Purchase", backref="game", lazy=True)

    game_status_row = db.relationship(
        "User", secondary="game_status", back_populates="user_game_status"
    )
    
    status_check = db.relationship("GameStatusCheck", back_populates="game", overlaps="game_status_row,user_game_status")


class GameStatusCheck(db.Model):
    __tablename__ = "game_status"
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), primary_key=True)
    game_id = db.Column(db.Integer, db.ForeignKey("games.id"), primary_key=True)
    status = db.Column(db.Integer, default=0)
    
    game = db.relationship("Game", back_populates="status_check", overlaps="game_status_row,user_game_status")


class PurchasedGame(db.Model):
    __tablename__ = "purchased_games"
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), primary_key=True)
    game_id = db.Column(db.Integer, db.ForeignKey("games.id"), primary_key=True)


class Purchase(db.Model):
    __tablename__ = "purchases"

    id = db.Column(db.Integer, primary_key=True)
    payment_method = db.Column(db.String(255), default="Visa")
    transaction_date = db.Column(db.DateTime, default=datetime.now())

    game_id = db.Column(db.Integer, db.ForeignKey("games.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)


class ReviewLikes(db.Model):
    __tablename__ = "review_likes"

    review_id = db.Column(db.Integer, db.ForeignKey("reviews.id"), primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), primary_key=True)
    to_like = db.Column(db.Boolean, nullable=False)

    review = db.relationship("Review", back_populates="review_likes")
    user = db.relationship("User", back_populates="review_likes")


class Review(db.Model):
    __tablename__ = "reviews"

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(), nullable=True)
    game_rating = db.Column(db.Integer)
    game_comment = db.Column(db.String(100))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    game_id = db.Column(db.Integer, db.ForeignKey("games.id"), nullable=False)
    date_added = db.Column(db.DateTime, default=datetime.now())
    likes = db.Column(db.Integer, default=0)
    dislikes = db.Column(db.Integer, default=0)
    
    parent_id = db.Column(db.Integer, db.ForeignKey("reviews.id"), nullable=True)
    replies = db.relationship("Review", backref=db.backref("parent", remote_side=[id]), lazy="dynamic")

    review_likes = db.relationship("ReviewLikes", back_populates="review")
