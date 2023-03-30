import React from 'react';
import {useEffect, useState} from 'react';
import "./staff.css";
import Navbar from "../managerNavbar/navbar";
import { Link } from 'react-router-dom';
import useFetch from "../hooks/useFetch"
import axios from 'axios';
import { Modal, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import EditStaffForm from "./editStaffForm";

const Staff = () => {

    //useFetch Hooks
    const {data:staffData, loading:staffLoading, error:staffError} = useFetch ("http://localhost:4000/api/employee/");

    const [staffDetails, setStaffDetails] = useState()
    const [editableRows, setEditableRows] = useState({});
    const [isEditable, setIsEditable] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    const [selectedStaff, setSelectedStaff] = useState(null);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    useEffect(() => {
      setStaffDetails(staffData.map((staff) => {
        return {
          ...staff,
          staffId: staff.staffId,
          staffName: staff.staffName,
          staffNumber: staff.staffNumber,
          password: staff.password,
          isManager: staff.isManager
        };
      }));
    }, [staffData]);

    const [formInputs, setFormInputs] = useState({
      staffName: "",
      staffNumber: "",
      staffEmail: "",
      password: "",
      isManager: "",
    });

    const handleShow = () => {
      setShow(true);
      if (selectedStaff) {
      setFormInputs({
        staffId: selectedStaff.staffId,
        staffName: selectedStaff.staffName,
        staffNumber: selectedStaff.staffNumber,
        staffEmail: selectedStaff.staffEmail,
        password: selectedStaff.password,
        isManager: selectedStaff.isManager,
      });
    }
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      // Update facility details with formInputs values
      setStaffDetails((prevState) => {
      const updatedDetails = [...prevState];
      const index = updatedDetails.findIndex(
          (staff) => staff.staffId === selectedStaff.staffId
      );
      updatedDetails[index].staffId = formInputs.staffId;
      updatedDetails[index].staffName = formInputs.staffName;
      updatedDetails[index].staffNumber = formInputs.staffNumber;
      updatedDetails[index].staffEmail = formInputs.staffEmail;
      updatedDetails[index].password =  formInputs.password;
      updatedDetails[index].isManager =  formInputs.isManager;

      return updatedDetails;
      });

      // Send updated facility details to server
      axios.put(`http://localhost:4000/api/employee/${selectedStaff.staffId}`, {

        //staffId: formInputs.staffId,
        staffName: formInputs.staffName,
        staffNumber: formInputs.staffNumber,
        staffEmail: formInputs.staffEmail,
        password: formInputs.password,
        isManager:  formInputs.isManager
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
    

    return(
        <body>
            <Navbar/>
            <EditStaffForm 
              show={show}
              handleClose={handleClose}
              handleSubmit={handleSubmit}
              staff={selectedStaff}
              formInputs={formInputs}
              setFormInputs={setFormInputs}
            />
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
                                    <th>Title</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {staffData.map(({staffId, staffName, staffNumber, staffEmail, password, isManager }) => (
                                <tr key = {staffId}>
                                    <td>
                                    {!isEditable ? (
                                              <span>{staffName}</span>
                                        ) : (
                                        <input
                                            name='staffName'
                                            value={staffName}
                                            type="text"
                                            //onChange={(s) => onChangeInput(s, staffId)}
                                            placeholder="staff name"
                                            disabled={!isEditable}
                                        />
                                        )}
                                    </td>
                                    <td>
                                      {!isEditable ? (
                                              <span>{staffNumber}</span>
                                        ) : (
                                        <input
                                            name='staffNumber'
                                            value={staffNumber}
                                            type="text"
                                            //onChange={(s) => onChangeInput(s, staffId)}
                                            placeholder="staff number"
                                            disabled={!isEditable}
                                        />
                                        )}
                                    </td>
                                    <td>
                                      {!isEditable ? (
                                              <span>{staffEmail}</span>
                                        ) : (
                                        <input
                                            name='staffEmail'
                                            value={staffEmail}
                                            type="text"
                                            //onChange={(s) => onChangeInput(s, staffId)}
                                            placeholder="staff email"
                                            disabled={!isEditable}
                                        />
                                        )}
                                    </td>
                                    <td>
                                      {!isEditable ? (
                                              <span>{password}</span>
                                        ) : (
                                        <input
                                            name='staffPassword'
                                            value={password}
                                            type="text"
                                            //onChange={(s) => onChangeInput(s, staffId)}
                                            placeholder="password"
                                            disabled={!isEditable}
                                        />
                                        )}
                                    </td>
                                    <td>
                                    {!isEditable ? (
                                      <span>{isManager ? "Manager" : "Staff"}</span>
                                    ) : (
                                      <select
                                        name='isManager'
                                        value={isManager}
                                        //onChange={(e) => onChangeInput(e, staffId)}
                                        disabled={!isEditable}
                                      >
                                        <option value={true}>Manager</option>
                                        <option value={false}>Staff</option>
                                      </select>
                                    )}
                                    </td>
                                    {isEditable && (
                                    <td>
                                    <button className="deleteButton" >
                                        Delete
                                    </button>
                                    </td>
                                     )}
                                    <td>
                                    <button className="editButton" onClick={() => {setSelectedStaff({staffId, staffName, staffNumber, staffEmail, password, isManager}); handleShow();}}>
                                    {editableRows[staffId] ? "Done" : "Edit"}
                                    </button>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                        <div>
                          {/*{isEditable && (
                                  <button class="button" onClick={onAddRow}>Add</button>
                          )}*/}
                        </div>
                    </div>
                </div>
        </body>
    )
}

export default Staff;