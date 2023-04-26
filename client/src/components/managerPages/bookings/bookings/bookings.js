import React from 'react';
import {useEffect, useState} from 'react';
import "./bookings.css";
import Navbar from "../../managerNavbar/navbar";
import { Link } from 'react-router-dom';
import useFetch from "../../hooks/useFetch"
import axios from 'axios';
import { Modal, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
//import EditBookingForm from "./editBookingForm";
//import AddBookingForm from "./AddBookingForm";

const BookingDetails = () => {

    //useFetch Hooks
    const {data:bookingData, loading:bookingLoading, error:bookingError} = useFetch ("http://localhost:4000/api/bookings/");

    const [bookingDetails, setBookingDetails] = useState()
    const [editableRows, setEditableRows] = useState({});
    const [isEditable, setIsEditable] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    const [selectedBooking, setSelectedBooking] = useState(null);

    const [show, setShow] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const handleClose = () => {
      setShow(false);
      setShowAdd(false);
    }

    useEffect(() => {
        setBookingDetails(bookingData.map((booking) => {
        return {
          ...booking,
          bookingId: booking.bookingId,
          noOfPeople: booking.noOfPeople,
          date: booking.date,
          startTime: booking.startTime,
          endTime: booking.endTime,
          bookingType: booking.bookingType,
          customerId: booking.customerId,
          staffId: booking.staffId,
          activityId: booking.activityId,
          classId: booking.classId,
          facilityName: booking.facilityName
        };
      }));
    }, [bookingData]);

    const [formInputs, setFormInputs] = useState({
      customerId: "",
      staffId: "",
      noOfPeople: "",
      date: "",
      start: "",
      activityId: "",
      classId: "",
      facilityName: "",
    });

    const handleShow = (bookingId) => {
      const selectedBooking = bookingDetails.find(booking => booking.bookingId === bookingId);
      setSelectedBooking(selectedBooking);
      setShow(true);
      if (selectedBooking) {
      setFormInputs({
        customerId: selectedBooking.customerId,
        staffId: selectedBooking.staffId,
        noOfPeople: selectedBooking.noOfPeople,
        date: selectedBooking.date,
        start: selectedBooking.start,
        activityId: selectedBooking.activityId,
        classId: selectedBooking.classId,
        facilityName: selectedBooking.facilityName,
      });
    }
    };

    const handleAdd = () => {
      setShowAdd(true);
      if (selectedBooking) {
      setFormInputs({
        customerId: "",
        staffId: "",
        date: "",
        start: "",
        activityId: "",
        classId: "",
        facilityName: "",
      });
    }
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      // Update facility details with formInputs values
      setBookingDetails((prevState) => {
      const updatedDetails = [...prevState];
      const index = updatedDetails.findIndex(
          (booking) => booking.bookingId === selectedBooking.bookingId
      );
      updatedDetails[index].customerId = formInputs.customerId;
      updatedDetails[index].staffId = formInputs.staffId;
      updatedDetails[index].date = formInputs.date;
      updatedDetails[index].start = formInputs.start;
      updatedDetails[index].activityId =  formInputs.activityId;
      updatedDetails[index].classId =  formInputs.classId;
      updatedDetails[index].facilityName =  formInputs.facilityName;

      return updatedDetails;
      });

      // Send updated facility details to server
      axios.put(`http://localhost:4000/api/bookings/${selectedBooking.bookingId}`, {

        customerId: formInputs.customerId,
        staffId: formInputs.staffId,
        date: formInputs.date,
        start: formInputs.start,
        activityId: formInputs.activityId,
        classId:  formInputs.classId,
        facilityName:  formInputs.facilityName
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

      setBookingDetails((prevState) => {
        const updatedDetails = [...prevState];
        
        updatedDetails.customerId = formInputs.customerId;
        updatedDetails.staffId = formInputs.staffId;
        updatedDetails.date = formInputs.date;
        updatedDetails.start = formInputs.start;
        updatedDetails.activityId =  formInputs.activityId;
        updatedDetails.classId =  formInputs.classId;
        updatedDetails.facilityName =  formInputs.facilityName;
  
        return updatedDetails;
        });
    
      // Send new staff details to server
      axios.post('http://localhost:4000/api/bookings/staff-booking', {
        customerId: formInputs.customerId,
        staffId: formInputs.staffId,
        date: formInputs.date,
        start: formInputs.start,
        activityId: formInputs.activityId,
        classId: formInputs.classId,
        facilityName: formInputs.facilityName,
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
      window.location.reload();
    };

    const handleDelete = (bookingId) => {
      const selectedBooking = bookingDetails.find(booking => booking.bookingId === bookingId);
      setSelectedBooking(selectedBooking);
      
      if (window.confirm("Are you sure you want to delete this booking?")) {
        axios.delete(`http://localhost:4000/api/bookings/${selectedBooking.bookingId}`)
          .then(() => {
            // remove the deleted staff member from staffDetails state
            setBookingDetails(bookingDetails.filter(booking => booking.bookingId !== selectedBooking.bookingId));
            setIsSaved(true); // set a flag to show that the data has been saved
          })
          .catch(err => console.error('Failed to delete booking', err));
      }
    };
    
    

    return(
        <div>
            <Navbar/>
            {/*<EditStaffForm 
              show={show}
              handleClose={handleClose}
              handleSubmit={handleSubmit}
              staff={selectedStaff}
              formInputs={formInputs}
              setFormInputs={setFormInputs}
            />
            <AddStaffForm 
              showAdd={showAdd}
              handleClose={handleClose}
              handleAddSubmit={handleAddSubmit}
              //staff={selectedStaff}
              formInputs={formInputs}
              setFormInputs={setFormInputs}
    />*/}
            <div  className="bookingDetails">
              <div className="bookingDetailsTable">
                  <h1 className="bookingDetailsTitle">Bookings</h1>
                        <table className ="bookingTable">
                            <thead>
                                <tr>
                                    <th>No. of People</th>   
                                    <th>Date</th>
                                    <th>Start Time</th>
                                    <th>End Time</th>
                                    <th>Booking Type</th>
                                    <th>Customer ID</th>
                                    <th>Staff ID</th>
                                    <th>Activity ID</th>
                                    <th>Class ID</th>
                                    <th>Facility Name</th>
                                    <th> </th>
                                    <th> </th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookingDetails && bookingDetails.map(({bookingId, noOfPeople, date, startTime, endTime, bookingType, customerId, staffId, activityId, classId, facilityName}) => (
                                <tr key = {bookingId}>
                                    <td>
                                              <span>{noOfPeople}</span>
                                    </td>
                                    <td>
                                              <span>{date}</span>
                                    </td>
                                    <td>
                                              <span>{startTime}</span>
                                    </td>
                                    <td>
                                              <span>{endTime}</span>
                                    </td>
                                    <td>
                                              <span>{bookingType}</span>
                                    </td>
                                    <td>
                                              <span>{customerId}</span>
                                    </td>
                                    <td>
                                              <span>{staffId}</span>
                                    </td>
                                    <td>
                                              <span>{activityId}</span>
                                    </td>
                                    <td>
                                              <span>{classId}</span>
                                    </td>
                                    <td>
                                              <span>{facilityName}</span>
                                    </td>
                                    {isEditable && (
                                    <td>
                                    <button className="deleteBookingButton" >
                                        Delete
                                    </button>
                                    </td>
                                     )}
                                    <td>
                                    <button className="editBookingButton" onClick={() => {handleShow(bookingId);}}>
                                    {editableRows[bookingId] ? "Done" : "Edit"}
                                    </button>
                                    </td>
                                    <td>
                                    <button className="editBookingButton" onClick={() => {handleDelete(bookingId);}}>
                                    {editableRows[bookingId] ? "Delete" : "Delete"}
                                    </button>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                            <div>
                              <button className="addBookingButton" onClick={() => { handleAdd();}}>
                                Add
                              </button>
                            </div>
                        </table>
                    </div>
                </div>
        </div>
    )
}

export default BookingDetails;