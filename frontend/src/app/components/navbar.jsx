"use client"

import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faEllipsis } from '@fortawesome/free-solid-svg-icons'
import UseScroll from './navScroll'
import gsap from 'gsap'
import Link from 'next/link'
import { useFilter } from '../contexts/sidenavContext'
import Image from 'next/image'
import SearchGame from './searchGame'
import { getMiddleDigit, gradients, grateful, isaac, isLoggedIn, logout, nintendoWhite, psWhite, windowsWhite, login, giftBox, plusWhite, cart, notification } from '../../../public/images'
import { useLazyQuery } from '@apollo/client'
import { SEARCH_QUERY } from '../GraphQL/queries'
import { AnimatePresence, motion } from 'framer-motion'
import { newReleases } from '../../../public/images'
import SideNavBox from './sideNavBox'
import { genres, platforms } from '../../../public/images'
import { usePathname, useRouter } from 'next/navigation'
import { useLoggedUser } from '../contexts/loginContext'
import NameCircle from './nameCircle'
import Loader from './loader'

const mobiVariant = {
    initial: {
        right: "-100%"
    },
    enter: {
        right: 0,
        transition: { duration: 0.4, delay: 0.2, ease: [0.85, 0, 0.15, 1] }
    },
    exit: {
        right: "-100%",
        transition: { duration: 0.5, delay: 0.2, ease: [0.85, 0, 0.15, 1] }
    }
}

export default function Navbar() {
    const [isTyping, setIsTyping] = useState(false);
    const [toggleMenu, setToggleMenu] = useState(false);
    const [query, setQuery] = useState("");
    const scrollDirection = UseScroll();
    const [visible, setVisible] = useState(false);
    const inputRef = useRef(null);
    const { setFilter } = useFilter();
    const [gameResults, setGameResults] = useState([]);
    const searchRef = useRef(null);
    const [userResults, setUserResults] = useState([]);
    const [isAnimated, setIsAnimated] = useState(false);
    const [fetchResults, { loading, data }] = useLazyQuery(SEARCH_QUERY);

    const router = useRouter();
    const { userInfo, setUserInfo } = useLoggedUser();
    const pathname = usePathname();

    useEffect(() => {
        if (query.length > 0) {
            fetchResults({ variables: { query } })
        } else {
            setGameResults([]);
            setUserResults([]);
        };
    }, [query])

    useEffect(() => {
        const body = document.body;
        if (toggleMenu) {
            body.classList.toggle("no-scroll");
        } else { body.classList.remove('no-scroll'); }
    }, [toggleMenu])

    useEffect(() => {
        if (data) {
            const users = data.search.filter(item => item.userid);
            const games = data.search.filter(item => item.gameid);
            setUserResults(users);
            setGameResults(games);
        }
    }, [data]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeydown)

        return () => {
            document.removeEventListener('keydown', handleKeydown)
        }
    }, [])

    useEffect(() => {
        if (scrollDirection === 'down') {
            setVisible(false);
        } else {
            setVisible(true);
        }
    }, [scrollDirection])

    useEffect(() => {
        window.addEventListener('click', hideQuery)

        return () => {
            window.removeEventListener('click', hideQuery)
        }
    }, [])

    const hideQuery = (e) => {
        if (!searchRef.current.contains(e.target)) {
            setQuery("")
        }
    }

    useEffect(() => {
        if (query.length > 0) {
            gsap.to(".onSearchTab", {
                visibility: "visible",
                delay: .2,
                ease: "sine.inOut",
                duration: .3
            })
        } else {
            gsap.to(".onSearchTab", {
                visibility: "hidden"
            })
        }
    }, [query])

    const handleTyping = () => {
        setIsTyping(true)
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        setFilter("")
        setUserInfo({})
        router.push("/login")
        setToggleMenu(false)
    }

    const focusSearchBar = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleKeydown = (event) => {
        if (event.ctrlKey && event.key === 'Enter') {
            event.preventDefault();
            focusSearchBar();
        }
    };

    const handleClick = () => {
        if (isAnimated) {
            gsap.to(".div1", {
                opacity: 1,
                duration: .2,
                ease: "sine.inOut"
            });
            gsap.to(".div2", {
                rotate: "0deg",
                duration: .3,
                ease: "sine.inOut"
            });
            gsap.to(".div3", {
                marginTop: "7px",
                rotate: "0deg",
                duration: .3,
                ease: "sine.inOut"
            });
        } else {
            gsap.to(".div1", {
                opacity: 0,
                duration: .2,
                ease: "sine.inOut"
            })
            gsap.to(".div2", {
                rotate: "-45deg",
                duration: .3,
                ease: "sine.inOut"
            })
            gsap.to(".div3", {
                marginTop: 0,
                rotate: "45deg",
                duration: .3,
                ease: "sine.inOut"
            })
        }
        setIsAnimated(!isAnimated);
        setToggleMenu(!toggleMenu)
    }


    const handleRoute = (item) => {
        setFilter(item)
        handleClick()
        router.push("/")
    }



    return (
        <main className={pathname === "/review" ? "hide" : (visible ? 'main__navbar' : 'main__navbar nav-hidden')}>
            <Link href="/"><h1 onClick={() => setFilter("Home")}>GameBug</h1></Link>
            <form>
                <div className='toggleSearch'>
                    <div><span>CTRL</span> + <span>ENTER</span></div>
                </div>
                <div className="form-div">
                    <FontAwesomeIcon icon={faSearch} className='faSearch-icon' width={15} height={15} style={{ fontSize: 15 }} />
                    <div className="onSearchTab" ref={searchRef}>
                        {loading && (<div className='nav-loader'><Loader /></div>)}
                        {gameResults.length > 0 ? (
                            <div>
                                {
                                    gameResults.length > 0 && (
                                        <div className='gameResults'>
                                            <h2>Games</h2>
                                            {
                                                gameResults.map((item, index) => (
                                                    <SearchGame key={index} image={item.imageUrl[0]} platform={item.platforms} itemIndex={index} title={item.title} id={item.gameid} user={"game"} setQuery={setQuery} />
                                                ))
                                            }
                                        </div>
                                    )
                                }

                                {userResults.length > 0 && (
                                    <div className='userResults'>
                                        <h2>Users</h2>
                                        {
                                            userResults.map((item, index) => (
                                                <SearchGame key={index} image={item.profilePic} itemIndex={index} title={item.username} id={item.userid} user={"user"} setQuery={setQuery} />
                                            ))
                                        }
                                    </div>
                                )}
                            </div>
                        ) : <div style={{ padding: "1.5rem" }}>{!loading && <p className='fw-3'>No results for &quot;{query}&quot;</p>}</div>}

                        {/* {data && (data.search.length > 10 && <p id='p-results'>See all results</p>)} */}
                    </div>
                    <input
                        className={isTyping ? 'thickspans-white br-lg' : 'br-lg'}
                        onChange={(e) => {
                            handleTyping()
                            setQuery(e.target.value)
                        }}
                        type='text'
                        id='search'
                        value={query}
                        placeholder='Search Games'
                        ref={inputRef}
                    />
                </div>
            </form>
            <div className="dsp-f toggle">
                <ul className='nav-ul'>
                    <div className='ul-divp'>
                        <div className='ul-div1'>
                            <Link href={userInfo.userid ? `/users/${userInfo.userid}` : "/login"}><div onClick={() => setFilter("")}>
                                {userInfo.username ? <span style={{ textTransform: "capitalize" }} className='dsp-f ai-c my-library'><NameCircle name={userInfo.username.slice(0, 1)} gradient={gradients[getMiddleDigit(userInfo.userid)]} /><span style={{ margin: "0 .5rem 0 .2rem", fontWeight: 400 }}>My library</span></span> : <span>LOG IN</span>}
                            </div></Link>
                            {!userInfo.username && (
                                <div>
                                    <div className='ul-child-div1'></div>
                                    <div className='ul-child-div1b'></div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={userInfo.username ? "ul-divp1" : "ul-divp"}>
                        <div className='ul-div2'>
                            <div>
                                {userInfo.username ? <div style={{ marginRight: 10, display: "flex" }}>
                                    <><Image src={notification} height={30} width={30} alt='notification' onClick={() => router.push("/notifications")} /></>
                                    <div className='nav-info dsp-f ai-c' onClick={() => handleLogout()}><Image src={logout} height={25} width={25} alt='plus' /></div>
                                </div> : <span onClick={() => { router.push("/signup") }}>SIGN UP</span>}
                            </div>
                            <div className='ul-child-div2' style={userInfo.username ? { display: "none" } : { display: "block" }}></div>
                            <div className='ul-child-div1c' style={userInfo.username ? { display: "none" } : { display: "block" }}></div>
                        </div>
                    </div>

                    <div className="ellipsis-div-main">
                        <li className="m-r-2"><FontAwesomeIcon icon={faEllipsis} className='faEllipsis' /></li>
                        <div className="ellipsis-div">
                            <Link href="#"><span>@Twitter</span></Link>
                            <Link href="#"><span>@Facebook</span></Link>
                            <Link href="#"><span>@Instagram</span></Link>
                            <Link href="#"><span>@Discord</span></Link>
                            <div><span>@Github</span></div>
                        </div>
                    </div>
                </ul>

                <div className="overlay">
                    <div className='menuBar' onClick={() => handleClick()}>
                        <div className='div1'></div>
                        <div className='div2'></div>
                        <div className='div3'></div>
                    </div>
                </div>
            </div>
            <AnimatePresence>

                {
                    toggleMenu && (
                        <motion.div
                            variants={mobiVariant}
                            initial={"initial"}
                            animate={"enter"}
                            exit={"exit"}
                            className='mobi-menu'>
                            <div className='mobi-container'>
                                <div className='mobi-div1'>
                                    <h2 onClick={() => handleRoute("Home")}>Home</h2>
                                    <h2>Browse</h2>
                                    <div className='mobi-box'>
                                        <div style={{ paddingLeft: ".5rem" }}>
                                            <h3>New Releases</h3>
                                            {
                                                newReleases.map((item, index) => (
                                                    <div key={index}>
                                                        <SideNavBox image={item.image} text={item.text} handleRoute={handleRoute} />
                                                    </div>
                                                ))
                                            }
                                        </div>

                                        <div className='mt-3' style={{ paddingLeft: ".5rem" }}>
                                            <h3>Platforms</h3>
                                            {
                                                platforms.map((item, index) => (
                                                    <div key={index}>
                                                        <SideNavBox image={item.image} text={item.text} handleRoute={handleRoute} />
                                                    </div>
                                                ))
                                            }
                                        </div>

                                        <div className='mt-3 box' style={{ paddingLeft: ".5rem" }}>
                                            <h3 className='m-b-1'>Genres</h3>
                                            {
                                                genres.map((item, index) => (
                                                    <div key={index} className='sidenavbox-container'>
                                                        <SideNavBox image={item.image} text={item.text} handleRoute={handleRoute} />
                                                    </div>
                                                ))
                                            }

                                        </div>
                                    </div>
                                </div>

                                <div className='mobi-div2' style={{ marginRight: -15 }}>
                                    {userInfo.username ? <div style={{ textTransform: "capitalize", minHeight: 80, display: "flex", flexDirection: "column", alignItems: "flex-end", cursor: "pointer" }}
                                        onClick={() => {
                                            setFilter("")
                                            handleClick()
                                            router.push(`/users/${userInfo.userid}`)
                                        }}
                                    ><NameCircle name={userInfo.username.slice(0, 1)} gradient={gradients[getMiddleDigit(userInfo.userid)]} /><span className='mt-1' style={{ color: "rgb(106, 106, 106)" }}>My Library</span>
                                    </div> : <div className='dsp-f fd-c' style={{ alignItems: "flex-end", marginRight: 15 }} onClick={() => {
                                        setFilter("")
                                        handleClick()
                                        router.push("/signup")
                                    }}><Image src={login} width={50} height={50} alt='logout-svg' className='logout-svg' /><span>SIGN UP</span></div>}


                                    {userInfo.username ? (
                                        <div className='dsp-f fd-c ai-c' style={{ alignItems: "flex-end" }}>
                                            <div style={{ marginRight: 15, justifyContent: "flex-end", alignItems: "flex-end", cursor: "pointer" }} className='dsp-f fd-c'
                                                onClick={() => {
                                                    handleClick()
                                                    router.push("/notifications")
                                                }}
                                            ><Image src={notification} height={35} width={35} alt='notification' /><span style={{ marginTop: 5 }}>Notifications</span></div>
                                            <div className="dsp-f fd-c ai-c" style={{ paddingRight: 12, cursor: "pointer" }}
                                                onClick={() => {
                                                    setFilter("")
                                                    handleClick()
                                                    handleLogout();
                                                }}
                                            >
                                                <Image src={logout} width={50} height={50} alt='logout-svg' className='logout-svg' onClick={() => handleLogout()} />
                                                <span>Logout</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className='dsp-f fd-c ai-c' style={{ marginRight: 15 }}>
                                            <Image src={logout} width={50} height={50} alt='logout-svg' className='logout-svg' onClick={() => {
                                                setFilter("")
                                                handleClick()
                                                router.push("/login")
                                            }} />
                                            <span>LOG IN</span>
                                        </div>
                                    )}

                                </div>
                            </div>
                        </motion.div>
                    )
                }
            </AnimatePresence>

        </main>
    )
}
