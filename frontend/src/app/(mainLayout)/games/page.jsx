"use client"

import React, { useEffect, useRef, useState } from 'react'
import { windowsWhite, psWhite, xboxWhite, greenplus, bomb, giftBox, thumbsUp, isaac, grateful, tick, pumpkincry, pumpkinmeh, arrowdown, cart } from '../../../../public/images'
import Image from 'next/image'
import { cld } from '../../../../public/images'
import { AdvancedImage, AdvancedVideo, lazyload } from '@cloudinary/react'
import GameUsers from '@/app/components/gameUsers'
import confetti from 'canvas-confetti'
import { cardArray } from '../../../../public/images'
import UtilityButton from '@/app/components/button'
import Card from '@/app/components/cloudinaryCard'
import ReviewBox from '@/app/components/reviewBox'

export default function game() {

  const [sliceNo, setSliceNo] = useState(450);
  const [buttonText, setButtonText] = useState(false)
  const [cardCount, setCardCount] = useState(8);
  const [showOptions, setShowOptions] = useState(false);
  const [reviewOptions, setReviewOptions] = useState("Newest first")
  const clickRef = useRef(null);

  const reviewArray = [
    { svg: tick, review: "Super nice game", ratingsvg: bomb, profilePic: isaac, date: "April 5, 2024", likes: 120, dislikes: 2, rating: "Recommended", name: "Lukasz Milescu" },
    { svg: tick, review: "Devoid of the x-factor but playable", ratingsvg: thumbsUp, profilePic: grateful, date: "April 5, 2024", likes: 120, dislikes: 2, rating: "Recommended", name: "Aldoff Karembeu" },
    { svg: tick, review: "A good starter for the wannabe vampire fanatic", ratingsvg: pumpkinmeh, profilePic: isaac, date: "April 5, 2024", likes: 120, dislikes: 2, rating: "Meh", name: "Aileen Sanchez" },
    { svg: tick, review: "Meh is weh ei ken see", ratingsvg: thumbsUp, profilePic: grateful, date: "April 5, 2024", likes: 120, dislikes: 2, rating: "Recommended", name: "Lucy Bierschoff" },
    { svg: tick, review: "Fuck mother Russia", ratingsvg: pumpkincry, profilePic: isaac, date: "April 5, 2024", likes: 120, dislikes: 2, rating: "Skip", name: "Alberto Moreira" }
  ]


  useEffect(() => {
    const handleClick = (event) => {
      if (clickRef.current && !clickRef.current.contains(event.target)) {
        setShowOptions(false)
        return
      }
    }

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [])

  const handleAddtoGames = () => {
    confetti({
      particleCount: 100,
      spread: 50,
      origin: { y: 0.6 },
    });
  }

  const handleLoadMore = () => {
    if (cardArray.length >= cardCount + 4) {
      setCardCount(cardCount + 4)
    } else { setCardCount(8) }
  }

  const vid = "my-videos/new.mp4"

  const about = "Sired in an act of vampire insurrection, your existence ignites the war for Seattle&apos;s blood trade. Enter uneasy alliances with the creatures who control the city and uncover the sprawling conspiracy which plunged Seattle into a bloody civil war between powerful vampire factions. ♞Become the Ultimate Vampire. Immerse yourself in the World of Darkness and live out your vampire fantasy in a city filled with intriguing characters that react to your choices.You and your unique disciplines are a weapon in our forward - driving, fast - moving, melee - focussed combat system.Your power will grow as you advance, but remember to uphold the Masquerade and guard your humanity... or face the consequences. ♝Descend into Seattle&apos;s Dark Heart and Survive the Vampire Elite. Seattle has always been run by vampires.Hunt your prey across Seattle locations faithfully reimagined in the World of Darkness.Meet the old blood founders present since the city&apos;s birth and the new blood steering the tech money redefining the city.Everyone has hidden agendas - so choose your allies wisely. ♚Enter into Uneasy Alliances. Choose a side among competing factions, each with their own unique traits and stories, in the war for Seattle&apos;s blood trade.The world will judge you by the company you keep, but remember no one&apos;s hands stay clean forever. ♛Experience the Story. Written by the creative mind behind the original Bloodlines, Vampire: The Masquerade® - Bloodlines™ 2 brings the ambitions of the first game to life and sees the return of a few fan favorite characters."

  const gameUserData = [
    { name: "iBarin", image: isaac, edits: 16, followerCount: 117 },
    { name: "Rakesh", image: grateful, edits: 12, followerCount: 124 },
    { name: "Dmello", image: isaac, edits: 23, followerCount: 147 },
    { name: "Deadmau5", image: grateful, edits: 11, followerCount: 107 },
    { name: "Sergei", image: isaac, edits: 17, followerCount: 151 }
  ]

  const handleReadMore = () => {
    if (!buttonText) {
      setSliceNo(about.length)
    } else { setSliceNo(500) }
    setButtonText(!buttonText)
  }

  const gamePlatforms = [windowsWhite, psWhite, xboxWhite]
  const images = [
    "my-videos/boat_tyrkf7",
    "my-videos/kill_qhzkbt",
    "my-videos/switch_muf00v",
    "my-videos/tekken8_fwdock"
  ]

  const reviewViews = [
    "Newest first",
    "Oldest first",
    "Exceptional",
    "Recommended",
    "Meh",
    "Skip"
  ]

  return (
    <main className='game_main'>

      <div className='game_container row'>
        <div className='cols-7-xl cols-5-xxl cols-10-md cols-12-sm game-container-div1'>
          <div className='game-container-div1-gray-title'><h4>HOME / GAMES / VAMPIRE: THE MASQUERADE - BLOODLINES 2</h4></div>

          <div className='game-container-div1-svgs'>
            <div className='dsp-f'>
              {
                gamePlatforms.map((item, index) => {
                  return (<div key={index} className='m-r-1'>
                    <Image src={item} width={20} height={20} alt='svg-image' className='gamePlatform-image' />
                  </div>)
                })
              }
            </div>
            <span className='m-l-2'>AVERAGE PLAYTIME: 329 HOURS</span>
          </div>

          <div className='game-container-div1-title'><h1>Vampire: The Masquerade - Bloodlines 2</h1></div>

          <div className='game-container-div1-addTo'>
            <div className='addTo1'>
              <div onClick={handleAddtoGames}>
                <p>Add to</p>
                <h4>My games<span className='m-l-1'>847</span></h4>
              </div>
              <Image src={greenplus} width={35} height={35} alt='plus-sign' className='addTo-svg' id='addtosvg' />
            </div>

            <div className='addTo2'>
              <div>
                <p>Add to</p>
                <h4>Wishlist</h4>
              </div>
              <Image src={giftBox} width={35} height={35} alt='plus-sign' className='addTo-svg' id='addtosvg2' />
            </div>

            <div className='addTo3'>
              <div>
                <p>Save to</p>
                <h4>Collection</h4>
              </div>
              <Image src={giftBox} width={35} height={35} alt='plus-sign' className='addTo-svg' id='addtosvg3' />
            </div>
          </div>

          <div className='game-container-div1-ratings-div'>
            <div className='ratings-div1'>
              <h2><span>Exeptional</span></h2>
              <p>249 RATINGS</p>
            </div>

            <div className='ratings-div-container'>
              <div className='ratings-div2'>
                <h2>#316</h2>
                <p>RPG</p>
              </div>

              <div className='ratings-div3'>
                <h2>#1</h2>
                <p>TOP 2024</p>
              </div>
            </div>

          </div>

          <div className='ratings-bar'>
            <p>Click to rate</p>
            <div className='ratings-bar-bar'>

              <div className='bar1'>
                <Image src={bomb} width={45} height={45} alt='rating-svg' className='rating-bar-svg' />
                <div className='bar1-child'><div style={{ backgroundColor: "green" }}></div><p>Exceptional<strong>115</strong></p></div>
              </div>

              <div className='bar2'>
                <Image src={thumbsUp} width={50} height={50} alt='rating-svg' className='rating-bar-svg' />
                <div className='bar2-child'><div style={{ backgroundColor: "blue" }}></div><p>Recommended<strong>75</strong></p></div>
                </div>

              <div className='bar3'>
              <div className='dsp-f justify-center bar3-child'><div style={{ backgroundColor: "orange" }}></div><p>Meh<strong>25</strong></p></div>
              </div>

              <div className='bar4'>
              <div className='bar4-child'><div style={{ backgroundColor: "red" }}></div><p>Skip<strong>37</strong></p></div>
              </div>

            </div>
            {/* <div className="ratings-bar-info">
            </div> */}
          </div>

          <div className='write-review'>
            <UtilityButton text={"Write a review"} scale={0.8} color={"rgb(110, 110, 110)"} />
          </div>
          <div className='about-div'>
            <h4>About</h4>
            <div>
              <p>{about.split(" ").join(" ").slice(0, sliceNo)} {buttonText ? "" : ".... "}<span onClick={handleReadMore}>{buttonText ? "Read less" : "Read more"}</span></p>
            </div>
          </div>

          <div className="game-info">

            <div className='game-info-div1'>
              <div><h4>Platforms</h4><span>Playstation,</span><span>Xbox,</span><span>Windows</span></div>
              <div><h4>Release date</h4><span>TBA</span></div>
              <div><h4>Publisher</h4><span>Paradox Interactive</span></div>
            </div>

            <div className='game-info-div2'>
              <div><h4>Genre</h4><span>Action,</span><span>RPG</span></div>
              <div><h4>Developer</h4><span>Hardsuit Labs</span></div>
              <div><h4>Age Rating</h4><span>Not rated</span></div>
            </div>

          </div>

        </div>

        {/* Game Div2 */}

        <div className='cols-4-xl cols-3-xxl cols-7-md cols-11-sm game-container-div2'>
          <div className='game-container-div2-video'>
            <AdvancedVideo
              className='game-container-video'
              muted
              loop
              cldVid={cld.video(vid)}
              plugins={[lazyload]}
              controls
            />
          </div>

          <div className='game-container-div2-images'>
            {images.map((image, index) => {
              return <div key={index}>
                <AdvancedImage
                  cldImg={cld.image(image)}
                  className="game-image"
                />
              </div>
            })}
          </div>

          <div className='game-container-div2-buyGame'>
            <Image src={cart} width={30} height={30} alt='plus-sign' className='buysvg' />
            <p>Purchase Game</p>
          </div>

          <div className="game-users">
            <div className="game-users-title">Top users</div>
            {
              gameUserData.map((data, index) => {
                return <GameUsers image={data.image} name={data.name} edits={data.edits} followerCount={data.followerCount} index={index} />
              })
            }
          </div>

        </div>

      </div>

      <div className='similar-games cols-8-xl'>

        <div>
          <h1>Games like Vampire: The Masquerade - Bloodlines 2</h1>
        </div>

        <div className='row cards similar-games-cards'>
          {
            cardArray.slice(0, cardCount).map((card, index) => {
              return <Card image={card} index={index} />
            })
          }
        </div>

        <div className='mt-4'>
          <div>
            <UtilityButton scale={0.85} color={"rgb(141, 141, 141)"} text={cardCount >= cardArray.length ? "Show less" : "Show more"} utilityFunction={handleLoadMore} />
          </div>
        </div>

      </div>

      <div className="reviews-div cols-5-xl cols-8-md cols-12-sm">

        <div className='reviews-div-container'>

          <div className='reviews-div-title'>
            <h1>Vampire: The Masquerade - Bloodlines 2 Reviews</h1>
          </div>

          <div className='review-title'>
            <h2>Reviews<span>5</span></h2>
          </div>

          <div className='review-options'>
            <div className='clickoptions' onClick={() => setShowOptions(!showOptions)} ref={clickRef}>
              <span>{reviewOptions}</span>
              <Image src={arrowdown} width={12} height={12} alt='arrowdown' className={showOptions ? "review-arrow-up" : "review-arrow-down"} />
            </div>
            <div className={showOptions ? "showoptions review-options-options" : "hideoptions"}>
              {
                reviewViews.map((view, index) => {
                  return <span key={index} onClick={() => setReviewOptions(view)} >{view}</span>
                })
              }
            </div>
          </div>
          {
            reviewArray.map((review, index) => {
              return <ReviewBox svg={review.svg} rating={review.rating} ratingsvg={review.ratingsvg} profilePic={review.profilePic} name={review.name} index={index} review={review.review} date={review.date} likes={review.likes} dislikes={review.dislikes} />
            })
          }
        </div>

      </div>
    </main>
  )
}
