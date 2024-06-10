import random
import math
from faker import Faker
from models import User, Game, Review, Purchase, db
from src import create_app


fake = Faker()
platforms = ["PS1", "PS2", "PS3", "PS4", "PS5"]
genres = ["Action", "Fantasy", "RPG", "Adventure", "Strategy", "Adult", "Sport"]


def create_fake_user():
    user = User(
        username=fake.user_name(),
        email=fake.email(),
    )
    return user


def create_fake_game():
    game = Game(
        title=fake.first_name(),
        platform=random.choice(platforms),
        genre=random.choice(genres),
        price=random.randint(25, 85),
        image_url=fake.image_url(),
        video_url=fake.image_url(),
    )
    return game


def create_fake_review(user_id, game_id):
    review = Review(
        content=fake.paragraph(),
        game_rating=random.randint(1, 5),
        user_id=user_id,
        game_id=game_id,
    )
    return review


def seed():
    db.session.query(User).delete()
    db.session.query(Game).delete()
    db.session.query(Review).delete()
    db.session.query(Purchase).delete()
    db.session.commit()

    users = []

    for _ in range(50):
        user = create_fake_user()
        users.append(user)
        db.session.add(user)
    db.session.commit()

    for user in users:

        for _ in range(random.randint(1, 5)):
            game = create_fake_game()
            db.session.add(game)
            db.session.commit()

            purchase = Purchase(game_id=game.id, user_id=user.id)
            db.session.add(purchase)

            review = create_fake_review(user.id, game.id)
            db.session.add(review)

        db.session.commit()


if __name__ == "__main__":
    app = create_app()
    with app.app_context():
        seed()
