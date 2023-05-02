import React,{ useState, useContext } from 'react'
import Navbar from "../../navbar/Navbar"
import Basket from '../../basket/Basket';
import 'react-datepicker/dist/react-datepicker.css'
import useFetch from '../../../hooks/useFetch';
import { useLocation } from "react-router-dom";
import { Auth } from '../../../context/Auth';
import SwimmingPoolSchedule from '../../ICalendar/SwimmingCal';
import SportsHallSchedule from '../../ICalendar/SportsCal';
import SquashCourtSchedule from '../../ICalendar/SquashCal';
import SquashCourtBSchedule from '../../ICalendar/SquashCalB';
import ClimbingWallSchedule from '../../ICalendar/ClimbCal';
import FitnessRoomSchedule from '../../ICalendar/FitnessCal';
import StudioSchedule from '../../ICalendar/StudioCal';
import "./facilityPage.css";


function FacilityPage() {
	const[selectedDate] = useState(new Date());
  // const {data:facilityData} = useFetch ("http://localhost:4000/api/facilities/");
  const {data:activityData} = useFetch ("http://localhost:4000/api/activities/");
  const location = useLocation();
  const facility = location.state ? location.state.facility : null;
  const [selectedOptionB] = useState('');
  const [selectedOptionC] = useState('');
  const{user} = useContext(Auth);
  const selectedActivity = activityData ? activityData.find((activity) => activity.activityName === selectedOptionB) : null;
  const activityId = selectedActivity ? selectedActivity.activityId : null;
  // const filteredFacilities = facilityData.filter(facility => facility.facilityName === facility?.facilityName);

  // const filteredActivities = activityData.filter(activity => activity.facilityName === facility?.facilityName);
  // const uniqueName = [...new Set(filteredActivities.map(activity => activity.activityName))];
  // const [basketItems, setBasketItems] = useState([]);

  //For the time options, using a for loop to increment it the time
  const startTime = parseInt(facility?.startTime?.split(':')[0], 10);
  const endTime = parseInt(facility?.endTime?.split(':')[0], 10);
  const availableTime = [];
  for (let i = startTime; i < endTime; i++) {
    const time = i < 10 ? `0${i}:00` : `${i}:00`;
    availableTime.push(time);
  }
  
  // const addToBasket = (item) => {
  //   setBasketItems([...basketItems, item]);
  // };

  // const removeItem = (index) => {
  //   const newItems = [...basketItems];
  //   newItems.splice(index, 1);
  //   setBasketItems(newItems);
  // };

  let Timetable;
  switch(facility.facilityName) {
    case 'Swimming pool':
        Timetable = <SwimmingPoolSchedule />;
        break;
    case 'Sports hall':
        Timetable = <SportsHallSchedule />;
        break;
    case 'Squash court A':
        Timetable = <SquashCourtSchedule />;
        break;
    case 'Squash court B':
        Timetable = <SquashCourtBSchedule />;
        break;
    case 'Climbing wall':
        Timetable = <ClimbingWallSchedule />;
        break;
    case 'Fitness room':
        Timetable = <FitnessRoomSchedule />;
        break;
    case 'Studio':
        Timetable = <StudioSchedule />;
        break;
    default:
        Timetable = <div>No schedule available for this facility</div>;
    }

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

  } else {
    alert('You must be logged in to book an activity.');
  }
  };

  return (
    <div className="bookingFacilityPage">
      <Navbar />
        <div className="facilityPageContainer">
          <div className="facilityPageWrapper">
            {Timetable}
          </div>
          <div className="calenderBasket">
            <Basket/>
          </div>
        </div>
    </div>
  )
}

export default FacilityPage