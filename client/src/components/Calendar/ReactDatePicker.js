import React,{ useState, useEffect } from 'react'
import Datepicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import DropdownChoice from '../dropdownfacility/DropDownFacility'

function ReactDatePicker() {
    const[selectedDate, setSelectedDate] = useState(null)    
  return (
    <div>
        <Datepicker selected={selectedDate} onChange={date => setSelectedDate(date)} />
        
    </div>
  )
}

export default ReactDatePicker