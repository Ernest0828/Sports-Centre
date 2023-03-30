import React, { useState, useEffect } from 'react';
import "./dropdown.css"
import axios from 'axios';
import ReactDatePicker from '../Calendar/ReactDatePicker';
import useFetch from '../managerPages/hooks/useFetch';



function DropdownChoice(props) {

  //useFetch Hooks
  const {data:facilityData, loading:facilityLoading, error:facilityError} = useFetch ("http://localhost:5000/api/facilities/"); 
  // const {data:activityData, loading:activityLoading, error:activityError} = useFetch ("http://localhost:5000/api/activities/");


  const [selectedOptionA, setSelectedOptionA] = useState('');
  const [selectedOptionB, setSelectedOptionB] = useState('');
  const [selectedOptionC, setSelectedOptionC] = useState('');
  const {selectedDate} = props;
  



  const optionBValues = {
    "Climbing Wall": ['General use'],
    "Fitness Room": ['General use'],
    "Sports Hall": ['1-hour session', 'Team events'],
    "Squash Court A": ['1-hour session'],
    "Squash Court B": ['1-hour session'],
    "Swimming Pool": ['General use', 'Lane Swimming', 'Lessons', 'Team events']
  };

  const optionCValues = {
    'General use': selectedOptionA === 'Swimming Pool' && selectedOptionB === 'General use' ? ['08:00', '09:00','10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'] :selectedOptionA === 'Climbing Wall' && selectedOptionB === 'General use'? ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00']: ['08:00', '09:00','10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'],
    '1-hour session': ['08:00', '09:00','10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'],
    'Team events': selectedOptionA === 'Swimming Pool' && selectedOptionB === 'Team events' ? ['08:00'] : selectedOptionA === 'Sports Hall' && selectedOptionB === 'Team events' ? ['07:00', '09:00'] : [],
    'Lessons': ['08:00', '09:00','10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'],
    'Lane Swimming': ['08:00', '09:00','10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00']
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
    "Swimming Pool": {
      "General use": 1,
      "Lane Swimming": 2,
      "Lessons": 3,
      "Team events": 4
    },
    "Fitness Room": {
      "General use": 5
    },
    "Squash Court A": {
      "1-hour session": 11
    },
    "Squash Court B": {
      "1-hour session": 12
    },
    "Sports Hall": {
      "1-hour session": 7,
      "Team events": 8
    },
    "Climbing Wall": {
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
      await axios.post('http://localhost:5000/api/bookings/bookingid', {
        date: selectedDate,
        start: selectedOptionC, 
        customerId: "73e7892e-1466-424c-80ae-8cf84cd633b2", //Get the current ID 
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
        <option key={facility.name} value={facility.name}>
        {facility.facilityName}
        </option>
        ))}
      </select>

        </div>
        <div className="dropdownActivity">
      <label>Activity :</label>
      <select value={selectedOptionB} onChange={handleOptionBChange} disabled={!selectedOptionA}>
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


// {activityData.map((activity) => (
//   <option key={activity.activityId} value={activity.activityName}>
//     {activity.activityName}
//   </option>

export default DropdownChoice