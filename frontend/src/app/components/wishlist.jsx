"use client"

import React, { useState } from 'react'
import { cardArray } from '../../../public/images'
import Card from './cloudinaryCard';
import UtilityButton from './button';
import SearchBar from './searchbar';

export default function Wishlist() {
    const [cardCount, setCardCount] = useState(8);

    const handleLoadMore = () => {
        if (cardArray.length >= cardCount + 4) {
            setCardCount(cardCount + 4)
        } else { setCardCount(8) }
    }

    return (
        <div className='wishlist-maindiv'>
            <SearchBar search={"my wishlist"} />
            <div className="row cards my-games-cards" id='cardy'>
                {
                    cardArray.slice(0, cardCount).map((card, index) => {
                        return <Card image={card} index={index} />
                    })
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
