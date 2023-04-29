import React,{ useState, useEffect, useContext } from 'react'
import Navbar from "../../navbar/Navbar"
import Basket from '../../basket/Basket';
import Datepicker from 'react-datepicker';
import ICalendar from '../../ICalendar/ICalendar';
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios';
import useFetch from '../../../hooks/useFetch';
import { useLocation } from "react-router-dom";
import { Auth } from '../../../context/Auth';

function FacilityPage() {
	const[selectedDate, setSelectedDate] = useState(new Date());
  const {data:facilityData, loading:facilityLoading, error:facilityError} = useFetch ("http://localhost:4000/api/facilities/");
  const {data:activityData, loading:activityLoading, error:activityError} = useFetch ("http://localhost:4000/api/activities/");
  const location = useLocation();
  const { facility } = location.state;
  const [selectedOptionB, setSelectedOptionB] = useState('');
  const [selectedOptionC, setSelectedOptionC] = useState('');
  const{user} = useContext(Auth);
  const selectedActivity = activityData.find((activity) => activity.activityName === selectedOptionB);
  const activityId = selectedActivity ? selectedActivity.activityId : null;
  
  const filteredActivities = activityData.filter(activity => activity.facilityName === facility.facilityName);
  const uniqueName = [...new Set(filteredActivities.map(activity => activity.activityName))];
  const [basketItems, setBasketItems] = useState([]);



  //For the time options, using a for loop to increment it the time
  const startTime = parseInt(facility.startTime.split(':')[0], 10);
  const endTime = parseInt(facility.endTime.split(':')[0], 10);
  const availableTime = [];
  for (let i = startTime; i < endTime; i++) {
    const time = i < 10 ? `0${i}:00` : `${i}:00`;
    availableTime.push(time);
  }
  
  const addToBasket = (item) => {
    setBasketItems([...basketItems, item]);
  };

  const removeItem = (index) => {
    const newItems = [...basketItems];
    newItems.splice(index, 1);
    setBasketItems(newItems);
  };
  

  //Filtering time for the team events in sportshall and swimmingpool
  //Filtering time for the team events in sportshall and swimmingpool
  const filteredTimeOptions = (date, activity) => {
    if (!date || (activity !== 'Team events')) return availableTime;
    const dayOfWeek = new Date(date).getDay();

    if (facility.facilityName === 'Sports hall') {
      if (dayOfWeek === 4) { // Thursday
        const sportsTeamEvent = filteredActivities.find(act => act.facilityName === 'Sports hall' && act.activityName === 'Team events' && act.day === 'Thursday');
        const formatTime = sportsTeamEvent.startTime.slice(0, -3);
        return [formatTime];
      } else if (dayOfWeek === 6) { // Saturday
        const sportsTeamEvent = filteredActivities.find(act => act.facilityName === 'Sports hall' && act.activityName === 'Team events' && act.day === 'Saturday');
        const formatTime = sportsTeamEvent.startTime.slice(0, -3);
        return [formatTime];
      }
    } else if (facility.facilityName === 'Swimming pool') {
      if (dayOfWeek === 5) { // Friday
        const swimmingTeamEvent = filteredActivities.find(act => act.facilityName === 'Swimming pool' && act.activityName === 'Team events' && act.day === 'Friday');
        const formattedTime = swimmingTeamEvent.startTime.slice(0, -3);
        return [formattedTime];
      } else if (dayOfWeek === 0) { // Sunday
        const swimmingTeamEvent = filteredActivities.find(act => act.facilityName === 'Swimming pool' && act.activityName === 'Team events' && act.day === 'Sunday');
        const formattedTime = swimmingTeamEvent.startTime.slice(0, -3);
        return [formattedTime];
      } 
    }
    return [];
  };

  //handling changes
  const handleOptionBChange = (event) => {
    setSelectedOptionB(event.target.value);
  };
  const handleOptionCChange = (event) => {
    setSelectedOptionC(event.target.value);
  };


const handleBooking = async () => {
  if (user) {
    const item = {
      description: `${facility.facilityName} - ${selectedOptionB} ${selectedDate.toLocaleDateString()} - ${selectedOptionC}`,
      facilityName: facility.facilityName,
      activityName: selectedOptionB,
      date: selectedDate,
      time: selectedOptionC,
      cost: selectedActivity.price,
      activityId: activityId,
    };
    // Get the current cartItems from localStorage
    // const currentCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const currentCartItems = JSON.parse(localStorage.getItem('basketItems')) || [];

    // Append the new item to the current cartItems
    currentCartItems.push(item);

    // Store the updated cartItems back to localStorage
    localStorage.setItem('basketItems', JSON.stringify(currentCartItems));    
    addToBasket(item);  
  } else {
    alert('You must be logged in to book an activity.');
  }
  //Check if user, if not then throw an alert saying not logged in.
    // try {
    //   await axios.post('http://localhost:4000/api/bookings/bookingid', {
    //     date: selectedDate,
    //     start: selectedOptionC, //Start time
    //     customerId: user.details.customerId, //Get the current ID **NEED TO CHECK IF THEY"RE A USER/LOGGED IN
    //     activityId: activityId, //convert the selectedOptionB to activity number
    //     classId: null, //convert to ID instead of name
    //     facilityName: facility.facilityName 
    //   });
    //   alert('Booking successful!');
    // } catch (err) {
    //   console.log(err);
    //   alert("Booking unsuccessful!");
    // }
  };

  return (
    <div>
      <Navbar />
        <div className="facilityPageContainer">
          <div className="facilityPageWrapper">
            <h1 className='Title'>{facility.facilityName}</h1>
            <ICalendar />
            {facility.facilityName !== "Studio" && (
              <div className="facilityBookingContainer">
                <div className="facilityBookingDetails">
                  <h1>Select Your Details</h1>
                  <Datepicker selected={selectedDate} onChange={date => setSelectedDate(date)} defaultValue={new Date()} // set default value to today's date
                  minDate={new Date()} // set minimum date to today's date
                  maxDate={new Date(Date.now() + 12096e5)} // set maximum date to 2 weeks from today 
                  />
                    <div className="facilityOption">
                      <label>Facility: {facility.facilityName} </label>
                    </div>
                    <div className="dropDownActivity">
                      <label>Activity: </label>
                      <select id="optionB" value={selectedOptionB} onChange={handleOptionBChange}>
                      <option value="">-- Please select an option --</option>
                      {uniqueName.map(activityName =>  (
                        <option key={activityName} value={activityName}>{activityName}</option>
                      ))}
                      </select>
                    </div>
                    <div className="dropDownTime">
                        <label>Time: </label>
                        <select id="optionC" value={selectedOptionC} onChange={handleOptionCChange} disabled={!selectedOptionB}>
                          <option value="">-- Please select an option --</option>
                          {filteredTimeOptions(selectedDate, selectedOptionB).map(time => (
                            <option key={time} value={time}>{time}</option>
                          ))} 
                        </select>
                    </div>  
                    <button onClick={handleBooking} >Add to cart</button>
                </div>                
              </div>
            )}
              <Basket basketItems={basketItems} removeItem={removeItem}/>
          </div>
        </div>
    </div>
  )
}

export default FacilityPage