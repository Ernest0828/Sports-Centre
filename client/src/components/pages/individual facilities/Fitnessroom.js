import React from 'react'
import {faArrowRight} from '@fortawesome/free-solid-svg-icons'
import {faCircleXmark} from '@fortawesome/free-solid-svg-icons'
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import "./fitnessroom.css"
import Navbar from "../../navbar/navbar"

const Fitnessroom = () => {

  const [slideNumber, setSlideNumber] = useState(0);
	const [open, setOpen] = useState(false);

  const photos = [
    {
        src: "https://originfitness.com/wp-content/uploads/2019/09/gymshark-17-1200x675.jpg"
    },
    {
        src: "https://originfitness.com/wp-content/uploads/2019/09/gymshark-6-1200x675.jpg"
    },
    {
        src: "https://originfitness.com/wp-content/uploads/2019/09/gymshark-20-1200x675.jpg"
    },
    {
        src: "https://originfitness.com/wp-content/uploads/2019/09/gymshark-26-1200x675.jpg"
    },
    {
        src: "https://originfitness.com/wp-content/uploads/2019/09/gymshark-16-1200x675.jpg"
    },
    {
        src: "https://www.leisureopportunities.co.uk/images/imagesX/HIGH342882_73202_103776.jpg"
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
					<div className="fitnessRoomContainer">
						{open && <div className="slider">
						<FontAwesomeIcon icon={faCircleXmark} className="close" onClick={()=>setOpen(false)} />
						<FontAwesomeIcon icon={faArrowLeft} className="arrow" onClick={()=>handleMove("l")}/>
						<div className="sliderWrapper">
							<img src={photos[slideNumber].src} alt="" className="sliderImg" />
						</div>
						<FontAwesomeIcon icon={faArrowRight} className="arrow" onClick={()=>handleMove("r")}/>					
						</div>}
					<div className="fitnessRoomWrapper">
									<button className="bookNow">Reserve or book now</button>
									<h1 className="fitnessRoomTitle">Fitness Room</h1>
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
									<div className="fitnessRoomImages">
											{photos.map((photo, i) => (
													<div className="fitnessRoomImgWrapper">
															<img onClick={()=>handleOpen(i)} src={photo.src} alt="" className="fitnessRoomImg" />
													</div>    
											))}
									</div>
											<div className="fitnessRoomDetails">
												<div className="fitnessRoomDetailsTexts">
													<h1 className="fitnessRoomTitle"> Get Fit Your Way: GymCorp's Versatile Fitness Room</h1>
													<p className="fitnessRoomDesc">
                          The Fitness room at GymCorp is a well-equipped space that offers a range of equipment for individuals to use for general fitness purposes. With cardio machines like treadmills, stationary bikes, and ellipticals, visitors can get their heart rate up and burn calories. There are also strength training machines and free weights available for those looking to build muscle and increase their overall strength. The room is spacious and well-lit, providing a comfortable environment to work out in. GymCorp staff regularly maintain and clean the equipment, ensuring it is safe and ready to use. The Fitness room is open to all members of GymCorp and offers a convenient and effective way to work on overall fitness goals.
													</p>
												</div>
													<div className="fitnessRoomDetailsPrice">
                          <h1>Select your details</h1>
                            <span>
                                Dropdown boxes here
                            </span>
                                <h2>
                                    Special requests box
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

export default Fitnessroom