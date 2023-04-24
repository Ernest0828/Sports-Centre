import React, { useState, useEffect, useContext } from 'react';
import "./dropDownClasses.css"
import axios from 'axios';
import ReactDatePicker from '../Calendar/ReactDatePicker';
import useFetch from '../managerPages/hooks/useFetch';
import { Auth } from '../../context/Auth';

function DropDownClasses(props) {

  const [selectedOptionA, setSelectedOptionA] = useState('');
  const [selectedOptionB, setSelectedOptionB] = useState('');
  const [selectedOptionC, setSelectedOptionC] = useState('');
  const {selectedDate} = props;

  const{user} = useContext(Auth);
  

  const optionBValues = {
    "Studio": ['Pilates', 'Aerobics', 'Yoga']
  };

  const optionCValues = {
    'Pilates':  ['18:00'], 
    'Aerobics': ['10:00'],
    'Yoga': ['19:00']
  };

const handleOptionAChange = (event)=> {
  setSelectedOptionA(event.target.value);
  setSelectedOptionB('');
}

  const handleOptionBChange = (event) => {
    setSelectedOptionB(event.target.value);
    setSelectedOptionC('');
  };

  const handleOptionCChange = (event) => {
    setSelectedOptionC(event.target.value);
  };

  const classIDs = {
    "Studio": {
      "Pilates": 1,
      "Aerobics": 2,
      "Yoga": 5 //Add more of the classes at different time and day
    }
    }
  
  
  function getClassID(selectedOptionA, selectedOptionB) {
    if (classIDs[selectedOptionA] && classIDs[selectedOptionA][selectedOptionB]) {
      return classIDs[selectedOptionA][selectedOptionB];
    } else {
      return null;
    }
  }

  useEffect(() => {
    setSelectedOptionC('');
  }, [selectedOptionA, selectedOptionB]);

  const handleBooking = async () => {
    try {
      const classID = getClassID(selectedOptionA, selectedOptionB);
      if (classID === null) {
        throw new Error("Invalid option combination"); // throw an error if there is no matching activity ID
      }
      await axios.post('http://localhost:4000/api/bookings/bookingid', {
        date: selectedDate,
        start: selectedOptionC, 
        customerId: user.details.customerId, //Get the current ID 
        activityId: null, //convert the selectedOptionB to activity number
        classId: classID, //convert to ID instead of name
        facilityName: selectedOptionA 
      });
      alert('Booking successful!');
    } catch (err) {
      console.log(err);
      alert("Booking unsuccessful!");
    }
  };

  return (
    <div className='dropdownWrapper'>
        <div className="dropdownFacility">
        <label>Facility:</label>
        <select value={selectedOptionA} onChange={handleOptionAChange}>
        <option value="">Select a facility</option>
        <option value="Studio">Studio</option>
        </select>
        </div>
        <div className="dropdownClass">
      <label>Class :</label>
      <select id="optionB" value={selectedOptionB} onChange={handleOptionBChange} disabled={!selectedOptionA}>
        <option value="">-- Please select an option --</option>
        {selectedOptionA && optionBValues[selectedOptionA].map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
        </div>
        <div className="dropdownTime">
      <label >Time :</label>
      <select id="optionC" value={selectedOptionC} onChange={handleOptionCChange} disabled={!selectedOptionA || !selectedOptionB}>
        <option value="">-- Please select an option --</option>
        {selectedOptionB && optionCValues[selectedOptionB].map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      </div>
      <button onClick={handleBooking}>Book now</button>
    </div>
  );
}

export default DropDownClasses