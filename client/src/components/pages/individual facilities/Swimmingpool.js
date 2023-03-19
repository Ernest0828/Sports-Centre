import React from 'react'
import {faArrowRight} from '@fortawesome/free-solid-svg-icons'
import {faCircleXmark} from '@fortawesome/free-solid-svg-icons'
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import "./swimmingpool.css"
import Calendar from 'react-calendar'
import Navbar from "../../navbar/navbar"


const Swimmingpool = () => {

  const [slideNumber, setSlideNumber] = useState(0);
	const [open, setOpen] = useState(false);

  const photos = [
    {
        src: "https://blog.chloramineconsulting.com/hubfs/commercial%20swimming%20pool.png"
    },
    {
        src: "https://www.poolspamarketing.com/wp-content/uploads/2012/08/dreamstime_4232837.jpg"
    },
    {
        src: "https://www.eurospapoolnews.com/userfiles/images/actu_Zwolle3-web.jpg"
    },
    {
        src: "https://www.fluidra.com/projects//web/app/uploads/2022/09/Commercial-swimming-pools.jpg"
    },
    {
        src: "https://www.swimclubinsurance.com/wp-content/uploads/2016/08/shutterstock_970699941-770x400.jpg"
    },
    {
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Baku_Aquatic_Palace%2C_Olympic_Pool.jpg/1200px-Baku_Aquatic_Palace%2C_Olympic_Pool.jpg"
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
					<div className="swimmingPoolContainer">
						{open && <div className="slider">
						<FontAwesomeIcon icon={faCircleXmark} className="close" onClick={()=>setOpen(false)} />
						<FontAwesomeIcon icon={faArrowLeft} className="arrow" onClick={()=>handleMove("l")}/>
						<div className="sliderWrapper">
							<img src={photos[slideNumber].src} alt="" className="sliderImg" />
						</div>
						<FontAwesomeIcon icon={faArrowRight} className="arrow" onClick={()=>handleMove("r")}/>					
						</div>}
					<div className="swimmingPoolWrapper">
									<button className="bookNow">Reserve or book now</button>
									<h1 className="swimmingPoolTitle">Swimming Pool</h1>
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
									<div className="swimmingPoolImages">
											{photos.map((photo, i) => (
													<div className="swimmingPoolImgWrapper">
															<img onClick={()=>handleOpen(i)} src={photo.src} alt="" className="swimmingPoolImg" />
													</div>    
											))}
									</div>
											<div className="swimmingPoolDetails">
												<div className="swimmingPoolDetailsTexts">
													<h1 className="swimmingPoolTitle"> Make a Splash at GymCorp's Swimming Pool</h1>
													<p className="swimmingPoolDesc">
                          GymCorp's swimming pool facility offers a refreshing and enjoyable aquatic experience. The indoor pool is well-maintained and heated to a comfortable temperature, ensuring it can be used year-round. With multiple lanes for lap swimming and ample space for recreational swimming and water activities, the facility is suitable for swimmers of all levels. GymCorp also allows individuals to make a booking of the swimming pool to host swim lessons, providing a space for experienced instructors to offer personalized swim coaching to their clients. The facility has comfortable seating areas and changing rooms complete with showers and lockers, making it easy for visitors to transition from the pool to other activities offered by GymCorp.
													</p>
												</div>
													<div className="swimmingPoolDetailsPrice">
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

export default Swimmingpool