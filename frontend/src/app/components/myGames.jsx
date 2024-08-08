"use client"

import React, { useEffect, useState } from 'react'
import { cardArray } from '../../../public/images'
import Card from './cloudinaryCard';
import UtilityButton from './button';
import SearchBar from './searchbar';
import Nodata from './nodata';

export default function MyGames({ boughtGames }) {
    const [cardCount, setCardCount] = useState(8);
    const [gameData, setGameData] = useState([]);

    useEffect(() => {
        if (boughtGames) {
            setGameData(boughtGames)
        }
    }, [boughtGames])


    const handleLoadMore = () => {
        if (gameData.length > cardCount) {
            setCardCount(cardCount + 4)
        } else { setCardCount(8) }
    }

    return (
        <div>
            <SearchBar search={"games"} data={gameData} setGameData={setGameData} games={boughtGames} />
            {
                gameData.length > 0 ? (
                    <>
                        <div className="row my-games-cards">
                            {
                                gameData.slice(0, cardCount).map((item, index) => (
                                    <Card
                                        id={item.node.gameid}
                                        image={item.node.imageUrl[0]}
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
                            }
                        </div>

                        <div className='mt-4'>
                            {
                                gameData.length > 8 && (
                                    <div className='dsp-f justify-center ai-c'>
                                        <UtilityButton scale={0.85} color={"rgb(141, 141, 141)"} text={cardCount >= boughtGames.length ? "Show less" : "Show more"} utilityFunction={handleLoadMore} />
                                    </div>
                                )
                            }
                        </div>
                    </>
                ) : (
                    (boughtGames.length > 0 ? (<Nodata data={"No matches"} message={""} showButton={false} />) : (<Nodata data={"No games in library"} message={"Add Games to library"} showButton={true} />))
                )
            }
        </div>
    )
}
