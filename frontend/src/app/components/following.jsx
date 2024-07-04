import React from 'react'
import { isaac, grateful } from '../../../public/images'
import FollowData from './followData'
import SearchBar from './searchbar'

export default function Following() {

    const gameUserData = [
        { name: "iBarin", image: isaac, edits: 16, followerCount: 117 },
        { name: "Rakesh", image: grateful, edits: 12, followerCount: 124 },
        { name: "Dmello", image: isaac, edits: 23, followerCount: 147 },
        { name: "Deadmau5", image: grateful, edits: 11, followerCount: 107 },
        { name: "Sergei", image: isaac, edits: 17, followerCount: 151 },
        { name: "iBarin", image: isaac, edits: 16, followerCount: 117 },
        { name: "Rakesh", image: grateful, edits: 12, followerCount: 124 },
        { name: "Dmello", image: isaac, edits: 23, followerCount: 147 },
        { name: "Deadmau5", image: grateful, edits: 11, followerCount: 107 },
        { name: "Sergei", image: isaac, edits: 17, followerCount: 151 },
        { name: "iBarin", image: isaac, edits: 16, followerCount: 117 },
        { name: "Rakesh", image: grateful, edits: 12, followerCount: 124 },
        { name: "Dmello", image: isaac, edits: 23, followerCount: 147 },
        { name: "Deadmau5", image: grateful, edits: 11, followerCount: 107 },
        { name: "Sergei", image: isaac, edits: 17, followerCount: 151 },
        { name: "iBarin", image: isaac, edits: 16, followerCount: 117 },
        { name: "Rakesh", image: grateful, edits: 12, followerCount: 124 },
        { name: "Dmello", image: isaac, edits: 23, followerCount: 147 },
        { name: "Deadmau5", image: grateful, edits: 11, followerCount: 107 },
        { name: "Sergei", image: isaac, edits: 17, followerCount: 151 },
        { name: "iBarin", image: isaac, edits: 16, followerCount: 117 },
        { name: "Rakesh", image: grateful, edits: 12, followerCount: 124 },
        { name: "Dmello", image: isaac, edits: 23, followerCount: 147 },
        { name: "Deadmau5", image: grateful, edits: 11, followerCount: 107 },
        { name: "Sergei", image: isaac, edits: 17, followerCount: 151 }
    ]

    return (
        <div className='follower-maindiv'>
            <div className="follower-div">
                <SearchBar search={"following"} />
                <div className='follower-div-div'>
                    {
                        gameUserData.map((data, index) => {
                            return <FollowData image={data.image} name={data.name} edits={data.edits} followerCount={data.followerCount} index={index} follow={"Follow"} />
                        })
                    }
                </div>
            </div>
        </div>
    )
}
