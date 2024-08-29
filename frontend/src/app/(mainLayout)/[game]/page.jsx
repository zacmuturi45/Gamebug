"use client"

import React, { useEffect, useRef, useState } from 'react'
import { windowsWhite, psWhite, xboxWhite, greenplus, vamp, alpha, blood, action, bomb, giftBox, thumbsUp, isaac, grateful, tick, pumpkincry, pumpkinmeh, arrowdown, cart, platformIcons, platforms, thumbsop, thumbsDown, comment, create_date_string, xboxGray, steam } from '../../../../public/images'
import Image from 'next/image'
import { cld } from '../../../../public/images'
import { AdvancedImage, AdvancedVideo, lazyload } from '@cloudinary/react'
import GameUsers from '@/app/components/gameUsers'
import confetti from 'canvas-confetti'
import { cardArray } from '../../../../public/images'
import UtilityButton from '@/app/components/button'
import Card from '@/app/components/cloudinaryCard'
import ReviewBox from '@/app/components/reviewBox'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { ADDREVIEW, ADDTOMYGAMES, ADDTOWISHLIST, ALLGAMEREVIEWS, ALLREVIEWS, BUYERS, CHECKAVERAGERATING, CHECKGAME, CHECKLIBRARY, CHECKRATINGS, CHECKRATINGTYPES, CHECKREVIEW, COUNTREVIEWS, GAMECOUNT, ONEGAME, SIMILAR_GAMES } from '@/app/GraphQL/queries'
import Link from 'next/link'
import SimilarGames from '@/app/components/similarGames'
import gsap from 'gsap'
import Loader from '@/app/components/loader'
import { useLoggedUser } from '@/app/contexts/loginContext'
import { useRouter } from 'next/navigation'
import { useReview } from '@/app/contexts/reviewContext'

export default function Game({ params }) {

  const [sliceNo, setSliceNo] = useState(450);
  const [buttonText, setButtonText] = useState(false)
  const [cardCount, setCardCount] = useState(6);
  const [showOptions, setShowOptions] = useState(false);
  const [reviewOptions, setReviewOptions] = useState("Sort")
  const clickRef = useRef(null);
  const [viewSlice, setViewSlice] = useState(3);
  const [added, setAdded] = useState(false);
  const similarRef = useRef(null);
  const [addedToUserWishlist, setAddedToUserWishlist] = useState(false);
  const similarParentRef = useRef(null);
  const [reviewCount, setReviewCount] = useState(0);
  const [libraryCount, setLibraryCount] = useState(0);
  const [addCount, setAddCount] = useState(0);
  const { userInfo, setUserInfo } = useLoggedUser();
  const { reviewInfo, setReviewInfo } = useReview();
  const [loader, setLoader] = useState(false);
  const [gameRating, setGameRating] = useState({ rated: "None", ratings: 0 })
  const [gameRatingTypes, setGameRatingTypes] = useState({ exceptional: 0, recommend: 0, meh: 0, skip: 0 })
  const [addToGames] = useMutation(ADDTOMYGAMES);
  const [addReview] = useMutation(ADDREVIEW);
  const router = useRouter();
  const [addedToWishlist] = useMutation(ADDTOWISHLIST);
  const [reviewee, setReviewee] = useState("");
  const gameId = parseInt(params.game, 10)
  const [revData, setRevData] = useState([]);

  const { loading, error, data: oneData } = useQuery(ONEGAME, {
    variables: { id: gameId },
  });

  const [fetchCount, { loading: countFetch, data: countData, error: countError }] = useLazyQuery(GAMECOUNT, {
    fetchPolicy: 'no-cache'
  });

  const [fetchLibraryCount, { loading: libLoading, data: libData, error: libError }] = useLazyQuery(CHECKLIBRARY, {
    fetchPolicy: 'no-cache'
  });

  const { loading: similarLoading, error: similarError, data: similarGamesData } = useQuery(SIMILAR_GAMES, {
    variables: { id: gameId },
  });

  const [fetchCheck, { loading: checkLoading, data: checkData, error: checkError }] = useLazyQuery(CHECKGAME, {
    fetchPolicy: 'no-cache'
  });

  const [fetchRatings, { data: ratingsData }] = useLazyQuery(CHECKRATINGS, {
    fetchPolicy: 'no-cache'
  });

  const [fetchAverageRating, { data: averageRatingsData }] = useLazyQuery(CHECKAVERAGERATING, {
    fetchPolicy: 'no-cache'
  });

  const [fetchRatingTypes, { data: ratingTypesData }] = useLazyQuery(CHECKRATINGTYPES, {
    fetchPolicy: 'no-cache'
  });

  const [reviewCheck, { data: reviewData }] = useLazyQuery(CHECKREVIEW, {
    fetchPolicy: 'no-cache'
  });

  const [countRevs, { data: countReviewData }] = useLazyQuery(COUNTREVIEWS, {
    fetchPolicy: 'no-cache'
  });

  const [allReviews, { data: allReviewData }] = useLazyQuery(ALLGAMEREVIEWS, {
    fetchPolicy: 'no-cache'
  });

  const [userwithgame, { data: userWithGameData }] = useLazyQuery(BUYERS)



  useEffect(() => {
    if (userInfo.userid) {
      fetchCheck({ variables: { gameId: gameId, userId: userInfo.userid } });
    }
  }, [addedToUserWishlist])

  useEffect(() => {
    if (userInfo.userid) {
      fetchLibraryCount({ variables: { gameId: gameId, userId: userInfo.userid } });
    }
  }, [gameId, userInfo, added, addedToUserWishlist])

  useEffect(() => {
    fetchRatings({ variables: { gameId: gameId } });
    fetchAverageRating({ variables: { gameId: gameId } });
    fetchRatingTypes({ variables: { gameId: gameId } });
    reviewCheck({ variables: { gameId: gameId, userId: userInfo.userid } });
    countRevs({ variables: { gameId: gameId } });
    allReviews({ variables: { gameId: gameId } });
    userwithgame({ variables: { id: gameId } });
  }, [])

  useEffect(() => {
    if (allReviewData) {
      setRevData(allReviewData.allGameReviews.filter(item => item.parentId === null))
    }
  }, [allReviewData])

  useEffect(() => {
    if (userWithGameData !== undefined) {
      console.log(`GAME DATA ISS ${userWithGameData.userWithGame[0].boughtGames.edges[0].node.gameid}`)
    } else console.log('Nadaaaalll')
  }, [userWithGameData])

  useEffect(() => {
    if (countReviewData) {
      setReviewCount(countReviewData.countReviews)
    }
  }, [countReviewData])

  useEffect(() => {
    if (reviewData) {
      if (reviewData.checkReview.checkedReview) {
        setReviewee(reviewData.checkReview.checkedReview.gameComment)
      }
    }
  }, [reviewData])

  useEffect(() => {
    if (ratingsData !== undefined && averageRatingsData !== undefined) {
      setGameRating(prevState => ({
        ...prevState,
        rated: averageRatingsData.checkAverageRating,
        ratings: ratingsData.checkRatings
      }));
    }
  }, [ratingsData, averageRatingsData])

  useEffect(() => {
    if (ratingTypesData !== undefined) {
      setGameRatingTypes(prevState => ({
        ...prevState,
        exceptional: ratingTypesData.checkRatingTypes.exceptional,
        recommend: ratingTypesData.checkRatingTypes.recommend,
        meh: ratingTypesData.checkRatingTypes.meh,
        skip: ratingTypesData.checkRatingTypes.skip
      }));
    }
  }, [ratingTypesData])

  useEffect(() => {
    if (libData && libData.checkLibrary != undefined) {
      setLibraryCount(libData.checkLibrary);
    }
  }, [libData, addedToUserWishlist])

  useEffect(() => {
    if (checkData !== undefined) {
      if (checkData.checkGame.inBoughtGames === true) {
        setAdded(true);
        setAddedToUserWishlist(false)
      } else if (checkData.checkGame.inBoughtGames === false) {
        setAdded(false);
        if (checkData.checkGame.inWishlist) {
          setAddedToUserWishlist(true)
        }
      } else if (checkData.checkGame.inWishlist === false) {
        setAddedToUserWishlist(false)
        if (checkData.checkGame.inBoughtGames) {
          setAdded(true)
        }
      } else if (checkData.checkGame.inWishlist === true) {
        setAddedToUserWishlist(true)
        setAdded(false)
      }
    }
  }, [checkData])

  useEffect(() => {
    fetchCount({ variables: { gameId: gameId } });
  }, [libData])

  useEffect(() => {
    if (countData && countData.addToGames !== undefined) {
      setAddCount(countData.addToGames);
    }
  }, [countData])

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
    if (userInfo.userid) {
      if (added) {
        alert("This game already exists in your library!")
      } else {
        addGame()
      }
    } else { router.push("/login") }
  }

  const handleLoadMore = () => {
    if (similarGamesData.similarUserGames.length > cardCount) {
      setCardCount(cardCount + 3)
    } else { setCardCount(6) }
  }

  const addGameToWishlist = async () => {
    try {
      const { data, errors } = await addedToWishlist({ variables: { gameId: gameId, userId: userInfo.userid } });
      if (data.addedToWishlist.ok) {
        setAddedToUserWishlist(true)
        if (added) {
          setAdded(false)
        }
      } else { console.log("This game already exists in your wishlist") }
    } catch (error) {
      if (error.graphQLErrors) {
        error.graphQLErrors.forEach(({ message }) => {
          alert(message)
        });
      }
    }
  }

  const addGame = async () => {
    try {
      const { data, errors } = await addToGames({ variables: { gameId: gameId, userId: userInfo.userid } });
      if (data.addToGames.ok) {
        setLoader(true)
        setTimeout(() => {
          setLoader(false)
          confetti({
            particleCount: 100,
            spread: 50,
            origin: { y: 0.6 },
          });
          setAdded(true)
          if (addedToUserWishlist) {
            setAddedToUserWishlist(false)
          }
          setAddCount(data.addToGames.count)
        }, 2000);
      } else { console.log("This Game already exists in your library") }
    } catch (error) {
      if (error.graphQLErrors) {
        error.graphQLErrors.forEach(({ message }) => {
          alert(message)
        });
      }
    }
  }

  const handleAddReview = async (content, gameComment, gameRating) => {
    if (!userInfo.userid) { router.push("/login") }
    try {
      const { data } = await addReview({ variables: { userId: userInfo.userid, gameId: gameId, gameComment: gameComment, gameRating: gameRating, content: content } });

      if (data.addReview.ok) {
        setReviewInfo(prevState => ({
          ...prevState,
          gameComment: data.addReview.newReview.gameComment,
        }));
        fetchRatingTypes({ variables: { gameId: gameId } });
        setReviewee(data.addReview.newReview.gameComment)
      } else { alert("Error adding quick review") }
    } catch (error) {
      if (error.graphQLErrors) {
        error.graphQLErrors.forEach(({ message }) => {
          console.log(message)
        });
      }
    }
  }

  const vid = "my-videos/new.mp4"

  const about = "Sired in an act of vampire insurrection, your existence ignites the war for Seattle&apos;s blood trade. Enter uneasy alliances with the creatures who control the city and uncover the sprawling conspiracy which plunged Seattle into a bloody civil war between powerful vampire factions. ♞Become the Ultimate Vampire. Immerse yourself in the World of Darkness and live out your vampire fantasy in a city filled with intriguing characters that react to your choices.You and your unique disciplines are a weapon in our forward - driving, fast - moving, melee - focussed combat system.Your power will grow as you advance, but remember to uphold the Masquerade and guard your humanity... or face the consequences. ♝Descend into Seattle&apos;s Dark Heart and Survive the Vampire Elite. Seattle has always been run by vampires.Hunt your prey across Seattle locations faithfully reimagined in the World of Darkness.Meet the old blood founders present since the city&apos;s birth and the new blood steering the tech money redefining the city.Everyone has hidden agendas - so choose your allies wisely. ♚Enter into Uneasy Alliances. Choose a side among competing factions, each with their own unique traits and stories, in the war for Seattle&apos;s blood trade.The world will judge you by the company you keep, but remember no one&apos;s hands stay clean forever. ♛Experience the Story. Written by the creative mind behind the original Bloodlines, Vampire: The Masquerade® - Bloodlines™ 2 brings the ambitions of the first game to life and sees the return of a few fan favorite characters."

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
    "Recommend",
    "Meh",
    "Skip"
  ]

  const handleSetReviewInfo = async () => {
    try {
      const { data } = await reviewCheck({ variables: { gameId: gameId, userId: userInfo.userid } });
      if (data) {
        if (data.checkReview.checkReview) {
          setReviewInfo(prevState => ({
            ...prevState,
            title: oneData.oneGame.title,
            gameComment: data.checkReview.checkedReview.gameComment,
            userid: userInfo.userid,
            gameid: gameId,
            content: data.checkReview.checkedReview.content,
          }));
          router.push("/review")
        } else {
          setReviewInfo(prevState => ({
            ...prevState,
            title: oneData.oneGame.title,
            gameComment: "",
            userid: userInfo.userid,
            gameid: gameId,
            content: "",
            chooseRev: false
          }));
          router.push("/review")
        }
      } else {
        setReviewInfo(prevState => ({
          ...prevState,
          title: oneData.oneGame.title,
          gameComment: "",
          userid: userInfo.userid,
          gameid: gameId,
          content: "",
          chooseRev: false
        }));
        router.push("/review")
      }
    } catch (error) {
      if (error.graphQLErrors) {
        error.graphQLErrors.forEach(({ message }) => {
          alert(message)
        });
      }
    }
  }

  const handleFilterReviews = (option) => {
    setReviewOptions(option)
    if (allReviewData) {
      const revArray = ["Exceptional", "Recommend", "Meh", "Skip"]
      const copy = [...allReviewData.allGameReviews]
      if (revArray.includes(option)) {
        const filtered = copy.filter((item) => item.gameComment === option)
        setRevData(filtered)
      } else if (option === "Newest first") {
        const filtered = copy.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
        setRevData(filtered)
      } else if (option === "Oldest first") {
        const filtered = copy.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded));
        setRevData(filtered)
      }
    }
  }

  const utilityFunction = (id) => {
    router.push(`/users/${id}`)
  }


  if (loading || similarLoading) return <div style={{ alignSelf: "center", marginTop: "20%" }}><Loader /></div>;

  if (error || similarError) return <p>Error: {error ? error.message : similarError.message}</p>



  const gamePlatforms = oneData.oneGame.platforms.map(item => platformIcons[item]).filter(it => it !== undefined);


  return (
    <main className='game_main'>

      <div className='game_container row'>
        <div className='game-container-div1'>
          <div className='game-container-div1-gray-title' style={{ textTransform: "uppercase" }}><h4>{`HOME / GAMES / ${oneData.oneGame.title}`}</h4></div>

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
            <span className='m-l-2'>{`TOTAL PLAYERS: ${addCount} PLAYERS`}</span>
          </div>

          <div className='game-container-div1-title'><h1>{oneData.oneGame.title}</h1></div>

          <div className='game-container-div1-addTo'>
            <div className='addTo1'>
              {
                loader ? (<div className='addTo1-loader'><Loader /></div>) : (
                  <div onClick={handleAddtoGames}>
                    <p>{added ? "Added to" : "Add to"}</p>
                    <h4>My games - <span className='m-l-1'>{libraryCount}</span></h4>
                  </div>
                )
              }
              <Image src={greenplus} width={35} height={35} alt='plus-sign' className='addTo-svg' id='addtosvg' />
            </div>

            <div className='addTo2'
              onClick={() => {
                if (userInfo.username) {
                  if (addedToUserWishlist) {
                    alert("This game already exists in your wishlist")
                  } else { addGameToWishlist() }
                } else { router.push("/login") }
              }}
              style={addedToUserWishlist ? { background: "rgb(119, 177, 32)" } : { background: "transparent" }}
            >
              <div>
                <p style={addedToUserWishlist ? { color: "rgb(46, 46, 46)" } : { color: "rgb(106, 106, 106)" }}>{addedToUserWishlist ? "Added to" : "Add to"}</p>
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
              <h2><span>{gameRating.rated}</span></h2>
              <p>{`${gameRating.ratings} RATINGS`}</p>
            </div>

            <div className='ratings-div-container'>
              <div className='ratings-div2'>
                <h2>{`#${gameRating.ratings + 34}`}</h2>
                <p style={{ textTransform: "uppercase" }}>{oneData.oneGame.genres[0]}</p>
              </div>

              <div className='ratings-div3'>
                <h2>{`#${gameRating.ratings + 3}`}</h2>
                <p>TOP 2024</p>
              </div>
            </div>

          </div>

          <div className='ratings-bar'>
            <p>Click to rate</p>
            <div className='ratings-bar-bar'>

              <div className={reviewee === "Exceptional" ? "bar1 bar" : "bar1"}
                onClick={() => handleAddReview(null, "Exceptional", null)}
              >
                <div className="bar1div">
                  <Image src={bomb} width={40} height={40} alt='rating-svg' className='rating-bar-svg' />
                </div>
                <div className={reviewee === "Exceptional" ? "bar1-child barhov" : "bar1-child"}><div style={{ backgroundColor: "green" }}></div><p>Exceptional<strong>{gameRatingTypes.exceptional}</strong></p></div>
              </div>

              <div className={reviewee === "Recommend" ? "bar2 bar" : "bar2"}
                onClick={() => handleAddReview(null, "Recommend", null)}
              >
                <div className="bar2div">
                  <Image src={thumbsUp} width={50} height={50} alt='rating-svg' className='rating-bar-svg' />
                </div>
                <div className={reviewee === "Recommend" ? "bar2-child barhov" : "bar2-child"}><div style={{ backgroundColor: "blue" }}></div><p>Recommended<strong>{gameRatingTypes.recommend}</strong></p></div>
              </div>

              <div className={reviewee === "Meh" ? "bar3 bar" : "bar3"}
                onClick={() => handleAddReview(null, "Meh", null)}
              >
                <div className={reviewee === "Meh" ? "bar3-child barhov dsp-f justify-center" : "bar3-child dsp-f justify-center"}><div style={{ backgroundColor: "orange" }}></div><p>Meh<strong>{gameRatingTypes.meh}</strong></p></div>
              </div>

              <div className={reviewee === "Skip" ? "bar4 bar" : "bar4"}
                onClick={() => handleAddReview(null, "Skip", null)}
              >
                <div className={reviewee === "Skip" ? "bar4-child barhov" : "bar4-child"}><div style={{ backgroundColor: "red" }}></div><p>Skip<strong>{gameRatingTypes.skip}</strong></p></div>
              </div>

            </div>
          </div>

          <div className='write-review'>
            <UtilityButton text={"Write a review"} scale={0.8} color={"rgb(110, 110, 110)"} utilityFunction={handleSetReviewInfo} />
          </div>
          <div className='about-div'>
            <h4>About</h4>
            <div>
              <p>{oneData.oneGame.about.split(" ").join(" ").slice(0, sliceNo)} {buttonText ? "" : ".... "}<span onClick={handleReadMore}>{buttonText ? "Read less" : "Read more"}</span></p>
            </div>
          </div>

          <div className="game-info">

            <div className='game-info-div1'>
              <div><h4>Platforms</h4>{
                oneData.oneGame.platforms.map((item, index) => (<span key={index}>{item}</span>))
              }</div>
              <div><h4>Release date</h4><span>TBA</span></div>
              <div><h4>Publisher</h4><span>{oneData.oneGame.publisher}</span></div>
            </div>

            <div className='game-info-div2'>
              <div><h4>Genre</h4>{
                oneData.oneGame.genres.map((item, index) => (<span key={index}>{item}</span>))
              }</div>
              <div><h4>Developer</h4><span>{oneData.oneGame.developer}</span></div>
              <div><h4>Age Rating</h4><span>{oneData.oneGame.ageRating}</span></div>
            </div>

          </div>

          <div className="game-info2">
            {/* <div className='game-info2-div0'>
              <h4>Other games in the series</h4>
              <div>
                <span>Vampire: The Masquerade-Swansong,</span><span>Vampire: The Masquerade-Bloodhunt</span><span>Vampire: The Masquerade-Shadows of New York,</span><span>Vampire: The Masquerade-Coteries of New York</span><span>Vampire: The Masquerade-Redemption,</span>
              </div>

            </div> */}

            <div className='game-info2-div1'>
              <h4>Tags</h4>
              <div>
                {
                  oneData.oneGame.tags.map((item, index) => (
                    <span key={index}>{item}, </span>
                  ))
                }
              </div>

            </div>
            <div className="game-info2-div2">
              <h4>Website</h4>
              <a href={oneData.oneGame.website} target="_blank" rel="noopener noreferrer"><p>{oneData.oneGame.website}</p></a>
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
              cldVid={cld.video(oneData.oneGame.videoUrl)}
              plugins={[lazyload()]}
              controls
            />
          </div>

          <div className='game-container-div2-images'>
            {oneData.oneGame.imageUrl.slice(1, 5).map((image, index) => {
              return <div key={index}>
                <AdvancedImage
                  cldImg={cld.image(image)}
                  className="game-image"
                />
              </div>
            })}
          </div>

          <div className='game-container-div2-buyGame'>
            <p className='buyp'>Where to buy</p>
            <div className='buyGame1'>
              <a href="https://store.steampowered.com/" target="_blank" rel="noopener noreferrer">
                <div className='buy1'><p>Steam</p><Image src={steam} width={25} height={25} /></div>
              </a>

              <a href="https://www.xbox.com/en-US/microsoft-store" target='blank' rel='noopener noreferrer'>
                <div className='buy2'><p>X-box store</p><Image src={xboxGray} width={25} height={25} /></div>
              </a>
            </div>
          </div>

          <div className="game-users">
            <div className="game-users-title">Top users</div>
            {
              oneData.oneGame.buyers.edges.slice(0, 5).map((data, index) => {
                return <GameUsers key={index} image={data.node.profilePic} name={data.node.username} userId={data.node.userid} edits={data.node.boughtGames.edges.length} index={index} />
              })
            }
          </div>

        </div>

      </div>

      <div className='similar-games cols-8-xl' ref={similarParentRef}>

        <div className='dsp-f justify-center'>
          <h1>{`Games like ${oneData.oneGame.title}`}</h1>
        </div>

        <div>
          <div ref={similarRef}>
            {
              <SimilarGames data={similarGamesData} count={cardCount} />
            }
          </div>
          <div className='mt-4 dsp-f ai-c justify-center'>
            <div>
              <UtilityButton scale={0.85} color={"rgb(141, 141, 141)"} text={cardCount >= similarGamesData.similarUserGames.length ? "Show less" : "Show more"} utilityFunction={handleLoadMore} />
            </div>
          </div>
        </div>

      </div>

      <div className="reviews-div cols-5-xl cols-8-md cols-12-sm">

        <div className='reviews-div-container'>

          <div className='reviews-div-title'>
            <h1>{`${oneData.oneGame.title} Reviews`}</h1>
          </div>

          <div className='review-title'>
            <h2>Reviews<span>{reviewCount}</span></h2>
          </div>

          <div className='review-options'>
            <div className='clickoptions' onClick={() => setShowOptions(!showOptions)} ref={clickRef}>
              <span>{reviewOptions}</span>
              <Image src={arrowdown} width={12} height={12} alt='arrowdown' className={showOptions ? "review-arrow-up" : "review-arrow-down"} />
            </div>
            <div className={showOptions ? "showoptions review-options-options" : "hideoptions"}>
              {
                reviewViews.map((view, index) => {
                  return <span key={index} onClick={() => handleFilterReviews(view)} >{view}</span>
                })
              }
            </div>
          </div>
          <div>
            {
              revData && revData.map((item, index) => {
                return <ReviewBox rating={item.gameComment} allRevs={allReviews} replies={item.replies.edges} gameId={gameId} reviewId={item.reviewid} ratingsvg={comment[item.gameComment]} id={item.user.userid} utilityFunction={utilityFunction} profilePic={item.user.profilePic} name={item.user.username} review={item.content} date={item.dateAdded} likes={item.likes} dislikes={item.dislikes} key={index} index={index} />
              })
            }
          </div>
        </div>

      </div>
    </main>
  )
}
