import { Form, Button } from "react-bootstrap"
import axios from 'axios'
import {useEffect, useState} from 'react';
import { Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';

const AddClassForm = ({showAdd, handleClose, handleAddSubmit, formInputs, setFormInputs}) => {

    const [facilities, setFacilities] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/api/facilities')
          .then(response => {
            setFacilities(response.data);
          })
          .catch(error => {
            console.log(error);
          });
      }, []);
  

    const handleFormInputChange = (event) => {
        setFormInputs({
          ...formInputs,
          [event.target.name]: event.target.value
        });
      };
      
      return (
        <Modal show={showAdd} onHide={handleClose}>
        <Modal.Header style={{ background: "none", border: "none" }}>
          <Modal.Title>Add New Class</Modal.Title>
          <button className="btn-close" onClick={handleClose}>
            <span aria-hidden="true">&times;</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddSubmit}>
      
            <Form.Group controlId="formClassName">
              <Form.Label>Class Name</Form.Label>
              <Form.Control
                type="text"
                name="className"
                value={formInputs.className}
                onChange={handleFormInputChange}
                placeholder="Badminton"
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
                placeholder="10.00"
              />
            </Form.Group>
      
            <Form.Group controlId="formDay">
              <Form.Label>Available Days</Form.Label>
              <Form.Control
                type="day"
                name="day"
                value={formInputs.day}
                onChange={handleFormInputChange}
                placeholder="Monday"
              />
            </Form.Group>

            <Form.Group controlId="formStartTime">
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                type="time"
                name="startTime"
                value={formInputs.startTime}
                onChange={handleFormInputChange}
                placeholder="08:00"
              />
            </Form.Group>

            <Form.Group controlId="formEndTime">
              <Form.Label>End Time</Form.Label>
              <Form.Control
                type="time"
                name="endTime"
                value={formInputs.endTime}
                onChange={handleFormInputChange}
                placeholder="20:00"
              />
            </Form.Group>

            <Form.Group controlId="formFacility">
            <div style={{display: 'block'}}>
            <Form.Label>Facility</Form.Label>
            </div>
            <div>
            <Form.Select
              name="facilityName"
              value={formInputs.facilityName}
              onChange={handleFormInputChange}
            >
              {facilities.map(facility => (
                <option key={facility.facilityName} value={facility.facilityName}>
                  {facility.facilityName}
                </option>
              ))}
            </Form.Select>
            </div>
          </Form.Group>
      
            <Button style={{marginTop: "10px"}} variant="primary" type="submit">
              Add New Class
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  };

export default AddClassForm;