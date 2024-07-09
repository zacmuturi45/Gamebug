"use client"

import "../css/index.css"
import { arrowdown } from "../../../public/images";
import { tick } from "../../../public/images";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Card from "../components/cloudinaryCard";
import { cardArray } from "../../../public/images";
import { useQuery } from "@apollo/client";
import { CARD_DATA } from "../GraphQL/queries";
import { AnimatePresence, motion } from "framer-motion";


export default function Home() {

    const tickVariant = {
        initial: {
            scale: 0,
            opacity: 0
        },
        enter: {
            scale: 1,
            opacity: 1,
            transition: { duration: 0.2, ease: [0.85, 0, 0.15, 1] }
        },
        exit: {
            scale: 0,
            opacity: 0,
            transition: { duration: 0.2, ease: [0.85, 0, 0.15, 1] }
        }
    }

    const [sortBy, setSortBy] = useState("Relevance");
    const [platforms, setPlatforms] = useState("Platforms");
    const [addCards, setAddCards] = useState(24);
    const [cardData, setCardData] = useState([]);

    const { loading: card_data_loading, error: card_data_errors, data: card_data_data } = useQuery(CARD_DATA);

    // if (card_data_loading) {return <p>Loading..</p>;}

    useEffect(() => {
        if (card_data_data) {
            setCardData(card_data_data.allGames.edges)
            console.log(`Dataaa is ${card_data_data.allGames.edges}`)
        }
    }, [card_data_data])

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

    const [header, setHeader] = useState("Highest rated games");

    const popup1Ref = useRef(null);
    const popup2Ref = useRef(null);

    const spanOne = ["Relevance", "Date added", "Name", "Release date", "Popularity", "Average rating"]
    const spanTwo = ["PC", "Playstation", "Xbox", "iOS", "Android", "Nintendo"]

    const handleSort = () => {
        setSortVisible(true)
    }

    const handlePlatform = () => {
        setPlatformVisible(true)
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

    return (
        <main className="col-10-lg cols-12-sm main-pagejsx">
            <div className="main-pagejsx-h1">
                <h1>{header}</h1>
                <p className="mt-2">Based on player reviews and most played</p>
            </div>

            {/* OPTIONS BOX */}

            <div className="options-box mt-2">
                <div className="options-box-child" onClick={() => handleSort()}>
                    <AnimatePresence>
                        {sortVisible &&
                            (
                                <motion.div
                                    variants={tickVariant}
                                    animate={"enter"}
                                    initial={"initial"}
                                    exit={"exit"}
                                    className="options-box-absolute" ref={popup1Ref}>
                                    {spanOne.map((item, index) => {
                                        return <div className="spanOne" key={index} onClick={() => {
                                            setSortBy(item)
                                            handleShowTick(index)
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
                                    handlePlatformTick(index)
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
                {
                    cardData.map((item, index) => {
                        return <Card image={item.node.imageUrl} key={index} platforms={item.node.platforms} title={item.node.title} releaseDate={item.node.dateAdded} genres={item.node.genres} chart={item.node.chart} />
                    })
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
