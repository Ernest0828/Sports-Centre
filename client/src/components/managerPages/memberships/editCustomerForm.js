import { Form, Button } from "react-bootstrap"
import axios from 'axios'
import {useContext, useState} from 'react';
import { Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';

const EditCustomerForm = ({show, handleClose, handleSubmit, formInputs, setFormInputs}) => {
  
  const handleFormInputChange = (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    const name = event.target.name;

    if (name === 'isMembership') {
      setFormInputs({
        ...formInputs,
        [name]: value === 'Member' ? true : false
      });
    } else if (name === 'membershipType') {
        setFormInputs({
            ...formInputs,
            [name]: value === '<Monthly>' ?  "MONTHLY" : "ANNUAL"
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
          <Modal.Title>Edit Customer</Modal.Title>
          <button className="btn-close" onClick={handleClose}>
            <span aria-hidden="true">&times;</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
      
            <Form.Group controlId="formCustomerName">
              <Form.Label>Customer Name</Form.Label>
              <Form.Control
                type="text"
                name="customerName"
                value={formInputs.customerName}
                onChange={handleFormInputChange}
                placeholder="Sebastian Lai"
              />
            </Form.Group>
      
            <Form.Group controlId="formCustomerNumber">
              <Form.Label>Customer Number</Form.Label>
              <Form.Control
                type="number"
                name="customerNumber"
                value={formInputs.customerNumber}
                onChange={handleFormInputChange}
                placeholder="019283746"
              />
            </Form.Group>
      
            <Form.Group controlId="formCustomerEmail">
              <Form.Label>Customer Email</Form.Label>
              <Form.Control
                type="text"
                name="customerEmail"
                value={formInputs.customerEmail}
                onChange={handleFormInputChange}
                placeholder="sebastian@gmail.com"
              />
            </Form.Group>

            <Form.Group controlId="formIsMembership">
                <div style={{display: 'block'}}>
                <Form.Label>Manager?</Form.Label>
                </div>
                <div>
                <Form.Select
                name="isMembership"
                value={formInputs.isMembership ? 'Member' : 'Non-member'}
                onChange={handleFormInputChange}
                >
                <option>Member</option>
                <option>Non-member</option>
                </Form.Select>
                </div>
            </Form.Group>

            <Form.Group controlId="formMembershipType">
                <div style={{display: 'block'}}>
                <Form.Label>Membership Type</Form.Label>
                </div>
                <div>
                <Form.Select
                name="membershipType"
                value={formInputs.membershipType}
                onChange={handleFormInputChange}
                >
                <option>Monthly</option>
                <option>Annual</option>
                </Form.Select>
                </div>
            </Form.Group>
      
            <Button style={{marginTop: "10px"}}variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  };

export default EditCustomerForm;