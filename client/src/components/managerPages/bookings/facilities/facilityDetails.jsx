import React from 'react';
import {useEffect, useState} from 'react';
import "./facilityDetails.css";
import Navbar from "../../managerNavbar/navbar";
import useFetch from "../../hooks/useFetch"
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const FacilityDetails = () => {

    const location = useLocation();
    const path = location.pathname.split("/")[1];

  //useFetch Hooks
    const {data:facilityData, loading:facilityLoading, error:facilityError} = useFetch ("/facilities/");
    const {data:activityData, loading:activityLoading, error:activityError} = useFetch ("/activities/");

  //States
    const [facilityDetails, setFacilityDetails] = useState()
    const [isEditable, setIsEditable] = useState(false);
    /*const [newRow, setNewRow] = useState ({
      name: "",
      capacity: "",
      start: "",
      end: "",
      activity:[]
    });*/

    useEffect(() => {
      setFacilityDetails(facilityData)
    }, [facilityData])

  //Delete row
  /*const onDelete = (id) => {
    const updatedData = facilityDetails.filter((item) => item.id !== id);
    setFacilityDetails(updatedData);
  };*/

  /*const onDelete = async(id) => {
    try {
      await axios.delete("facilities/id")
      setFacilityDetails(facilityDetails.filter((item) => item._id !== id));
    } catch (error) {
     
    }
  };*/

  const onDelete = async (id) => {
    try {
      // Delete the facility
      await axios.delete(`/facilities/${id}`);
  
      // Filter the activityData to get the activities associated with the deleted facility
      const activitiesToDelete = activityData.filter(
        (activity) => activity.facilityName === id
      );
  
      // Delete each activity associated with the deleted facility
      activitiesToDelete.forEach(async (activity) => {
        await axios.delete(`/activities/${activity._id}`);
      });
  
      // Remove the deleted facility from the facilityDetails state
      setFacilityDetails((prevState) =>
        prevState.filter((facility) => facility._id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };


  //Edit table 
    /*const onChangeInput = (f, id) => {
        const { name, value } = f.target
    
        const editData = facilityDetails.map((item) =>
          item.id === id && name ? { ...item, [name]: value } : item
        )
    
        setFacilityDetails(editData)
      }*/

      const onChangeInput = (f, id) => {
        const { name, value } = f.target;
        setFacilityDetails((prevState) => {
          const newState = [...prevState];
          const index = newState.findIndex((facility) => facility.id === id);
          if (name.startsWith("activity")) {
            const [, activityIndex, activityProp] = name.split(".");
            newState[index].activity[activityIndex][activityProp] = value;
          } else {
            newState[index][name] = value;
          }
          return newState;
        });
      };

  //Add new row of facility
  let newRow = { id: 0, facility: "", capacity: "", startTime:"", endTime:"", activity: [{ name: "", price: ""}]};

  const onAddRow = () => {
    const newId = facilityDetails.length + 1; // generate new ID
    const newRow = { id: newId, facility: "", capacity: "", startTime:"", endTime:"", activity: [{ name: "", price: ""}]};
    const updatedFacilityDetails = [...facilityDetails, newRow];
    setFacilityDetails(updatedFacilityDetails);
  };

      
      /*const onAddRow = () => {
        const newId = facilityDetails.length + 1; // generate new ID
        newRow = { ...newRow, id: newId };
        setFacilityDetails([...facilityDetails, newRow]);
      };*/

      /*const onAddRow = () => {
        setFacilityDetails((prevState) => [
          ...prevState,
          {
            facilityId: prevState.length + 1,
            facilityName: newRow.name,
            capacity: newRow.capacity,
            startTime: newRow.start,
            endTime: newRow.end,
            activity: newRow.activity
          }
        ]);

        setNewRow({
          name:"",
          capacity: "",
          start: "",
          end:"",
          activity:[]
        });
      }*/



  //Save data 
      const onSave = async() => {

    
        try {
          const { facility, capacity, startTime, endTime } = newRow;
          const response =  await fetch("/facilities/facilityid",{
            method: "POST",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify({name: facility, capacity: capacity, start: startTime, end: endTime})
          });
          if (!response.ok) {
            throw new Error("Failed to create new facility");
          }
          const responseData = await response.json();
          console.log(responseData);
        } catch (error) {
          console.log("Error: ", error.message);
        }
      }

  //Delete functions
      const onDeleteFacilityRow = (id, index) => {
        const updatedData = facilityDetails.map((item) =>
            item.id === id
      ? {
        ...item,
        activity: item.activity.filter((_, i) => i !== index),
        }
      : item
  );

    
        // check if the facility has any activities left
        const hasActivities = updatedData.find((item) => item.id === id)?.activity.length > 0;
    
        // delete the whole row of facility only if there are no activities left
        if (!hasActivities) {
            onDeleteFacilityRow(id);
        } else {
            setFacilityDetails(updatedData);
        }
    };
    
  //Toggle edit mode (for add, edit, delete)
      const toggleEdit = () => {
        setIsEditable(!isEditable);
      };


    return (
    //<Fragment>
      <div>
        <Navbar />
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
                                        {isEditable && <th> </th>}
                                    </tr>
                                </thead>
                                <tbody>
                                    {facilityData.map(({facilityId : id, facilityName:name, capacity, startTime: start, endTime : end }) => (
                                    <tr key = {id}>
                                        <td>
                                            <input
                                                name='name'
                                                value={name}
                                                type="text"
                                                onChange={(f) => onChangeInput(f, id)}
                                                placeholder="facility"
                                                disabled={!isEditable}
                                            />
                                          
                                        </td>
                                        <td>
                                            <input
                                                name='capacity'
                                                value={capacity}
                                                type="number"
                                                onChange={(f) => onChangeInput(f, id)}
                                                placeholder="capacity"
                                                disabled={!isEditable}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                name='start'
                                                value={start}
                                                type="time"
                                                onChange={(f) => onChangeInput(f, id)}
                                                placeholder="1800"
                                                disabled={!isEditable}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                name='end'
                                                value={end}
                                                type="time"
                                                onChange={(f) => onChangeInput(f, id)}
                                                placeholder="1700"
                                                disabled={!isEditable}
                                            />
                                        </td>
                                        {activityData.filter(activity => activity.facilityName === id).map((activity, index) => (
                                        <tr key = {index}>
                                            <td>
                                            <input
                                                name={`activity[index].name`}
                                                value={activity.activityName}
                                                type="text"
                                                onChange={(event) =>
                                                  setFacilityDetails((prevState) => {
                                                    const newState = [...prevState];
                                                    newState[id - 1].activity[index].name = event.target.value;
                                                    return newState;
                                                  })
                                                }
                                                placeholder="activity"
                                                disabled={!isEditable}
                                            />
                                            </td>
                                            <td>
                                            <input
                                                name={`activity[index].price`}
                                                value={activity.price}
                                                type="number"
                                                step="0.01"
                                                onChange={(event) =>
                                                  setFacilityDetails((prevState) => {
                                                    const newState = [...prevState];
                                                    newState[id - 1].activity[index].price = event.target.value;
                                                    return newState;
                                                  })
                                                }
                                                placeholder="price"
                                                disabled={!isEditable}
                                            />
                                            </td>
                                            {/*{isEditable && (
                                              <td>
                                                <button className="deleteButton" onClick={() => onDeleteFacilityRow(id)}>
                                                Delete
                                                </button>
                                              </td>
                                            )}*/}
                                        </tr>
                                        ))}
                                        <td>
                                        {isEditable && (
                                              <button className="deleteButton" onClick={() => onDelete(id)}>
                                              Delete
                                                </button> 
                                            )}
                                        </td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div>
                            <button className="editButton" onClick={toggleEdit}>
                            {isEditable ? "Done" : "Edit"}
                            </button>
                            {isEditable && (
                                <button className="button" /*onClick={onAddRow}*/>Add</button>
                            )}
                            {!isEditable && (
                                <button className="button" /*onClick={onSave}*/>Save</button>
                            )}
                          </div>
                      </div>
                  </div>
                  </>)}
              </div>
  );
};

export default FacilityDetails;