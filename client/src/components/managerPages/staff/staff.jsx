import React from 'react';
import {useState} from 'react';
import "./staff.css";
import Navbar from "../navbar/navbar";
import { Link } from 'react-router-dom';

const data = [
    {
      staffId     : '01',
      staffName: 'Chen Ve Co',
      staffNumber: '201637435',
      staffEmail: 'sc22vcc@leeds.ac.uk'
    },
    {
      staffId     : '02',
      staffName: 'Brayden Jalleh',
      staffNumber: '201633748',
      staffEmail: 'sc22bmj@leeds.ac.uk'
    },
    {
      staffId     : '03',
      staffName: 'Edmund Chia',
      staffNumber: '201573802',
      staffEmail: 'sc21ewkc@leeds.ac.uk'
    },
    {
      staffId     : '04',
      staffName: 'Ernest Kong',
      staffNumber: '201583940',
      staffEmail: 'sc21ezqk@leeds.ac.uk'
    },
    {
      staffId     : '05',
      staffName: 'Zayden',
      staffNumber: '201637435',
      staffEmail: 'sc21wma@leeds.ac.uk'
    },
]

const Staff = () => {

    const [staffDetails, setStaffDetails] = useState(data)
    const [isEditable, setIsEditable] = useState(false);
    
    const onChangeInput = (s, staffId) => {
        const { name, value } = s.target
    
        const editData = staffDetails.map((item) =>
          item.staffId === staffId && name ? { ...item, [name]: value } : item
        )
    
        setStaffDetails(editData)
      }


      const onAddRow = () => {
        const newId = staffDetails.length + 1; // generate new ID
        const newRow = { staffId: newId, staffName: "", staffNumber: "", staffEmail: "" };
        setStaffDetails([...staffDetails, newRow]);
      };

      const onDeleteStaff = (staffId) => {
        const updatedData = staffDetails.filter((item) => item.staffId !== staffId);
        setStaffDetails(updatedData);
      };

      const toggleEdit = () => {
        setIsEditable(!isEditable);
      };



    return(
        <body>
            <Navbar/>
            <div  className="staffDetails">
                <h1 className="staffDetailsTitle">GymCorp Staff</h1>
                    <div className="staffDetailsTable">
                        <table>
                            <thead>
                                <tr>
                                    <th>Staff name</th>
                                    <th>Staff number</th>   
                                    <th>Staff email</th>
                                    {isEditable && <th> </th>}
                                </tr>
                            </thead>
                            <tbody>
                                {staffDetails.map(({ staffId, staffName, staffNumber, staffEmail }) => (
                                <tr key = {staffId}>
                                    <td>
                                        <input
                                            name='staffName'
                                            value={staffName}
                                            type="text"
                                            onChange={(s) => onChangeInput(s, staffId)}
                                            placeholder="staff name"
                                            disabled={!isEditable}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            name='staffNumber'
                                            value={staffNumber}
                                            type="text"
                                            onChange={(s) => onChangeInput(s, staffId)}
                                            placeholder="staff number"
                                            disabled={!isEditable}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            name='staffEmail'
                                            value={staffEmail}
                                            type="text"
                                            onChange={(s) => onChangeInput(s, staffId)}
                                            placeholder="staff email"
                                            disabled={!isEditable}
                                        />
                                    </td>
                                    {isEditable && (
                                    <td>
                                    <button className="deleteButton" onClick={() => onDeleteStaff(staffId)}>
                                        Delete
                                    </button>
                                    </td>
                                     )}
                                </tr>
                                ))}
                            </tbody>
                        </table>
                        <div>
                        <button className="editButton" onClick={toggleEdit}>
                        {isEditable ? " Save " : " Edit "}
                        </button>
                        {isEditable && (
                                <button class="button" onClick={onAddRow}>Add</button>
                        )}
                        </div>
                    </div>
                </div>
        </body>
    )
}

export default Staff;