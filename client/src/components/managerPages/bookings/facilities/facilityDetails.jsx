import React from 'react';
import axios from 'axios';
import {useEffect, useState} from 'react';
import "./facilityDetails.css";
import Navbar from "../../managerNavbar/navbar";
import useFetch from "../../hooks/useFetch"
import EditFacilityForm from "./editFacilityForm";

const FacilityDetails = () => {

  //useFetch Hooks
    const {data:facilityData, loading:facilityLoading, error:facilityError} = useFetch ("http://localhost:4000/api/facilities/");
    const {data:activityData, loading:activityLoading, error:activityError} = useFetch ("http://localhost:4000/api/activities/");


  //States
    const [facilityDetails, setFacilityDetails] = useState();
    const [editableRows, setEditableRows] = useState({});
    const [selectedFacility, setSelectedFacility] = useState(null); 
    const [selectedActivity, setSelectedActivity] = useState(null); 

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    // Create a mapping of activityIds based on facilityName and activityName
    const activityIdMap = activityData.reduce((map, activity) => {
      map[`${activity.facilityName}-${activity.activityName}`] = activity.activityId;
      return map;
    }, {});

    useEffect(() => {

      // Create a mapping of activityIds based on facilityName and activityName
      const activityIdMap = activityData.reduce((map, activity) => {
        map[`${activity.facilityName}-${activity.activityName}`] = activity.activityId;
        return map;
      }, {});

      setFacilityDetails(facilityData.map((facility) => {
        const filteredActivities = activityData.filter(activity => activity.facilityName === facility.facilityName);
        const activities = filteredActivities.map(activity => ({
          activityId: activityIdMap[`${activity.facilityName}-${activity.activityName}`],
          activityName: activity.activityName,
          price: activity.price
        }));
        return {
          ...facility,
          facilityName: facility.facilityName,
          capacity: facility.capacity,
          startTime: facility.startTime,
          endTime: facility.endTime,
          activities
        };
      }));
    }, [facilityData, activityData]);

    const [formInputs, setFormInputs] = useState({
      facilityName: "",
      capacity: "",
      startTime: "",
      endTime: "",
      activities: [
        {
          activityName: "",
          price: "",
        }
      ]
    });

    const handleShow = (facilityName) => {
      const selectedFacility = facilityDetails.find(facility => facility.facilityName === facilityName);
      setSelectedFacility(selectedFacility);
      setShow(true);

      if (selectedFacility) {
      const { facilityName, capacity, startTime, endTime, activities } = selectedFacility;
      setFormInputs({
        facilityName,
        capacity,
        startTime,
        endTime,
        activities: activities.map(activity => ({
          activityName: activity.activityName,
          price: activity.price
        }))
      });
      setSelectedActivity(activities); 
    }
    };

    

     const handleSubmit = (event) => {
        event.preventDefault();

        // Update facility details with formInputs values
        setFacilityDetails((prevState) => {
        const updatedDetails = [...prevState];
        const index = updatedDetails.findIndex(
          (facility) => facility.facilityName === selectedFacility.facilityName
      );
        
        updatedDetails[index].facilityName = formInputs.facilityName;
        updatedDetails[index].capacity = formInputs.capacity;
        updatedDetails[index].startTime = formInputs.startTime;
        updatedDetails[index].endTime = formInputs.endTime;
        updatedDetails[index].activities = formInputs.activities;
        
        return updatedDetails;
        });
    
        // Send updated facility details to server
        axios.put(`http://localhost:4000/api/facilities/${selectedFacility.facilityName}`, {
        //name: formInputs.name,
        capacity: formInputs.capacity,
        startTime: formInputs.startTime,
        endTime: formInputs.endTime,
        })
        .then(response => {
        console.log(response.data);
        handleClose();
        })
        .catch(error => {
        console.log(error);
        alert('Failed to save data')
        });

        // Update activity details with formInputs values
        formInputs.activities.forEach((activity) => {

          const activityId = activityIdMap[`${selectedFacility.facilityName}-${activity.activityName}`];
        
            axios.put(`http://localhost:4000/api/activities/${activityId}`, {
                //facilityName: formInputs.facilityName,
                activityName: activity.activityName,
                price: activity.price,
              })
              .then((response) => {
                console.log(response.data);
              })
              .catch((error) => {
                console.log(error);
                alert('Failed to save data');
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
          <div className="facilityActivityDetails">
                <h1 className="facilityActivityDetailsTitle">Facility Details</h1>
                      <div className="facilityActivityDetailsTable">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Facility</th>
                                        <th>Capacity</th>
                                        <th>Opening Time</th>
                                        <th>Closing Time</th>
                                        <th>Activity & Price</th>
                                        <th> </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {facilityDetails && facilityDetails.map(({facilityName, capacity, startTime, endTime, activities}) => (
                                    <tr key = {facilityName}>
                                        <td>
                                              <span>{facilityName}</span>
                                        </td>
                                        <td>
                                              <span>{capacity}</span>
                                        </td>
                                        <td>
                                              <span>{startTime}</span>
                                        </td>
                                        <td>
                                              <span>{endTime}</span>
                                        </td>
                                        <td>
                                          {activities.map(({ activityName, price }, index) => (
                                            <div key={index}>
                                              <span>{activityName}:&nbsp;&nbsp;</span>
                                              <span>{` ${price}`}</span>
                                            </div>
                                          ))}
                                        </td>
                                        <td>
                                        <button className="editFacilityButton" onClick={() => {handleShow(facilityName);}}>
                                          {editableRows[facilityName] ? "Done" : "Edit"}
                                        </button>
                                        </td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                      </div>
                  </div>
                  </>)}
              </div>
  );
};

export default FacilityDetails;