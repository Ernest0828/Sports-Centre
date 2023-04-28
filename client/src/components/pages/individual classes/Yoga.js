import React from 'react'
import {faArrowRight} from '@fortawesome/free-solid-svg-icons'
import {faCircleXmark} from '@fortawesome/free-solid-svg-icons'
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import "./yoga.css"

import Navbar from "../../navbar/Navbar"

const Yoga = () => {

  const [slideNumber, setSlideNumber] = useState(0);
	const [open, setOpen] = useState(false);

  const photos = [
    {
        src: "https://hips.hearstapps.com/hmg-prod/images/female-instructor-with-yoga-class-in-the-gym-royalty-free-image-700718696-1561407106.jpg?crop=0.670xw:1.00xh;0.152xw,0&resize=1200:*"
    },
    {
        src: "https://images.squarespace-cdn.com/content/v1/58da14959de4bb3d0fae9521/1594912709299-C2RB91TSQ83BIG5325FY/Paperdress_LOW+RES+1.jpeg?format=1000w"
    },
    {
        src: "https://i.insider.com/6172edae4f281c001296a1e7?width=700"
    },
    {
        src: "https://secretnyc.co/wp-content/uploads/2022/08/the-studio-1-e1664829765772-1024x683.jpeg"
    },
    {
        src: "https://i0.wp.com/www.yogabasics.com/yogabasics2017/wp-content/uploads/2014/12/gentle-yoga-class.jpeg"
    },
    {
        src: "https://yogapractice.com/wp-content/uploads/2018/08/15-Yoga-Classes-with-Meditations.jpg"
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
      <Navbar/>
					<div className="yogaContainer">
						{open && <div className="slider">
						<FontAwesomeIcon icon={faCircleXmark} className="close" onClick={()=>setOpen(false)} />
						<FontAwesomeIcon icon={faArrowLeft} className="arrow" onClick={()=>handleMove("l")}/>
						<div className="sliderWrapper">
							<img src={photos[slideNumber].src} alt="" className="sliderImg" />
						</div>
						<FontAwesomeIcon icon={faArrowRight} className="arrow" onClick={()=>handleMove("r")}/>					
						</div>}
					<div className="yogaWrapper">
									<button className="bookNow">Reserve or book now</button>
									<h1 className="yogaTitle">Yoga Classes</h1>
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
									<div className="yogaImages">
											{photos.map((photo, i) => (
													<div className="yogaImgWrapper">
															<img onClick={()=>handleOpen(i)} src={photo.src} alt="" className="yogaImg" />
													</div>    
											))}
									</div>
											<div className="yogaDetails">
												<div className="yogaDetailsTexts">
													<h1 className="yogaTitle"> Find Inner Peace with Yoga at GymCorp</h1>
													<p className="yogaDesc">
                          Unwind and find your inner peace with our Yoga classes at GymCorp. Join us every week for two sessions of restorative Yoga, held on Fridays at 7-8pm and Sundays at 9-10am. Our experienced instructors lead classes suitable for all levels, from beginners to experienced yogis. Take a break from the stresses of everyday life and join us in our dedicated studio space, equipped with everything you need to feel comfortable and supported during your practice. Bookings are essential, so reserve your spot in advance and start your journey towards a healthier, more relaxed you.
													</p>
												</div>
													<div className="yogaDetailsPrice">
                          <h1>Select your details</h1>

                          <span>
                              Dropdown boxes here
                          </span>
                              <h2>
                                  Special requests
                              </h2>
                              <h2>
																	<b>$999</b> (per class)
																</h2>
                              <button>Reserve or Book now</button>
													</div>
											</div> 
                        
									</div>
							</div>
    </div>    
  )
}

export default Yoga