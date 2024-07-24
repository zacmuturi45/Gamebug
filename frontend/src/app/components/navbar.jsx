"use client"

import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faEllipsis, faRemove, faNavicon, faSpaceShuttle, faSignIn, faPencilSquare } from '@fortawesome/free-solid-svg-icons'
import MenuBar from './menuBar'
import UseScroll from './navScroll'
import gsap from 'gsap'
import Link from 'next/link'
import { useFilter } from '../contexts/sidenavContext'
import Image from 'next/image'
import SearchGame from './searchGame'
import { getMiddleDigit, gradients, grateful, isaac, isLoggedIn, logout, nintendoWhite, psWhite, windowsWhite, login } from '../../../public/images'
import { useLazyQuery } from '@apollo/client'
import { SEARCH_QUERY } from '../GraphQL/queries'
import { AnimatePresence, motion } from 'framer-motion'
import { newReleases } from '../../../public/images'
import SideNavBox from './sideNavBox'
import { genres, platforms, arrowDown } from '../../../public/images'
import { logoutLogic } from './logout'
import { useRouter } from 'next/navigation'
import { destroyCookie } from 'nookies'
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

    const [fetchResults, { loading, data }] = useLazyQuery(SEARCH_QUERY);

    const router = useRouter();
    const { userInfo, setUserInfo } = useLoggedUser();

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
            const games = data.search.filter(item => item.gameid);
            const users = data.search.filter(item => item.userid);
            setGameResults(games);
            setUserResults(users);
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

    const pity = [{ im: grateful, gm: "Fifa 24", pt: [psWhite, windowsWhite, nintendoWhite] }, { im: grateful, gm: "Pes 24", pt: [psWhite, windowsWhite, nintendoWhite] }]
    const us = [{ im: grateful, gm: "Isaac" }, { im: isaac, gm: "Claire" }]

    return (
        <main className={visible ? 'main__navbar dsp-f ai-c justify-space-between' : 'main__navbar nav-hidden dsp-f ai-c justify-space-between'}>
            <Link href="/"><h1 onClick={() => setFilter("Home")}>GameBug</h1></Link>
            <form>
            <div className='toggleSearch'>
                <div><span>CTRL</span> + <span>ENTER</span></div>
            </div>
                <div className="form-div">
                    <FontAwesomeIcon icon={faSearch} className='faSearch-icon' width={15} height={15} style={{ fontSize: 15 }} />
                    <div className="onSearchTab" ref={searchRef}>
                        {loading && <Loader />}
                        {gameResults.length > 0 ? (
                            <div>
                                {
                                    gameResults.length > 0 && (
                                        <div className='gameResults'>
                                            <h2>Games</h2>
                                            {
                                                gameResults.map((item, index) => (
                                                    <SearchGame image={item.imageUrl} platform={item.platforms} itemIndex={index} title={item.title} id={item.gameid} user={"game"} setQuery={setQuery} />
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
                                                <SearchGame image={item.profilePic} itemIndex={index} title={item.username} id={item.userid} user={"user"} setQuery={setQuery} />
                                            ))
                                        }
                                    </div>
                                )}
                            </div>
                        ) : <div style={{ padding: "1.5rem" }}>{!loading && <p className='fw-3'>No results for "{query}"</p>}</div>}

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
                            <Link href="/login"><div onClick={() => setFilter("")}>
                                {userInfo.username ? <span style={{ textTransform: "capitalize" }}><NameCircle name={userInfo.username.slice(0, 1)} gradient={gradients[getMiddleDigit(userInfo.userid)]} /></span> : <span>LOG IN</span>}
                            </div></Link>
                            {!userInfo.username && (
                                <div>
                                    <div className='ul-child-div1'></div>
                                    <div className='ul-child-div1b'></div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="ul-divp">
                        <div className='ul-div2'>
                            <div>
                                {userInfo.username ? <span onClick={() => {
                                    handleLogout();
                                }}>SIGN OUT</span> : <span onClick={() => { router.push("/signup") }}>SIGN UP</span>}
                            </div>
                            <div className='ul-child-div2'></div>
                            <div className='ul-child-div1c'></div>
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
                    <MenuBar setToggleMenu={setToggleMenu} toggleMenu={toggleMenu} />
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
                                    <h2>My library</h2>
                                    <h2>Home</h2>
                                    <h2>Browse</h2>
                                    <div className='mobi-box'>
                                        <div style={{ paddingLeft: ".5rem" }}>
                                            <h3>New Releases</h3>
                                            {
                                                newReleases.map((item, index) => (
                                                    <div key={index}>
                                                        <SideNavBox image={item.image} text={item.text} setToggleMenu={setToggleMenu} />
                                                    </div>
                                                ))
                                            }
                                        </div>

                                        <div className='mt-3' style={{ paddingLeft: ".5rem" }}>
                                            <h3>Platforms</h3>
                                            {
                                                platforms.map((item, index) => (
                                                    <div key={index}>
                                                        <SideNavBox image={item.image} text={item.text} setToggleMenu={setToggleMenu} />
                                                    </div>
                                                ))
                                            }
                                        </div>

                                        <div className='mt-3 box' style={{ paddingLeft: ".5rem" }}>
                                            <h3 className='m-b-1'>Genres</h3>
                                            {
                                                genres.map((item, index) => (
                                                    <div key={index} className='sidenavbox-container'>
                                                        <SideNavBox image={item.image} text={item.text} setToggleMenu={setToggleMenu} />
                                                    </div>
                                                ))
                                            }

                                        </div>
                                    </div>
                                </div>

                                <div className='mobi-div2'>
                                    {userInfo.username ? <div style={{ textTransform: "capitalize", minHeight: 80, display: "flex", flexDirection: "column", alignItems: "center" }}><NameCircle name={userInfo.username.slice(0, 1)} gradient={gradients[getMiddleDigit(userInfo.userid)]} /><span className='mt-1' style={{ color: "rgb(106, 106, 106)" }}>My Profile</span>
                                    </div> : <div className='dsp-f fd-c ai-c' onClick={() => {
                                        setToggleMenu(false)
                                        router.push("/signup")
                                    }}><Image src={login} width={50} height={50} alt='logout-svg' className='logout-svg' /><span>SIGN UP</span></div>}

                                    {userInfo.username ? (
                                        <div className='dsp-f fd-c ai-c'>
                                            <Image src={logout} width={50} height={50} alt='logout-svg' className='logout-svg' onClick={() => handleLogout()} />
                                            <span onClick={() => {
                                                handleLogout();
                                            }}>Logout</span>
                                        </div>
                                    ) : (
                                        <div className='dsp-f fd-c ai-c'>
                                            <Image src={logout} width={50} height={50} alt='logout-svg' className='logout-svg' onClick={() => {
                                                setToggleMenu(false)
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
