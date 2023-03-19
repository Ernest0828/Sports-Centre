import React from 'react';
import {useState} from 'react';
import "./facilityDetails.css";
import Navbar from "../../managerNavbar/navbar";
const data = [
    {
      id      : '01',
      facility: 'Swimming pool',
      capacity: 30,
      activity: [
      {
        name:'General use',
        price: 8
      },
      {
        name:'Lane swimming',
        price: 8
      },
      {
        name:'Lessons',
        price:8
      },
      {
        name:'Team events (2 Hours)',
        price:20
      },
    ]
    },
    {
        id      : '02',
        facility: 'Sports hall',
        capacity: 45,
        activity: [
        {
          name:'1-hour session',
          price:8
        },
        {
          name:'Team events (2 Hours)',
          price:20
        },
      ]
      },
      {
        id      : '03',
        facility: 'Fitness room',
        capacity: 35,
        activity: [
        {
          name:'General use',
          price:8
        },
      ]
      },
      {
        id      : '04',
        facility: 'Squash court',
        capacity: 4,
        activity: [
        {
          name:'1-hour session',
          price:8
        },
      ]
      },
      {
        id      : '05',
        facility: 'Squash court',
        capacity: 4,
        activity: [
        {
          name:'1-hour session',
          price:8
        },
      ]
      },
      {
        id      : '06',
        facility: 'Climbing wall',
        capacity: 22,
        activity: [
        {
          name:'General use',
          price:8
        },
      ]
      },
  ]

const FacilityDetails = () => {
    const [facilityDetails, setFacilityDetails] = useState(data)
    const [isEditable, setIsEditable] = useState(false);

    const onChangeInput = (f, id) => {
        const { name, value } = f.target
    
        const editData = facilityDetails.map((item) =>
          item.id === id && name ? { ...item, [name]: value } : item
        )
    
        setFacilityDetails(editData)
      }

      const onAddRow = () => {
        const newId = facilityDetails.length + 1; // generate new ID
        const newRow = { id: newId, facility: "", capacity: "", activity: [{ name: "", price: ""}] };
        setFacilityDetails([...facilityDetails, newRow]);
      };

      const onDeleteRow = (id, index) => {
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
    

      const onDeleteFacilityRow = (id) => {
        const updatedData = facilityDetails.filter((item) => item.id !== id);
        setFacilityDetails(updatedData);
      };

      const toggleEdit = () => {
        setIsEditable(!isEditable);
      };



    return (
    //<Fragment>
    <div classname = "profile">
        <Navbar />
        <div classname="facilityactivityDetails">
          <div classname="profileRight">
               <h1 className="facilityactivityDetailsTitle">Facility/Activity Details</h1>
                    <div className="facilityactivityDetailsTable">
                        <table>
                            <thead>
                                <tr>
                                    <th>Facility</th>
                                    <th>Capacity</th>
                                    <th className="activity-price">Activity & Price</th>
                                    {isEditable && <th> </th>}
                                </tr>
                            </thead>
                            <tbody>
                                {facilityDetails.map(({ id, facility, capacity, activity }) => (
                                <tr key = {id}>
                                    <td>
                                        <input
                                            name='facility'
                                            value={facility}
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
                                    {activity.map((activity, index) => (
                                    <tr key = {index}>
                                        <td>
                                        <input
                                            name={`activity[index].name`}
                                            value={activity.name}
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
                                        {isEditable && (
                                          <td>
                                          {/*<button className="deleteButton" onClick={() => onDeleteRow(id)}>
                                          Delete
                                        </button>*/}
                                        </td>
                                        )}
                                    </tr>
                                    ))}
                                    <td>
                                    {isEditable && (
                                           <button className="deleteButton" onClick={() => onDeleteFacilityRow(id)}>
                                           Del Fac
                                            </button> 
                                        )}
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                        <div>
                        <button className="editButton" onClick={toggleEdit}>
                        {isEditable ? "Save" : "Edit"}
                        </button>
                        {isEditable && (
                             <button class="button" onClick={onAddRow}>Add</button>
                        )}
                        </div>
                    </div>
                </div>
            </div>
        </div>

  );
};

export default FacilityDetails;