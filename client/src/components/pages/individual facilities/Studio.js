import React from 'react'
import {faArrowRight} from '@fortawesome/free-solid-svg-icons'
import {faCircleXmark} from '@fortawesome/free-solid-svg-icons'
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import "./studio.css"
import Calendar from 'react-calendar'
import Navbar from "../../navbar/navbar"


const Studio = () => {

  const [slideNumber, setSlideNumber] = useState(0);
	const [open, setOpen] = useState(false);

  const photos = [
    {
        src: "https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/bf6whwogu0eeu6gsbv9p.jpg"
    },
    {
        src: "https://www1.villanova.edu/content/university/mullencenter/spaces/dancestudio/_jcr_content/pagecontent/displaybox_1937166214/par_container/image_2070557784.img.jpg/1594908184432.jpg"
    },
    {
        src: "https://mlvtgiqzoszz.i.optimole.com/w:500/h:333/q:mauto/https://www.lemarkfloors.co.uk/wp-content/uploads/Wooden-Sprung-Dance-Floor.jpg"
    },
    {
        src: "https://cdn.ecommercedns.uk/files/8/230788/1/22364431/dance-your-life-7-1000-667.jpg"
    },
    {
        src: "https://blog.dancevision.com/hubfs/Screen%20Shot%202021-03-04%20at%201.34.57%20PM.png"
    },
    {
        src: "https://mlvtgiqzoszz.i.optimole.com/w:1200/h:800/q:mauto/https://www.lemarkfloors.co.uk/wp-content/uploads/Dynamic-Wood-Effect-Dance-Floor-Studio-76.jpg"
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
					<div className="studioContainer">
						{open && <div className="slider">
						<FontAwesomeIcon icon={faCircleXmark} className="close" onClick={()=>setOpen(false)} />
						<FontAwesomeIcon icon={faArrowLeft} className="arrow" onClick={()=>handleMove("l")}/>
						<div className="sliderWrapper">
							<img src={photos[slideNumber].src} alt="" className="sliderImg" />
						</div>
						<FontAwesomeIcon icon={faArrowRight} className="arrow" onClick={()=>handleMove("r")}/>					
						</div>}
					<div className="studioWrapper">
									<button className="bookNow">Reserve or book now</button>
									<h1 className="studioTitle">Studio</h1>
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
									<div className="studioImages">
											{photos.map((photo, i) => (
													<div className="studioImgWrapper">
															<img onClick={()=>handleOpen(i)} src={photo.src} alt="" className="studioImg" />
													</div>    
											))}
									</div>
											<div className="studioDetails">
												<div className="studioDetailsTexts">
													<h1 className="studioTitle"> Unleash Your Inner Athlete with GymCorp's Studio Classes</h1>
													<p className="studioDesc">
                          The studio at GymCorp is a dedicated space for our signature exercise classes. This intimate and dynamic space is perfect for those looking for a more personalized fitness experience. With a maximum capacity of 25 people, the studio provides an ideal environment for smaller, more focused classes. Our expert instructors lead a variety of classes, including yoga, Pilates, and aerobics, all designed to improve flexibility, strength, and cardiovascular fitness. The studio is regularly maintained to ensure a safe and comfortable workout environment. Whether you're looking to sweat it out with a high-intensity workout or find inner peace through yoga, the studio at GymCorp has something for everyone. Book your class today and experience the exceptional quality of our exercise classes in our dedicated studio space.
													</p>
												</div>
													<div className="studioDetailsPrice">
                          <h1>Select your details</h1>
                          <Calendar />
                          <span>
                              Dropdown boxes here
                          </span>
                              <h2>
                                  Special requests
                              </h2>
                              <button>Reserve or Book now</button>
													</div>
											</div> 
                         
									</div>
							</div>
    </div>    
  )
}

export default Studio