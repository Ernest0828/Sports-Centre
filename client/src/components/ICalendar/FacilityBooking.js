import React, { useState, useEffect, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import useFetch from "../../hooks/useFetch";
import { useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import Basket from "../basket/Basket";
import { Auth } from '../../context/Auth';
import axios from 'axios'

const FacilityBookingDetails = ({ selectedDay, selectedTime }) => {
  const location = useLocation();
  const facility = location.state ? location.state.facility : null;
  const [selectedDate, setSelectedDate] = useState();
  const {user} = useContext(Auth);

  const {
    data: facilityData,
    loading: facilityLoading,
    error: facilityError,
  } = useFetch("http://localhost:4000/api/facilities/");
  const {
    data: activityData,
    loading: activityLoading,
    error: activityError,
  } = useFetch("http://localhost:4000/api/activities/");

  const [selectedOptionB, setSelectedOptionB] = useState(" Use");
  let selectedActivity;
if(selectedOptionB === "Team events"){
 selectedActivity = activityData
    ? activityData.find((activity) => activity.activityName === selectedOptionB && activity.day === selectedDay && activity.facilityName === facility.facilityName)
    : null;
}else {
   selectedActivity = activityData
    ? activityData.find((activity) => activity.activityName === selectedOptionB && activity.facilityName === facility.facilityName)
    : null;
}
  const activityId = selectedActivity ? selectedActivity.activityId : null;

  const filteredActivities = activityData
  ? activityData.filter(
      (activity) => activity.facilityName === facility.facilityName
    )
  : [];

const furtherFilteredActivities = filteredActivities.filter(
  (activity) =>
    (selectedDay === "Friday" && (selectedTime === "08:00" || selectedTime === "09:00") && activity.facilityName === "Swimming pool")||
    (selectedDay === "Sunday" && (selectedTime === "08:00" || selectedTime === "09:00") && activity.facilityName === "Swimming pool")||
    (selectedDay === "Thursday" && (selectedTime === "19:00" || selectedTime === "20:00") && activity.facilityName === "Sports hall")||
    (selectedDay === "Saturday" && (selectedTime === "09:00" || selectedTime === "10:00") && activity.facilityName === "Sports hall")||
    (activity.activityName !== "Team events" ||
    (activity.activityName === "Team events" &&
      selectedDay === activity.startTime &&
      facility.facilityName === activity.facilityName))
);

const uniqueActivityNames = [
  ...new Set(furtherFilteredActivities.map((activity) => activity.activityName)),
];

  function getDayOfWeek(day) {
    switch (day) {
      case "Monday":
        return 1;
      case "Tuesday":
        return 2;
      case "Wednesday":
        return 3;
      case "Thursday":
        return 4;
      case "Friday":
        return 5;
      case "Saturday":
        return 6;
      case "Sunday":
        return 0;
      default:
        return -1;
    }
  }

  function getNextDate(day) {
    const today = new Date();
    const targetDay = getDayOfWeek(day);
  
    let nextDate = new Date(today);
    while (nextDate.getDay() !== targetDay) {
      nextDate.setDate(nextDate.getDate() + 1);
    }
  
    return nextDate;
  }

  useEffect(() => {
    setSelectedDate(getNextDate(selectedDay));
  }, [selectedDay]);

  const handleClick = async() => {
    if (user) {
      try {
          await axios.post('http://localhost:4000/api/basket/basketid', {
            date: selectedDate,
            start: selectedTime, //Start time
            customerId: user.details.customerId, //Get the current ID **NEED TO CHECK IF THEY"RE A USER/LOGGED IN
            activityId: activityId, //convert the selectedOptionB to activity number
            classId: null,
            facilityName: facility.facilityName 
          });
          alert('Item added to basket!');
          window.location.reload();
        } catch (err) {
          console.log(err.message);
          alert("Error adding item to basket!");
        } 
    } else {
      alert('You must be logged in to book an activity.');
    }
   }

  return (
    <Form>
      <Form.Group controlId="formFacility">
        <Form.Label>Facility: {facility.facilityName} </Form.Label>
      </Form.Group>
      <Form.Group controlId="formDay">
        <Form.Label>Day: {selectedDay}</Form.Label>
      </Form.Group>
      <Form.Group controlId="formStartTime">
        <Form.Label>Time: {selectedTime}</Form.Label>
      </Form.Group>
      <Form.Group controlId="formActivity">
        <Form.Label>Activity</Form.Label>
        <Form.Control
          as="select"
          value={selectedOptionB}
          onChange={(e) => setSelectedOptionB(e.target.value)}
        >
          <option value="" >
            Select an activity
          </option>
          {uniqueActivityNames.map((activityName) => (
            <option key={activityName} value={activityName}>
              {activityName}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="formDay">
        <Form.Label>Date</Form.Label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          minDate={new Date()}
          maxDate={new Date(Date.now() + 12096e5)}
          filterDate={(date) => {
            const dayOfWeek = date.getDay();
            return dayOfWeek === getDayOfWeek(selectedDay);
          }}
        />
      </Form.Group>
      <Button variant="primary" style={{ marginTop: "15px" }} onClick={handleClick}>
        Submit
      </Button>
      <p>{activityId}</p>
    </Form>
  );
};

export default FacilityBookingDetails;
