"use client"

import React, { useState } from 'react'
import { windowsWhite, psWhite, xboxWhite, bomb, giftBox, thumbsUp } from '../../../../public/images'
import Image from 'next/image'
import { cld } from '../../../../public/images'
import { AdvancedImage, AdvancedVideo, lazyload } from '@cloudinary/react'

export default function game() {

  const [sliceNo, setSliceNo] = useState(450);
  const [buttonText, setButtonText] = useState(false)

  const vid = "my-videos/new.mp4"

  const about = "Sired in an act of vampire insurrection, your existence ignites the war for Seattle&apos;s blood trade. Enter uneasy alliances with the creatures who control the city and uncover the sprawling conspiracy which plunged Seattle into a bloody civil war between powerful vampire factions. ♞Become the Ultimate Vampire. Immerse yourself in the World of Darkness and live out your vampire fantasy in a city filled with intriguing characters that react to your choices.You and your unique disciplines are a weapon in our forward - driving, fast - moving, melee - focussed combat system.Your power will grow as you advance, but remember to uphold the Masquerade and guard your humanity... or face the consequences. ♝Descend into Seattle&apos;s Dark Heart and Survive the Vampire Elite. Seattle has always been run by vampires.Hunt your prey across Seattle locations faithfully reimagined in the World of Darkness.Meet the old blood founders present since the city&apos;s birth and the new blood steering the tech money redefining the city.Everyone has hidden agendas - so choose your allies wisely. ♚Enter into Uneasy Alliances. Choose a side among competing factions, each with their own unique traits and stories, in the war for Seattle&apos;s blood trade.The world will judge you by the company you keep, but remember no one&apos;s hands stay clean forever. ♛Experience the Story. Written by the creative mind behind the original Bloodlines, Vampire: The Masquerade® - Bloodlines™ 2 brings the ambitions of the first game to life and sees the return of a few fan favorite characters."

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
              <div>
                <p>Add to</p>
                <h4>My games<span className='m-l-1'>847</span></h4>
              </div>
              <Image src={xboxWhite} width={40} height={40} alt='plus-sign' className='addTo-svg' id='addtosvg' />
            </div>

            <div className='addTo2'>
              <div>
                <p>Add to</p>
                <h4>Wishlist</h4>
              </div>
              <Image src={giftBox} width={40} height={40} alt='plus-sign' className='addTo-svg' id='addtosvg2' />
            </div>

            <div className='addTo3'>
              <div>
                <p>Save to</p>
                <h4>Collection</h4>
              </div>
              <Image src={giftBox} width={40} height={40} alt='plus-sign' className='addTo-svg' id='addtosvg3' />
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
              <div className='bar1'><Image src={bomb} width={45} height={45} alt='rating-svg' className='rating-bar-svg' /></div>
              <div className='bar2'><Image src={thumbsUp} width={50} height={50} alt='rating-svg' className='rating-bar-svg' /></div>
              <div className='bar3'></div>
              <div className='bar4'></div>
            </div>
            <div className="ratings-bar-info">
              <div><div style={{ backgroundColor: "green" }}></div><p>Exceptional<strong>115</strong></p></div>
              <div><div style={{ backgroundColor: "blue" }}></div><p>Recommended<strong>75</strong></p></div>
              <div className='dsp-f justify-center'><div style={{ backgroundColor: "orange" }}></div><p>Meh<strong>25</strong></p></div>
              <div><div style={{ backgroundColor: "red" }}></div><p>Skip<strong>37</strong></p></div>
            </div>
          </div>

          <div className='write-review'><div>Write a review</div></div>
          <div className='about-div'>
            <h4>About</h4>
            <div>
              <p>{about.split(" ").join(" ").slice(0, sliceNo)} {buttonText ? "" : ".... "}<span onClick={handleReadMore}>{buttonText ? "Read less" : "Read more"}</span></p>
            </div>
          </div>

        </div>

        {/* Game Div2 */}

        <div className='cols-4-xl cols-3-xxl cols-7-md cols-11-sm game-container-div2'>
          <div className='game-container-div2-video'>
            <AdvancedVideo
              muted
              loop
              width="100%"
              height="auto"
              cldVid={cld.video(vid)}
              plugins={[lazyload]}
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
            <Image src={xboxWhite} width={30} height={30} alt='plus-sign' className='buysvg' />
            <p>Purchase Game</p>
          </div>

        </div>

      </div>

      <div className="reviews-div cols-6-xl cols-8-md cols-12-sm"></div>
    </main>
  )
}
