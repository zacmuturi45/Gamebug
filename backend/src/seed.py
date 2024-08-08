import random
from src import create_app
from datetime import datetime, timedelta
from faker import Faker
from src.models import (
    ReviewLikes,
    User,
    Game,
    Review,
    Purchase,
    db,
    PurchasedGame,
    wishlist_game,
    followers,
    GameStatusCheck,
)
from werkzeug.security import generate_password_hash

fake = Faker()
# platforms = ["PS5", "PC", "Xbox One", "Nintendo Switch", "iOS", "Android"]
# genres = [
#     "Action",
#     "Shooter",
#     "RPG",
#     "Adventure",
#     "Strategy",
#     "Racing",
#     "Puzzle",
#     "Sports",
# ]
user_bought_games = []
user_reviews = []

def random_date(start_year, end_year):
    start_date = datetime(start_year, 1, 1)
    end_date = datetime(end_year, 12, 31)
    time_between_dates = end_date - start_date
    days_between_dates = time_between_dates.days
    random_days = random.randrange(days_between_dates)
    random_date = start_date + timedelta(days=random_days)
    return random_date


age_rate = ["Adult", "PG 16", "PG 10"]
about = fake.paragraph()
publisher = fake.user_name()
developer = fake.company()
tags = [
    fake.catch_phrase(),
    fake.city(),
    fake.city(),
    fake.user_name(),
    fake.city(),
    fake.country(),
    fake.user_name(),
]

cloudGames = [
    {
        "title": "Fifa 24",
        "platforms": ["PC", "Xbox One", "PS5"],
        "genres": ["Sports", "Racing", "Strategy"],
        "price": 65,
        "chart": "#1 Sports",
        "video_url": "GameGo/fif24_z8jucm",
        "imageurl": [
            "GameGo/fifa24_gq5mew",
            "GameGo/ballisticMiniGolf_om4etb",
            "GameGo/nba2k_gp89qs",
            "GameGo/pes_uvexkf",
            "GameGo/baseball_w2llmf",
        ],
        "date_added": random_date(2023, 2024),
        "about": about,
        "publisher": publisher,
        "age_rating": random.choice(age_rate),
        "developer": developer,
        "tags": tags,
    },
    {
        "title": "Pes 24",
        "platforms": ["PC", "Xbox One", "PS5"],
        "genres": ["Sports", "Adventure", "Strategy"],
        "price": 60,
        "chart": "#2 Sports",
        "video_url": "GameGo/pesvid_d07nra",
        "imageurl": [
            "GameGo/pes_uvexkf",
            "GameGo/ballisticMiniGolf_om4etb",
            "GameGo/nba2k_gp89qs",
            "GameGo/pes_uvexkf",
            "GameGo/baseball_w2llmf",
        ],
        "date_added": random_date(2023, 2024),
        "about": about,
        "publisher": publisher,
        "age_rating": random.choice(age_rate),
        "developer": developer,
        "tags": tags,
    },
    {
        "title": "NBA 2K 24",
        "platforms": ["Xbox One", "PS5"],
        "genres": ["Sports", "Sports", "Strategy"],
        "price": 55,
        "chart": "#3 Sports",
        "video_url": "GameGo/nba2k_jr40hv",
        "imageurl": [
            "GameGo/nba2k_gp89qs",
            "GameGo/ballisticMiniGolf_om4etb",
            "GameGo/nba2k_gp89qs",
            "GameGo/pes_uvexkf",
            "GameGo/baseball_w2llmf",
        ],
        "date_added": random_date(2023, 2024),
        "about": about,
        "publisher": publisher,
        "age_rating": random.choice(age_rate),
        "developer": developer,
        "tags": tags,
    },
    {
        "title": "Madden NFL 23",
        "platforms": ["Xbox One", "PS5"],
        "genres": ["Sports", "Strategy", "Strategy"],
        "price": 55,
        "chart": "#4 Sports",
        "video_url": "GameGo/Madden_i9zdmi",
        "imageurl": [
            "GameGo/madden_sceo2i",
            "GameGo/ballisticMiniGolf_om4etb",
            "GameGo/nba2k_gp89qs",
            "GameGo/pes_uvexkf",
            "GameGo/baseball_w2llmf",
        ],
        "date_added": random_date(2023, 2024),
        "about": about,
        "publisher": publisher,
        "age_rating": random.choice(age_rate),
        "developer": developer,
        "tags": tags,
    },
    {
        "title": "Afl Evolution",
        "platforms": ["PC", "Xbox One", "PS5"],
        "genres": ["Sports", "Puzzle", "Strategy"],
        "price": 45,
        "chart": "#5 Sports",
        "video_url": "GameGo/Afl_xukype",
        "imageurl": [
            "GameGo/afl_jak666",
            "GameGo/ballisticMiniGolf_om4etb",
            "GameGo/nba2k_gp89qs",
            "GameGo/pes_uvexkf",
            "GameGo/baseball_w2llmf",
        ],
        "date_added": random_date(2023, 2024),
        "about": about,
        "publisher": publisher,
        "age_rating": random.choice(age_rate),
        "developer": developer,
        "tags": tags,
    },
    {
        "title": "Super Mega Baseball 4",
        "platforms": ["PC", "Xbox One", "PS5"],
        "genres": ["Sports", "Strategy"],
        "price": 50,
        "chart": "#6 Sports",
        "video_url": "GameGo/baseball_xrivxy",
        "imageurl": [
            "GameGo/baseball_w2llmf",
            "GameGo/ballisticMiniGolf_om4etb",
            "GameGo/nba2k_gp89qs",
            "GameGo/pes_uvexkf",
            "GameGo/baseball_w2llmf",
        ],
        "date_added": random_date(2023, 2024),
        "about": about,
        "publisher": publisher,
        "age_rating": random.choice(age_rate),
        "developer": developer,
        "tags": tags,
    },
    {
        "title": "Pro Evolution Soccer 19",
        "platforms": ["PC", "Xbox One", "PS5"],
        "genres": ["Sports", "Strategy"],
        "price": 60,
        "chart": "#10 Sports",
        "video_url": "GameGo/pesvid_d07nra",
        "imageurl": [
            "GameGo/pes19_xafujn",
            "GameGo/ballisticMiniGolf_om4etb",
            "GameGo/nba2k_gp89qs",
            "GameGo/pes_uvexkf",
            "GameGo/baseball_w2llmf",
        ],
        "date_added": random_date(2023, 2024),
        "about": about,
        "publisher": publisher,
        "age_rating": random.choice(age_rate),
        "developer": developer,
        "tags": tags,
    },
    {
        "title": "Rugby 22",
        "platforms": ["PC", "Xbox One", "PS5"],
        "genres": ["Sports", "Strategy"],
        "price": 60,
        "chart": "#12 Sports",
        "video_url": "GameGo/rugby22_ze3xvg",
        "imageurl": [
            "GameGo/rugby22_vi4z6n",
            "GameGo/ballisticMiniGolf_om4etb",
            "GameGo/nba2k_gp89qs",
            "GameGo/pes_uvexkf",
            "GameGo/baseball_w2llmf",
        ],
        "date_added": random_date(2023, 2024),
        "about": about,
        "publisher": publisher,
        "age_rating": random.choice(age_rate),
        "developer": developer,
        "tags": tags,
    },
    {
        "title": "Ballistic Mini Golf",
        "platforms": ["PC", "Nintendo Switch", "Xbox One", "PS5"],
        "genres": ["Sports", "Strategy"],
        "price": 85,
        "chart": "#15 Sports",
        "video_url": "GameGo/golf_gzbr6d",
        "imageurl": [
            "GameGo/ballisticMiniGolf_om4etb",
            "GameGo/ballisticMiniGolf_om4etb",
            "GameGo/nba2k_gp89qs",
            "GameGo/pes_uvexkf",
            "GameGo/baseball_w2llmf",
        ],
        "date_added": random_date(2023, 2024),
        "about": about,
        "publisher": publisher,
        "age_rating": random.choice(age_rate),
        "developer": developer,
        "tags": tags,
    },
    {
        "title": "Tennis World Tour 2",
        "platforms": ["Nintendo Switch", "Xbox One", "PS5"],
        "genres": ["Sports", "Strategy"],
        "price": 40,
        "chart": "#18 Sports",
        "video_url": "GameGo/tennis_jqbeyh",
        "imageurl": [
            "GameGo/trial_dyifgm",
            "GameGo/ballisticMiniGolf_om4etb",
            "GameGo/nba2k_gp89qs",
            "GameGo/pes_uvexkf",
            "GameGo/baseball_w2llmf",
        ],
        "date_added": random_date(2023, 2024),
        "about": about,
        "publisher": publisher,
        "age_rating": random.choice(age_rate),
        "developer": developer,
        "tags": tags,
    },
    {
        "title": "TestGame1",
        "platforms": ["Android", "Xbox One", "PS5"],
        "genres": ["Action", "Sports", "Strategy"],
        "price": 60,
        "chart": "#10 Sports",
        "video_url": "GameGo/pesvid_d07nra",
        "imageurl": [
            "GameGo/pes19_xafujn",
            "GameGo/ballisticMiniGolf_om4etb",
            "GameGo/nba2k_gp89qs",
            "GameGo/pes_uvexkf",
            "GameGo/baseball_w2llmf",
        ],
        "date_added": random_date(2023, 2024),
        "about": about,
        "publisher": publisher,
        "age_rating": random.choice(age_rate),
        "developer": developer,
        "tags": tags,
    },
    {
        "title": "TestGame2",
        "platforms": ["iOS", "Xbox One", "PS5"],
        "genres": ["Guns", "Sports", "Strategy"],
        "price": 60,
        "chart": "#12 Sports",
        "video_url": "GameGo/rugby22_ze3xvg",
        "imageurl": [
            "GameGo/rugby22_vi4z6n",
            "GameGo/ballisticMiniGolf_om4etb",
            "GameGo/nba2k_gp89qs",
            "GameGo/pes_uvexkf",
            "GameGo/baseball_w2llmf",
        ],
        "date_added": random_date(2023, 2024),
        "about": about,
        "publisher": publisher,
        "age_rating": random.choice(age_rate),
        "developer": developer,
        "tags": tags,
    },
    {
        "title": "TestGame3",
        "platforms": ["iOS", "PC", "Nintendo Switch", "Xbox One", "PS5"],
        "genres": ["Sports", "Shooter", "Strategy"],
        "price": 85,
        "chart": "#15 Sports",
        "video_url": "GameGo/golf_gzbr6d",
        "imageurl": [
            "GameGo/ballisticMiniGolf_om4etb",
            "GameGo/ballisticMiniGolf_om4etb",
            "GameGo/nba2k_gp89qs",
            "GameGo/pes_uvexkf",
            "GameGo/baseball_w2llmf",
        ],
        "date_added": random_date(2023, 2024),
        "about": about,
        "publisher": publisher,
        "age_rating": random.choice(age_rate),
        "developer": developer,
        "tags": tags,
    },
    {
        "title": "Tennis World Tour 2",
        "platforms": ["Nintendo Switch", "Xbox One", "PS5"],
        "genres": ["Sports", "RPG", "Strategy"],
        "price": 40,
        "chart": "#18 Sports",
        "video_url": "GameGo/tennis_b3wd0j",
        "imageurl": [
            "GameGo/trial_dyifgm",
            "GameGo/ballisticMiniGolf_om4etb",
            "GameGo/nba2k_gp89qs",
            "GameGo/pes_uvexkf",
            "GameGo/baseball_w2llmf",
        ],
        "date_added": random_date(2023, 2024),
        "about": about,
        "publisher": publisher,
        "age_rating": random.choice(age_rate),
        "developer": developer,
        "tags": tags,
    },
]

ratings = ["Exceptional", "Recommend", "Meh", "Skip"]


def create_fake_user():
    hashed_password = generate_password_hash("californium-98")
    user = User(
        username=fake.user_name(), email=fake.email(), password_hash=hashed_password
    )
    return user


# def create_fake_game():
#     platArray = []
#     genreArray = []
#     for _ in range(random.randint(1, 3)):
#         platItem = random.choice(platforms)
#         genreItem = random.choice(genres)
#         if platItem not in platArray:
#             platArray.append(platItem)

#         if genreItem not in genreArray:
#             genreArray.append(genreItem)

#     game = Game(
#         title=random.choice(titleArray),
#         platforms=platArray,
#         genres=genreArray,
#         price=random.randint(25, 85),
#         chart=f"#{random.randint(1, 100)} {2024-(random.randint(0, 10))}",
#         image_url=random.choice(cardArray),
#         video_url=fake.image_url(),
#     )

#     return game


def create_fake_review(user_id, game_id):
    review = Review(
        content=fake.paragraph(),
        game_rating=random.randint(1, 10),
        game_comment=random.choice(ratings),
        user_id=user_id,
        game_id=game_id,
        date_added=random_date(2022, 2024),
    )
    return review


def seed():
    db.session.query(followers).delete()
    db.session.query(Purchase).delete()
    db.session.query(GameStatusCheck).delete()
    db.session.query(ReviewLikes).delete()    
    db.session.query(Review).delete()
    db.session.query(PurchasedGame).delete()
    db.session.query(wishlist_game).delete()
    db.session.query(User).delete()
    db.session.query(Game).delete()
    db.session.commit()

    users = []

    for _ in range(50):
        user = create_fake_user()
        users.append(user)
        db.session.add(user)
    db.session.commit()

    for game_data in cloudGames:
        game = Game(
            title=game_data["title"],
            platforms=game_data["platforms"],
            genres=game_data["genres"],
            price=game_data["price"],
            chart=game_data["chart"],
            date_added=game_data["date_added"],
            image_url=game_data["imageurl"],
            video_url=game_data["video_url"],
            about=game_data["about"],
            publisher=game_data["publisher"],
            age_rating=game_data["age_rating"],
            developer=game_data["developer"],
            tags=game_data["tags"],
        )
        db.session.add(game)
        user_bought_games.append(game)
    db.session.commit()
    games = Game.query.all()
    for game in games:
        print(game.platforms)

    for g in user_bought_games:
        for _ in range(random.randint(1, 5)):
            r = random.choice(users)
            review = create_fake_review(r.id, g.id)
            db.session.add(review)
            db.session.commit()

    for user in users:

        for _ in range(random.randint(1, 5)):
            toFollow = random.choice(users)

            if toFollow != user and toFollow not in user.following:
                user.following.append(toFollow)
            game = random.choice(user_bought_games)
            wishlist = random.choice(user_bought_games)
            if game not in user.bought_games:
                user.bought_games.append(game)

            if wishlist not in user.user_wishlist_games:
                user.user_wishlist_games.append(wishlist)

            purchase = Purchase(game_id=game.id, user_id=user.id)
            db.session.add(purchase)

            review = create_fake_review(user.id, game.id)
            db.session.add(review)
            user_reviews.append(review)
        for _ in range(random.randint(2, 5)):
            randomReview = random.choice(user_reviews)
            randomBoolean=random.choice([True, False])            
            randomReviewLikeCheck = ReviewLikes.query.filter_by(review_id=randomReview.id, user_id=user.id).first()
            if not randomReviewLikeCheck:
                newReviewLike = ReviewLikes(
                    review_id=randomReview.id,
                    user_id=user.id,
                    to_like=randomBoolean
                )
                db.session.add(newReviewLike)
                if randomBoolean:
                    randomReview.likes += 1
                else:
                    randomReview.dislikes += 1
                db.session.commit()
            

        db.session.commit()


if __name__ == "__main__":
    app = create_app()
    with app.app_context():
        seed()
