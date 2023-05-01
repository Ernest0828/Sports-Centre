import React from 'react';
import {useEffect, useState, useContext} from 'react';
import "./bookings.css";
import Navbar from "../../managerNavbar/ManagerNavbar";
// import {Auth} from "../../../../context/Auth"
// import { Link } from 'react-router-dom';
import useFetch from "../../hooks/useFetch"
import axios from 'axios';
import { Modal, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import EditBookingForm from "./editBookingForm";
import BookActivityForm from "./bookActivityForm";
import BookClassForm from "./bookClassForm";

const BookingDetails = () => {

    //useFetch Hooks
    const {data:bookingData, loading:bookingLoading, error:bookingError} = useFetch ("http://localhost:4000/api/bookings/");
    const {data:customerData, loading:customerLoading, error:customerError} = useFetch ("http://localhost:4000/api/customer/");
    const {data:staffData, loading:staffLoading, error:staffError} = useFetch ("http://localhost:4000/api/employee/");
    const {data:activityData, loading:activityLoading, error:activityError} = useFetch ("http://localhost:4000/api/activities/");
    const {data:classData, loading:classLoading, error:classError} = useFetch ("http://localhost:4000/api/classes/");

    const [bookingDetails, setBookingDetails] = useState()
    const [editableRows, setEditableRows] = useState({});
    const [isSaved, setIsSaved] = useState(false);

    const [selectedBooking, setSelectedBooking] = useState(null);

    const [show, setShow] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [showClass, setShowClass] = useState(false);
    
    const handleClose = () => {
      setShow(false);
      setShowAdd(false);
      setShowClass(false);
    }

    useEffect(() => {
        setBookingDetails(bookingData.map((booking) => {
            const customer = customerData.find((customer) => customer.customerId === booking.customerId);
            const staff = staffData.find((staff) => staff.staffId === booking.staffId);
            const activity = activityData.find((activity) => activity.activityId === booking.activityId);
            const classes = classData.find((classes) => classes.classId === booking.classId);
            return {
            ...booking,
            bookingId: booking.bookingId,
            noOfPeople: booking.noOfPeople,
            date: new Date(booking.date).toISOString().slice(0, 10),
            //date: booking.date,
            startTime: booking.startTime,

            endTime: booking.endTime,
            bookingType: booking.bookingType,

            customerId: booking.customerId,
            //customerEmail: customer ? customer.customerEmail : '',
            //customerName: customer.customerName,

            staffId: booking.staffId,
            staffName: staff ? staff.staffName : '',

            activityId: booking.activityId,
            activityName: activity ? activity.activityName : '',

            classId: booking.classId,
            className: classes ? classes.className : '',

            facilityName: booking.facilityName,
            price: booking.price
            };
        }));

        }, [bookingData]);

    const [formInputs, setFormInputs] = useState({
      customerId: "",
      customerEmail:"",
      staffId: "",
      staffName:"",
      noOfPeople: "",
      bookingType:"",
      date: "",
      startTime: "",
      endTime:"",
      activityId: "",
      activityName:"",
      classId: "",
      className:"",
      facilityName: "",
    });


    const handleShow = (bookingId) => {
      const selectedBooking = bookingDetails.find(booking => booking.bookingId === bookingId);
      setSelectedBooking(selectedBooking);
      setShow(true);
      if (selectedBooking) {
      setFormInputs({
        customerEmail: selectedBooking.customerEmail,
        staffName: selectedBooking.staffName,
        bookingType: selectedBooking.bookingType,
        noOfPeople: selectedBooking.noOfPeople,
        date: selectedBooking.date,
        startTime: selectedBooking.startTime,
        endTime: selectedBooking.endTime,
        activityName: selectedBooking.activityName,
        className: selectedBooking.className,
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
        startTime: "",
        endTime:"",
        activityId: "",
        classId: "",
        facilityName: "",
      });
    }
    };

    const handleAddClass = () => {
      setShowClass(true);
      if (selectedBooking) {
      setFormInputs({
        customerId: "",
        staffId: "",
        date: "",
        startTime: "",
        endTime:"",
        activityId: "",
        classId: "",
        facilityName: "",
      });
    }
    };
  

    const handleClassSubmit = (event) => {
      event.preventDefault();

      // const customerNameUpper = formInputs.customerName ? formInputs.customerName.toUpperCase() : null;
      const selectedCustomer = customerData.find((customer) => customer.customerEmail === formInputs.customerEmail);
      const customerId = selectedCustomer ? selectedCustomer.customerId : null;

      const selectedStaff = staffData.find((staff) => staff.staffName === formInputs.staffName);
      const staffId = selectedStaff ? selectedStaff.staffId : null;

      // Convert the date format from DD/MM/YYYY to YYYY/MM/DD
     /* const [day, month, year] = formInputs.date.split("/");
      const date = `${year}/${month}/${day}`;*/


      const selectedActivity = activityData.find((activity) => activity.activityName === formInputs.activityName && activity.facilityName === formInputs.facilityName);
      const activityId = selectedActivity ? selectedActivity.activityId : null;

      const dateofDay = new Date(formInputs.date);
      const dayOfWeek = dateofDay.toLocaleDateString('en-US', { weekday: 'long' });
      const selectedClass = classData.find((classes) => classes.className === formInputs.className && classes.day === dayOfWeek);
      const classId = selectedClass ? selectedClass.classId : null;
      const classPrice = classId ? classData.find(classes => classes.classId === classId).price : null;

      setBookingDetails((prevState) => {
        const updatedDetails = [...prevState];
        
        updatedDetails.customerId = customerId;
        updatedDetails.staffId = staffId;
        updatedDetails.date = formInputs.date;
        updatedDetails.startTime = formInputs.startTime;
        updatedDetails.activityId =  activityId;
        updatedDetails.classId =  classId;
        updatedDetails.facilityName =  formInputs.facilityName;
        updatedDetails.price =  classPrice;
  
        return updatedDetails;
        });
    
      // Send new booking details made by staff
      axios.post('http://localhost:4000/api/bookings/staff-booking', {
        customerId: customerId,
        staffId: staffId,
        date: formInputs.date,
        start: formInputs.startTime,
        activityId: activityId,
        classId: classId,
        facilityName: formInputs.facilityName,
        price: classPrice,
      })
        .then(response => {
          console.log(response.data);
          window.location.reload();
        })
        .catch(err => {
          console.log(err);
          if (err.response.data.message === "Customer has already booked this session" || "Capacity has been reached") {
            alert(err.response.data.message);
          }
        });
    
      // Close modal
      handleClose();
      
    };

    const handleSubmit = (event) => {
      event.preventDefault();

      const selectedCustomer = customerData.find((customer) => customer.customerEmail === formInputs.customerEmail);
      const customerId = selectedCustomer ? selectedCustomer.customerId : null;

      const selectedStaff = staffData.find((staff) => staff.staffName === formInputs.staffName);
      const staffId = selectedStaff ? selectedStaff.staffId : null;

      const selectedActivity = activityData.find((activity) => 
      activity.activityName === formInputs.activityName && activity.facilityName === formInputs.facilityName);
      const activityId = selectedActivity ? selectedActivity.activityId : null;
      const activityPrice = activityId ? activityData.find(activity => activity.activityId === activityId).price : null;

      const date = new Date(formInputs.date);
      const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
      const selectedClass = classData.find((classes) => classes.className === formInputs.className && classes.day === dayOfWeek);
      const classId = selectedClass ? selectedClass.classId : null;
      const classPrice = classId ? classData.find(classes => classes.classId === classId).price : null;

      const pricee = formInputs.activityId === null ? classPrice : activityPrice;

      // Update facility details with formInputs values
      setBookingDetails((prevState) => {
      const updatedDetails = [...prevState];
      const index = updatedDetails.findIndex(
          (booking) => booking.bookingId === selectedBooking.bookingId
      );
      updatedDetails[index].customerId = formInputs.customerId;
      updatedDetails[index].staffId = formInputs.staffId;
      updatedDetails[index].date = formInputs.date;
      updatedDetails[index].startTime = formInputs.startTime;
      updatedDetails[index].endTime = formInputs.endTime;
      updatedDetails[index].activityId =  formInputs.activityId;
      updatedDetails[index].classId =  formInputs.classId;
      updatedDetails[index].facilityName =  formInputs.facilityName;
      updatedDetails[index].price =  pricee;

      return updatedDetails;
      });

      // Send updated customer booking details
      axios.put(`http://localhost:4000/api/bookings/${selectedBooking.bookingId}`, {

          customerId: customerId,
          staffId: staffId,
          date: formInputs.date,
          startTime: formInputs.startTime,
          endTime: formInputs.endTime,
          activityId: activityId,
          classId: classId,
          facilityName:  formInputs.facilityName,
          price: pricee
          })
          .then(response => {
          console.log(response.data);
          window.location.reload();
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

      const selectedCustomer = customerData.find((customer) => customer.customerEmail === formInputs.customerEmail);
      const customerId = selectedCustomer ? selectedCustomer.customerId : null;

        const selectedStaff = staffData.find((staff) => staff.staffName === formInputs.staffName);
        const staffId = selectedStaff ? selectedStaff.staffId : null;

        // Convert the date format from DD/MM/YYYY to YYYY/MM/DD
        //const [day, month, year] = formInputs.date.split("/");
        //onst date = `${year}/${month}/${day}`;

        const selectedActivity = activityData.find((activity) => activity.activityName === formInputs.activityName && activity.facilityName === formInputs.facilityName);
        const activityId = selectedActivity ? selectedActivity.activityId : null;
        const activityPrice = activityId ? activityData.find(activity => activity.activityId === activityId).price : null;


        const dateofDay = new Date(formInputs.date);
        const dayOfWeek = dateofDay.toLocaleDateString('en-US', { weekday: 'long' });
        const selectedClass = classData.find((classes) => classes.className === formInputs.className && classes.day === dayOfWeek);
        const classId = selectedClass ? selectedClass.classId : null;

        setBookingDetails((prevState) => {
          const updatedDetails = [...prevState];
          
          updatedDetails.customerId = customerId;
          updatedDetails.staffId = staffId;
          updatedDetails.date = formInputs.date;
          updatedDetails.startTime = formInputs.startTime;
          updatedDetails.activityId =  activityId;
          updatedDetails.classId =  classId;
          updatedDetails.facilityName =  formInputs.facilityName;
          updatedDetails.price =  activityPrice;
    
          return updatedDetails;
          });
      
        // Send new staff details to server
        axios.post('http://localhost:4000/api/bookings/staff-booking', {
          customerId: customerId,
          staffId: staffId,
          date: formInputs.date,
          start: formInputs.startTime,
          activityId: activityId,
          classId: classId,
          facilityName: formInputs.facilityName,
          price: activityPrice,
        })
          .then(response => {
            console.log(response.data);
            window.location.reload();
          })
          .catch(error => {
            console.log(error);
            alert('No available activity/classes within the selected day and time');
          });
      
        // Close modal
        handleClose();
        
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
            <EditBookingForm 
              show={show}
              handleClose={handleClose}
              handleSubmit={handleSubmit}
              booking={selectedBooking}
              formInputs={formInputs}
              setFormInputs={setFormInputs}
            />
            <BookActivityForm 
              showAdd={showAdd}
              handleClose={handleClose}
              handleAddSubmit={handleAddSubmit}
              //staff={selectedStaff}
              formInputs={formInputs}
              setFormInputs={setFormInputs}
            />
            <BookClassForm 
              showClass={showClass}
              handleClose={handleClose}
              handleClassSubmit={handleClassSubmit}
              formInputs={formInputs}
              setFormInputs={setFormInputs}
            />
            <div  className="bookingDetails">
              <div className="bookingDetailsTable">
                  <h1 className="bookingDetailsTitle">Bookings</h1>
                        <table className ="bookingTable">
                            <thead>
                                <tr>
                                    <th>Customer</th>
                                    <th>Type</th>
                                    <th>Activity</th>
                                    <th>Class</th>
                                    <th>Date</th>
                                    <th>Start Time</th>
                                    <th>End Time</th>
                                    <th>Facility Name</th>
                                    <th>Employee</th>
                                    <th> </th>
                                    <th> </th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookingDetails && bookingDetails.map(({bookingId, customerId, date, startTime, endTime, bookingType, staffName, activityName, className, facilityName}) => {
                                const customerEmail = customerData.find(customer => customer.customerId === customerId)?.customerEmail;
                                return (
                                <tr key = {bookingId}>
                                    <td>
                                              <span>{customerEmail}</span>
                                    </td>
                                    <td>
                                              <span>{bookingType}</span>
                                    </td>
                                    <td>
                                              <span>{activityName}</span>
                                    </td>
                                    <td>
                                              <span>{className}</span>
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
                                              <span>{facilityName}</span>
                                    </td>
                                    <td>
                                              <span>{staffName}</span>
                                    </td>
                                     <td>
                                    <button className="button editBookingButton" onClick={() => {handleShow(bookingId);}}>
                                    {editableRows[bookingId] ? "Edit" : "Edit"}
                                    </button>
                                    </td>
                                    <td>
                                    <button className="button editBookingButton" onClick={() => {handleDelete(bookingId);}}>
                                    {editableRows[bookingId] ? "Delete" : "Delete"}
                                    </button>
                                    </td>
                                </tr>
                                );
                                })}
                            </tbody>
                            <div style={{ display: 'flex'}}>
                              <button className="button addBookingButton" style={{marginRight: "10px"}} onClick={() => { handleAdd();}}>
                                Book Activity
                              </button>
                              <button className="button addBookingButton" onClick={() => { handleAddClass();}}>
                                Book Class
                              </button>
                            </div>
                        </table>
                    </div>
                </div>
        </div>
    )
}

export default BookingDetails;