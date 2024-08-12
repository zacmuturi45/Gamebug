"use client"

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { arrowdown, settings } from '../../../../../public/images';
import MyGames from '@/app/components/myGames';
import Wishlist from '@/app/components/wishlist';
import Reviews from '@/app/components/reviews';
import Collections from '@/app/components/collections';
import Following from '@/app/components/following';
import Followers from '@/app/components/followers';
import { useLazyQuery, useMutation } from '@apollo/client';
import { FOLLOW, FOLLOWSTATUS, ONEUSER } from '@/app/GraphQL/queries';
import { useLoggedUser } from '@/app/contexts/loginContext';
import Loader from '@/app/components/loader';
import { useRouter } from 'next/navigation';

export default function Users({ params }) {

    const [userComponents, setUserComponents] = useState({
        myGames: true,
        wishlist: false,
        reviews: false,
        collections: false,
        following: false,
        followers: false
    });

    const { userInfo } = useLoggedUser();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [userinformation, setUserinformation] = useState({
        username: "",
        wishlist: [],
        games: [],
        following: [],
        followers: [],
        reviews: [],
        profilePic: ""
    });
    const [status, setStatus] = useState("Follow");
    const [previousComponent, setPreviousComponent] = useState("myGames");
    const userId = parseInt(params.user, 10)

    const [one_user, { data: oneUserData }] = useLazyQuery(ONEUSER, {
        fetchPolicy: 'no-cache'
    });
    const [followStatus, { data: followStatusData }] = useLazyQuery(FOLLOWSTATUS, {
        fetchPolicy: 'no-cache'
    });

    const [followerFollowee] = useMutation(FOLLOW);

    useEffect(() => {
        one_user({ variables: { id: userId } })
    }, [])

    useEffect(() => {
        if(userInfo.userid) {
            followStatus({ variables: {followerId: userInfo.userid, followeeId: userId} })
        }
    }, [userInfo, params])

    useEffect(() => {
        if(followStatusData !== undefined) {
            setStatus(followStatusData.checkFollowStatus)
        } else {
            setStatus("follow")
        }
    }, [followStatusData])

    useEffect(() => {
        if (oneUserData) {
            setUserinformation(prevState => ({
                ...prevState,
                username: oneUserData.oneUser.username,
                wishlist: oneUserData.oneUser.userWishlistGames.edges,
                games: oneUserData.oneUser.boughtGames.edges,
                following: oneUserData.oneUser.following.edges,
                followers: oneUserData.oneUser.followers.edges,
                reviews: oneUserData.oneUser.reviews.edges,
                profilePic: oneUserData.oneUser.profilePic
            }));
        } else { console.log("nadaaaaallll") }
    }, [oneUserData])

    const handleClick = (item) => {
        if (item !== previousComponent) {
            setUserComponents(prevState => ({
                ...prevState,
                [previousComponent]: false,
                [item]: true,
            }));
            setPreviousComponent(item)
        } else { return };
    }

    const handleFollow = async () => {
        if(!userInfo.userid) {router.push("/login")}
        try {
            const { data } = await followerFollowee({ variables: { followerId: userInfo.userid, followeeId: userId } });
            if (data.followerFollowee.ok) {
                setLoading(true)
                one_user({ variables: { id: userId } })
                setTimeout(() => {
                    setStatus(data.followerFollowee.status)
                    setLoading(false)
                }, 1500);
            }
        } catch (error) {
            if (error.graphQLErrors) {
                error.graphQLErrors.forEach(({ message }) => {
                    console.log(message)
                });
            }
        }
    }

    return (
        <main className='users-main'>
            <div className="users-container">
                <div className='users-content-div1'>
                    <div className='users-name'>
                        <h1>{userinformation.username}</h1>
                        <div className='initials'>{userinformation.username.slice(0, 1)}</div>
                    </div>
                    <div className={userInfo.userid ? "users-follow-button": ""}>
                        <div className='follow'
                        >
                            {
                                loading ? (
                                    <div className='user-loader'><Loader /></div>
                                ) : (
                                    (userInfo.userid === userId ? (<p onClick={() => router.push("/settings")}>Settings</p>) : (<p onClick={() => handleFollow()}>{status}<span>{userinformation.followers.length}</span></p>))
                                )
                            }
                        </div>
                        <div className='follow-image' onClick={() => router.push("/settings")}>
                            <Image src={settings} width={25} height={25} alt='follow-svg' className='follow-svg' />
                        </div>
                    </div>
                </div>

                <div className='users-content-div2'>
                    <div className="users-navbar">
                        <h4 onClick={() => handleClick("myGames")} id={userComponents.myGames ? "active" : ""}>Games</h4>
                        <h4 onClick={() => handleClick("wishlist")} id={userComponents.wishlist ? "active" : ""}>Wishlist</h4>
                        <h4 onClick={() => handleClick("reviews")} id={userComponents.reviews ? "active" : ""}>Reviews</h4>
                        {/* <h4 onClick={() => handleClick("collections")} id={userComponents.collections ? "active" : ""}>Collections</h4> */}
                        <h4 onClick={() => handleClick("following")} id={userComponents.following ? "active" : ""}>Following<span>{userinformation.following.length}</span></h4>
                        <h4 onClick={() => handleClick("followers")} id={userComponents.followers ? "active" : ""}>Followers<span>{userinformation.followers.length}</span></h4>
                    </div>
                    <div className="users-components">
                        {userComponents.myGames && <MyGames boughtGames={userinformation.games} userid={userId} />}
                        {userComponents.wishlist && <Wishlist wishlistGames={userinformation.wishlist} />}
                        {userComponents.reviews && <Reviews reviews={userinformation.reviews} profilePic={userinformation.profilePic} username={userinformation.username} />}
                        {/* {userComponents.collections && <Collections />} */}
                        {userComponents.following && <Following following={userinformation.following} />}
                        {userComponents.followers && <Followers followers={userinformation.followers} />}
                    </div>
                </div>
            </div>
        </main>
    )
}
