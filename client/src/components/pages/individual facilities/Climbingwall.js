import React from 'react'
import {faArrowRight} from '@fortawesome/free-solid-svg-icons'
import {faCircleXmark} from '@fortawesome/free-solid-svg-icons'
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import "./climbingwall.css"
import Calendar from 'react-calendar'

const Climbingwall = () => {

    const [slideNumber, setSlideNumber] = useState(0);
	const [open, setOpen] = useState(false);

    const photos = [
        {
            src: "https://columns.wlu.edu/wp-content/uploads/2022/10/PHOTO-2-CLIMBING-800x533.jpg"
        },
        {
            src: "https://www.lydiascapes.com/wp-content/uploads/2019/09/bhargava-marripati-5B5VzqTf3vw-unsplash-800x533.jpeg"
        },
        {
            src: "https://columns.wlu.edu/wp-content/uploads/2022/10/PHOTO-4-CLIMBING-800x533.jpg"
        },
        {
            src: "https://www.australias.guide/nsw/wp-content/uploads/sites/3/attraction/blochaus-bouldering-marrickville-618352024c08379f0a574b90-800x533.jpeg"
        },
        {
            src: "https://gray-kkco-prod.cdn.arcpublishing.com/resizer/9VrM5cMUdnE4QpM3uSejXq1zdEo=/800x533/smart/filters:quality(70)/cloudfront-us-east-1.images.arcpublishing.com/gray/HQKS7OAYU5EQDNF5YHJDZJKLMM.jpg"
        },
        {
            src: "https://www.lydiascapes.com/wp-content/uploads/2019/07/BUMP-Bouldering-800x533.jpg"
        },
      ];

      const handleOpen = (i) => {
        setSlideNumber(i);
        setOpen(true);
    }

    const handleMove = (direction) =>{
        let newSlideNumber;
    
        if(direction === "l"){
            newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
        }else{
            newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
        }
    
        setSlideNumber(newSlideNumber)
    }
    return (
        <div>
                        <div className="climbingWallContainer">
                            {open && <div className="slider">
                            <FontAwesomeIcon icon={faCircleXmark} className="close" onClick={()=>setOpen(false)} />
                            <FontAwesomeIcon icon={faArrowLeft} className="arrow" onClick={()=>handleMove("l")}/>
                            <div className="sliderWrapper">
                                <img src={photos[slideNumber].src} alt="" className="sliderImg" />
                            </div>
                            <FontAwesomeIcon icon={faArrowRight} className="arrow" onClick={()=>handleMove("r")}/>					
                            </div>}
                        <div className="climbingWallWrapper">
                                        <button className="bookNow">Reserve or book now</button>
                                        <h1 className="climbingWallTitle"> Climbing Wall</h1>
                                        {/*<div className="hotelAddress">
                                        <FontAwesomeIcon icon={faCircleXmark} />
                                        <span>Elton st 125 New York</span>
                                        </div>
                                        <span className="hotelDistance">
                                            Excellent location - 500m from cetner
                                        </span>
                                        <span className="hotelPriceHighlight">
                                            book at 141 ath this proper and get free airpot taxi
        </span>*/}
                                        <div className="climbingWallImages">
                                                {photos.map((photo, i) => (
                                                        <div className="climbingWallImgWrapper">
                                                                <img onClick={()=>handleOpen(i)} src={photo.src} alt="" className="climbingWallImg" />
                                                        </div>    
                                                ))}
                                        </div>
                                                <div className="climbingWallDetails">
                                                    <div className="climbingWallDetailsTexts">
                                                        <h1 className="climbingWallTitle"> Climb to New Heights: GymCorp's State-of-the-Art Climbing Wall</h1>
                                                        <p className="climbingWallDesc">
                                                        GymCorp's climbing wall is a challenging and exciting addition to our facility, perfect for climbers of all levels. The wall is open from 10am - 8pm daily and can accommodate up to 22 people for general use. Whether you are a beginner or an experienced climber, our climbing wall offers a range of routes and challenges to suit your abilities. Our trained staff are always on hand to provide assistance and guidance, ensuring a safe and enjoyable climbing experience. The wall is equipped with all the necessary safety equipment, including harnesses and ropes, and is regularly maintained to ensure its safety and reliability. Come and test your skills on our climbing wall and experience the thrill of reaching new heights. Book your session today and see why the climbing wall at GymCorp is a must-try activity for all fitness enthusiasts!
                                                        </p>
                                                    </div>
                                                        <div className="climbingWallDetailsPrice">
                                                                <h1>Select your details</h1>
                                                                <Calendar />
                                                                <span>
                                                                    Dropdown boxes here
                                                                </span>
                                                                    <h2>
                                                                        Special requests
                                                                    </h2>
                                                                    <textarea placeholder="Any special requests?"></textarea>
                                                                    <h2>
																	<b>$999</b> (per hour)
																</h2>
                                                                    <button>Reserve or Book now</button>
                                                        </div>
                                                </div>                                                    
                                        </div>
                                </div>
        </div>    
      )
}

export default Climbingwall 