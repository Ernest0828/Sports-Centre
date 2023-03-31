import { Form, Button } from "react-bootstrap"
import axios from 'axios'
import {useContext, useState} from 'react';
import { Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';

const EditStaffForm = ({show, handleClose, handleSubmit, formInputs, setFormInputs}) => {
  
    const handleFormInputChange = (event) => {
        setFormInputs({
          ...formInputs,
          [event.target.name]: event.target.value
        });
      };
      
      return (
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Class</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
      
            <Form.Group controlId="formClassName">
              <Form.Label>Class Name</Form.Label>
              <Form.Control
                type="text"
                name="className"
                value={formInputs.className}
                onChange={handleFormInputChange}
                placeholder="Enter class name"
              />
            </Form.Group>

            <Form.Group controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="price"
                value={formInputs.price}
                onChange={handleFormInputChange}
                placeholder="enter price"
              />
            </Form.Group>
      
            <Form.Group controlId="formDay">
              <Form.Label>Day</Form.Label>
              <Form.Control
                type="text"
                name="day"
                value={formInputs.day}
                onChange={handleFormInputChange}
                placeholder="Enter day"
              />
            </Form.Group>
      
            <Form.Group controlId="formStartTime">
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                type="time"
                name="startTime"
                value={formInputs.startTime}
                onChange={handleFormInputChange}
                placeholder="Enter start time"
              />
            </Form.Group>

            <Form.Group controlId="formEndTime">
              <Form.Label>End Time</Form.Label>
              <Form.Control
                type="time"
                name="endTime"
                value={formInputs.endTime}
                onChange={handleFormInputChange}
                placeholder="enter end time"
              />
            </Form.Group>
      
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  };

export default EditStaffForm;