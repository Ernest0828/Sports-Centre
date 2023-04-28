import React,{ useState, useEffect } from 'react'
import "./sportshall.css"
import Navbar from "../../navbar/Navbar"
import DropdownChoice from '../../dropdownfacility/dropdown';
// import ReactDatePicker from '../../Calendar/ReactDatePicker';
import Basket from '../../basket/Basket';
import Datepicker from 'react-datepicker';
import SportsCal from '../../ICalendar/SportsCal';
import axios from 'axios';

const SportsHall = () => {
    const[selectedDate, setSelectedDate] = useState(null)
    
    return (
        <div>
            <Navbar/>
                <div className="sportsHallContainer">
                    <div className="sportsHallWrapper">
                        <SportsCal />
                            {/* <button className="bookNow">Reserve or book now</button> */}
                            <h1 className="sportsHallTitle"> Book Facility</h1>
                            <div className="sportsHallDetails">                                                    
                                    <div className="sportsHallDetailsPrice">
                                            <h1>Select your details</h1>
                                            <Datepicker selected={selectedDate} onChange={date => setSelectedDate(date)} defaultValue={new Date()} // set default value to today's date
                                            minDate={new Date()} // set minimum date to today's date
                                             maxDate={new Date(Date.now() + 12096e5)} // set maximum date to 2 weeks from today 
                                             />        
                                            <DropdownChoice selectedDate={selectedDate} />                                                                                                            
                                                {/* <h2>
                                                    Special requests
                                                </h2> */}
                                                {/* <textarea placeholder="Any special requests?"></textarea> */}
                                                {/* <h2>
                                                <b>$999</b> (per hour)
                                            </h2> */}
                                                {/* <button> Book now</button> */}
                                    </div>
                            </div>  
                            <Basket/>                                                              
                    </div>
                </div>
        </div>    
    )
}

export default SportsHall 

