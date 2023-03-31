import React from 'react';
import {useEffect, useState} from 'react';
import "./classDetails.css";
import Navbar from "../../managerNavbar/navbar";
import { Link } from 'react-router-dom';
import useFetch from "../../hooks/useFetch"
import axios from 'axios';
import { Modal, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import EditClassForm from "./editClassForm";
//import AddClassForm from "./addClassForm";


const ClassDetails = () => {

    //useFetch Hooks
    const {data:classData, loading:classLoading, error:classError} = useFetch ("http://localhost:4000/api/classes/");

    const [classDetails, setClassDetails] = useState()
    const [editableRows, setEditableRows] = useState({});
    const [isEditable, setIsEditable] = useState(false);

    const [selectedClass, setSelectedClass] = useState(null);

    const [show, setShow] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const handleClose = () => {
      setShow(false);
      setShowAdd(false);
    }

    useEffect(() => {
      setClassDetails(classData.map(({ classId, className, price, day, startTime, endTime }) => {
        return {
          classId,
          className,
          price,
          dayTime: [{ day, startTime, endTime }]
        };
      }));      
    }, [classData]);

    const [formInputs, setFormInputs] = useState({
      className: "",
      price: "",
      day: "",
      startTime: "",
      endTime: "",
      facilityName:""
    });

    const handleShow = () => {
      setShow(true);
      if (selectedClass) {
      setFormInputs({
        classId: selectedClass.classId,
        className: selectedClass.className,
        price: selectedClass.price,
        dayTime: selectedClass.dayTime.map((dt) => ({
          day: dt.day,
          startTime: dt.startTime,
          endTime: dt.endTime,
        })),
        facilityName: selectedClass.facilityName
      });
    }
    };

    const handleAdd = () => {
      setShowAdd(true);
      if (selectedClass) {
      setFormInputs({
        className: "",
        day: "",
        startTime: "",
        endTime: "",
        price: "",
        //facilityName:""
      });
    }
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      // Update facility details with formInputs values
      setClassDetails((prevState) => {
      const updatedDetails = [...prevState];
      const index = updatedDetails.findIndex(
          (classes) => classes.classId === selectedClass.classId
      );
      updatedDetails[index].classId = formInputs.classId;
      updatedDetails[index].className = formInputs.className;
      updatedDetails[index].day = formInputs.day;
      updatedDetails[index].startTime = formInputs.startTime;
      updatedDetails[index].endTime =  formInputs.endTime;
      updatedDetails[index].price =  formInputs.price;

      return updatedDetails;
      });

      // Send updated facility details to server
      axios.put(`http://localhost:4000/api/classes/${selectedClass.classId}`, {

        name: formInputs.className,
        day: formInputs.day,
        start: formInputs.startTime,
        end: formInputs.endTime,
        price: formInputs.price,
        //facilityName:  formInputs.isManager
        })
        .then(response => {
        console.log(response.data);
        })
        .catch(error => {
        console.log(error);
        alert('Failed to save data')
        });

      // Close modal
      handleClose();
    };

    const handleAddSubmit = (event) => {
      event.preventDefault();

      setClassDetails((prevState) => {
        const updatedDetails = [...prevState];
        
        //updatedDetails[index].staffId = formInputs.staffId;
        updatedDetails.className = formInputs.className;
        updatedDetails.day = formInputs.day;
        updatedDetails.startTime = formInputs.startTime;
        updatedDetails.price =  formInputs.price;
        updatedDetails.facilityName =  formInputs.faciltyName;
  
        return updatedDetails;
        });
    
      // Send new staff details to server
      axios.post('http://localhost:4000/api/classes/classid', {
        name: formInputs.className,
        day: formInputs.day,
        start: formInputs.startTime,
        end: formInputs.endTime,
        price: formInputs.price,
      })
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
          alert('Failed to save data');
        });
    
      // Close modal
      handleClose();
    };


    return(
        <div>
            <Navbar/>
            <EditClassForm 
              show={show}
              handleClose={handleClose}
              handleSubmit={handleSubmit}
              class={selectedClass}
              formInputs={formInputs}
              setFormInputs={setFormInputs}
            />
            <div className="classDetails">
                    <h1 className="classDetailsTitle">GymCorp Classes</h1>
                    <div className="classDetailsTable">
                        <table>
                            <thead>
                                <tr>
                                    <th>Class</th>
                                    <th>Price</th>   
                                    <th>Day & Time</th>
                                    <th> </th>
                                    <th> </th>
                                </tr>
                            </thead>
                            <tbody>
                                {classDetails && classDetails.map(({ classId, className, price, dayTime }, index) => (
                                <tr key = {classId}>
                                    <td>
                                        <input
                                            name='className'
                                            value={className}
                                            type="text"
                                            placeholder="class name"
                                            disabled = {!isEditable}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            name='price'
                                            value={price}
                                            type="number"
                                            step="0.01"
                                            placeholder="class price"
                                            disabled = {!isEditable}
                                        />
                                    </td>
                                    {dayTime.map((dayTime, index) => (
                                    <tr key = {index}>
                                        <td>
                                        <input
                                            name='dayTime[${index}].day'
                                            value={dayTime.day}
                                            type="text"
                                            placeholder="Monday"
                                            disabled = {!isEditable}
                                        />
                                        </td>
                                        <td>
                                        <input
                                            name='dayTime[${index}].startTime'
                                            value={dayTime.startTime}
                                            type="time"
                                            placeholder="09:00"
                                            disabled = {!isEditable}
                                        />
                                        </td>
                                        <td>
                                        <input
                                            name='dayTime[${index}].endTime'
                                            value={dayTime.endTime}
                                            type="time"
                                            placeholder="10:00"
                                            disabled = {!isEditable}
                                        />
                                        </td>
                                    </tr>
                                    ))}
                                    {isEditable && (
                                    <td>
                                    <button className="deleteButton" >
                                        Delete class
                                    </button>
                                    </td>
                                     )}
                                    <td>
                                    <button className="editButton" onClick={() => {setSelectedClass({classId, className, price, dayTime}); handleShow();}}>
                                    {editableRows[classId] ? "Done" : "Edit"}
                                    </button>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                        <div>
                        {isEditable && (
                                <button class="button" >Add</button>
                        )}
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default ClassDetails;