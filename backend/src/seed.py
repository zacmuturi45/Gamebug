import random
from src import create_app
from datetime import datetime, timedelta
from faker import Faker
from src.models import User, Game, Review, Purchase, db, purchased_game, wishlist_game


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
# cardArray = [
#     "my-videos/boat_tyrkf7",
#     "my-videos/kill_qhzkbt",
#     "my-videos/switch_muf00v",
#     "my-videos/images_vvnxxn",
#     "my-videos/tekken8_fwdock",
#     "my-videos/tekken_t2s1md",
#     "my-videos/lastepoch_bepih3",
#     "my-videos/metalgearsolid_lspadg",
#     "my-videos/lastepoch_bepih3",
#     "my-videos/cod_znvbzr",
#     "my-videos/cod_ttbwyz",
#     "my-videos/lastepoch_bepih3",
#     "my-videos/switch_muf00v",
#     "my-videos/Vrising_r6rjfv",
#     "my-videos/indika_bupute",
#     "my-videos/blackMyth_c2na2l",
#     "my-videos/HollowKnight_jrylsc",
#     "my-videos/1348625_sfmfmp",
#     "my-videos/princeOfPersia_o58blw",
#     "my-videos/bladeSorcery_t7ievt",
#     "my-videos/theWolfAmongUs_v9dds4",
#     "my-videos/stellarBlade_c4dgvy",
#     "my-videos/noRest_jhnsig",
#     "my-videos/indika_bupute",
#     "my-videos/blackMyth_c2na2l",
#     "my-videos/HollowKnight_jrylsc",
#     "my-videos/1348625_sfmfmp",
#     "my-videos/princeOfPersia_o58blw",
#     "my-videos/bladeSorcery_t7ievt",
#     "my-videos/theWolfAmongUs_v9dds4",
#     "my-videos/switch_muf00v",
#     "my-videos/tekken8_fwdock",
#     "my-videos/tekken_t2s1md",
#     "my-videos/lastepoch_bepih3",
#     "my-videos/metalgearsolid_lspadg",
#     "my-videos/lastepoch_bepih3",
#     "my-videos/cod_znvbzr",
#     "my-videos/indika_bupute",
#     "my-videos/blackMyth_c2na2l",
#     "my-videos/HollowKnight_jrylsc",
#     "my-videos/1348625_sfmfmp",
#     "my-videos/princeOfPersia_o58blw",
#     "my-videos/bladeSorcery_t7ievt",
#     "my-videos/theWolfAmongUs_v9dds4",
#     "my-videos/switch_muf00v",
#     "my-videos/tekken8_fwdock",
#     "my-videos/tekken_t2s1md",
#     "my-videos/lastepoch_bepih3",
#     "my-videos/metalgearsolid_lspadg",
#     "my-videos/lastepoch_bepih3",
#     "my-videos/cod_znvbzr",
#     "my-videos/cod_ttbwyz",
#     "my-videos/lastepoch_bepih3",
#     "my-videos/switch_muf00v",
#     "my-videos/boat_tyrkf7",
#     "my-videos/kill_qhzkbt",
#     "my-videos/switch_muf00v",
#     "my-videos/tekken8_fwdock",
#     "my-videos/tekken_t2s1md",
#     "my-videos/lastepoch_bepih3",
#     "my-videos/metalgearsolid_lspadg",
#     "my-videos/lastepoch_bepih3",
#     "my-videos/cod_znvbzr",
#     "my-videos/cod_ttbwyz",
#     "my-videos/lastepoch_bepih3",
#     "my-videos/switch_muf00v",
#     "my-videos/indika_bupute",
#     "my-videos/blackMyth_c2na2l",
#     "my-videos/HollowKnight_jrylsc",
#     "my-videos/1348625_sfmfmp",
#     "my-videos/princeOfPersia_o58blw",
#     "my-videos/bladeSorcery_t7ievt",
#     "my-videos/theWolfAmongUs_v9dds4",
#     "my-videos/metalgearsolid_lspadg",
#     "my-videos/lastepoch_bepih3",
#     "my-videos/cod_znvbzr",
#     "my-videos/cod_ttbwyz",
#     "my-videos/lastepoch_bepih3",
#     "my-videos/switch_muf00v",
# ]

# titleArray = [
#     "Vampire: the Masquerade: Bloodlines 2",
#     "Metal Gear Solid",
#     "S.t.a.l.k.e.r II: Heart of Chernorbyl",
#     "Senhua's Saga",
#     "V Rising",
#     "Hollow Knight: Silksong",
#     "Stellar Blade",
#     "Synergy",
#     "Indika",
#     "The wolf among us 2",
# ]

def random_date(start_year, end_year):
    start_date = datetime(start_year, 1, 1)
    end_date = datetime(end_year, 12, 31)
    time_between_dates = end_date - start_date
    days_between_dates = time_between_dates.days
    random_days = random.randrange(days_between_dates)
    random_date = start_date + timedelta(days=random_days)
    return random_date

cloudGames = [
    {"title": "Fifa 24", "platforms": ["PC", "Xbox One", "PS5"], "genres": ["Sports", "Strategy"], "price": 65, "chart": "#1 Sports", "video_url": "GameGo/fif24_z8jucm", "imageurl": "GameGo/fifa24_gq5mew", "date_added": random_date(2023, 2024)},
    {"title": "Fifa 24", "platforms": ["PC", "Xbox One", "PS5"], "genres": ["Sports", "Strategy"], "price": 65, "chart": "#1 Sports", "video_url": "GameGo/fif24_z8jucm", "imageurl": "GameGo/fifa24_gq5mew", "date_added": random_date(2023, 2024)},
    {"title": "Fifa 24", "platforms": ["PC", "Xbox One", "PS5"], "genres": ["Sports", "Strategy"], "price": 65, "chart": "#1 Sports", "video_url": "GameGo/fif24_z8jucm", "imageurl": "GameGo/fifa24_gq5mew", "date_added": random_date(2023, 2024)},
    {"title": "Fifa 24", "platforms": ["PC", "Xbox One", "PS5"], "genres": ["Sports", "Strategy"], "price": 65, "chart": "#1 Sports", "video_url": "GameGo/fif24_z8jucm", "imageurl": "GameGo/fifa24_gq5mew", "date_added": random_date(2023, 2024)},
    {"title": "Fifa 24", "platforms": ["PC", "Xbox One", "PS5"], "genres": ["Sports", "Strategy"], "price": 65, "chart": "#1 Sports", "video_url": "GameGo/fif24_z8jucm", "imageurl": "GameGo/fifa24_gq5mew", "date_added": random_date(2023, 2024)},
    {"title": "Fifa 24", "platforms": ["PC", "Xbox One", "PS5"], "genres": ["Sports", "Strategy"], "price": 65, "chart": "#1 Sports", "video_url": "GameGo/fif24_z8jucm", "imageurl": "GameGo/fifa24_gq5mew", "date_added": random_date(2023, 2024)},
    {"title": "Fifa 24", "platforms": ["PC", "Xbox One", "PS5"], "genres": ["Sports", "Strategy"], "price": 65, "chart": "#1 Sports", "video_url": "GameGo/fif24_z8jucm", "imageurl": "GameGo/fifa24_gq5mew", "date_added": random_date(2023, 2024)},
    {"title": "Fifa 24", "platforms": ["PC", "Xbox One", "PS5"], "genres": ["Sports", "Strategy"], "price": 65, "chart": "#1 Sports", "video_url": "GameGo/fif24_z8jucm", "imageurl": "GameGo/fifa24_gq5mew", "date_added": random_date(2023, 2024)},
    {"title": "Fifa 24", "platforms": ["PC", "Xbox One", "PS5"], "genres": ["Sports", "Strategy"], "price": 65, "chart": "#1 Sports", "video_url": "GameGo/fif24_z8jucm", "imageurl": "GameGo/fifa24_gq5mew", "date_added": random_date(2023, 2024)},
    {"title": "Fifa 24", "platforms": ["PC", "Xbox One", "PS5"], "genres": ["Sports", "Strategy"], "price": 65, "chart": "#1 Sports", "video_url": "GameGo/fif24_z8jucm", "imageurl": "GameGo/fifa24_gq5mew", "date_added": random_date(2023, 2024)},
]


def create_fake_user():
    user = User(
        username=fake.user_name(),
        email=fake.email(),
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
        game_rating=random.randint(1, 5),
        user_id=user_id,
        game_id=game_id,
    )
    return review


def seed():
    db.session.query(Purchase).delete()
    db.session.query(Review).delete()
    db.session.query(purchased_game).delete()  
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
            video_url=game_data["video_url"]
        )
        db.session.add(game)
        user_bought_games.append(game)        
    db.session.commit()
    games = Game.query.all()
    for game in games:
        print(game.image_url)

    for g in user_bought_games:
        for _ in range(random.randint(1, 5)):
            r = random.choice(users)
            review = create_fake_review(r.id, g.id)
            db.session.add(review)
            db.session.commit()

    for user in users:

        for _ in range(random.randint(1, 5)):
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

        db.session.commit()


if __name__ == "__main__":
    app = create_app()
    with app.app_context():
        seed()
