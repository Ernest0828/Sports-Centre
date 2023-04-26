import React from 'react'
import {faArrowRight} from '@fortawesome/free-solid-svg-icons'
import {faCircleXmark} from '@fortawesome/free-solid-svg-icons'
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import "./squashcourt.css"

import Navbar from "../../navbar/Navbar"



const Squashcourt = () => {

  const [slideNumber, setSlideNumber] = useState(0);
	const [open, setOpen] = useState(false);

  const photos = [
    {
        src: "https://res-2.cloudinary.com/gll/image/upload/c_fit,f_auto,h_684,w_684/v1562137447/activity_-_squash.jpg"
    },
    {
        src: "https://www.meetinleeds.co.uk/wp-content/uploads/2016/05/Devonshire-Hall-Squash-Court.jpg"
    },
    {
        src: "https://asbsquash.com/modules/aktuality/galleries/54/210.jpg"
    },
    {
        src: "https://res-5.cloudinary.com/gll/image/upload/v1569494064/production/0000/0/00/webimage-0D8AE1D3-97CA-4CD1-AA57CCF468B07E6E.jpg"
    },
    {
        src: "https://www.uwe.ac.uk/-/media/uwe/images/life/sport/sport-squash-court-600x600.jpg?h=602&w=602&hash=7F7A705AA80626A14BAE7A353615A316"
    },
    {
        src: "https://global-uploads.webflow.com/5d655866b2055c7cbb5d79a1/64038c5eae6845794377f535_022023_LinaDaas029.webp"
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
					<div className="squashCourtContainer">
						{open && <div className="slider">
						<FontAwesomeIcon icon={faCircleXmark} className="close" onClick={()=>setOpen(false)} />
						<FontAwesomeIcon icon={faArrowLeft} className="arrow" onClick={()=>handleMove("l")}/>
						<div className="sliderWrapper">
							<img src={photos[slideNumber].src} alt="" className="sliderImg" />
						</div>
						<FontAwesomeIcon icon={faArrowRight} className="arrow" onClick={()=>handleMove("r")}/>					
						</div>}
					<div className="squashCourtWrapper">
									<button className="bookNow">Reserve or book now</button>
									<h1 className="squashCourtTitle">Squash Court</h1>
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
									<div className="squashCourtImages">
											{photos.map((photo, i) => (
													<div className="squashCourtImgWrapper">
															<img onClick={()=>handleOpen(i)} src={photo.src} alt="" className="squashCourtImg" />
													</div>    
											))}
									</div>
											<div className="squashCourtDetails">
												<div className="squashCourtDetailsTexts">
													<h1 className="squashCourtTitle"> Squash Your Competition at GymCorp's Courts</h1>
													<p className="squashCourtDesc">
                          GymCorp's two squash courts offer an exciting and thrilling activity that is perfect for groups of friends or colleagues. These well-maintained courts are available for booking in one-hour sessions and allow up to four people per court, making it a great way to socialize and have fun together. The courts are spacious and well-lit, providing a comfortable and safe environment for players. Whether you're a beginner or a seasoned player, squash is a fun and exciting way to spend an hour with friends. And with GymCorp's two squash courts, you can enjoy this thrilling game at a convenient location with excellent facilities. Book your court now and experience the excitement of squash at GymCorp!
													</p>
												</div>
													<div className="squashCourtDetailsPrice">
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

export default Squashcourt