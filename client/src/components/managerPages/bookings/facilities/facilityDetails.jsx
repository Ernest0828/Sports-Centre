import React from 'react';
import {useEffect, useState} from 'react';
import "./facilityDetails.css";
import Navbar from "../../managerNavbar/navbar";
import useFetch from "../../hooks/useFetch"
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Modal, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import EditFacilityForm from "./editFacilityForm";
//import EditForm from "./editForm";

const FacilityDetails = () => {

  //useFetch Hooks
    const {data:facilityData, loading:facilityLoading, error:facilityError} = useFetch ("http://localhost:4000/api/facilities/");
    const {data:activityData, loading:activityLoading, error:activityError} = useFetch ("http://localhost:4000/api/activities/");

  //States
    const [facilityDetails, setFacilityDetails] = useState();
    const [editableRows, setEditableRows] = useState({});
    const [isEditable, setIsEditable] = useState(false);
    const [editDetails, setEditDetails] = useState({});
    const [selectedFacility, setSelectedFacility] = useState(null);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);


    useEffect(() => {
      setFacilityDetails(facilityData.map((facility) => {
        const filteredActivities = activityData.filter(activity => activity.facilityName === facility.facilityName);
        const activities = filteredActivities.map(activity => ({
          activityName: activity.activityName,
          price: activity.price
        }));
        return {
          ...facility,
          name: facility.facilityName,
          capacity: facility.capacity,
          start: facility.startTime,
          end: facility.endTime,
          activities
        };
      }));
    }, [facilityData, activityData]);

    const [formInputs, setFormInputs] = useState({
      name: "",
      capacity: "",
      start: "",
      end: "",
      activityName: "",
      price: "",
    });

    const handleShow = () => {
      setShow(true);
      const selectedFacilityDetails = facilityDetails.find(facility => facility.name === selectedFacility.name);
      const selectedActivities = selectedFacilityDetails.activities;
      const activityName = selectedActivities.map(activity => activity.activityName);
      const price = selectedActivities.map(activity => activity.price);
      setFormInputs({
        name: selectedFacility.name,
        capacity: selectedFacility.capacity,
        start: selectedFacility.start,
        end: selectedFacility.end,
        activityName,
        price
      });
    };

     const handleSubmit = (event) => {
        event.preventDefault();
        // Update facility details with formInputs values
        setFacilityDetails((prevState) => {
        const updatedDetails = [...prevState];
        const index = updatedDetails.findIndex(
            (facility) => facility.name === selectedFacility.name
        );
        updatedDetails[index].name = formInputs.name;
        updatedDetails[index].capacity = formInputs.capacity;
        updatedDetails[index].start = formInputs.start;
        updatedDetails[index].end = formInputs.end;
        updatedDetails[index].activities = updatedDetails[index].activities.map(
          (activity, id) => ({
            activityName: formInputs.activityName[id],
            price: formInputs.price[id],
            ...activity,
          })
        );
        return updatedDetails;
        });
        
        /*// Update activityName and price values in formInputs
        const updatedActivityNames = facilityDetails.find(facility => facility.name === selectedFacility.name).activities.map(activity => activity.activityName);
        const updatedPrices = facilityDetails.find(facility => facility.name === selectedFacility.name).activities.map(activity => activity.price);
        setFormInputs(prevState => ({
          ...prevState,
          activityName: updatedActivityNames,
          price: updatedPrices
        }));*/

    
        // Send updated facility details to server
        axios.put(`http://localhost:4000/api/facilities/${selectedFacility.name}`, {
        //name: formInputs.name,
        capacity: formInputs.capacity,
        startTime: formInputs.start,
        endTime: formInputs.end,
        })
        .then(response => {
        console.log(response.data);
        handleClose();
        })
        .catch(error => {
        console.log(error);
        alert('Failed to save data')
        });

        // Update activityName and price in activity database
        selectedFacility.activities.forEach((activity, index) => {
          axios
            .put(`http://localhost:4000/api/activities/${activity.activityId}`, {
              activityName: formInputs.activityName[index],
              price: formInputs.price[index],
            })
            .then((response) => {
              console.log(response.data);
            })
            .catch((error) => {
              console.log(error);
              alert("Failed to update activity details");
            });
        });

        // Close modal
        handleClose();
    };
    

    const onDelete = async(id) => {
      try {
        await axios.delete("facilities/id")
        setFacilityDetails(facilityDetails.filter((item) => item._id !== id));
      } catch (error) {
      
      }
    };

    /*const onSave = async () => {
      const updatedFacilities = {facilityName, capacity, startTime, endTime}
  
      try {
        await axios.put(`/facilities/${facilityName}`, updatedFacilities);
        // Update the facilityData state with the updated data
      } catch (error) {
        console.error(error);
        alert('Failed to save data')
      }
    };*/

    return (
    //<Fragment>
      <div>
        <Navbar />
        <EditFacilityForm 
          show={show}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
          facility={selectedFacility}
          formInputs={formInputs}
          setFormInputs={setFormInputs}
        />
        {facilityLoading ? (
          "Page is loading please wait"
          ) : ( 
          <>
          <div className="facilityactivityDetails">
                <div className="facilityactivityDetailsTable">
                      <h1 className="facilityactivityDetailsTitle">Facility/Activity Details</h1>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Facility</th>
                                        <th>Capacity</th>
                                        <th>Opening Time</th>
                                        <th>Closing Time</th>
                                        <th className="activity-price">Activity & Price</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {facilityData.map(({facilityName:name, capacity, startTime: start, endTime : end }) => (
                                    <tr key = {name}>
                                        <td>
                                        {!isEditable ? (
                                              <span>{name}</span>
                                        ) : (
                                          <input
                                                name="name"
                                                value={name}
                                                type="text"
                                                placeholder="facility"
                                              />
                                        )}
                                        </td>
                                        <td>
                                        {!isEditable ? (
                                              <span>{capacity}</span>
                                        ) : (
                                            <input
                                                name='capacity'
                                                value={capacity}
                                                type="number"
                                                //onChange={(event) => onChangeInput(event, name)}
                                                placeholder="capacity"
                                            />
                                            )}
                                        </td>
                                        <td>
                                          {!isEditable ? (
                                              <span>{start}</span>
                                        ) : (
                                            <input
                                                name='start'
                                                value={start}
                                                type="time"
                                                //onChange={(f) => onChangeInput(f, name)}
                                                placeholder="1800"
                                                disabled={!editableRows[name]}
                                            />
                                            )}
                                        </td>
                                        <td>
                                          {!isEditable ? (
                                              <span>{end}</span>
                                        ) : (
                                            <input
                                                name='end'
                                                value={end}
                                                type="time"
                                                //onChange={(f) => onChangeInput(f, name)}
                                                placeholder="1700"
                                                disabled={!editableRows[name]}
                                            />
                                            )}
                                        </td>
                                        {activityData.filter(activity => activity.facilityName === name).map((activity, index) => (
                                        <tr key = {index}>
                                            <td>
                                            {!isEditable ? (
                                              <span>{activity.activityName}</span>
                                            ) : (
                                            <input
                                                name={`activity[index].name`}
                                                value={activity.activityName}
                                                type="text"
                                                onChange={(f) =>
                                                  setFacilityDetails((prevState) => {
                                                    const newState = [...prevState];
                                                    newState[name - 1].activity[index].name = f.target.value;
                                                    return newState;
                                                  })
                                                }
                                                placeholder="activity"
                                                disabled={!editableRows[name]}
                                            />
                                            )}
                                            </td>
                                            <td>
                                            {!isEditable ? (
                                            <span>{activity.price}</span>
                                            ) : (
                                            <input
                                                name={`activity[index].price`}
                                                value={activity.price}
                                                type="number"
                                                step="0.01"
                                                onChange={(f) =>
                                                  setFacilityDetails((prevState) => {
                                                    const newState = [...prevState];
                                                    newState[name - 1].activity[index].price = f.target.value;
                                                    return newState;
                                                  })
                                                }
                                                placeholder="price"
                                                disabled={!editableRows[name]}
                                            />
                                            )}
                                            </td>
                                        </tr>
                                        ))}
                                        <td>
                                        <button className="editButton" onClick={() => {setSelectedFacility({name, capacity, start, end}); handleShow();}}>
                                          {editableRows[name] ? "Done" : "Edit"}
                                        </button>
                                        </td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div>
                            {/*{!isEditable && (*/}
                                <button className="button" >Save</button>
                            {/*})}*/}
                          </div>
                      </div>
                  </div>
                  </>)}
              </div>
  );
};

export default FacilityDetails;