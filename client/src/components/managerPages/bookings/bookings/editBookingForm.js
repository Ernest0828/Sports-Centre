import { Form, Button } from "react-bootstrap"
import useFetch from "../../hooks/useFetch"
import axios from 'axios'
import {useContext, useState} from 'react';
import { Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';

const EditBookingForm = ({show, handleClose, handleSubmit, formInputs, setFormInputs}) => {
  
    const {data:activityData, loading:activityLoading, error:activityError} = useFetch ("http://localhost:4000/api/activities/");
  
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
      
      return (
        <Modal show={show} onHide={handleClose}>
        <Modal.Header style={{ background: "none", border: "none" }}>
          <Modal.Title>Edit Booking</Modal.Title>
          <button className="btn-close" onClick={handleClose}>
            <span aria-hidden="true">&times;</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
      
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
                type="text"
                name="facilityName"
                value={formInputs.facilityName}
                onChange={handleFormInputChange}
                placeholder="Swimming pool"
              />
            </Form.Group>
      
            <Form.Group controlId="formBookingType">
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                name="bookingType"
                value={formInputs.bookingType}
                onChange={handleFormInputChange}
                placeholder="activity/class"
              />
            </Form.Group>
      
            <Form.Group controlId="formActivity">
              <Form.Label>Activity</Form.Label>
              <Form.Control
                type="text"
                name="activityName"
                value={formInputs.activityName}
                onChange={handleFormInputChange}
                placeholder="General use"
              />
            </Form.Group>

            <Form.Group controlId="formClass">
              <Form.Label>Class</Form.Label>
              <Form.Control
                type="text"
                name="className"
                value={formInputs.className}
                onChange={handleFormInputChange}
                placeholder=""
              />
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

            <Form.Group controlId="formEndTime">
              <Form.Label>End</Form.Label>
              <Form.Control
                type="time"
                name="endTime"
                value={formInputs.endTime}
                onChange={handleFormInputChange}
                placeholder=""
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

export default EditBookingForm;