"use client"

import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faEllipsis, faRemove, faNavicon, faSpaceShuttle, faSignIn, faPencilSquare } from '@fortawesome/free-solid-svg-icons'
import MenuBar from './menuBar'
import UseScroll from './navScroll'
import gsap from 'gsap'
import Link from 'next/link'
import { useFilter } from '../contexts/sidenavContext'
import SearchGame from './searchGame'
import { grateful, isaac, nintendoWhite, psWhite, windowsWhite } from '../../../public/images'
import { useLazyQuery } from '@apollo/client'
import { SEARCH_QUERY } from '../GraphQL/queries'

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


    useEffect(() => {
        if (query.length > 0) {
            fetchResults({ variables: { query } })
        } else {
            setGameResults([]);
            setUserResults([]);
        };
    }, [query])

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
        if(!searchRef.current.contains(e.target)) {
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
                <div className="form-div">
                    <FontAwesomeIcon icon={faSearch} className='faSearch-icon' width={15} height={15} style={{ fontSize: 15 }} />
                    <div className="onSearchTab" ref={searchRef}>
                        {loading && <p style={{margin: "1rem"}}>Loading.....</p>}
                        {gameResults.length > 0 ? (
                            <div>
                                {
                                    gameResults.length>0 && (
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

                                {userResults.length>0 && (
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
                        ) : <div style={{padding: "1.5rem"}}>{!loading && <p className='fw-3'>No results for "{query}"</p>}</div>}

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
                            <Link href="/login"><span onClick={() => setFilter("")}>LOG IN</span></Link>
                            <div className='ul-child-div1'></div>
                            <div className='ul-child-div1b'></div>
                        </div>
                    </div>

                    <div className="ul-divp">
                        <div className='ul-div2'>
                            <Link href="/signup"><span onClick={() => setFilter("")}>SIGN UP</span></Link>
                            <div className='ul-child-div2'></div>
                            <div className='ul-child-div1c'></div>
                        </div>
                    </div>

                    <div className="ellipsis-div-main">
                        <li className="m-r-2"><FontAwesomeIcon icon={faEllipsis} className='faEllipsis' /></li>
                        <div className="ellipsis-div"></div>
                    </div>
                </ul>

                <div className='overlay'>
                    <div className='menuToggler dsp-f ai-c fs-lg'>
                        {toggleMenu ? <FontAwesomeIcon icon={faRemove} aria-hidden='false' className='m-r-5 faremoveIcon' /> : <MenuBar />}
                        {toggleMenu && (
                            <div className="faremove dsp-f thickspans-white">
                                <div>
                                    <div className='dsp-f fd-c'>
                                        <h2>Home</h2>
                                        <div className='rateG'>
                                            <FontAwesomeIcon icon={faSpaceShuttle} className='m-r-1 spans-gray' />
                                            <span>Rate top games</span>
                                        </div>
                                        <div>
                                            <h2 className='m-b-4'>Reviews</h2>
                                            <h2>Browse</h2>
                                            <p>Collections</p>
                                            <p>Platforms</p>
                                            <p>Stores</p>
                                            <p>Genres</p>
                                            <p>Creators</p>
                                            <p>Tags</p>
                                            <p>Developers</p>
                                            <p>Publishers</p>
                                            <h2>Reviews</h2>
                                            <h2>API</h2>
                                            <h2>Get an API KEY</h2>
                                            <h2>Sitemap</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="dsp-f fd-c ai-c">
                                    <FontAwesomeIcon icon={faRemove} className='fs-lg spans-black m-b-2' style={{ fontSize: 43 }} onClick={() => setToggleMenu(false)} />
                                    <FontAwesomeIcon icon={faSignIn} style={{ fontSize: 43 }} className='fs-lg spans-black' />
                                    <span style={{ fontSize: 10 }} className='m-b-2'>Login</span>
                                    <FontAwesomeIcon icon={faPencilSquare} style={{ fontSize: 43 }} className='fs-lg spans-black' />
                                    <span style={{ fontSize: 10 }}>Sign up</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    )
}
