import { Form, Button } from "react-bootstrap"
import axios from 'axios'
import {useContext, useState} from 'react';
import { Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';

const EditFacilityForm = ({show, handleClose, handleSubmit, formInputs, setFormInputs}) => {
  
    const handleFormInputChange = (event) => {
        setFormInputs({
          ...formInputs,
          [event.target.name]: event.target.value
        });
      };

    /*const handleSubmit = (event) => {
        event.preventDefault();
        // Update facility details with formInputs values
        setFacilityDetails((prevState) => {
        const newState = [...prevState];
        const index = newState.findIndex(
            (facility) => facility.name === selectedFacility.name
        );
        newState[index].name = formInputs.name;
        newState[index].capacity = formInputs.capacity;
        newState[index].start = formInputs.start;
        newState[index].end = formInputs.end;
        return newState;
        });
    
        // Send updated facility details to server
        axios.put(`/api/facilities/${selectedFacility.id}`, {
        name: formInputs.name,
        capacity: formInputs.capacity,
        start: formInputs.start,
        end: formInputs.end,
        })
        .then(response => {
        console.log(response.data);
        })
        .catch(error => {
        console.log(error);
        });
    
        // Close modal
        handleClose();
    };*/
  
    return (
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Facility</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formInputs.name}
                onChange={handleFormInputChange}
                placeholder="Enter facility name"
              />
            </Form.Group>
      
            <Form.Group controlId="formCapacity">
              <Form.Label>Capacity</Form.Label>
              <Form.Control
                type="number"
                name="capacity"
                value={formInputs.capacity}
                onChange={handleFormInputChange}
                placeholder="Enter facility capacity"
              />
            </Form.Group>
      
            <Form.Group controlId="formStart">
              <Form.Label>Opening Time</Form.Label>
              <Form.Control
                type="time"
                name="start"
                value={formInputs.start}
                onChange={handleFormInputChange}
                placeholder="Enter opening time"
              />
            </Form.Group>
      
            <Form.Group controlId="formEnd">
              <Form.Label>Closing Time</Form.Label>
              <Form.Control
                type="time"
                name="end"
                value={formInputs.end}
                onChange={handleFormInputChange}
                placeholder="Enter closing time"
              />
            </Form.Group>

            <Form.Group controlId="formActivityName">
              <Form.Label>Activity Name</Form.Label>
              <Form.Control
                type="text"
                name="activityName"
                value={formInputs.activityName}
                onChange={handleFormInputChange}
                placeholder="Enter activity name"
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
                placeholder="Enter price"
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

export default EditFacilityForm;
  