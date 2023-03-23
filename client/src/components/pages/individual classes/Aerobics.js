import React from 'react'
import {faArrowRight} from '@fortawesome/free-solid-svg-icons'
import {faCircleXmark} from '@fortawesome/free-solid-svg-icons'
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import "./aerobics.css"

import Navbar from "../../navbar/navbar"

const Aerobics = () => {

  const [slideNumber, setSlideNumber] = useState(0);
	const [open, setOpen] = useState(false);

  const photos = [
    {
        src: "https://goodspaguide.co.uk/images/uploads/Features/Aerobics/aerobics-class.jpg"
    },
    {
        src: "https://goodspaguide.co.uk/images/uploads/Features/Resized_for_new_site_/aerobics.jpg"
    },
    {
        src: "https://i.ytimg.com/vi/K5li7rDDxpY/maxresdefault.jpg"
    },
    {
        src: "https://www.arijitsworkout.com/newdev/wp-content/uploads/2015/05/Aerobics-Training-Classes-in-Kolkata-e1432196402639.jpg"
    },
    {
        src: "https://images.wisegeek.com/aerobics-class-in-a-gym.jpg"
    },
    {
        src: "https://trifocusfitnessacademy.co.za/wp-content/uploads/2018/07/Untitled-design-165.jpg"
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
					<div className="aerobicsContainer">
						{open && <div className="slider">
						<FontAwesomeIcon icon={faCircleXmark} className="close" onClick={()=>setOpen(false)} />
						<FontAwesomeIcon icon={faArrowLeft} className="arrow" onClick={()=>handleMove("l")}/>
						<div className="sliderWrapper">
							<img src={photos[slideNumber].src} alt="" className="sliderImg" />
						</div>
						<FontAwesomeIcon icon={faArrowRight} className="arrow" onClick={()=>handleMove("r")}/>					
						</div>}
					<div className="aerobicsWrapper">
									<button className="bookNow">Reserve or book now</button>
									<h1 className="aerobicsTitle">Aerobics Classes</h1>
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
									<div className="aerobicsImages">
											{photos.map((photo, i) => (
													<div className="aerobicsImgWrapper">
															<img onClick={()=>handleOpen(i)} src={photo.src} alt="" className="aerobicsImg" />
													</div>    
											))}
									</div>
											<div className="aerobicsDetails">
												<div className="aerobicsDetailsTexts">
													<h1 className="aerobicsTitle"> Get Your Heart Pumping with Aerobics at GymCorp</h1>
													<p className="aerobicsDesc">
                          Looking for a fun and effective way to get in shape? Look no further than our aerobics classes! Our experienced instructors will guide you through a variety of high-energy exercises that will get your heart pumping and your body moving. From dance-inspired routines to step aerobics and more, you'll have a blast while burning calories and building endurance. Our aerobics classes are perfect for all fitness levels, whether you're just starting out or looking to take your workout to the next level. With a focus on cardiovascular fitness and overall health, our classes will help you achieve your fitness goals and leave you feeling energized and refreshed.
													</p>
												</div>
													<div className="aerobicsDetailsPrice">
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

export default Aerobics