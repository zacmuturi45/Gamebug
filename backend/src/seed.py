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
        "title": "Fifa 22",
        "platforms": ["PC", "Xbox One", "PS5"],
        "genres": ["Sports", "Strategy"],
        "price": 65,
        "chart": "#1 Sports",
        "video_url": "fif24_jxyk92",
        "imageurl": [
            "FIFA-22_nv5iuk",
            "fifa223_fb32ch",
            "fifa226_ot5wku",
            "fifa225_kygl4z",
            "fifa225_ip1jwu",
        ],
        "date_added": random_date(2023, 2024),
        "about": "HyperMotion integrates advanced full-team mocap data and machine learning to heighten gameplay in every match in FIFA 22, harnessing the power of next generation consoles to deliver the most realistic, responsive and fluid gameplay experience we’ve ever built. FIFA 22 brings a new season of innovation across every mode in the game; enjoy more consistency between the posts with a goalkeeper rewrite that brings more composure to the most important position on the pitch, live out your football dreams as you create and manage your custom club to glory in Career Mode, get rewarded for your flair with restyled gameplay in VOLTA FOOTBALL, welcome back football’s most memorable players as FIFA Ultimate Team™ Heroes, and feel the atmosphere of your next big game with the most immersive matchday experience ever seen in EA SPORTS FIFA.",
        "publisher": "Electronic Arts",
        "age_rating": random.choice(age_rate),
        "developer": "Electronic Arts Vancouver",
        "tags": ["Singleplayer", "Multiplayer", "Split Screen", "Football", "Soccer"],
    },
    {
        "title": "Pes 24",
        "platforms": ["PC", "Xbox One", "PS5"],
        "genres": ["Sports", "Strategy"],
        "price": 60,
        "chart": "#2 Sports",
        "video_url": "pesvid_u91t8w",
        "imageurl": [
            "pes_p9aime",
            "fifa223_fb32ch",
            "fifa226_ot5wku",
            "fifa225_kygl4z",
            "fifa225_ip1jwu",
        ],
        "date_added": random_date(2023, 2024),
        "about": """
Additionally, special versions of players from the sport's most iconic teams will be made available throughout the season, including partner clubs like FC Barcelona and Liverpool FC.
Be sure to log in every week and sign the latest Featured Players to truly take your squad to the next level.

■New Live Update Feature
PES 2019 will always be aligned with the real world thanks to the new Live Update feature. Info on the latest transfers and individual player performance from real-life matches will be reflected in-game on a weekly basis.
Keep up to date with the fast moving world of soccer to ensure that you're a step ahead of the competition!

[Download Notes]
PES 2019 PRO EVOLUTION SOCCER must be downloaded over a Wi-Fi connection.
*3G・LTE is not supported.
*The same condition is applied for the App update.

[System Requirements]
This app is an online game. Please enjoy the game with stable internet connection.

[Title Display]
If you select Japanese in the language settings of the game application, “Winning Eleven 2019” will be displayed. If you select a language other than Japanese, “PES2019 PRO EVOLUTION SOCCER” will be displayed.
""",
        "publisher": "Konami",
        "age_rating": "Not rated",
        "developer": "Konami Digital Entertainment",
        "tags": ["Singleplayer", "Multiplayer", "Split Screen", "Football", "Soccer"],
    },
    {
        "title": "NBA 2K 24",
        "platforms": ["Xbox One", "PS5"],
        "genres": ["Sports", "Strategy"],
        "price": 55,
        "chart": "#3 Sports",
        "video_url": "NBA_2K24___Official_Gameplay_Trailer_t18omn",
        "imageurl": [
            "nba2k_vpncpt",
            "nba221_fhendr",
            "nba223_x5phaq",
            "nba222_obxfvw",
            "nba224_umowek",
        ],
        "date_added": random_date(2023, 2024),
        "about": """
        NBA 2K has evolved into much more than a basketball simulation. 2K continues to redefine what’s possible in sports gaming with NBA 2K20, featuring best in class graphics & gameplay, ground breaking game modes, and unparalleled player control and customization. Plus, with its immersive open-world Neighborhood, NBA 2K20 is a platform for gamers and ballers to come together and create what’s next in basketball culture.
Remote Play requires PS Vita system and sufficiently robust Wi-Fi connection.
Online features require an account and are subject to terms of service (playstationnetwork.com/terms-of-service), privacy policy (playstationnetwork.com/privacy-policy), and the game publisher’s privacy policy.
1-4 players
Network Players 2-10 - Full game requires PlayStation®Plus membership to access online multiplayer
60GB minimum save size
DUALSHOCK®4
Remote Play
Online Play (Optional)
Software subject to license (us.playstation.com/softwarelicense). Online features require an account and are subject to terms of service and applicable privacy policy (playstationnetwork.com/terms-of-service & playstationnetwork.com/privacy-policy). One-time license fee for play on account’s designated primary PS4™ system and other PS4™ systems when signed in with that account.
        """,
        "publisher": "2K Games, 2K Sports",
        "age_rating": "0+ Everyone",
        "developer": "2K Visual Concepts",
        "tags": [
            "Singleplayer",
            "Multiplayer",
            "Split Screen",
            "Basketball",
            "Ballers",
        ],
    },
    {
        "title": "Madden NFL 23",
        "platforms": ["Xbox One", "PS5"],
        "genres": ["Sports", "Strategy"],
        "price": 55,
        "chart": "#4 Sports",
        "video_url": "Madden_23_Official_Reveal_Trailer___Introducing_FieldSENSE_dgd2av",
        "imageurl": [
            "madden_q9el0v",
            "madden222_rcnkzj",
            "madden221_iashuo",
            "madden224_hw6nmx",
            "madden223_ghue42",
        ],
        "date_added": random_date(2023, 2024),
        "about": """
        All-new features in Franchise include staff management, an enhanced scenario engine, and weekly strategy. Share avatar progress and player class between Face of The Franchise and The Yard with unified progression. And for the first time ever in Ultimate Team, adjust Superstar X-Factors at halftime.FranchiseStaff management & talent trees
        Enhanced scenario engine
        Weekly strategy Unified ProgressionAvatar progress shared between Face of The Franchise & The Yard
        New player classes
        Earn rep via gameplay, and level up Ultimate TeamAdjust Superstar X-Factors at halftime
        Easily manage team chemistries
        """,
        "publisher": "Electronic Arts",
        "age_rating": "Not rated",
        "developer": "Electronic Arts Tiburon",
        "tags": [
            "Singleplayer",
            "Multiplayer",
            "Split Screen",
            "Football",
            "Oval Ball",
        ],
    },
    {
        "title": "Afl Evolution",
        "platforms": ["PC", "Xbox One", "PS5"],
        "genres": ["Sports"],
        "price": 45,
        "chart": "#5 Sports",
        "video_url": "afl_video",
        "imageurl": [
            "afl_ploa8x",
            "afl221_xijsik",
            "afl223_gdrt7z",
            "afl222_apyseq",
            "afl224_nalfcm",
        ],
        "date_added": random_date(2023, 2024),
        "about": """
        EXPERIENCE THE EVOLUTION

AFL Evolution brings you the most intense and feature packed AFL experience ever.

- REVOLUTIONARY - New gameplay system designed to capture the thrills, skills and excitement of modern AFL.
- COMPETITION - Play full seasons with over 80 teams from the AFL, VFL, TAC, NAB U18s, International Cup and play multiple Bonus Teams.
- CAREER - Build your player from the ground up. Experience the highs and lows as you work your way from an U-18s rookie through to a true AFL legend!
- MANAGE - Manage your club as the coach with drafting, trading, salary cap, tribunal, training and more. Lead your team to victory!
- PLAYER CREATOR - Create any player you can imagine. Customise your facial features, height, body type, hair, ethnicity, stats and accessories.
- FAN HUB => Create your own or share community created players, teams and classic line ups. Choose from the best of the best.
- ONLINE => Feel the adrenaline as you go head-to-head in competitive and co-operative online multiplayer.
- INSTANT REPLAY SYSTEM - Multiple camera settings and dramatic broadcast style replays!
""",
        "publisher": "Tru Blu Games",
        "age_rating": random.choice(age_rate),
        "developer": "Wicked Witch Software",
        "tags": [
            "Single Player",
            "Multiplayer",
            "Illuminati",
            "Online Mutltiplayer",
            "Football",
        ],
    },
    {
        "title": "Call of duty: Modern Warfare",
        "platforms": ["PC", "Xbox One", "PS5"],
        "genres": ["Action", "Shooter", "RPG"],
        "price": 60,
        "chart": "#10 Action",
        "video_url": "cod_b5xcyo",
        "imageurl": [
            "cod1_bygn4o",
            "cod2_ibzkle",
            "cod4_comc9r",
            "cod3_aapq1n",
            "cod5_n6dd6j",
        ],
        "date_added": random_date(2023, 2024),
        "about": """
        Call of Duty is a World War II first-person shooter developed by Infinity Ward. It is the first game in the series by the same name.

Plot
During the game's singleplayer campaign, the players take control of three soldiers from different armies: Joey Martin from the U.S. military, sergeant Evans from the British SAS, and Alexei Ivanovich Voronin from the Red Army. The game's plot follows their path from boot camp to the Battle of Berlin. There are 26 missions present in the game.

Gameplay
Call of Duty features both singleplayer and multiplayer modes. During the singleplayer campaign, a briefing is held or a slide-show with commentary before every mission. In order to complete a level, the player has to complete several objectives in a chronological order. There are four difficulty levels in Call of Duty, they differ in the amount of damage the player can sustain. There is no health regeneration system present in the game. A health pack system is used instead.

The players can carry two main weapons, one pistol, and 10 grenades. The players can melee any enemy they encounter in the game.

Multiplayer
At the beginning of the match, the players choose one of four sides: the U.S. Army, the British forces, the Vermacht, and the Red Army.

There are 4 game modes present in Call of Duty: Deathmatch, Team Deathmatch, Domination and Search and Destroy.

The game's maps are renditions of the real battlefields, such as Sainte-Mere-Eglise, the shores of Normandy, Berlin, and Stalingrad.
        """,
        "publisher": "Aspyr, Activision",
        "age_rating": random.choice(age_rate),
        "developer": "Infinity ward",
        "tags": ["Single player", "Atmospheric", "Historical", "Classic", "War"],
    },
    {
        "title": "Halo Infinite",
        "platforms": ["PC", "Xbox One", "PS5"],
        "genres": ["Action", "Shooter", "RPG"],
        "price": 60,
        "chart": "#12 Action",
        "video_url": "halo_rr5wbh",
        "imageurl": [
            "halo1_snuicq",
            "halo2_tsy2mf",
            "halo5_elrjf7",
            "halo4_umilj1",
            "halo3_qjeelp",
        ],
        "date_added": random_date(2023, 2024),
        "about": """
        Halo Infinite is the twelfth installment in the Halo franchise, and the sixth in the main series of science fiction first-person shooters. It is the sequel to Halo 5: Guardians and the third chapter in the Reclaimer Saga sub-series that was started by Halo 4. It is also the first game powered by the completely new Slipspace engine developed by Microsoft.

Setting
The Halo franchise is set in the 26th century, when the human civilization, led by United Nations Space Command, wages total war against the theocratic interstellar alliance called the Covenant. The goal of the war is the control of ring-shaped space stations, called Halos, which were built in ancient times by a lost civilization of Forerunners.

Plot
The game follows the series' most famous protagonist: Master Chief, who is a “Spartan” - a genetically enhanced, power armor wearing super soldier. Infinite continues the story of Master Chief and his companions, the Blue Team, as they fight against the AI called Cortana that tries to take over the control of the Halos. AHalo Infinite is set on a forested Halo inhabited by rhinos and other wildlife reminiscent of prehistoric Earth.

Modes
In addition to single player story campaign, Halo Infinite supports cooperative multiplayer modes, both local and online. There's, however, no Battle Royale mode.
        """,
        "publisher": "Microsoft Studios, Xbox Game Studios",
        "age_rating": "13+ Teen",
        "developer": "343 Industries",
        "tags": [
            "Halo Wars",
            "Single Playe",
            "Multiplayer",
            "Weapons",
            "Sexual Content",
            "Epic",
        ],
    },
    {
        "title": "Counter-Strike",
        "platforms": ["PC", "Nintendo Switch", "Xbox One", "PS5"],
        "genres": ["Action", "Shooter", "RPG"],
        "price": 85,
        "chart": "#15 Sports",
        "video_url": "count_ackqm6",
        "imageurl": [
            "count1_kevgyg",
            "count1_yogyup",
            "count2_a1gx9i",
            "count3_r2trbw",
            "count4_wymkxb",
        ],
        "date_added": random_date(2023, 2024),
        "about": """
        Counter-Strike franchise started in back in 2000. Originated as a mod for Half-Life, the developers were signed by Valve Corporation thus beginning the franchise that exists to this very day.

Having no particular plot or story at all, Counter-Strike was a competitive game mostly used as PvP. With new physics and a large amount of weaponry, you can choose between two fractions - Counter-Terrorists and Terrorists. Each team had their signature weapon (CTs had M16 while T had AK-47, for example), the main goal of every round was to kill the opposite team or fulfil a task. In case there is a bomb plant - detonate or prevent, hostages - rescue or prevent from it or assassination. One player from the team is chosen as a VIP person that must be protected, and the goal of the opposite team is to kill this VIP. By winning every round, you received a good payment, by loosing - much lesser one. You can spend cash on buying equipment and weapon. Counter-Strike franchise is still loved to this day, and even such old shooters live to this day.
        """,
        "publisher": "Valve, Sierra On-Line, Microsoft Game Studios",
        "age_rating": "Not rated",
        "developer": "Valve Software, Turtle Rock Studios, Barking Dog studios",
        "tags": [
            "Halo Wars",
            "Single Playe",
            "Multiplayer",
            "Weapons",
            "Sexual Content",
            "Epic",
        ],
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
        "title": "Hollow Knight",
        "platforms": ["Android", "Xbox One", "PS5"],
        "genres": ["Action", "Sports", "Strategy"],
        "price": 60,
        "chart": "#10 Sports",
        "video_url": "GameGo/hollow_knight",
        "imageurl": [
            "GameGo/HollowKnight_gkm0su",
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
    rt = random.randint(1, 10)
    randRate = random.choice(ratings)
    ratingDict = {
        "Exceptional": random.choice([8, 9, 10]),
        "Recommend": random.choice([6, 7]),
        "Meh": random.choice([3, 4, 5]),
        "Skip": random.choice([0, 1, 2]),
    }
    review = Review(
        content=fake.paragraph(),
        game_comment=randRate,
        game_rating=ratingDict[randRate],
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
            randomBoolean = random.choice([True, False])
            randomReviewLikeCheck = ReviewLikes.query.filter_by(
                review_id=randomReview.id, user_id=user.id
            ).first()
            if not randomReviewLikeCheck:
                newReviewLike = ReviewLikes(
                    review_id=randomReview.id, user_id=user.id, to_like=randomBoolean
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
