"use client"

import Image from 'next/image'
import React from 'react'
import { tick } from '../../../public/images'
import { useMutation } from '@apollo/client'
import { UPDATEGAMESTATUS } from '../GraphQL/queries'

export default function AddGamePanel({ svg, setActiveIndex, mainText, spanText, index, activeIndex, gameid, userid }) {

    const [updateGameStatus] = useMutation(UPDATEGAMESTATUS, {
        fetchPolicy: 'no-cache'
    });

    const handleActiveIndex = async (index, gameid, userid) => {
        try {
            const { data, errors } = await updateGameStatus({ variables: { gameId: gameid, userId: userid, index: index } });
            if (data.updateGameStatus.ok) {
                setActiveIndex(data.updateGameStatus.activeIndex)
            } else { alert("Error updating game status") }
        } catch (error) {
            if (error.graphQLErrors) {
                error.graphQLErrors.forEach(({ message }) => {
                    alert(message)
                });
            }
        }
    }
    return (
        <div
            className='addGMain' key={index}
            onClick={() => handleActiveIndex(index, gameid, userid)}
        >
            <div className='gOne'>
                <Image src={svg} width={20} height={20} alt='game-image' />
                <div className='gTwo'>
                    <h4>
                        {mainText}
                        {activeIndex === index ? (<><Image src={tick} width={15} height={15} alt='game-image' style={{ marginLeft: 3 }} />
                        </>) : (<div></div>)}
                    </h4>
                    <p>{spanText}</p>
                </div>
            </div>
        </div>
    )
}
