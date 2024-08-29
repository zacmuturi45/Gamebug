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


user_bought_games = []
user_reviews = []

fake = Faker()


def random_date(start_year, end_year):
    start_date = datetime(start_year, 1, 1)
    end_date = datetime(end_year, 12, 31)
    time_between_dates = end_date - start_date
    days_between_dates = time_between_dates.days
    random_days = random.randrange(days_between_dates)
    random_date = start_date + timedelta(days=random_days)
    return random_date


age_rate = ["PG 16", "PG 10"]
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
        "title": "Fortnite Battle Royale",
        "platforms": ["PC", "Xbox One", "PS5"],
        "genres": ["Action", "RPG", "Shooter"],
        "price": 65,
        "chart": "#112 Shooter",
        "video_url": "65ff9214af64ca0c89abac55d80ed7ab_fpfwnc",
        "imageurl": [
            "fort_x5ftns",
            "fort3_kblk6z",
            "fort4_amel7a",
            "fort5_vezkjb",
            "fort2_uknx3b",
        ],
        "date_added": random_date(2023, 2024),
        "about": """
Fortnite Battle Royale is the completely free 100-player PvP mode in Fortnite. One giant map. A battle bus. Fortnite building skills and destructible environments combined with intense PvP combat. The last one standing wins. Download now for FREE and jump into the action.
This download also gives you a path to purchase the Save the World co-op PvE campaign during Fortnite’s Early Access season, or instant access if you received a Friend invite.
Online features require an account and are subject to terms of service and applicable privacy policy (playstationnetwork.com/terms-of-service & playstationnetwork.com/privacy-policy).
1 player
Network Players 2-99
10GB minimum save size
DUALSHOCK®4
Online Play (Required)
Software subject to license (us.playstation.com/softwarelicense). Online features require an account and are subject to terms of service and applicable privacy policy (playstationnetwork.com/terms-of-service & playstationnetwork.com/privacy-policy).
Fortnite © 2017, Epic Games, Inc. Epic Games, Fortnite, Unreal, Unreal Engine 4, UE4, and their respective logos are trademarks or registered trademarks of Epic Games, Inc. in the United States of America and elsewhere. All rights reserved. The rating icon is a registered trademark of the Entertainment Software Association. All other trademarks and trade names are the properties of their respective owners.
        """,
        "publisher": "Epic Games Publishing",
        "age_rating": random.choice(age_rate),
        "developer": "Epic Games",
        "tags": [
            "Singleplayer",
            "Multiplayer",
            "Split Screen",
            "Cross-Platform Multiplayer",
            "PvP",
        ],
        "website": "https://www.epicgames.com/fortnite",
    },
    {
        "title": "Diablo IV",
        "platforms": ["PC", "Xbox One", "PS5"],
        "genres": ["Action", "RPG"],
        "price": 65,
        "chart": "#12 Action",
        "video_url": "diablo_indww0",
        "imageurl": [
            "diablo_ja2bhv",
            "diablo2_dwmrus",
            "diablo3_fuoyia",
            "diablo2_rnvzbh",
            "diablo4_yi0m5f",
        ],
        "date_added": random_date(2023, 2024),
        "about": """
        Meet Your Maker

Lilith has returned to Sanctuary, summoned by a dark ritual after eons in exile. Her return ushers in an age of darkness and misery.

Sanctuary, a land once ravaged by war between the High Heavens and Burning Hells, has fallen once more into darkness. Lilith, daughter of Mephisto, Lord of Hatred, has been summoned by dark ritual after eons in exile. Now, hatred threatens to consume Sanctuary as evil spreads and a new wave of cultists and worshippers arise to embrace Lilith’s coming. Only a brave few dare to face this threat…

Forge your path through the corrupt lands of Sanctuary – a continuous, ever-growing, and fully explorable world, teeming with choices, quests, corruption, and loot. Join fellow adventurers, retake besieged towns, delve into nightmarish dungeons, and uncover lost secrets as you fight for the fate of the world. Every inch of Diablo IV is built for adventure, with multiple zones to explore freely, each ripe with non-linear quests, epic bosses, discoverable towns, and multitudes of demons to slay.

Create and customize your character to become steadfast in the face of darkness. Choose from one of five classes and forge your hero from an abundance of different cosmetics, talents, and abilities, creating a character that is uniquely your own. Grow stronger as your character progresses through powerful Skill Trees, developing even more unique end game specializations with Paragon Boards to dramatically impact your gameplay.

Defeating great evil requires great gear. Discover and experiment with a vast arsenal of powerful weapons, armor, and more to fight back against the demons threatening these lands. Embrace the many powers of your collection by exploring unique combinations to battle in immersive, action-packed combat against the deadliest of enemies with devastating results.
        """,
        "publisher": "Activision Blizzard, Blizzard Entertainment",
        "age_rating": random.choice(age_rate),
        "developer": "Activision Blizzard",
        "tags": [
            "Singleplayer",
            "Multiplayer",
            "Split Screen",
            "Cross-Platform Multiplayer",
            "PvP",
        ],
        "website": "https://diablo.blizzard.com",
    },
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
            "fifa224_kygl4z",
            "fifa225_ip1jwu",
        ],
        "date_added": random_date(2023, 2024),
        "about": "HyperMotion integrates advanced full-team mocap data and machine learning to heighten gameplay in every match in FIFA 22, harnessing the power of next generation consoles to deliver the most realistic, responsive and fluid gameplay experience we’ve ever built. FIFA 22 brings a new season of innovation across every mode in the game; enjoy more consistency between the posts with a goalkeeper rewrite that brings more composure to the most important position on the pitch, live out your football dreams as you create and manage your custom club to glory in Career Mode, get rewarded for your flair with restyled gameplay in VOLTA FOOTBALL, welcome back football’s most memorable players as FIFA Ultimate Team™ Heroes, and feel the atmosphere of your next big game with the most immersive matchday experience ever seen in EA SPORTS FIFA.",
        "publisher": "Electronic Arts",
        "age_rating": random.choice(age_rate),
        "developer": "Electronic Arts Vancouver",
        "tags": ["Singleplayer", "Multiplayer", "Split Screen", "Football", "Soccer"],
        "website": "https://www.ea.com/games/fifa",
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
            "fifa224_kygl4z",
            "fifa225_ip1jwu",
        ],
        "date_added": random_date(2023, 2024),
        "about": """
Additionally, special versions of players from the sports most iconic teams will be made available throughout the season, including partner clubs like FC Barcelona and Liverpool FC.
Be sure to log in every week and sign the latest Featured Players to truly take your squad to the next level.

■New Live Update Feature
PES 2019 will always be aligned with the real world thanks to the new Live Update feature. Info on the latest transfers and individual player performance from real-life matches will be reflected in-game on a weekly basis.
Keep up to date with the fast moving world of soccer to ensure that youre a step ahead of the competition!

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
        "website": "https://www.konami.com",
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
        "website": "https://nba.2k.com/2k20/",
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
        "website": "https://www.ea.com/games/madden-nfl/madden-nfl-22",
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
        "website": "https://www.trublu.com.au/",
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
During the games singleplayer campaign, the players take control of three soldiers from different armies: Joey Martin from the U.S. military, sergeant Evans from the British SAS, and Alexei Ivanovich Voronin from the Red Army. The games plot follows their path from boot camp to the Battle of Berlin. There are 26 missions present in the game.

Gameplay
Call of Duty features both singleplayer and multiplayer modes. During the singleplayer campaign, a briefing is held or a slide-show with commentary before every mission. In order to complete a level, the player has to complete several objectives in a chronological order. There are four difficulty levels in Call of Duty, they differ in the amount of damage the player can sustain. There is no health regeneration system present in the game. A health pack system is used instead.

The players can carry two main weapons, one pistol, and 10 grenades. The players can melee any enemy they encounter in the game.

Multiplayer
At the beginning of the match, the players choose one of four sides: the U.S. Army, the British forces, the Vermacht, and the Red Army.

There are 4 game modes present in Call of Duty: Deathmatch, Team Deathmatch, Domination and Search and Destroy.

The games maps are renditions of the real battlefields, such as Sainte-Mere-Eglise, the shores of Normandy, Berlin, and Stalingrad.
        """,
        "publisher": "Aspyr, Activision",
        "age_rating": random.choice(age_rate),
        "developer": "Infinity ward",
        "tags": ["Single player", "Atmospheric", "Historical", "Classic", "War"],
        "website": "https://www.callofduty.com/hub",
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
The game follows the series most famous protagonist: Master Chief, who is a “Spartan” - a genetically enhanced, power armor wearing super soldier. Infinite continues the story of Master Chief and his companions, the Blue Team, as they fight against the AI called Cortana that tries to take over the control of the Halos. AHalo Infinite is set on a forested Halo inhabited by rhinos and other wildlife reminiscent of prehistoric Earth.

Modes
In addition to single player story campaign, Halo Infinite supports cooperative multiplayer modes, both local and online. Theres, however, no Battle Royale mode.
        """,
        "publisher": "Microsoft Studios, Xbox Game Studios",
        "age_rating": "13+ Teen",
        "developer": "343 Industries",
        "tags": [
            "Halo Wars",
            "Single Player",
            "Multiplayer",
            "Weapons",
            "Sexual Content",
            "Epic",
        ],
        "website": "https://www.halowaypoint.com/halo-infinite",
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
            "Single Player",
            "Multiplayer",
            "Weapons",
            "Sexual Content",
            "Epic",
        ],
        "website": "https://www.counter-strike.net/",
    },
    {
        "title": "Cyberpunk: 2077",
        "platforms": ["Nintendo Switch", "Xbox One", "PS5"],
        "genres": ["Action", "Shooter", "RPG"],
        "price": 40,
        "chart": "#18 Sports",
        "video_url": "cyber_nikf1y",
        "imageurl": [
            "cyber1_l50ksi",
            "cyber2_df3hyt",
            "cyber3_i3ldo2",
            "cyber4_gt0zab",
            "cyber5_okfnep",
        ],
        "date_added": random_date(2023, 2024),
        "about": """
        Cyberpunk 2077 is a science fiction game loosely based on the role-playing game Cyberpunk 2020.

Setting
The game is set in the year 2077 in a fictional futuristic metropolis Night City in California. In the world of the game, there are developed cybernetic augmentations that enhance peoples strength, agility, and memory. The city is governed by corporations. Many jobs are taken over by the robots, leaving a lot of people poor and homeless. Night City has a roaring underworld, with black markets, underground surgeons, drug dealers, and street gangs abound.

Characters
The main protagonist is fully customizable, including his or her sex and appearance, and goes by the nickname V. He or she is an underground mercenary who does “dirty business” for the various contractors. An NPC companion named Jackie joins the protagonist early at the game, and various other companions may join the player on certain missions as the plot demands. However, the game has no parties and no companion system.

Gameplay
The player controls V from the first person view, with the third-person view used for cutscenes only. The protagonist can travel across the city on feet or using various vehicles, in a manner some observers compared to GTA series. There are many options for the character customization, including three character classes, and a variety of augmentations V can install to enhance his or her abilities.
        """,
        "publisher": "CD PROJEKT RED",
        "age_rating": "17+ Mature",
        "developer": "CD PROJEKT",
        "tags": [
            "Realistic",
            "Single Player",
            "Multiplayer",
            "Weapons",
            "Masterpiece",
            "immersive",
        ],
        "website": "https://www.cyberpunk.net/us/en/",
    },
    {
        "title": "Hitman: Absolution",
        "platforms": ["PS5", "Xbox One", "Nintendo Switch"],
        "price": 35,
        "chart": "#15 Action",
        "genres": ["Action", "Sports", "Strategy"],
        "video_url": "hitman_qs7dgc",
        "imageurl": [
            "hitman1_dsmuar",
            "hitman2_vt3v2q",
            "hitman3_gluyoj",
            "hitman4_lyvl8t",
            "hitman4_h4ck9m",
        ],
        "date_added": random_date(2022, 2023),
        "about": """
        The direct sequel to the Hitman: Blood money, Absolution tells the story of Agent 47, the true intentions of his Agency and how top Agent became a renegade on the run. Unlike previous games in the series, players will get more linear and cinematic experience. The game revolves around objective-based missions, providing various methods of completion. Players can avoid direct confrontation by disguising themselves in other peoples uniforms and use environmental interactions to distract or kill unsuspecting targets. And in case of raising the alarm, players can try to rush the mission with the direct attack, using dozens of available weapons.
Players can use special vision mechanic, called Instinct. It allows seeing through the solid surfaces in order to observe NPCs, items that can be interacted with and predict the movement of patrolling guards. Absolution provides players with additional challenges and collectibles in order to invite players to explore the maps.
        """,
        "publisher": "Square Enix, Io-interactive",
        "age_rating": "17+ Mature",
        "developer": "IO Interactive",
        "tags": [
            "Single player",
            "Stealth",
            "Difficult",
            "Crime",
            "rich story",
        ],
        "website": "https://ioi.dk/hitman-absolution",
    },
    {
        "title": "Mortal Kombat X",
        "platforms": ["Nintendo Switch", "Xbox One", "PS5"],
        "genres": ["Action", "Shooter", "Strategy"],
        "price": 60,
        "chart": "#10 Sports",
        "video_url": "mortal_nnjrms",
        "imageurl": [
            "mortal5_maz3ls",
            "mortal1_annnlw",
            "mortal2_feiinz",
            "mortal3_s2b6ug",
            "mortal4_l1tyxu",
        ],
        "date_added": random_date(2023, 2024),
        "about": """
        Mortal Kombat X is a fighting game involving 1x1 encounters. The game is the part of a massive Mortal Kombat franchise which originates in 1992 being one of the first fighting games. The MK universe includes films, literature, and TV-shows, let alone dozens of games.
The game features unique abilities throughout all of the series titles. Fatality — the final death blow was introduced in the first section and have made its way to the Mortal Kombat X. The new piece of a franchise, nevertheless, implements newer mechanics such as X-Ray — a sharp blow delivered when the respective scale is fulfilled and breaking combos, utilizing the same bar but allowing a player to defend themselves.
The storyline of a game lists is superb, and every new title brings enrichment into it. Mortal Kombat X tells a story of a self-titled tournament in the NetherRealm — a place somewhere between the land of the living and dead. The victor was supposed to become a NetherRealms curator up until the next round of a championship. The MK X features 24 fighters with expending the list up to 33 playable characters thanks to two DLCs.
        """,
        "publisher": "Warner Bros. Interactive",
        "age_rating": "17+ Mature",
        "developer": "Warner Bros. Interactive",
        "tags": ["Single player", "Mutliplayer", "Great Soundtrack", "Violent", "Gore"],
        "website": "https://www.mortalkombat.com/",
    },
    {
        "title": "Tekken 7",
        "platforms": ["Nintendo Switch", "Xbox One", "PS5"],
        "genres": ["Action", "Strategy"],
        "price": 60,
        "chart": "#10 Action",
        "video_url": "e570958616f4f38af5dc36e0ebe238e7_e2rwxp",
        "imageurl": [
            "tekken7_hci70v",
            "tekken4_usdrge",
            "tekken1_lxiil6",
            "tekken2_it2lne",
            "tekken5_qnngin",
        ],
        "date_added": random_date(2023, 2024),
        "about": """
        Tekken 7 is a fighting game developed by Bandai Namco Entertainment. It is the ninth installment in the series.

Plot
An unnamed journalist investigates the Mishima family history after his family got killed in a war that was started by Jin Kazama. In his investigation, the journalist tries to find out why did Jins grandfather kill his own wife and threw his son Kazuya down the cliff. At the same time, Jin goes into hiding after defeating an ancient demon named Azazel while his grandfather takes over Mishima Zaibatsu. The world war goes on.

Gameplay
Just like the previous games in the series (apart from Tekken Tag Tournament 1 & 2), Tekken 7s gameplay revolves around one-on-one hand-to-hand fights.

Players are free to choose one of 43 playable characters. Every character has their own personal list of attacks and combos and drastically differs in play style.

Several new additions were made to the games combat system. Players can now use devastating hits that will take from 40 to 80 percent of the enemys health if the players health drops too low. Moreover, the players are able to use a Rage Drive. It allows for performing a special hit on a high speed that inflicts major damage to the enemy. The last new addition is Power Crush. This feature lets the players attack their opponent even when theyre under attack. Players cant block their enemies low kicks while using the Power Crush.
        """,
        "publisher": "Bandai Namco Entertainment",
        "age_rating": "13+ Teen",
        "developer": "BANDAI NAMCO AMERICA",
        "tags": [
            "Single Player",
            "Multiplayer",
            "Split Screen",
            "Full Controller support",
            "third person",
        ],
        "website": "http://www.bandainamcogames.com/",
    },
    {
        "title": "Grand Theft Auto V",
        "platforms": ["Android", "Xbox One", "PS5"],
        "genres": ["Action", "Strategy"],
        "price": 60,
        "chart": "#1 Adventure",
        "video_url": "gta_bbwhew",
        "imageurl": [
            "gta1_r9ayuh",
            "gta2_ky2btx",
            "gta3_znyrd3",
            "gta4_nzvsno",
            "gta5_bki3m3",
        ],
        "date_added": random_date(2023, 2024),
        "about": """
        Rockstar Games went bigger, since their previous installment of the series. You get the complicated and realistic world-building from Liberty City of GTA4 in the setting of lively and diverse Los Santos, from an old fan favorite GTA San Andreas. 561 different vehicles (including every transport you can operate) and the amount is rising with every update.
Simultaneous storytelling from three unique perspectives:
Follow Michael, ex-criminal living his life of leisure away from the past, Franklin, a kid that seeks the better future, and Trevor, the exact past Michael is trying to run away from.
GTA Online will provide a lot of additional challenge even for the experienced players, coming fresh from the story mode. Now you will have other players around that can help you just as likely as ruin your mission. Every GTA mechanic up to date can be experienced by players through the unique customizable character, and community content paired with the leveling system tends to keep everyone busy and engaged.

Español
Rockstar Games se hizo más grande desde su entrega anterior de la serie. Obtienes la construcción del mundo complicada y realista de Liberty City de GTA4 en el escenario de Los Santos, un viejo favorito de los fans, GTA San Andreas. 561 vehículos diferentes (incluidos todos los transportes que puede operar) y la cantidad aumenta con cada actualización.
Narración simultánea desde tres perspectivas únicas:
Sigue a Michael, ex-criminal que vive su vida de ocio lejos del pasado, Franklin, un niño que busca un futuro mejor, y Trevor, el pasado exacto del que Michael está tratando de huir.
GTA Online proporcionará muchos desafíos adicionales incluso para los jugadores experimentados, recién llegados del modo historia. Ahora tendrás otros jugadores cerca que pueden ayudarte con la misma probabilidad que arruinar tu misión. Los jugadores pueden experimentar todas las mecánicas de GTA actualizadas a través del personaje personalizable único, y el contenido de la comunidad combinado con el sistema de nivelación tiende a mantener a todos ocupados y comprometidos.
        """,
        "publisher": "Rockstar Games",
        "age_rating": "17+ Mature",
        "developer": "Rockstar North, Rockstar Games",
        "tags": ["Single player", "Atmospheric", "Epic", "First-person", "Comedy"],
        "website": "http://www.rockstargames.com/V/",
    },
    {
        "title": "Bioshock: Infinite",
        "platforms": ["Nintendo Switch", "Xbox One", "PS5"],
        "genres": ["Action", "Strategy"],
        "price": 60,
        "chart": "#12 Action",
        "video_url": "08bc3708d9cd197262ba60123cfa60f3_wxgoas",
        "imageurl": [
            "bio1_f2b6jf",
            "bio2_gypvr7",
            "bio3_c5hprq",
            "bio4_bsmzqh",
            "bio5_vbkhdt",
        ],
        "date_added": random_date(2023, 2024),
        "about": """
The third game in the series, Bioshock takes the story of the underwater confinement within the lost city of Rapture and takes it in the sky-city of Columbia. Players will follow Booker DeWitt, a private eye with a military past; as he will attempt to wipe his debts with the only skill he’s good at – finding people. Aside from obvious story and style differences, this time Bioshock protagonist has a personality, character, and voice, no longer the protagonist is a silent man, trying to survive.
Open and bright level design of Columbia shows industrial colonial America in a seemingly endless carnival. But Bioshock is not famous for its visuals, but for its story. Mystery and creative vision of Irrational Games invite players to uncover the secrets of Columbia’s leader - Zachary Comstock and save Elizabeth, the girl, that’s been locked up in the flying city since her birth.
Unique weapons and mechanics of Vigor will make encounters different, helping players to adjust to the new found mobility and hook shot, making fights fast-paced and imaginative.
        """,
        "publisher": "2K Games, Aspyr",
        "age_rating": "17+ Mature",
        "developer": "Aspyr Media",
        "tags": ["Single player", "Atmospheric", "Epic", "First-person", "Comedy"],
        "website": "https://2k.com/en-US/game/bioshock-infinite",
    },
    {
        "title": "Tomb Raider: Legend",
        "platforms": ["Xbox One", "PS5", "PC"],
        "genres": ["Action", "Strategy", "Adventure"],
        "price": 60,
        "chart": "#12 Adventure",
        "video_url": "tomb_x6dct8",
        "imageurl": [
            "tomb1_l1e6ao",
            "tomb2_mp9ocb",
            "tomb3_uf69d3",
            "tomb4_b8m4fx",
            "tomb5_tvptjh",
        ],
        "date_added": random_date(2023, 2024),
        "about": """
The gaming worlds sexiest and most intrepid adventurer makes her triumphant return in Lara Croft Tomb Raider: Legend!
Follow Lara down a path of discovery as she travels the globe to remote, exotic locales in search of one of historys greatest artifacts that unleash unwelcome figures from Laras mysterious past. With guns blazing, Lara must use her athletic ability and intellectual wits to explore vast, treacherous tombs, riddled with challenging puzzles and deadly traps. Experience the beginning of the new Legend in the most adrenaline-fueled Tomb Raider adventure ever!
Lara Croft evolved! - the sexy, dual-pistol wielding heroine is presented like never before with new graphic and animation sets, presenting Lara in the finest fidelity to date
Return to the tombs! - discover and explore living breathing, lost ancient realms that hold clues to the secrets of Laras past. Physics, Water and Fire systems bring the perilous environments of Laras world alive, and challenge the player to improvise solutions to obstacles
The Intuitive and Fluid Control System movement allows you to keep Lara in continuous motion; seamlessly handle any obstacle and interact dynamically with any surface
Experience the new legend of the Tomb Raider series! - the future of the adrenaline-fueled adventure meets the promise of the next generation gaming systems.
Utilize strength and intelligence on your quest! - use the grappling hook, an arsenal of new weapons, communications devices, and other tools to achieve your goals.
Travel the globe to the worlds most exotic locales! - explore ancient tombs, treacherous jungles, snowy mountain ranges, and much more.
        """,
        "publisher": "Square Enix, Eidos Interactive",
        "age_rating": "13+ Teen",
        "developer": "Crystal Dynamics, Eidos Interactive",
        "tags": [
            "Single player",
            "Third person",
            "Epic",
            "First-person",
            "Partial controller support",
        ],
        "website": "http://www.tombraider.com/legend/",
    },
    {
        "title": "Mad Max",
        "platforms": ["Xbox One", "PS5", "PC"],
        "genres": ["Action", "Strategy", "Adventure"],
        "price": 60,
        "chart": "#17 Adventure",
        "video_url": "madmax_y1hwgv",
        "imageurl": [
            "mad1_th803s",
            "mad2_duzqlb",
            "mad4_kmpzd9",
            "mad3_h9dfqe",
            "mad6_vwvbnf",
        ],
        "date_added": random_date(2023, 2024),
        "about": """
Although Mad Max is not related to the film series, it is based on its universe. Max Rockatansky is trying to reach the "Plains Of Silence", place in which he believes he will finally find peace. He is confronted by a group of War Boys led by Scabrous Scrotus. Beating Max up and stealing everything from him, they leave him in the desert to face his death. Recovering from his injuries, he chases Scrotus in a duel but fails to defeat him. Wandering in the desert, he meets a technic named Chumbucket that helps him to build a new machine and revenge Scrotus.

Being in such esthetics, Max is able to travel in an open world post-apocalyptic universe of Mad Max. Utilizing driving as a primary mechanic, you are able to confront and battle your way out on the car while armed with different weapons. Flamethrowers, turbo-boosts, basically anything that may come handy. You can have your preference for playing stealthy or aggressive. To drive, you need gasoline and to customise your car you need experience which you will get over time. Experience all the consequences of being a survivor by driving through the wasteland.
        """,
        "publisher": "Feral Interactive, Warner Bros.",
        "age_rating": "17+ Mature",
        "developer": "Avalanche Studios",
        "tags": [
            "Single player",
            "Third person",
            "Epic",
            "First-person",
            "Post-apocalyptic",
        ],
        "website": "https://store.steampowered.com/app/234140/Mad_Max/",
    },
    {
        "title": "Starwars: Starfighter",
        "platforms": ["Xbox One", "PS5", "PC"],
        "genres": ["Action", "Strategy", "Adventure"],
        "price": 60,
        "chart": "#17 Adventure",
        "video_url": "star_rp9z5m",
        "imageurl": [
            "star1_fcnipp",
            "star2_yuyhi0",
            "star3_s3qyvv",
            "star5_geyc5i",
            "star4_cyt7ls",
        ],
        "date_added": random_date(2023, 2024),
        "about": """
This is a flight simulator in the most famous sci-fi universe created by George Lucas. The game was released on the original Xbox, PlayStation 2 and PC. The plot of the game unfolds before the Battle of Naboo, and the events of Star Wars: Episode I The Phantom Menace.

The plot tells of the heroic deed of three heroes during the Invasion of Naboo: pilot Rhys Dallows, Vana Sage, and Feeorin pirate Nym. Three storylines, which at first seem unrelated, along with the course of the development of the plot, combine into one story.

Gameplay-wise Starfighter is an arcade spaceflight simulator. The player has to go through more than 14 story missions, which include raids on enemies position, escort cargo, and massive space battles. Critics also note the high quality of graphics for consoles of the sixth generation, and art-direction in general that only increases the movies effect, telling a related story. In the game, the only singleplayer mode is available to play, for multiplayer battles it is required to get a special edition of the game.
        """,
        "publisher": "Disney Interactive, LucasArts",
        "age_rating": "13+ Mature",
        "developer": "Sony Interactive Entertainment, LucasArts Entertainment",
        "tags": ["Single player", "Sci-fi", "Flight", "Space", "Post-apocalyptic"],
        "website": "http://www.lucasarts.com",
    },
    {
        "title": "Dishonored",
        "platforms": ["Xbox One", "PS5", "PC"],
        "genres": ["Action", "Strategy", "Adventure"],
        "price": 60,
        "chart": "#9 Adventure",
        "video_url": "dishonored_hyh2wc",
        "imageurl": [
            "dis1_g4ghep",
            "dis2_xxrrbs",
            "dis3_jn66al",
            "dis4_riuydy",
            "dis5_ldgonx",
        ],
        "date_added": random_date(2023, 2024),
        "about": """
Dishonored is the game about stealth. Or action and killing people. It is you who will decide what to do with your enemies. You play as Corvo Attano, Empress bodyguard, a masterful assassin and a combat specialist. All of a sudden, a group of assassins kill the Empress and kidnaps her daughter Emily. Being accused of murder and waiting for execution in a cell, Corvo still manages to escape with the help of the Loyalists and their leader Admiral Havelock. Now it is your duty to return the Empress daughter and restore your name. The main focus of the game is to give the player a choice. You can spare the lives of your enemies by knocking them out or making others do the job for you or brutally murder everyone in the city. Gadgets are given by Piero Joplin, Loyalists engineer and by the Outsider, who gives Corvo magical abilities. The game reacts to your choices - grim atmosphere by itself can be turned even darker by killing people or slightly lighter by not doing so. It is only a players choice what to do with his abilities. Basing on these actions the game will give you with two different endings of the story.
        """,
        "publisher": "Bethseda Softworks",
        "age_rating": "17+ Mature",
        "developer": "Bethseda softworks, Arkane Studios",
        "tags": ["Single player", "Sci-fi", "Flight", "Space", "Post-apocalyptic"],
        "website": "http://www.dishonored.com",
    },
    {
        "title": "Life is Strange",
        "platforms": ["iOS", "PS5", "PC"],
        "genres": ["Strategy", "Adventure"],
        "price": 60,
        "chart": "#49 Adventure",
        "video_url": "life_ag15dx",
        "imageurl": [
            "life_bmpwh6",
            "life2_ilon1j",
            "life3_pxfikd",
            "life4_my0kea",
            "life5_nnwy6",
        ],
        "date_added": random_date(2023, 2024),
        "about": """
Interactive storytelling and plot-heavy games gained popularity, and “Life is Strange” arrived as teen mystery adventure. The plot will go through the life of Maxine, a teenager in possession of curious power, allowing her to stop and rewind time, in order to manipulate her surroundings. Max, after the reunion with her friend Chloe, is on the path to uncovering the secrets of Arcadia Bay. Players will have to deal with puzzle solving through the fetch quests, in order to change the world around them.
The game puts players in situations, where they’re forced to make a moral choice, going through the decision which may have short-term or long-term consequences. Every choice made by the player will trigger the butterfly effect, surrounding the first playthrough of the game with a lot of emotional struggle, thoughtfully crafted by the developers at Dontnod Entertainment. Life is Strange is third person adventure game, where players might seem just as an observer of the stories, unfolding in front of them.
        """,
        "publisher": "Square Enix, Feral Interactive",
        "age_rating": "17+ Mature",
        "developer": "DONTNOD Entertainment",
        "tags": ["Single player", "Great Soundtrack", "Story", "Dark", "Memes"],
        "website": "https://www.lifeisstrange.com/en-us/games/life-is-strange",
    },
    {
        "title": "Portal",
        "platforms": ["Nintendo Switch", "iOS", "PC", "Android"],
        "genres": ["Puzzle", "Strategy", "Adventure"],
        "price": 60,
        "chart": "#29 Adventure",
        "video_url": "portal_vq4epj",
        "imageurl": [
            "port_ddfoay",
            "port2_oal2mr",
            "port3_xpyfie",
            "port4_zitl41",
            "port5_hahaez",
        ],
        "date_added": random_date(2023, 2024),
        "about": """
Every single time you click your mouse while holding a gun, you expect bullets to fly and enemies to fall. But here you will try out the FPS game filled with environmental puzzles and engaging story.
Silent template for your adventures, Chell, wakes up in a testing facility. She’s a subject of experiments on instant travel device, supervised by snarky and hostile GLaDOS.
Players will have to complete the tests, room by room, expecting either reward, freedom or more tests. By using the gun, that shoots portals (Portal-Gun™), players will move blocks, travel great distance quickly and learn about your current situation, which is unraveled through environmental storytelling. What you will be told might be different from what you will see.
White environments will guide the player’s portal placement, forcing them to pay attention to the surroundings. Portal creates tension, allowing either solving puzzles at your own leisure or moving quickly, due to the time limit or threats.
        """,
        "publisher": "Valve, Buka Entertainment",
        "age_rating": "17+ Mature",
        "developer": "Valve Software",
        "tags": ["Single player", "Great Soundtrack", "Story", "Rich Story", "Memes"],
        "website": "http://www.whatistheorangebox.com/",
    },
    {
        "title": "Half-Life 2",
        "platforms": ["Nintendo Switch", "iOS", "PC", "Android"],
        "genres": ["Strategy", "Puzzle", "Adventure"],
        "price": 60,
        "chart": "#9 Adventure",
        "video_url": "half_gjncop",
        "imageurl": [
            "half1_hs0bqf",
            "half2_g9yecp",
            "half3_gw6nge",
            "half4_hl3fxo",
            "half5_hblv0d",
        ],
        "date_added": random_date(2023, 2024),
        "about": """
Gordon Freeman became the most popular nameless and voiceless protagonist in gaming history. He is painted as the most famous scientist and a hero within the world of Half-Life, and for a good reason. In the first game he saved the planet from alien invasion, this time, when the invasion is already begun, the world needs his help one more time. And you, as a player, will help this world to survive. This time Gordon arrives in City 17, ravaged and occupied by Combines, where he meets his old Black Mesa friends.
What is different, aside from the overall design quality, is the use of Valve’s Source engine that not only expands on the fluidity of character model animations and movement but allows players to interact with a myriad of objects with the advanced and realistic (to an extent) physics. Classic Headcrab Zombies are revamped and have new variants that provide players with different threats. For a story-driven FPS, Half-Life 2 is unique in its plot delivery, and making in-game mechanics feel natural, be it platforming or driving.
        """,
        "publisher": "Valve",
        "age_rating": "17+ Mature",
        "developer": "Valve Software, NVIDIA Lighspeed Studios",
        "tags": ["Single player", "Aliens", "Story", "Rich Story", "Physics"],
        "website": "http://www.half-life2.com",
    },
    {
        "title": "Papers Please",
        "platforms": ["Nintendo Switch", "iOS", "Android"],
        "genres": ["Strategy", "Puzzle", "Adventure"],
        "price": 60,
        "chart": "#3 Puzzle",
        "video_url": "papers_z5razx",
        "imageurl": [
            "papers1_jityvg",
            "papers2_sibzze",
            "papers3_wjtted",
            "papers4_sgkofi",
            "papers5_q6kkjz",
        ],
        "date_added": random_date(2023, 2024),
        "about": """
The creator of the game often travelled through Asia and made the observation that the work of an immigration officer checking documents for entry is simultaneously very monotonous and very responsible. The game reproduces this work - but scammers and unusual situations occur in it much more often than in reality. The task of the player-officer is not to make a mistake, not to let an unwanted guest into the country. He has power, directories, translucent devices, etc., but experienced masters of deception and fraud act against him. The task of the player is complicated by the fact that his country is like all the paranoid dictatorships at the same time. This country fears a lot, seeks to control everything and periodically generates various rules. The game has a lot of humour, a lot of exciting puzzles and unexpected twists, including shooting. The visual and musical design of the game reflects the bizarre world of stupid rules, constant fear and mutual distrust.
        """,
        "publisher": "3909",
        "age_rating": "17+ Mature",
        "developer": "Dukope1, 3909, Lucas Pope",
        "tags": ["Single player", "Atmospheric", "Story", "Rich Story", "Retro"],
        "website": "http://papersplea.se",
    },
    {
        "title": "Orwell: Keeping an Eye On You",
        "platforms": ["Nintendo Switch", "iOS", "Android"],
        "genres": ["Strategy", "Puzzle", "Adventure"],
        "price": 60,
        "chart": "#13 Puzzle",
        "video_url": "keep_xj7jjc",
        "imageurl": [
            "keep1_ufxhkz",
            "keep2_tuqe3w",
            "keep3_ol3z7x",
            "keep5_bxhqrc",
            "keep4_epmrqw",
        ],
        "date_added": random_date(2023, 2024),
        "about": """
Orwell is a new governmental security program that has the power to survey the online presence of every person in The Nation. It can monitor all personal communications and access any computer. To preserve the privacy of citizens, human researchers examine the data Orwell finds and decide which pieces of information should be passed on to the security forces, and which should be rejected.
Selected from thousands of candidates, you are Orwell’s first human researcher. And when a terror attack rocks the Nation’s capital city of Bonton, Orwell, and you, are immediately put to the test. Starting with a single person of interest, youll help the security forces build out and profile a network of potential culprits.
But are these people really terrorists? What does the information you reveal to Orwell say about them? What if you find out things about them that not even their loved ones know? What is the real price of maintaining the security that the Nation is yearning for?Key Features
Investigate the digital lives of citizens.
Search web pages, scour through social media posts, dating site profiles, news articles and blogs to find those responsible for a series of terror attacks.
Invade the private lives of suspects.
Listen in on chat communications, read personal emails, hack PCs, pull medical files, make connections. Find the information you need to know.
Determine the relevance of information.
Only the information you provide will be seen by the security forces and acted upon. You decide what gets seen and what does not, influencing how the suspects will be perceived.
Secure the freedom of the Nation.
Find the terrorists so the citizens of the Nation can sleep safe, knowing Orwell is watching over them.
MATURE CONTENT WARNING
Please note, Orwell includes mature language at multiple points throughout the game as well as mature themes and is not suitable for younger players.
        """,
        "publisher": "Fellow Traveller, Surprise Attack",
        "age_rating": "17+ Mature",
        "developer": "Fellow Traveller, Osmotic Studios",
        "tags": ["Single player", "Steam Cloud", "Detective", "Hacking", "Politics"],
        "website": "http://orwellgame.com/",
    },
    {
        "title": "Lara Croft and the Temple of Osiris",
        "platforms": ["Nintendo Switch", "iOS", "Android"],
        "genres": ["Strategy", "Puzzle", "Adventure"],
        "price": 60,
        "chart": "#15 Puzzle",
        "video_url": "lara_htx1xk",
        "imageurl": [
            "lara2_znmcuw",
            "lara1_qbtt7d",
            "lara3_nulayh",
            "lara4_pqxb1l",
            "lara5_pa3jzt",
        ],
        "date_added": random_date(2023, 2024),
        "about": """
The sequel to Lara Croft and the Guardian of Light, and a spin-off to the larger Tomb Raider franchise. This time, our famous adventurer Lara Croft and her rival tomb raider Carter Bell travel to Egypt to search for the ancient temple, where a magical artifact, Stuff of Osiris, is hidden. The game is set in the temple and its dungeons, designed in Ancient Egyptian aesthetics. Besides shooting monsters, Lara and her partners have to avoid all kind of traps that will immediately remind you of Indiana Jones films. Completing specific missions will grant the player rings and amulets that enhance characters skills and abilities.

Just like the previous game, The Guardian of Light uses the isometric view. The game allows for a cooperative mode for up to four players. All puzzles are automatically adjusted to the number of players. You can play not only as Lara but also as her friendly rival Carter Bell and two Egyptian gods, Isis and Horus, who were imprisoned in the temple for millenniums by the evil god Set. Their goal is to gather together and revive Osiris, the god who was dismembered by Set, and who can save the Earth from Sets evil. While human characters use firearms and grappling hooks, the gods are armed with the magic Stuff of Osiris.
        """,
        "publisher": "Square Enix",
        "age_rating": "17+ Mature",
        "developer": "Square Enix, Crystal Dynamics",
        "tags": ["Single player", "Top-Down", "LeaderBoards", "Co-op", "Steam"],
        "website": "http://www.laracroft.com",
    },
    {
        "title": "Grid (2019)",
        "platforms": ["PS5", "iOS", "Android", "PC", "Xbox One"],
        "genres": ["Strategy", "Racing", "Adventure"],
        "price": 60,
        "chart": "#15 Racing",
        "video_url": "grid_r6z9r2",
        "imageurl": [
            "grid1_xu2kki",
            "grid2_r7rdvc",
            "grid3_orpc8w",
            "grid5_sbpqhq",
            "grid4_ile0wt",
        ],
        "date_added": random_date(2018, 2019),
        "about": """
Take your place in the GRID World Series and fight in thrilling wheel-to-wheel battles with the most iconic and desirable race cars – current and classic, from GT through Touring and Muscle to Stock and Super Modifieds – and in some of the world’s most iconic locations. GRID captures every moment of the race, from the adrenaline rush of lights-out to the elation at the chequered flag – and in-between, it’s all action too.

Incidents come one right after the other – tight overtakes, bumper-to bumper scrapes and competitive collisions – all heightened by rivalries, team-mates and a nemesis driver who will all either try to help or hinder your progress.
        """,
        "publisher": "Codemasters",
        "age_rating": "0+ Everyone",
        "developer": "Codemasters",
        "tags": [
            "Single player",
            "Multiplayer",
            "Online-multiplayer",
            "Driving",
            "Cars",
        ],
        "website": "http://www.gridgame.com",
    },
    {
        "title": "Rocket League",
        "platforms": ["iOS", "Android", "PC"],
        "genres": ["Racing", "Adventure"],
        "price": 60,
        "chart": "#25 Racing",
        "video_url": "rocket_f1vgos",
        "imageurl": [
            "rocket1_j2lm57",
            "rocket2_tnfjby",
            "rocket3_b3yes9",
            "rocket4_ysrfpn",
            "rocket5_jpinep",
        ],
        "date_added": random_date(2018, 2019),
        "about": """
Highly competitive soccer game with rocket-cars is the most comprehensive way to describe this game. Technically a sequel to Psyonix’ previous game - Supersonic Acrobatic Rocket-Powered Battle-Cars; Rocket League successfully became a standalone sensation, that can be enjoyed by anyone. Easy to learn, hard to master game mechanics are perfect for the tight controls. Players are invited to maneuver the different fields within several game modes, from arcade to ranked game either 1v1, or in 2v2 and 3v3 teams. Using boosters will not only speed up the car but will allow the car to propel itself into the air.
Rocket League provides several levels of customization, where not only the color of your car can be adjusted, but the colors and form of the booster flame, different hats, and little flags. Or players can pick a completely different car. Collaboration with different franchises brought not only original transport but some famous cars, including Batmobile or Delorian from Back to the Future.
        """,
        "publisher": "Psyonix",
        "age_rating": "0+ Everyone",
        "developer": "Psyonix",
        "tags": [
            "Single player",
            "Multiplayer",
            "Online-multiplayer",
            "Driving",
            "Cars",
        ],
        "website": "http://www.rocketleaguegame.com",
    },
    {
        "title": "Forza: Street",
        "platforms": ["PS5", "Xbox One", "Android", "PC"],
        "genres": ["Racing", "Adventure"],
        "price": 60,
        "chart": "#28 Racing",
        "video_url": "forza_pbjt0m",
        "imageurl": [
            "forza1_d5xagg",
            "forza2_abxblp",
            "forza3_xiullh",
            "forza5_g35svu",
            "forza4_wmskr2",
        ],
        "date_added": random_date(2018, 2019),
        "about": """
Enter the ultimate street racing scene to win the car collection of your dreams. Pick an event, set your lineup, and race for infamy.
COLLECT AND UPGRADE ICONIC CARS
Race to collect legendary cars – from classic muscle to modern sports and retro supercars – turning your garage into a trophy case.
TRUE CINEMATIC RACING
Streamlined controls focus on timing for gas, brake, and boost as action-cams chase the adrenaline up close.
RACE ON YOUR TERMS
Race anytime, anywhere. Squeeze in a quick one-minute race or get immersed in an endless story with multiple paths to victory.
        """,
        "publisher": "Microsoft Studios",
        "age_rating": "10+ Everyone 10+",
        "developer": "Microsoft",
        "tags": [
            "Single player",
            "Multiplayer",
            "Online-multiplayer",
            "Driving",
            "Cars",
        ],
        "website": "https://www.forzamotorsport.net/en-us/forza_street",
    },
    {
        "title": "F1 24",
        "platforms": ["PS5", "Xbox One", "Android", "PC"],
        "genres": ["Racing", "Adventure"],
        "price": 60,
        "chart": "#2 Racing",
        "video_url": "f1_tupife",
        "imageurl": ["f11_bekrzn", "f2_khd3j4", "f3_heoaih", "f4_z7kvpe", "f5_pecol6"],
        "date_added": random_date(2018, 2019),
        "about": """
Be One of the 20 with EA SPORTS™ F1® 24, the official video game of the 2024 FIA Formula One World Championship™. Unleash your champion in pursuit of a legacy-defining F1® Career, the mode’s first major update since 2016. Drive like the greatest and feel at one with the car through the all-new EA SPORTS Dynamic Handling System. Ignite your passion by connecting to your favorite teams and drivers while proving that you have what it takes across new modes and experiences.

KEY FEATURES
Unleash Your Champion — Discover the newly innovated Driver Career mode with new gameplay rooted in the sport, or team up with a friend in 2-player career.

EA SPORTS Dynamic Handling — Get to grips with more authentic handling. The latest physics gives you more control over how your personal driving style impacts your car’s performance and race strategy.

Challenge Career is a new, interactive feature in the F1® season that offers episodic competitive play with unique events and challenges, allows community members to compete for high scores, and invites them to influence future content by voting on social media.

Ignite your passion with Fanzones. These allow you to support your favorite team and driver, collaborate with other fans to achieve goals, raise your profile in the standings, and unlock unique rewards and items.


This game includes optional in-game purchases of virtual currency that can be used to acquire virtual in-game items.
        """,
        "publisher": "Electronic Arts",
        "age_rating": "0+ Everyone",
        "developer": "Codemasters",
        "tags": [
            "Single player",
            "Multiplayer",
            "Online-multiplayer",
            "Driving",
            "Cars",
        ],
        "website": "https://www.ea.com/games/f1/f1-24/",
    },
    {
        "title": "Need for Speed: Payback",
        "platforms": ["iOS", "Xbox One", "Android", "PC"],
        "genres": ["Racing", "Adventure"],
        "price": 60,
        "chart": "#1 Racing",
        "video_url": "nfs_y7ghjz",
        "imageurl": [
            "nfs1_jdsx3y",
            "nfs2_dtuvrf",
            "nfs3_kfvfv9",
            "nfs4_yxqwks",
            "nfs5_w1vy0w",
        ],
        "date_added": random_date(2018, 2019),
        "about": """
Need for Speed Payback is an action-driving racing game and the twenty-third part of the NFS franchise.

Gameplay
Despite the trend made by NFS before Payback features an offline mode. The game is set in a fictional city named Fortune Valley. The player can choose between the three individuals to represent. The title features a real car — a total of 74 ones, and crafting system — many car parts can be tuned according to the player's liking.
There is a total of five challenges types: Race, Drift, Off-Road, Drag, and Runner. All the modes share the goal — to reach the finish. However, the initial purpose is altered depending on the race — sometimes one has to drift his way to the finish line, somewhere the manual transmission turns one, and the gear switching comes to be mandatory.

Plot
Payback is one of few NFS' to feature ongoing narrative — the story of this one emphasizes the revenge theme. Three characters — Tyler, Mac, and Jess — are trying to avenge Lina who betrayed the crew from the very start. Each member of the gang has its unique abilities — Jess, for instance, is professional intel gatherer, so she plays a role of inside agent all the time. Guys, on the other hand, are more into races, so they do the dirty job in the trio.
        """,
        "publisher": "Electronic Arts",
        "age_rating": "0+ Everyone",
        "developer": "Ghost Games",
        "tags": [
            "Single player",
            "Multiplayer",
            "Online-multiplayer",
            "Driving",
            "Cars",
        ],
        "website": "https://www.ea.com/games/need-for-speed/need-for-speed-payback",
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
            website=game_data["website"],
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
