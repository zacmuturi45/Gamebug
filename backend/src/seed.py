import random
from src import create_app
from faker import Faker
from src.models import User, Game, Review, Purchase, db, purchased_game, wishlist_game


fake = Faker()
platforms = ["PS5", "PC", "Xbox One", "Nintendo Switch", "iOS", "Android"]
genres = [
    "Action",
    "Shooter",
    "RPG",
    "Adventure",
    "Strategy",
    "Racing",
    "Puzzle",
    "Sports",
]
user_bought_games = []
cardArray = [
    "my-videos/boat_tyrkf7",
    "my-videos/kill_qhzkbt",
    "my-videos/switch_muf00v",
    "my-videos/tekken8_fwdock",
    "my-videos/tekken_t2s1md",
    "my-videos/lastepoch_bepih3",
    "my-videos/metalgearsolid_lspadg",
    "my-videos/lastepoch_bepih3",
    "my-videos/cod_znvbzr",
    "my-videos/cod_ttbwyz",
    "my-videos/lastepoch_bepih3",
    "my-videos/switch_muf00v",
    "my-videos/Vrising_r6rjfv",
    "my-videos/indika_bupute",
    "my-videos/blackMyth_c2na2l",
    "my-videos/HollowKnight_jrylsc",
    "my-videos/1348625_sfmfmp",
    "my-videos/princeOfPersia_o58blw",
    "my-videos/bladeSorcery_t7ievt",
    "my-videos/theWolfAmongUs_v9dds4",
    "my-videos/stellarBlade_c4dgvy",
    "my-videos/noRest_jhnsig",
    "my-videos/indika_bupute",
    "my-videos/blackMyth_c2na2l",
    "my-videos/HollowKnight_jrylsc",
    "my-videos/1348625_sfmfmp",
    "my-videos/princeOfPersia_o58blw",
    "my-videos/bladeSorcery_t7ievt",
    "my-videos/theWolfAmongUs_v9dds4",
    "my-videos/switch_muf00v",
    "my-videos/tekken8_fwdock",
    "my-videos/tekken_t2s1md",
    "my-videos/lastepoch_bepih3",
    "my-videos/metalgearsolid_lspadg",
    "my-videos/lastepoch_bepih3",
    "my-videos/cod_znvbzr",
    "my-videos/indika_bupute",
    "my-videos/blackMyth_c2na2l",
    "my-videos/HollowKnight_jrylsc",
    "my-videos/1348625_sfmfmp",
    "my-videos/princeOfPersia_o58blw",
    "my-videos/bladeSorcery_t7ievt",
    "my-videos/theWolfAmongUs_v9dds4",
    "my-videos/switch_muf00v",
    "my-videos/tekken8_fwdock",
    "my-videos/tekken_t2s1md",
    "my-videos/lastepoch_bepih3",
    "my-videos/metalgearsolid_lspadg",
    "my-videos/lastepoch_bepih3",
    "my-videos/cod_znvbzr",
    "my-videos/cod_ttbwyz",
    "my-videos/lastepoch_bepih3",
    "my-videos/switch_muf00v",
    "my-videos/boat_tyrkf7",
    "my-videos/kill_qhzkbt",
    "my-videos/switch_muf00v",
    "my-videos/tekken8_fwdock",
    "my-videos/tekken_t2s1md",
    "my-videos/lastepoch_bepih3",
    "my-videos/metalgearsolid_lspadg",
    "my-videos/lastepoch_bepih3",
    "my-videos/cod_znvbzr",
    "my-videos/cod_ttbwyz",
    "my-videos/lastepoch_bepih3",
    "my-videos/switch_muf00v",
    "my-videos/indika_bupute",
    "my-videos/blackMyth_c2na2l",
    "my-videos/HollowKnight_jrylsc",
    "my-videos/1348625_sfmfmp",
    "my-videos/princeOfPersia_o58blw",
    "my-videos/bladeSorcery_t7ievt",
    "my-videos/theWolfAmongUs_v9dds4",
    "my-videos/metalgearsolid_lspadg",
    "my-videos/lastepoch_bepih3",
    "my-videos/cod_znvbzr",
    "my-videos/cod_ttbwyz",
    "my-videos/lastepoch_bepih3",
    "my-videos/switch_muf00v",
]

titleArray = ["Vampire: the Masquerade: Bloodlines 2", "Stalker", "Stalker II: Heart of Chornorbyll", "Senhua's Saga", "V Rising", "Hollow Knight: Silksong", "Stellar Blade", "Synergy", "Indika", "The wolf among us 2"]


def create_fake_user():
    user = User(
        username=fake.user_name(),
        email=fake.email(),
    )
    return user


def create_fake_game():
    platArray = []
    genreArray = []
    for _ in range(random.randint(1, 3)):
        platArray.append(random.choice(platforms))
        genreArray.append(random.choice(genres))
    game = Game(
        title=random.choice(titleArray),
        platforms=platArray,
        genres=genreArray,
        price=random.randint(25, 85),
        chart=f"#{random.randint(1, 100)} {2024-(random.randint(0, 10))}",
        image_url=random.choice(cardArray),
        video_url=fake.image_url(),
    )
    game.set_platforms(platArray)
    game.set_genres(genreArray)
    
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
    db.session.query(purchased_game).delete()
    db.session.query(wishlist_game).delete()
    db.session.commit()

    users = []

    for _ in range(50):
        user = create_fake_user()
        users.append(user)
        db.session.add(user)
    db.session.commit()

    for _ in range(200):
        game = create_fake_game()
        db.session.add(game)
        db.session.commit()
        user_bought_games.append(game)

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
