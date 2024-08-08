"use client"

import { createContext, useContext, useState } from 'react'

const ReviewContext = createContext();

export const ReviewProvider = ({ children }) => {
    const [reviewInfo, setReviewInfo] = useState({
        title: "",
        gameComment: "",
        userid: 0, 
        gameid: 0,
        content: "Write a review",
        chooseRev: false
    });

  return (
    <ReviewContext.Provider value={{ reviewInfo, setReviewInfo }}>
        { children }
    </ReviewContext.Provider>
  )
}


export const useReview = () => useContext(ReviewContext);
