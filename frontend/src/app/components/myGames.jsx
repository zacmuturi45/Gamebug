"use client"

import React, { useEffect, useState } from 'react'
import { cardArray } from '../../../public/images'
import Card from './cloudinaryCard';
import UtilityButton from './button';
import SearchBar from './searchbar';
import { useQuery } from '@apollo/client';
import { ALL_GAMES } from '../GraphQL/queries';

export default function MyGames() {
    const [cardCount, setCardCount] = useState(8);
    const [userGames, setUserGames] = useState([]);
    const { data } = useQuery(ALL_GAMES);

    useEffect(() => {
        if (data) {
            setUserGames(data.allGames.edges)
        }
    }, [data])


    const handleLoadMore = () => {
        if (userGames.length >= cardCount + 4) {
            setCardCount(cardCount + 4)
        } else { setCardCount(8) }
    }

    return (
        <div>
            <SearchBar search={"games"} />
            <div className="row cards my-games-cards">
                {
                    userGames.slice(0, cardCount).map((item, index) => (
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
                }
            </div>

            <div className='mt-4'>
                <div className='dsp-f justify-center ai-c'>
                    <UtilityButton scale={0.85} color={"rgb(141, 141, 141)"} text={cardCount >= cardArray.length ? "Show less" : "Show more"} utilityFunction={handleLoadMore} />
                </div>
            </div>
        </div>
    )
}
