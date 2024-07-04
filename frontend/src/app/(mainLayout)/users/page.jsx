"use client"

import Image from 'next/image'
import React, { useState } from 'react'
import { arrowdown } from '../../../../public/images'
import MyGames from '@/app/components/myGames';
import Wishlist from '@/app/components/wishlist';
import Reviews from '@/app/components/reviews';
import Collections from '@/app/components/collections';
import Following from '@/app/components/following';
import Followers from '@/app/components/followers';

export default function Users() {

    const [userComponents, setUserComponents] = useState({
        myGames: true,
        wishlist: false,
        reviews: false,
        collections: false,
        following: false,
        followers: false
    });
    const [previousComponent, setPreviousComponent] = useState("myGames");

    const handleClick = (item) => {
        if(item !== previousComponent) {
            setUserComponents(prevState => ({
                ...prevState,
                [previousComponent]: false,
                [item]: true,
            }));
            setPreviousComponent(item)
        } else {return};
    }

  return (
    <main className='users-main'>
        <div className="users-container">
            <div className='users-content-div1'>
                <div className='users-name'>
                    <h1>jaiden</h1>
                    <div className='initials'>J</div>
                </div>
                <div className='users-follow-button'>
                    <div className='follow'><p>Follow<span>1</span></p></div>
                    <div className='follow-image'>
                        <Image src={arrowdown} width={25} height={25} alt='follow-svg' className='follow-svg' />
                    </div>
                </div>
            </div>

            <div className='users-content-div2'>
                <div className="users-navbar">
                    <h4 onClick={() => handleClick("myGames")} id={userComponents.myGames ? "active" : ""}>Games</h4>
                    <h4 onClick={() => handleClick("wishlist")} id={userComponents.wishlist ? "active" : ""}>Wishlist</h4>
                    <h4 onClick={() => handleClick("reviews")} id={userComponents.reviews ? "active" : ""}>Reviews</h4>
                    <h4 onClick={() => handleClick("collections")} id={userComponents.collections ? "active" : ""}>Collections</h4>
                    <h4 onClick={() => handleClick("following")} id={userComponents.following ? "active" : ""}>Following<span>12</span></h4>
                    <h4 onClick={() => handleClick("followers")} id={userComponents.followers ? "active" : ""}>Followers<span>22</span></h4>
                </div>
                <div className="users-components">
                    {userComponents.myGames && <MyGames />}
                    {userComponents.wishlist && <Wishlist />}
                    {userComponents.reviews && <Reviews />}
                    {userComponents.collections && <Collections />}
                    {userComponents.following && <Following />}
                    {userComponents.followers && <Followers />}
                </div>
            </div>
        </div>
    </main>
  )
}
