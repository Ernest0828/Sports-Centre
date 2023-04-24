import React from 'react'
import {faArrowRight} from '@fortawesome/free-solid-svg-icons'
import {faCircleXmark} from '@fortawesome/free-solid-svg-icons'
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import "./sportshall.css"

import Navbar from "../../navbar/Navbar"


const Sportshall = () => {

  const [slideNumber, setSlideNumber] = useState(0);
	const [open, setOpen] = useState(false);

  const photos = [
    {
        src: "https://sport.leeds.ac.uk/wp-content/uploads/2022/09/1-Gryphon-Sports-Hall-1030x687.jpg"
    },
    {
        src: "https://sport.leeds.ac.uk/wp-content/uploads/2022/09/5-Gryphon-Sports-Hall-1030x687.jpg"
    },
    {
        src: "https://sport.leeds.ac.uk/wp-content/uploads/2022/09/1-The-Edge-Sports-Hall-1030x687.jpg"
    },
    {
        src: "https://sport.leeds.ac.uk/wp-content/uploads/2022/09/4-The-Edge-Sports-Hall-1030x686.jpeg"
    },
    {
        src: "https://sport.leeds.ac.uk/wp-content/uploads/2022/09/2-The-Edge-Sports-Hall-1030x686.jpeg"
    },
    {
        src: "https://sport.leeds.ac.uk/wp-content/uploads/2022/09/2-Gryphon-Sports-Hall-1030x687.jpg"
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
					<div className="sportsHallContainer">
						{open && <div className="slider">
						<FontAwesomeIcon icon={faCircleXmark} className="close" onClick={()=>setOpen(false)} />
						<FontAwesomeIcon icon={faArrowLeft} className="arrow" onClick={()=>handleMove("l")}/>
						<div className="sliderWrapper">
							<img src={photos[slideNumber].src} alt="" className="sliderImg" />
						</div>
						<FontAwesomeIcon icon={faArrowRight} className="arrow" onClick={()=>handleMove("r")}/>					
						</div>}
					<div className="sportsHallWrapper">
									<button className="bookNow">Reserve or book now</button>
									<h1 className="sportsHallTitle">Sports Hall</h1>
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
									<div className="sportsHallImages">
											{photos.map((photo, i) => (
													<div className="sportsHallImgWrapper">
															<img onClick={()=>handleOpen(i)} src={photo.src} alt="" className="sportsHallImg" />
													</div>    
											))}
									</div>
											<div className="sportsHallDetails">
												<div className="sportsHallDetailsTexts">
													<h1 className="sportsHallTitle"> Score Big with GymCorp's Versatile Sports Hall</h1>
													<p className="sportsHallDesc">
                          The sports hall at GymCorp is a dynamic and flexible space that is perfect for team events and sports activities. This spacious hall can accommodate up to 45 people, making it an ideal location for games, practices, and team-building exercises. The hall is available for booking on Thursdays and Saturdays for team events for up to two hours, allowing teams to reserve the space for their training or competition needs. In addition, the hall can be booked in one-hour sessions on other days of the week. GymCorp staff maintain the hall to ensure it is clean, safe, and ready for use, providing teams with the perfect environment to achieve their goals. The hall is equipped with all the necessary equipment for a variety of sports, such as basketball, volleyball, badminton, and more. With its versatility and flexibility, the sports hall at GymCorp is the perfect venue for sports teams looking for a top-notch facility to train and compete in. Book your team event or practice session today and experience the exceptional quality of the GymCorp sports hall!
													</p>
												</div>
													<div className="sportsHallDetailsPrice">
                          <h1>Select your details</h1>
                         
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

export default Sportshall