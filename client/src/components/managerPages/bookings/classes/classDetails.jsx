import React from 'react';
import {useState} from 'react';
import "./classDetails.css";
import Navbar from "../../navbar/navbar";

const data = [
    {
      classId     : '01',
      className: 'Pilates',
      price: 10,
      dayTime: [
        {
        day: 'Mondays',
        startTime: '18:00',
        endTime: '19:00'
        }
      ]
    },
    {
      classId     : '02',
      className: 'Aerobics',
      price: 10,
      dayTime: [
        {
        day: 'Tuesdays',
        startTime: '10:00',
        endTime: '11:00'
        },
        {
        day: 'Thursdays',
        startTime: '19:00',
        endTime: '20:00'
        },
        {
        day: 'Saturday',
        startTime: '10:00',
        endTime: '11:00'
        },

      ]
    },
    {
      classId     : '03',
      className: 'Yoga',
      price: 10,
      dayTime: [
        {
        day: 'Fridays',
        startTime: '19:00',
        endTime: '20:00'
        },
        {
        day: 'Sundays',
        startTime: '09:00',
        endTime: '10:00'
        },
      ]
    },
]

const ClassDetails = () => {

    const [classDetails, setClassDetails] = useState(data)
    const [isEditable, setIsEditable] = useState(false);
    
    const onChangeInput = (c, classId) => {
        const { name, value } = c.target
    
        const editData = classDetails.map((item) =>
          item.classId === classId && name ? { ...item, [name]: value } : item
        )
    
        setClassDetails(editData)
      }


      {/*const onAddRow = () => {
        const newId = classDetails.length + 1; // generate new ID
        const newRow = { classId: newId, className: "", price: "", dayTime: [""] };
        setClassDetails([...classDetails, newRow]);
      };*/}

      const onAddRow = () => {
        const newId = classDetails.length + 1; // generate new ID
        const newRow = { classId: newId, className: "", price: "", dayTime: [{ day: "", startTime: "", endTime: "" }] };
        setClassDetails([...classDetails, newRow]);
      };

      const onDeleteStaff = (classId) => {
        const updatedData = classDetails.filter((item) => item.classId !== classId);
        setClassDetails(updatedData);
      };

      const toggleEdit = () => {
        setIsEditable(!isEditable);
      };



    return(
        <div>
            <Navbar/>
            <div className="classDetails">
                    <h1 className="classDetailsTitle">GymCorp Classes</h1>
                    <div className="classDetailsTable">
                        <table>
                            <thead>
                                <tr>
                                    <th>Class</th>
                                    <th>Price</th>   
                                    <th>Day & Time</th>
                                    {isEditable && <th> </th>}
                                </tr>
                            </thead>
                            <tbody>
                                {classDetails.map(({ classId, className, price, dayTime }, index) => (
                                <tr key = {classId}>
                                    <td>
                                        <input
                                            name='className'
                                            value={className}
                                            type="text"
                                            onChange={(c) => onChangeInput(c, classId)}
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
                                            onChange={(c) => onChangeInput(c, classId)}
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
                                            onChange={(event) =>
                                              setClassDetails((prevState) => {
                                                const newState = [...prevState];
                                                newState[classId - 1].dayTime[index].day = event.target.value;
                                                return newState;
                                              })
                                            }
                                            placeholder="Monday"
                                            disabled = {!isEditable}
                                        />
                                        </td>
                                        <td>
                                        <input
                                            name='dayTime[${index}].startTime'
                                            value={dayTime.startTime}
                                            type="time"
                                            onChange={(event) =>
                                              setClassDetails((prevState) => {
                                                const newState = [...prevState];
                                                newState[classId - 1].dayTime[index].startTime = event.target.value;
                                                return newState;
                                              })
                                            }
                                            placeholder="09:00"
                                            disabled = {!isEditable}
                                        />
                                        </td>
                                        <td>
                                        <input
                                            name='dayTime[${index}].endTime'
                                            value={dayTime.endTime}
                                            type="time"
                                            onChange={(event) =>
                                              setClassDetails((prevState) => {
                                                const newState = [...prevState];
                                                newState[classId - 1].dayTime[index].endTime = event.target.value;
                                                return newState;
                                              })
                                            }
                                            placeholder="10:00"
                                            disabled = {!isEditable}
                                        />
                                        </td>
                                    </tr>
                                    ))}
                                    {isEditable && (
                                    <td>
                                    <button className="deleteButton" onClick={() => onDeleteStaff(classId)}>
                                        Delete class
                                    </button>
                                    </td>
                                     )}
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
    )
}

export default ClassDetails;