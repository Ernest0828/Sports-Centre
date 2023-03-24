import React from 'react';
import {useState} from 'react';
import "./staff.css";
import Navbar from "../managerNavbar/navbar";
import { Link } from 'react-router-dom';

//temporary data
const data = [
    {
      staffId     : '01',
      staffName: 'Ernest Kong',
      staffNumber: '201583940',
      staffEmail: 'sc21ezqk@leeds.ac.uk',
      staffPassword: 'abcde',
      isManager: false
    },
    {
      staffId     : '02',
      staffName: 'Zayden',
      staffNumber: '201637435',
      staffEmail: 'sc21wma@leeds.ac.uk',
      staffPassword: 'abcde',
      isManager: false
    },
]

const Staff = () => {

    const [staffDetails, setStaffDetails] = useState(data)
    const [isEditable, setIsEditable] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    
    const onChangeInput = (s, staffId) => {
        const { name, value } = s.target
    
        const editData = staffDetails.map((item) =>
          item.staffId === staffId && name ? { ...item, [name]: value } : item
        )
    
        setStaffDetails(editData)
      }

      const onDeleteStaff = (staffId) => {
        const updatedData = staffDetails.filter((item) => item.staffId !== staffId);
        setStaffDetails(updatedData);
      };

      const toggleEdit = () => {
        setIsEditable(!isEditable);
      };

      const onAddRow = async() => {
        const newId = staffDetails.length + 1; // generate new ID
        const newRow = { staffId: newId, staffName: "", staffNumber: "", staffEmail: "", staffPassword: "", isManager: ""};
        setStaffDetails([...staffDetails, newRow]);}

        //send post request to /register endpoint
        /*try {
          const response = await fetch ('/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: newRow.staffName,
              number: newRow.staffNumber,
              email: newRow.staffEmail,
              password: newRow.staffPassword, // replace this with the actual password for each staff member
              isManager: newRow.isManager,
            })
          }
          );
          if (!response.ok){
            throw new Error('Failed to create new staff member');
          }

          console.log('New staff member created')
        } catch (error) {
          console.error(error.message('server error'));
        }
      };*/ 

    const saveData = async() => {
      // Loop through staffDetails and make a POST request to /register for each staff member
      staffDetails.forEach(async (staff) => {
        try {
          const response = await fetch('/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: staff.staffName,
              number: staff.staffNumber,
              email: staff.staffEmail,
              password: staff.staffPassword, // replace this with the actual password for each staff member
              isManager: staff.isManager, // replace this with the actual value for each staff member
            }),
          });

          const data = await response.json();

          console.log('Data:', data);

          setIsSaved(true);

          if (!response.ok){
            throw new Error('Failed to create new staff member');
          }

          console.log('New staff member created')
        } catch (err) {
          console.error(err.message('Server error;'));
        }
      });
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
                                    <th>Password</th>
                                    <th>Manager</th>
                                    {isEditable && <th> </th>}
                                </tr>
                            </thead>
                            <tbody>
                                {staffDetails.map(({ staffId, staffName, staffNumber, staffEmail, staffPassword, isManager }) => (
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
                                    <td>
                                        <input
                                            name='staffPassword'
                                            value={staffPassword}
                                            type="text"
                                            onChange={(s) => onChangeInput(s, staffId)}
                                            placeholder="staff email"
                                            disabled={!isEditable}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            name='isManager'
                                            value={isManager}
                                            type="boolean"
                                            onChange={(s) => onChangeInput(s, staffId)}
                                            placeholder="manmager or not"
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
                          {isEditable ? " Done "  : " Edit "}
                          </button>
                          {isEditable && (
                                  <button class="button" onClick={onAddRow}>Add</button>
                          )}
                          {!isEditable && (
                                  <button class="button" onClick={saveData}>Save</button>
                          )}
                        </div>
                    </div>
                </div>
        </body>
    )
}

export default Staff;