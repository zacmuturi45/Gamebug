import Link from 'next/link'
import React from 'react'
import Card from './cloudinaryCard'

export default function SimilarGames({ data, count}) {
    return (
        <div className=' row similarGamesComponent' key={"xhjf"}>
            {
                data.similarUserGames.slice(0, count).map((card, index) => {
                    return (
                        <div className='similar-game' key={card.gameid}>
                            <Card key={index} id={card.gameid} image={card.imageUrl[0]} video={card.videourl} platforms={card.platforms} title={card.title} releaseDate={card.dateAdded} genres={card.genres} chart={card.chart} />
                        </div>
                    )

                })
            }
        </div>
    )
}
