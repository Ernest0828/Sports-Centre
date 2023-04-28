import { Form, Button } from "react-bootstrap"
import useFetch from "../../hooks/useFetch"
import axios from 'axios'
import {useContext, useState, useEffect} from 'react';
import { Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import BookingDatePicker from "./datepicker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays, isThursday } from "date-fns";

const AddBookingForm = ({showAdd, handleClose, handleAddSubmit, formInputs, setFormInputs}) => {



    const {data:facilityData, loading:facilityLoading, error:facilityError} = useFetch ("http://localhost:4000/api/facilities/");
    const {data:activityData, loading:activityLoading, error:activityError} = useFetch ("http://localhost:4000/api/activities/");
    const {data:classData, loading:classLoading, error:classError} = useFetch ("http://localhost:4000/api/classes/");

    const [facilityDetails, setFacilityDetails] = useState();
    const [selectedFacility, setSelectedFacility] = useState("");
    const [selectedActivity, setSelectedActivity] = useState("");
    const [selectedClass, setSelectedClass] = useState("");
    const [activityNames, setActivityNames] = useState([]);
    const [classNames, setClassNames] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");

    const today = new Date();
    const minDate = addDays(today, 10); // Minimum date is 2 weeks in advance
    const maxDate = addDays(minDate, 0); // Maximum date is 1 week from minDate

  // Filter function to show only Thursdays
    const filterThursday = (date) => isThursday(date);

    useEffect(() => {
      // Filter the activity data based on the selected facility name
      const filteredActivities = activityData.filter(
        (activity) => activity.facilityName === selectedFacility
      );

      const uniqueNames = new Set(filteredActivities.map((activity) => activity.activityName));
      const names = Array.from(uniqueNames);

      // Update the state with the activity names
      setActivityNames(names);
      

      /*const uniqueClasses = new Map();
      classData.forEach((classes) => {
        if (!uniqueClasses.has(classes.className)) {
          uniqueClasses.set(classes.className, classes);
        }
      });
      const classes = Array.from(uniqueClasses.values());

      // Update the state with the unique class names
      setClassNames(classes);*/

      // Create a mapping of activityIds based on facilityName and activityName
      const activityIdMap = filteredActivities.reduce((map, activity) => {
        map[`${activity.facilityName}-${activity.activityName}`] =
          activity.activityId;
        return map;
      }, {});
    
      setFacilityDetails(
        facilityData.map((facility) => {
          const activities = filteredActivities
            .filter((activity) => activity.facilityName === facility.facilityName)
            .map((activity) => ({
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
        })
      );
    }, [facilityData, activityData, selectedFacility]);

      const handleFormInputChange = (event) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        const name = event.target.name;
    
        if (name === 'isManager') {
          setFormInputs({
            ...formInputs,
            [name]: value === 'Manager' ? true : false
          });
        } else {
          setFormInputs({
            ...formInputs,
            [name]: value
          });
        }
      };
      
      const handleDateFormInputChange = (name, value) => {
        setFormInputs({ ...formInputs, [name]: value });
      };

      
      return (
        <Modal show={showAdd} onHide={handleClose}>
        <Modal.Header style={{ background: "none", border: "none" }}>
          <Modal.Title>Make Booking</Modal.Title>
          <button className="btn-close" onClick={handleClose}>
            <span aria-hidden="true">&times;</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddSubmit}>
      
            <Form.Group controlId="formCustomer">
              <Form.Label>Customer</Form.Label>
              <Form.Control
                type="text"
                name="customerName"
                value={formInputs.customerName}
                onChange={handleFormInputChange}
                placeholder="Jane"
              />
            </Form.Group>


            <Form.Group controlId="formFacility">
              <Form.Label>Facility</Form.Label>
              <Form.Control
                as="select"
                name="facilityName"
                value={selectedFacility}
                onChange={(e) => {
                  setSelectedFacility(e.target.value);
                  setFormInputs({
                    ...formInputs,
                    facilityName: e.target.value
                  });
                }}
              >
                <option value="">Select Facility</option>
                {facilityDetails &&
                  facilityDetails.map((facility) => (
                    <option
                      key={facility.facilityName}
                      value={facility.facilityName}
                    >
                      {facility.facilityName}
                    </option>
                  ))}
              </Form.Control>
            </Form.Group>

      
            <Form.Group controlId="formActivity">
              <Form.Label>Activity</Form.Label>
              <Form.Control
                as="select"
                name="activityName"
                value={selectedActivity}
                onChange={(e) => {
                  setSelectedActivity(e.target.value);
                  setFormInputs({
                    ...formInputs,
                    activityName: e.target.value
                  });
                }}
              >
                <option value="">Select Activity</option>
                {activityNames &&
                  activityNames.map((activityName) => (
                    <option key={activityName} value={activityName}>
                      {activityName}
                    </option>
                  ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formClasses">
              <Form.Label>Class</Form.Label>
              <Form.Control
                as="select"
                name="className"
                value={selectedClass}
                onChange={(e) => {
                  setSelectedClass(e.target.value);
                  setFormInputs({
                    ...formInputs,
                    className: e.target.value
                  });
                }}
              >
                <option value="">Select Class</option>
                {classData &&
                  classData.map((classes) => (
                    <option
                      key={classes.classId}
                      value={classes.className}
                    >
                      {classes.className}
                    </option>
                  ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={formInputs.date}
                onChange={handleFormInputChange}
                placeholder=" "
              />
            </Form.Group>

            {/*<Form.Group controlId="formDate">
              <Form.Label>Date</Form.Label>
              <DatePicker
              selected={selectedDate}
              onChange={(date) => {
                setSelectedDate(date);
                handleDateFormInputChange("date", date);
              }}
              minDate={minDate}
              maxDate={maxDate}
              //filterDate={filterThursday}
              dateFormat="yyyy/MM/dd"
              placeholderText=" "
            />
            </Form.Group>*/}


            <Form.Group controlId="formStartTime">
              <Form.Label>Start</Form.Label>
              <Form.Control
                type="time"
                name="startTime"
                value={formInputs.startTime}
                onChange={handleFormInputChange}
                placeholder=" "
              />
            </Form.Group>

            <Form.Group controlId="formStaff">
              <Form.Label>Employee</Form.Label>
              <Form.Control
                type="text"
                name="staffName"
                value={formInputs.staffName}
                onChange={handleFormInputChange}
                placeholder=""
              />
            </Form.Group>
      
            <Button style={{marginTop: "10px"}}variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  };

export default AddBookingForm;