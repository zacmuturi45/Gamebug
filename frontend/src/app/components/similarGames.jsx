import Link from 'next/link'
import React from 'react'
import Card from './cloudinaryCard'

export default function SimilarGames({ data, count, id }) {
    return (
        <div className=' row similarGamesComponent'>
            {
                data.similarUserGames.slice(0, count).map((card, index) => {
                    return <Card id={card.gameid} image={card.imageUrl} video={card.videourl} platforms={card.platforms} title={card.title} releaseDate={card.dateAdded} genres={card.genres} chart={card.chart} index={index} />

                })
            }
        </div>
    )
}
