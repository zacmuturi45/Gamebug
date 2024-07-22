"use client"

import React, { useEffect, useRef, useState } from 'react'
import { windowsWhite, psWhite, xboxWhite, greenplus, vamp, alpha, blood, action, bomb, giftBox, thumbsUp, isaac, grateful, tick, pumpkincry, pumpkinmeh, arrowdown, cart, platformIcons, platforms, thumbsop, thumbsDown } from '../../../../public/images'
import Image from 'next/image'
import { cld } from '../../../../public/images'
import { AdvancedImage, AdvancedVideo, lazyload } from '@cloudinary/react'
import GameUsers from '@/app/components/gameUsers'
import confetti from 'canvas-confetti'
import { cardArray } from '../../../../public/images'
import UtilityButton from '@/app/components/button'
import Card from '@/app/components/cloudinaryCard'
import ReviewBox from '@/app/components/reviewBox'
import { useQuery } from '@apollo/client'
import { ONEGAME, SIMILAR_GAMES } from '@/app/GraphQL/queries'
import Link from 'next/link'
import SimilarGames from '@/app/components/similarGames'
import gsap from 'gsap'

export default function game({ params }) {

  const [sliceNo, setSliceNo] = useState(450);
  const [buttonText, setButtonText] = useState(false)
  const [cardCount, setCardCount] = useState(6);
  const [showOptions, setShowOptions] = useState(false);
  const [reviewOptions, setReviewOptions] = useState("Newest first")
  const clickRef = useRef(null);
  const [viewSlice, setViewSlice] = useState(3);
  const similarRef = useRef(null);
  const similarParentRef = useRef(null);

  const gameId = parseInt(params.game, 10)

  const { loading, error, data } = useQuery(ONEGAME, {
    variables: { id: gameId },
  });

  const { loading: similarLoading, error: similarError, data: similarGamesData } = useQuery(SIMILAR_GAMES, {
    variables: { id: gameId },
  });

  const reviewArray = [
    { svg: tick, review: "Super nice game", ratingsvg: bomb, profilePic: isaac, date: "April 5, 2024", likes: 120, dislikes: 2, rating: "Recommended", name: "Lukasz Milescu" },
    { svg: tick, review: "Devoid of the x-factor but playable", ratingsvg: thumbsUp, profilePic: grateful, date: "April 5, 2024", likes: 120, dislikes: 2, rating: "Recommended", name: "Aldoff Karembeu" },
    { svg: tick, review: "A good starter for the wannabe vampire fanatic", ratingsvg: pumpkinmeh, profilePic: isaac, date: "April 5, 2024", likes: 120, dislikes: 2, rating: "Meh", name: "Aileen Sanchez" },
    { svg: tick, review: "Meh is weh ei ken see", ratingsvg: thumbsUp, profilePic: grateful, date: "April 5, 2024", likes: 120, dislikes: 2, rating: "Recommended", name: "Lucy Bierschoff" },
    { svg: tick, review: "Fuck mother Russia", ratingsvg: pumpkincry, profilePic: isaac, date: "April 5, 2024", likes: 120, dislikes: 2, rating: "Skip", name: "Alberto Moreira" }
  ]

  const gameCollections = [
    { image: { image1: vamp, image2: alpha, image3: blood, image4: action }, title: "Kill hour", games: 14 },
    { image: { image1: vamp, image2: alpha, image3: blood, image4: action }, title: "Less gooo", games: 21 },
    { image: { image1: vamp, image2: alpha, image3: blood, image4: action }, title: "Vampire fanatic", games: 12 },
    { image: { image1: vamp, image2: alpha, image3: blood, image4: action }, title: "Meh", games: 11 },
    { image: { image1: vamp, image2: alpha, image3: blood, image4: action }, title: "Kill hour", games: 14 },
    { image: { image1: vamp, image2: alpha, image3: blood, image4: action }, title: "Less gooo", games: 21 },
    { image: { image1: vamp, image2: alpha, image3: blood, image4: action }, title: "Vampire fanatic", games: 12 },
    { image: { image1: vamp, image2: alpha, image3: blood, image4: action }, title: "Meh", games: 11 },
  ]


  // useEffect(() => {
  //   const similarHeight = similarRef.current.getBoundingClientRect().height
  //   gsap.to(similarParentRef.current, {
  //     height: similarHeight + 50
  //   })
  // }, [cardCount])

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

  if (loading || similarLoading) return <p>Loading.....</p>;

  if (error || similarError) return <p>Error: {error ? error.message : similarError.message}</p>

  console.log(`SimilarGames is ${similarGamesData.similarUserGames[0].title}`)


  const gamePlatforms = data.oneGame.platforms.map(item => platformIcons[item]).filter(it => it !== undefined);


  return (
    <main className='game_main'>

      <div className='game_container row'>
        <div className='game-container-div1'>
          <div className='game-container-div1-gray-title'><h4>{`HOME / GAMES / ${data.oneGame.title}`}</h4></div>

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

          <div className='game-container-div1-title'><h1>{data.oneGame.title}</h1></div>

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
                <div className="bar1div">
                  <Image src={bomb} width={40} height={40} alt='rating-svg' className='rating-bar-svg' />
                </div>
                <div className='bar1-child'><div style={{ backgroundColor: "green" }}></div><p>Exceptional<strong>115</strong></p></div>
              </div>

              <div className='bar2'>
                <div className="bar2div">
                  <Image src={thumbsUp} width={50} height={50} alt='rating-svg' className='rating-bar-svg' />
                </div>
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
              <div><h4>Platforms</h4>{
                data.oneGame.platforms.map((item, index) => (<span key={index}>{item}</span>))
              }</div>
              <div><h4>Release date</h4><span>TBA</span></div>
              <div><h4>Publisher</h4><span>Paradox Interactive</span></div>
            </div>

            <div className='game-info-div2'>
              <div><h4>Genre</h4>{
                data.oneGame.genres.map((item, index) => (<span key={index}>{item}</span>))
              }</div>
              <div><h4>Developer</h4><span>Hardsuit Labs</span></div>
              <div><h4>Age Rating</h4><span>Not rated</span></div>
            </div>

          </div>

          <div className="game-info2">
            <div className='game-info2-div0'>
              <h4>Other games in the series</h4>
              <div>
                <span>Vampire: The Masquerade-Swansong,</span><span>Vampire: The Masquerade-Bloodhunt</span><span>Vampire: The Masquerade-Shadows of New York,</span><span>Vampire: The Masquerade-Coteries of New York</span><span>Vampire: The Masquerade-Redemption,</span>
              </div>

            </div>

            <div className='game-info2-div1'>
              <h4>Tags</h4>
              <div>
                <span>Action,</span><span>Story</span><span>Action,</span><span>Great Soundtrack</span><span>Open world,</span><span>First-person</span><span>Horror,</span><span>Gore</span><span>Violent,</span><span>Vampire</span><span>Single-player,</span><span>RPG</span><span>Atmospheric,</span><span>RPG</span>
              </div>

            </div>
            <div className="game-info2-div2">
              <h4>Website</h4>
              <p>https://www.bloodlines2.com</p>
            </div>
          </div>

        </div>

        {/* Game Div2 */}

        <div className='game-container-div2'>
          <div className='game-container-div2-video'>
            <AdvancedVideo
              className='game-container-video'
              muted
              loop
              cldVid={cld.video(data.oneGame.videoUrl)}
              plugins={[lazyload]}
              controls
            />
          </div>

          <div className='game-container-div2-images'>
            {images.map((image, index) => {
              return <div key={index}>
                <AdvancedImage
                  cldImg={cld.image(data.oneGame.imageUrl)}
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

          <div className="game-collections">

            <div className='game-collections-div1'>
              <h1>Collections with Vampire: The Masquerade - Bloodlines 2</h1>
              <p>4 Collections</p>
            </div>

            <div className='game-collections-div2'>
              {
                gameCollections.slice(0, viewSlice).map((game, index) => {
                  return <div key={index} className='collection-grid'>
                    <div className='collection-grid-grid'>
                      <Image src={game.image.image1} width={35} height={35} alt='image' />
                      <Image src={game.image.image2} width={35} height={35} alt='image' />
                      <Image src={game.image.image3} width={35} height={35} alt='image' />
                      <Image src={game.image.image4} width={35} height={35} alt='image' />
                    </div>

                    <div className='collection-grid-text'>
                      <h2>{game.title}</h2>
                      <p>{game.games} GAMES</p>
                    </div>
                  </div>
                })
              }
            </div>

          </div>

        </div>

      </div>

      <div className='similar-games cols-8-xl' ref={similarParentRef}>

        <div className='dsp-f justify-center'>
          <h1>{`Games like ${data.oneGame.title}`}</h1>
        </div>

        <div>
          <div ref={similarRef}>
            {
              <SimilarGames data={similarGamesData} count={cardCount} />
            }
          </div>
          <div className='mt-4 dsp-f ai-c justify-center'>
          <div>
            <UtilityButton scale={0.85} color={"rgb(141, 141, 141)"} text={cardCount >= cardArray.length ? "Show less" : "Show more"} utilityFunction={handleLoadMore} />
          </div>
        </div>
        </div>

      </div>

      <div className="reviews-div cols-5-xl cols-8-md cols-12-sm">

        <div className='reviews-div-container'>

          <div className='reviews-div-title'>
            <h1>{`${data.oneGame.title} Reviews`}</h1>
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
              return <ReviewBox svg={review.svg} thumbsop={thumbsop} thumbsdown={thumbsDown} rating={review.rating} ratingsvg={review.ratingsvg} profilePic={review.profilePic} name={review.name} index={index} review={review.review} date={review.date} likes={review.likes} dislikes={review.dislikes} />
            })
          }
        </div>

      </div>
    </main>
  )
}
