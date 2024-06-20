"use client"

import "../css/index.css"
import { arrowdown } from "../../../public/images";
import { tick } from "../../../public/images";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";


export default function Home() {

    const [sortBy, setSortBy] = useState("Relevance");
    const [platforms, setPlatforms] = useState("Platforms");

    const [sortVisible, setSortVisible] = useState(false);
    const [platformVisible, setPlatformVisible] = useState(false);

    const popup1Ref = useRef(null);
    const popup2Ref = useRef(null);

    const spanOne = ["Relevance", "Date added", "Name", "Release date", "Popularity", "Average rating"]
    const spanTwo = ["PC", "Playstation", "Xbox", "iOS", "Android", "Nintendo"]

    const handleSort = () => {
        setSortVisible(true)
    }

    const handlePlatform = () => {
        setPlatformVisible(true)
    }

    const handleClickOutside = () => {
        if (popup1Ref.current) {
            setSortVisible(false);
        }
        if (popup2Ref.current) {
            setPlatformVisible(false);
        }
    };

    useEffect(() => {
        if (sortVisible || platformVisible) {
            document.addEventListener('click', handleClickOutside, true);
        } else {
            document.removeEventListener('click', handleClickOutside, true);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [sortVisible, platformVisible]);

    return (
        <main className="col-10-lg main-pagejsx">
            <div className="main-pagejsx-h1">
                <h1>Highest rated games</h1>
                <p className="mt-2">Based on player reviews and most played</p>
            </div>


            <div className="options-box mt-2">
                <div className="options-box-child" onClick={() => handleSort()}>
                    {sortVisible &&
                        (<div className="options-box-absolute" ref={popup1Ref}>
                            {spanOne.map((item, index) => {
                                return <div className="spanOne" key={index} onClick={() => setSortBy(item)}>
                                    {item}
                                    <Image src={tick} width={12} height={12} alt="tick-svg" className="tick-svg" />
                                </div>
                            })}
                        </div>)
                    }
                    <div className="options-box-pdiv">
                        Order by: <strong style={{ marginLeft: ".1rem" }}>{sortBy}</strong>
                    </div>
                    <Image src={arrowdown} width={15} height={15} alt="svg-image" style={{ cursor: "pointer" }} />
                </div>

                <div className="options-box-child1" onClick={() => handlePlatform()}>
                    {platformVisible && (<div className="options-box-absolute1" ref={popup2Ref}>
                        {spanTwo.map((item, index) => {
                            return <div className="spanTwo" key={index}>
                                {item}
                                <Image src={tick} width={12} height={12} alt="tick-svg" className="tick-svg" />
                            </div>
                        })}
                    </div>)}
                    <div className="options-box-pdiv1">
                        <strong>{platforms}</strong>
                    </div>
                    <Image src={arrowdown} width={15} height={15} alt="svg-image" style={{ cursor: "pointer" }} />
                </div>
            </div>
        </main>
    );
}
