import React, { useState, useEffect } from 'react'
import "./aerobics.css"
import Navbar from "../../navbar/Navbar"
import DropDownClasses from '../../dropdownclasses/dropdownclasses'
import Basket from '../../basket/Basket';
import Datepicker from 'react-datepicker';
import ICalendar from '../../ICalendar/ICalendar';

const Aerobics = () => {
  const[selectedDate, setSelectedDate] = useState(null)
  

  return (
    <div>
      <Navbar/>
					<div className="aerobicsContainer">
					<div className="aerobicsWrapper">
                <ICalendar/>
									{/* <button className="bookNow">Reserve or book now</button> */}
									<h1 className="aerobicsTitle">Book Classes</h1>

											<div className="aerobicsDetails">
													<div className="aerobicsDetailsPrice">
                          <h1>Select your details</h1>
                          <Datepicker selected={selectedDate} onChange={date => setSelectedDate(date)} defaultValue={new Date()} // set default value to today's date
                                            minDate={new Date()} // set minimum date to today's date
                                             maxDate={new Date(Date.now() + 12096e5)} // set maximum date to 2 weeks from today 
                                             /> 
                           <DropDownClasses selectedDate={selectedDate} />  
													</div>
											</div> 
                      <Basket/> 
									</div>
							</div>
    </div>    
  )
}

export default Aerobics