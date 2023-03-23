import React,{ useState, useEffect } from 'react'
import "./climbingwall.css"
import Navbar from "../../navbar/navbar"
import DropdownChoice from '../../dropdown/dropdown';
import ReactDatePicker from '../../Calendar/ReactDatePicker';
// import { Calendar } from 'react-calendar';
import Basket from "../../basket/HaveAccBasket";





const Climbingwall = () => {

    
    return (
        <div>
            <Navbar/>
                <div className="climbingWallContainer">
                    <div className="climbingWallWrapper">
                                    {/* <button className="bookNow">Reserve or book now</button> */}
                                    <h1 className="climbingWallTitle"> Book Facility</h1>
                                    <div className="climbingWallDetails">                                                    
                                                        <div className="climbingWallDetailsPrice">
                                                                <h1>Select your details</h1>
                                                                <ReactDatePicker />
                                                                <DropdownChoice />
                                                                
                                                                
                                                                    {/* <h2>
                                                                        Special requests
                                                                    </h2> */}
                                                                    {/* <textarea placeholder="Any special requests?"></textarea> */}
                                                                    {/* <h2>
																	<b>$999</b> (per hour)
																</h2> */}
                                                                    <button>Reserve or Book now</button>
                                                        </div>
                                                </div>  <Basket/>                                                              
                    </div>
                </div>
        </div>    
      )
}

export default Climbingwall 

