import React from 'react'
import { isaac, grateful } from '../../../public/images'
import FollowData from './followData'
import SearchBar from './searchbar'

export default function Followers({ followers }) {

    return (
        <div className='follower-maindiv'>
            <div className="follower-div">
                <div className='follower-div-div'>
                    {
                        followers.map((data, index) => {
                            return <FollowData key={index} image={data.node.profilePic} name={data.node.username} id={data.node.userid} gameCount={data.node.boughtGames.edges.length} wishlistCount={data.node.userWishlistGames.edges.length} index={index} />
                        })
                    }
                </div>
            </div>
        </div>
    )
}
