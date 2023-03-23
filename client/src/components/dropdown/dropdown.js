import React, { useState, useEffect } from 'react';
import "./dropdown.css"

function DropdownChoice() {
  const [selectedOptionA, setSelectedOptionA] = useState('');
  const [selectedOptionB, setSelectedOptionB] = useState('');
  const [selectedOptionC, setSelectedOptionC] = useState('');

  const optionBValues = {
    "Climbing Wall": ['General use'],
    "Fitness Room": ['General use'],
    "Sports Hall": ['1-hour session', 'Team events'],
    "Squash Court": ['1-hour session'],
    "Swimming Pool": ['General use', 'Lane Swimming', 'Lessons', 'Team events']
  };

  const optionCValues = {
    'General use': selectedOptionA === 'Swimming Pool' && selectedOptionB === 'General use' ? ['08:00', '09:00','10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'] :selectedOptionA === 'Climbing Wall' && selectedOptionB === 'General use'? ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00']: ['08:00', '09:00','10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'],
    '1-hour session': ['08:00', '09:00','10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'],
    'Team events': selectedOptionA === 'Swimming Pool' && selectedOptionB === 'Team events' ? ['08:00'] : selectedOptionA === 'Sports Hall' && selectedOptionB === 'Team events' ? ['07:00', '09:00'] : [],
    'Lessons': ['08:00', '09:00','10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'],
    'Lane Swimming': ['08:00', '09:00','10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00']
  };

  const handleOptionBChange = (event) => {
    setSelectedOptionB(event.target.value);
    setSelectedOptionC('');
  };

  const handleOptionCChange = (event) => {
    setSelectedOptionC(event.target.value);
  };

  useEffect(() => {
    setSelectedOptionC('');
  }, [selectedOptionA, selectedOptionB]);

   

  return (
    <div className='dropdownWrapper'>
        <div className="dropdownFacility">
      <label>Facility :</label>
      <select id="optionA" value={selectedOptionA} onChange={(event) => setSelectedOptionA(event.target.value)}>
        <option value="">-- Please select an option --</option>
        <option value="Climbing Wall">Climbing Wall</option>
        <option value="Fitness Room">Fitness Room</option>
        <option value="Sports Hall">Sports Hall</option>
        <option value="Squash Court">Squash Court</option>
        <option value="Swimming Pool">Swimming Pool</option>
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
    </div>
  );
}

export default DropdownChoice