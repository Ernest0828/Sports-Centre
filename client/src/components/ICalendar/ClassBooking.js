import React,{ useState, useEffect, useContext } from 'react'
import { Form, Button } from "react-bootstrap";
import useFetch from '../../hooks/useFetch';
import { useLocation } from "react-router-dom";
import Datepicker from 'react-datepicker';
import { Auth } from '../../context/Auth';
import axios from 'axios'

const BookingDetails = ({ selectedDay, selectedTime, selectedClass }) => {

    const location = useLocation();
    const facility = location.state ? location.state.facility : null;
    const[selectedDate, setSelectedDate] = useState(new Date());
    const {user} = useContext(Auth);

    const {data:facilityData, loading:facilityLoading, error:facilityError} = useFetch ("http://localhost:4000/api/facilities/");
    const {data:classData, loading:classLoading, error:classError} = useFetch ("http://localhost:4000/api/classes/");
    
    const [selectedOptionB, setSelectedOptionB] = useState('');
    const [selectedOptionC, setSelectedOptionC] = useState('');

    const selectedClasses = classData
    ? classData.find((classes) => classes.className === selectedClass)
    : null;
  const classId = selectedClasses ? selectedClasses.classId : null;
    
    function getDayOfWeek(day) {
        switch(day) {
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

    const[errorMessage, setErrorMessage] = useState("")

    const handleClick = async() => {
        if (user) {
          try {
              await axios.post('http://localhost:4000/api/basket/basketid', {
                date: selectedDate,
                start: selectedTime, //Start time
                customerId: user.details.customerId, //Get the current ID **NEED TO CHECK IF THEY"RE A USER/LOGGED IN
                activityId: null, //convert the selectedOptionB to activity number
                classId: classId,
                facilityName: "Studio" 
              });
              alert('Item added to basket!');
              window.location.reload();
            } catch (err) {
                if (err.response.data.message === "You have already booked for this time slot" || "You already have a booking session") {
                    setErrorMessage(err.response.data.message);
                } else {
                    console.log(err.message);               
                }
            } 
        } else {
          alert('You must be logged in to book an activity.');
        }
       }

    return (
        <Form>
            {console.log("Class :", selectedClass)}
            <Form.Group controlId="formFacility">
                <Form.Label>Facility: {facility.facilityName} </Form.Label>
            </Form.Group>
            <Form.Group controlId="formDay">
                <Form.Label>Day</Form.Label>
                <Form.Control type="text" value={selectedDay} disabled />
            </Form.Group>
            <Form.Group controlId="formStartTime">
                <Form.Label>Time</Form.Label>
                <Form.Control type="text" value={selectedTime} disabled />
            </Form.Group>
            <Form.Group controlId="formActivity">
                <Form.Label>Class</Form.Label>
                <Form.Control type="text" value={selectedClass} disabled />
            </Form.Group>
            <Form.Group controlId="formDay">
                <Form.Label>Date</Form.Label>
                <Datepicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                minDate={new Date()}
                maxDate={new Date(Date.now() + 12096e5)}
                filterDate={(date) => {const dayOfWeek = date.getDay(); // Get the day of the week for the given date
                return dayOfWeek === getDayOfWeek(selectedDay); // Check if the day of the week matches the selected day
                }}
                />
            </Form.Group>
            <Button variant="primary" style={{ marginTop: "15px" }} onClick={handleClick}>
        Submit
      </Button>
      {console.log("Class ID:", classId)}
        </Form>
    );
};

export default BookingDetails;
