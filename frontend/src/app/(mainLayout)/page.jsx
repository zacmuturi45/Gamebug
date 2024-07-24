"use client"

import "../css/index.css"
import { arrowdown, cry } from "../../../public/images";
import { tick } from "../../../public/images";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Card from "../components/cloudinaryCard";
import { cardArray } from "../../../public/images";
import { useQuery } from "@apollo/client";
import { CARD_DATA } from "../GraphQL/queries";
import { AnimatePresence, motion } from "framer-motion";
import { useFilter } from "../contexts/sidenavContext";
import { tickVariant } from "../../../public/images";
import Loader from "../components/loader";


export default function Home() {

    const [sortBy, setSortBy] = useState("Relevance");
    const [platforms, setPlatforms] = useState("Platforms");
    const [addCards, setAddCards] = useState(24);
    const [cardData, setCardData] = useState([]);
    const [arr, setArr] = useState([]);
    const [filteredCards, setFilteredCards] = useState([]);
    const [header, setHeader] = useState("Highest rated games");
    const [subHeader, setSubHeader] = useState("Based on player reviews and most played");
    const [sortVisible, setSortVisible] = useState(false);
    const [platformVisible, setPlatformVisible] = useState(false);
    const [showTick, setShowTick] = useState({
        ticks: false,
        showticks0: false,
        showticks1: false,
        showticks2: false,
        showticks3: false,
        showticks4: false,
        showticks5: false,
    });

    const [showPlatformTick, setShowPlatformTick] = useState({
        showPlatformTick0: false,
        showPlatformTick1: false,
        showPlatformTick2: false,
        showPlatformTick3: false,
        showPlatformTick4: false,
        showPlatformTick5: false,
    });

    const [previousIndex, setPreviousIndex] = useState(null);
    const [previousPlatformTick, setPreviousPlatformTick] = useState(null);

    const popup1Ref = useRef(null);
    const popup2Ref = useRef(null);

    const spanOne = ["Relevance", "Date added", "Name", "Release date", "Popularity", "Average rating"]
    const spanTwo = ["PC", "PlayStation 5", "Xbox One", "iOS", "Android", "Nintendo Switch"]
    const now = new Date();
    const filterConditions = {
        "Last 30 days": (card) => {
            const dateAdded = new Date(card.node.dateAdded);
            const daysDifference = (now - dateAdded) / (1000 * 60 * 60 * 24);
            return daysDifference <= 30;
        },
        "Nintendo Switch": (card) => card.node.platforms.includes("Nintendo Switch"),
        "PC": (card) => card.node.platforms.includes("PC"),
        "PlayStation 5": (card) => card.node.platforms.includes("PS5"),
        "Xbox One": (card) => card.node.platforms.includes("Xbox One"),
        "iOS": (card) => card.node.platforms.includes("iOS"),
        "Android": (card) => card.node.platforms.includes("Android"),
        "Action": (card) => card.node.genres.includes("Action"),
        "Guns": (card) => card.node.genres.includes("Guns"),
        "Shooter": (card) => card.node.genres.includes("Shooter"),
        "RPG": (card) => card.node.genres.includes("RPG"),
        "Racing": (card) => card.node.genres.includes("Racing"),
        "Adventure": (card) => card.node.genres.includes("Adventure"),
        "Sports": (card) => card.node.genres.includes("Sports"),
        "Strategy": (card) => card.node.genres.includes("Strategy"),
        "Puzzle": (card) => card.node.genres.includes("Puzzle"),
        "Home": (card) => card.node.title,
    };


    const { filter, setFilter } = useFilter();

    const { loading: card_data_loading, error: card_data_errors, data: card_data_data } = useQuery(CARD_DATA);

    useEffect(() => {
        if (card_data_data) {
            setCardData(card_data_data.allGames.edges)
            setFilteredCards(card_data_data.allGames.edges)
        }
    }, [card_data_data])

    useEffect(() => {
        setSortBy("Relevance")
        setPlatforms("Platforms")

        const currentIndexKey = "showticks0";
        const previousIndexKey = previousIndex !== null ? `showticks${previousIndex}` : null;
        const currentPlatIndexKey = "showPlatformTick0";
        const previousPlatformTickKey = previousPlatformTick !== null ? `showPlatformTick${previousPlatformTick}` : null;

        setShowTick(prevState => ({
            ...prevState,
            [currentIndexKey]: true,
            ...(previousIndexKey && { [previousIndexKey]: false }),
        }));

        setShowPlatformTick(prevState => ({
            ...prevState,
            [currentPlatIndexKey]: true,
            ...(previousPlatformTickKey && { [previousPlatformTickKey]: false }),
        }));

        setPreviousPlatformTick(0);
        setPreviousIndex(0);

    }, [filter])


    useEffect(() => {
        if (cardData) {
            applyFilter(filter);
        }
    }, [filter, cardData]);

    const applyFilter = (filter) => {
        let filtered = cardData;
        const cd = filteredCards


        if (filterConditions[filter]) {
            if (filter === "Last 30 days" || filter === "This week" || filter === "Next week") {
                setHeader(filter)
                setSubHeader("")
            } else if (filter === "Home") {
                setHeader("Highest rated games")
                setSubHeader("Based on player reviews and most played")
            } else {
                setHeader(`${filter} Games`)
                setSubHeader("");
            }
            filtered = cd.filter(filterConditions[filter]);
        } else {
            if (filter === "This week") {
                setHeader("This week")
                setSubHeader("")
                filtered = ["This week"]
            } else if (filter === "Next week") {
                setHeader("Next week")
                setSubHeader("");
                filtered = ["Next week"]
            }
        }

        setCardData(filtered)
    }

    const applySort = (sortBy) => {
        const sortedData = [...cardData];

        if (sortBy === "Date added") {
            sortedData.sort((a, b) => new Date(b.node.dateAdded) - new Date(a.node.dateAdded));
        } else if (sortBy === "Name") {
            sortedData.sort((a, b) => a.node.title.localeCompare(b.node.title));
        } else if (sortBy === "Popularity") {
            sortedData.sort((a, b) => b.node.reviews.edges.length - a.node.reviews.edges.length);
        } else if (sortBy === "Average rating") {
            sortedData.sort((a, b) => (b.node.gameAverageRating || 0) - (a.node.gameAverageRating || 0))
        } else if (sortBy === "Release date") {
            sortedData.sort((a, b) => new Date(a.node.dateAdded) - new Date(b.node.dateAdded));
        }

        setCardData(sortedData);
    }

    const applyPlatformSort = (sortPlatform) => {
        const sortedData = [...cardData];
        let sortedPlatforms = [];

        if (filterConditions[sortPlatform]) {
            sortedPlatforms = sortedData.filter(filterConditions[sortPlatform])
        }

        setCardData(sortedPlatforms);
    }



    const handleSort = () => {
        setSortVisible(true)
    }

    const handlePlatform = () => {
        if (header !== "PC Games" && header !== "PlayStation 5 Games" && header !== "Android Games" && header !== "Xbox One Games" && header !== "iOS Games" && header !== "Nintendo Switch Games") {
            setPlatformVisible(true)
        }

    }

    const handleClickOutside = () => {
        if (popup1Ref.current) {
            setSortVisible(false);
        }
        if (popup2Ref.current) {
            setPlatformVisible(false);
        }
    };

    const handleShowTick = (index) => {
        const currentIndexKey = `showticks${index}`;
        const previousIndexKey = previousIndex !== null ? `showticks${previousIndex}` : null;

        setShowTick(prevState => ({
            ...prevState,
            [currentIndexKey]: true,
            ...(previousIndexKey && { [previousIndexKey]: false }),
        }));

        setPreviousIndex(index);
    }

    const handlePlatformTick = (index) => {
        const currentIndexKey = `showPlatformTick${index}`;
        const previousPlatformTickKey = previousPlatformTick !== null ? `showPlatformTick${previousPlatformTick}` : null;

        setShowPlatformTick(prevState => ({
            ...prevState,
            [currentIndexKey]: true,
            ...(previousPlatformTickKey && { [previousPlatformTickKey]: false }),
        }));

        setPreviousPlatformTick(index);
    }

    useEffect(() => {
        if (sortVisible || platformVisible) {
            document.addEventListener('click', handleClickOutside, false);
        } else {
            document.removeEventListener('click', handleClickOutside, false);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside, false);
        };
    }, [sortVisible, platformVisible]);

    if(card_data_loading) return <div style={{marginTop: "20%"}}><Loader /></div>


    return (
        <main className="col-10-lg cols-12-sm main-pagejsx">
            <div className="main-pagejsx-h1">
                <h1>{header}</h1>
                <p className="mt-2">{subHeader}</p>
            </div>

            {/* OPTIONS BOX */}

            <div className="options-box mt-2">
                <div className="options-box-child" onClick={() => handleSort()}>
                    <AnimatePresence>
                        {sortVisible &&
                            (
                                <motion.div
                                    variants={tickVariant}
                                    initial={"initial"}
                                    animate={"enter"}
                                    exit={"exit"}
                                    className="options-box-absolute" ref={popup1Ref}>
                                    {spanOne.map((item, index) => {
                                        return <div className="spanOne" key={index} onClick={() => {
                                            setSortBy(item)
                                            setFilter("")
                                            handleShowTick(index)
                                            applySort(item)
                                        }}>
                                            {item}
                                            {
                                                showTick[`showticks${index}`] && <Image src={tick} width={12} height={12} alt="tick-svg" />
                                            }
                                        </div>
                                    })}
                                </motion.div>
                            )
                        }
                    </AnimatePresence>
                    <div className="options-box-pdiv">
                        Order by: <strong style={{ marginLeft: ".1rem" }}>{sortBy}</strong>
                    </div>
                    <Image src={arrowdown} width={15} height={15} alt="svg-image" style={{ cursor: "pointer" }} />
                </div>

                <div className="options-box-child1" onClick={() => handlePlatform()}>
                    <AnimatePresence>
                        {platformVisible && (<motion.div
                            variants={tickVariant}
                            initial={"initial"}
                            animate={"enter"}
                            exit={"exit"}
                            className="options-box-absolute1" ref={popup2Ref}>
                            {spanTwo.map((item, index) => {
                                return <div className="spanTwo" key={index} onClick={() => {
                                    setPlatforms(item)
                                    setFilter("")
                                    handlePlatformTick(index)
                                    applyPlatformSort(item)
                                }}>
                                    {item}
                                    {
                                        showPlatformTick[`showPlatformTick${index}`] && <Image src={tick} width={12} height={12} alt="tick-svg" />
                                    }

                                </div>
                            })}
                        </motion.div>)}
                    </AnimatePresence>
                    <div className="options-box-pdiv1">
                        <strong>{platforms}</strong>
                    </div>
                    <Image src={arrowdown} width={15} height={15} alt="svg-image" style={{ cursor: "pointer" }} />
                </div>
            </div>

            {/* END OF OPTIONS BOX */}

            <div className="row cards">
                {cardData && (
                    cardData[0] === "This week" || cardData[0] === "Next week" ? <div id="no-games"><Image src={cry} width={120} height={120} alt="cry-emoji" /><p>No games for {cardData[0]}</p></div> :
                        cardData.map((item, index) => (
                            <Card
                                id={item.node.gameid}
                                image={item.node.imageUrl}
                                video={item.node.videoUrl}
                                key={index}
                                platforms={item.node.platforms}
                                title={item.node.title}
                                releaseDate={item.node.dateAdded}
                                genres={item.node.genres}
                                chart={item.node.chart}
                                reviews={item.node.reviews.edges[0]?.node?.gameRating}
                            />
                        ))
                )
                }
            </div>
            <div className="load-more"><span onClick={() => {
                if (cardArray.length >= addCards + 24) {
                    setAddCards(addCards + 24)
                } else { return }
            }}>Load more</span></div>
        </main>
    );
}
