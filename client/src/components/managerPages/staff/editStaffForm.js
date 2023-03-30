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
          <Modal.Title>Edit Staff</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
      
            <Form.Group controlId="formStaffName">
              <Form.Label>Staff Name</Form.Label>
              <Form.Control
                type="text"
                name="staffName"
                value={formInputs.staffName}
                onChange={handleFormInputChange}
                placeholder="Enter staff name"
              />
            </Form.Group>
      
            <Form.Group controlId="formStaffNumber">
              <Form.Label>Staff Number</Form.Label>
              <Form.Control
                type="number"
                name="staffNumber"
                value={formInputs.staffNumber}
                onChange={handleFormInputChange}
                placeholder="Enter staff number"
              />
            </Form.Group>
      
            <Form.Group controlId="formStaffEmail">
              <Form.Label>Staff Email</Form.Label>
              <Form.Control
                type="text"
                name="staffEmail"
                value={formInputs.staffEmail}
                onChange={handleFormInputChange}
                placeholder="Enter staff email"
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="text"
                name="password"
                value={formInputs.password}
                onChange={handleFormInputChange}
                placeholder="Enter staff password"
              />
            </Form.Group>

            <Form.Group controlId="formIsManager">
              <Form.Label>Manager?</Form.Label>
              <Form.Control
                type="boolean"
                name="isManager"
                value={formInputs.isManager}
                onChange={handleFormInputChange}
                placeholder="Employee ? Manager"
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