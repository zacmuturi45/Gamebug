"use client"

import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faEllipsis, faRemove, faNavicon, faSpaceShuttle, faSignIn, faPencilSquare } from '@fortawesome/free-solid-svg-icons'
import MenuBar from './menuBar'
import UseScroll from './navScroll'
import gsap from 'gsap'
import Link from 'next/link'
import { useFilter } from '../contexts/sidenavContext'

export default function Navbar() {
    const [isTyping, setIsTyping] = useState(false);
    const [toggleMenu, setToggleMenu] = useState(false);
    const [formInput, setFormInput] = useState("");
    const scrollDirection = UseScroll();
    const [visible, setVisible] = useState(false);
    const inputRef = useRef(null);
    const { setFilter } = useFilter();


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
        if(formInput.length>0) {
            gsap.to(".onSearchTab", {
                visibility: "visible",
                minHeight: "200px",
                delay: .2,
                ease: "sine.inOut",
                duration: .3
            })
        } else {
            gsap.to(".onSearchTab", {
                visibility: "hidden"
            })
        }
    }, [])

    const handleTyping = () => {
        setIsTyping(true)
    }

    const focusSearchBar = () => {
        if(inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleKeydown = (event) => {
        if(event.ctrlKey && event.key === 'Enter') {
            event.preventDefault();
            focusSearchBar();
        } 
    };

    return (
        <main className={visible ? 'main__navbar dsp-f ai-c justify-space-between' : 'main__navbar nav-hidden dsp-f ai-c justify-space-between'}>
            <Link href="/"><h1 onClick={() => setFilter("Home")}>GameBug</h1></Link>
            <form>
                <div className="form-div">
                    <FontAwesomeIcon icon={faSearch} className='faSearch-icon' width={15} height={15} style={{fontSize: 15}} />
                    <div className="onSearchTab"></div>
                    <input
                        className={isTyping ? 'thickspans-white br-lg' : 'br-lg'}
                        onChange={(e) => {
                            handleTyping()
                            setFormInput(e.target.value)
                        }}
                        type='text'
                        id='search'
                        value={formInput}
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
