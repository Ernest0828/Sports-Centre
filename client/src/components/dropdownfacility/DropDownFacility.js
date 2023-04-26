import React, { useState, useEffect, useContext } from 'react';
import "./dropDownFacility.css"
import axios from 'axios';

import useFetch from '../managerPages/hooks/useFetch';
import { Auth } from '../../context/Auth';

function DropdownChoice(props) {

  //useFetch Hooks
  const {data:facilityData, loading:facilityLoading, error:facilityError} = useFetch ("http://localhost:4000/api/facilities/");
  const {data:activityData, loading:activityLoading, error:activityError} = useFetch ("http://localhost:4000/api/activities/");

  const [selectedOptionA, setSelectedOptionA] = useState('');
  const [selectedOptionB, setSelectedOptionB] = useState('');
  const [selectedOptionC, setSelectedOptionC] = useState('');
  const {selectedDate} = props;

  const{user} = useContext(Auth);

  const optionBValues = {
    "Climbing wall": ['General use'],
    "Fitness room": ['General use'],
    "Sports hall": ['1-hour sessions', 'Team events'],
    "Squash court": ['1-hour sessions'],
    "Swimming pool": ['General use', 'Lane swimming', 'Lessons', 'Team events']
  };

  const optionCValues = {
    'General use': selectedOptionA === 'Swimming pool' && selectedOptionB === 'General use' ? ['08:00', '09:00','10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'] :selectedOptionA === 'Climbing Wall' && selectedOptionB === 'General use'? ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00']: ['08:00', '09:00','10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'],
    '1-hour sessions': ['08:00', '09:00','10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'],
    'Team events': selectedOptionA === 'Swimming pool' && selectedOptionB === 'Team events' ? ['08:00'] : selectedOptionA === 'Sports Hall' && selectedOptionB === 'Team events' ? ['07:00', '09:00'] : [],
    'Lessons': ['08:00', '09:00','10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'],
    'Lane swimming': ['08:00', '09:00','10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00']
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

  const activityIDs = {
    "Swimming pool": {
      "General use": 1,
      "Lane swimming": 2,
      "Lessons": 3,
      "Team events": 4
    },
    "Fitness room": {
      "General use": 5
    },
    "Squash court": {
      "1-hour sessions": 6
    },
    "Sports hall": {
      "1-hour sessions": 7,
      "Team events": 8
    },
    "Climbing wall": {
      "General use": 9
    }
    }
  
  
  function getActivityID(selectedOptionA, selectedOptionB) {
    if (activityIDs[selectedOptionA] && activityIDs[selectedOptionA][selectedOptionB]) {
      return activityIDs[selectedOptionA][selectedOptionB];
    } else {
      return null;
    }
  }

  useEffect(() => {
    setSelectedOptionC('');
  }, [selectedOptionA, selectedOptionB]);

  const handleBooking = async () => {
    try {
      const activityID = getActivityID(selectedOptionA, selectedOptionB);
      if (activityID === null) {
        throw new Error("Invalid option combination"); // throw an error if there is no matching activity ID
      }
      await axios.post('http://localhost:4000/api/bookings/bookingid', {
        date: selectedDate,
        start: selectedOptionC, 
        customerId: user.details.customerId, //Get the current ID 
        activityId: activityID, //convert the selectedOptionB to activity number
        classId: null, //convert to ID instead of name
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
      <label>Facility :</label>
      <select value={selectedOptionA} onChange={handleOptionAChange}>
        <option value=''>Select a facility</option>
        {facilityData.map((facility) => (
        <option key={facility.facilityName} value={facility.facilityName}>
        {facility.facilityName}
        </option>
        ))}
      </select>
        </div>
        <div className="dropdownActivity">
      <label>Activity :</label>
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

export default DropdownChoice

