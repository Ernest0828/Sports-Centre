import React from 'react'
import {faArrowRight} from '@fortawesome/free-solid-svg-icons'
import {faCircleXmark} from '@fortawesome/free-solid-svg-icons'
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import "./pilates.css"

import Navbar from "../../navbar/Navbar"

const Pilates = () => {
  const [slideNumber, setSlideNumber] = useState(0);
	const [open, setOpen] = useState(false);

  const photos = [
    {
        src: "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/irlf15Rw5DDw/v0/1200x-1.jpg"
    },
    {
        src: "https://complete-pilates.co.uk/wp-content/uploads/2020/12/Types-of-Pilates-Complete-Pilates.jpg"
    },
    {
        src: "https://www.byrdie.com/thmb/L0Jej-SzI4OZHwXCCCpgq0xJzVM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Stocksy_txp3448e50fXAw200_Medium_1360014-92c45c70d3d14564b4e4a84a53534e33.jpg"
    },
    {
        src: "https://www.verywellfit.com/thmb/qSnr8iklI2D7ABQqAZoz9DXKaa8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/78317902-56b35e393df78cdfa004c51f.JPG"
    },
    {
        src: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F34%2F2021%2F10%2F14%2Fpilates-group-fitness-getty-1021-2000.jpg"
    },
    {
        src: "https://corepilatesstudios.co.uk/wp-content/uploads/2019/01/Core-Ken-Edited-37-of-38-768x512.jpg"
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
					<div className="pilatesContainer">
						{open && <div className="slider">
						<FontAwesomeIcon icon={faCircleXmark} className="close" onClick={()=>setOpen(false)} />
						<FontAwesomeIcon icon={faArrowLeft} className="arrow" onClick={()=>handleMove("l")}/>
						<div className="sliderWrapper">
							<img src={photos[slideNumber].src} alt="" className="sliderImg" />
						</div>
						<FontAwesomeIcon icon={faArrowRight} className="arrow" onClick={()=>handleMove("r")}/>					
						</div>}
					<div className="pilatesWrapper">
									<button className="bookNow">Reserve or book now</button>
									<h1 className="pilatesTitle">Pilates Classes</h1>
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
									<div className="pilatesImages">
											{photos.map((photo, i) => (
													<div className="pilatesImgWrapper">
															<img onClick={()=>handleOpen(i)} src={photo.src} alt="" className="pilatesImg" />
													</div>    
											))}
									</div>
											<div className="pilatesDetails">
												<div className="pilatesDetailsTexts">
													<h1 className="pilatesTitle"> Strengthen and Lengthen with Pilates at GymCorp</h1>
													<p className="pilatesDesc">
                          Join us every Monday from 6-7pm for our popular Pilates class at GymCorp. Our expert instructors lead this low-impact workout that focuses on developing core strength, improving flexibility, and enhancing overall posture. The Pilates class is suitable for all fitness levels and is a great way to improve your physical and mental well-being. Classes are held in our dedicated studio space, which is equipped with state-of-the-art equipment. Experience the many benefits of Pilates, including improved balance, increased flexibility, and reduced stress, and join us for this fun and invigorating workout. Book your class today and start your journey towards a healthier, happier you.
													</p>
												</div>
													<div className="pilatesDetailsPrice">
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

export default Pilates