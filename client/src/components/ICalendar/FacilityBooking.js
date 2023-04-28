import React, { useState, useEffect, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import useFetch from "../../hooks/useFetch";
import { useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import Basket from "../basket/Basket";
import { Auth } from '../../context/Auth';

const FacilityBookingDetails = ({ selectedDay, selectedTime }) => {
  const location = useLocation();
  const facility = location.state ? location.state.facility : null;
  const [selectedDate, setSelectedDate] = useState(new Date());

  const {
    data: facilityData,
    loading: facilityLoading,
    error: facilityError,
  } = useFetch("http://localhost:5000/api/facilities/");
  const {
    data: activityData,
    loading: activityLoading,
    error: activityError,
  } = useFetch("http://localhost:5000/api/activities/");

  const [selectedOptionB, setSelectedOptionB] = useState("General Use");


  const selectedActivity = activityData
    ? activityData.find((activity) => activity.activityName === selectedOptionB)
    : null;
  const activityId = selectedActivity ? selectedActivity.activityId : null;

  function getDayOfWeek(day) {
    switch (day) {
      case 'Monday':
        return 1;
      case 'Tuesday':
        return 2;
      case 'Wednesday':
        return 3;
      case 'Thursday':
        return 4;
      case 'Friday':
        return 5;
      case 'Saturday':
        return 6;
      case 'Sunday':
        return 0;
      default:
        return -1;
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
          <option value="" disabled selected hidden>
            Select an activity
          </option>
          {activityData && activityData
              .filter(activity => activity.facilityName === facility.facilityName)
              .filter(activity => selectedDay === "Friday" && (selectedTime === "08:00" || selectedTime === "09:00")|| activity.activityName !== "Team events (Friday)")
              .filter(activity => selectedDay === "Sunday" && (selectedTime === "08:00" || selectedTime === "09:00") || activity.activityName !== "Team events (Sunday)")
              .filter(activity => selectedDay === "Thursday" && (selectedTime === "19:00" || selectedTime === "20:00") || activity.activityName !== "Team events (Thursday)")
              .filter(activity => selectedDay === "Saturday" && (selectedTime === "09:00" || selectedTime === "10:00") || activity.activityName !== "Team events (Saturday)")
              .map((activity) => (
                <option key={activity.activityId} value={activity.activityName}>
                  {activity.activityName}
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
        filterDate={(date) => {const dayOfWeek = date.getDay(); // Get the day of the week for the given date
        return dayOfWeek === getDayOfWeek(selectedDay); // Check if the day of the week matches the selected day
  }}
/>
      </Form.Group>
      <Button variant="primary" style={{ marginTop: "15px" }}>
        Submit
      </Button>
    </Form>
  );
};

export default FacilityBookingDetails;
