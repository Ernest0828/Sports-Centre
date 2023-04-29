import React,{ useState, useEffect, useContext } from 'react'
import { Form } from "react-bootstrap";
import useFetch from '../../hooks/useFetch';
import { useLocation } from "react-router-dom";
import Datepicker from 'react-datepicker';

const BookingDetails = ({ selectedDay, selectedTime, selectedClass }) => {

    const location = useLocation();
    const facility = location.state ? location.state.facility : null;
    const[selectedDate, setSelectedDate] = useState(new Date());

    const {data:facilityData, loading:facilityLoading, error:facilityError} = useFetch ("http://localhost:4000/api/facilities/");
    const {data:classData, loading:classLoading, error:classError} = useFetch ("http://localhost:4000/api/classes/");
    
    const [selectedOptionB, setSelectedOptionB] = useState('General Use');
    const [selectedOptionC, setSelectedOptionC] = useState('');
    
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

    return (
        <Form>
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
        </Form>
    );
};

export default BookingDetails;
