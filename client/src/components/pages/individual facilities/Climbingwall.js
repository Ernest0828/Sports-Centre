import React,{ useState, useEffect } from 'react'
import "./climbingwall.css"
import Navbar from "../../navbar/navbar"
import DropdownChoice from '../../dropdownfacility/dropdown';
import Basket from '../../basket/Basket';
import Datepicker from 'react-datepicker';
import ICalendar from '../../ICalendar/ICalendar';




const Climbingwall = () => {
    const[selectedDate, setSelectedDate] = useState(new Date())
    const[selectedFacilityAndActivity, setSelectedFacilityAndActivity] = useState('');

    

    return (
        <div>
            <Navbar/>
                <div className="climbingWallContainer">
                    <div className="climbingWallWrapper">
                        <ICalendar />
                            {/* <button className="bookNow">Reserve or book now</button> */}
                            <h1 className="climbingWallTitle"> Book Facility</h1>
                            <div className="climbingWallDetails">                                                    
                                    <div className="climbingWallDetailsPrice">
                                            <h1>Select your details</h1>
                                            <Datepicker selected={selectedDate} onChange={date => setSelectedDate(date)} defaultValue={new Date()} // set default value to today's date
                                            minDate={new Date()} // set minimum date to today's date
                                             maxDate={new Date(Date.now() + 12096e5)} // set maximum date to 2 weeks from today 
                                             />        
                                            <DropdownChoice selectedDate={selectedDate} setSelectedFacilityAndActivity={setSelectedFacilityAndActivity} />                                                                                                            
                                    </div>
                            </div>  
                            <Basket selectedFacilityAndActivity = {selectedFacilityAndActivity}/>                                                              
                    </div>
                </div>
        </div>    
    )
}

export default Climbingwall 

