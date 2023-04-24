import React from 'react';
import {useEffect, useState} from 'react';
import "./membership.css";
import Navbar from "../managerNavbar/navbar";
import { Link } from 'react-router-dom';
import useFetch from "../hooks/useFetch"
import axios from 'axios';
import { Modal, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import EditCustomerForm from "./editCustomerForm";

const MembershipDetails = () => {

    //useFetch Hooks
    const {data:customerData, loading:customerLoading, error:customerError} = useFetch ("http://localhost:4000/api/customer/");
    const {data:membershipData, loading:membershipLoading, error:membershipError} = useFetch ("http://localhost:4000/api/membership/memberships");

    const [customerDetails, setCustomerDetails] = useState()
    const [editableRows, setEditableRows] = useState({});
    const [isEditable, setIsEditable] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const [show, setShow] = useState(false);
    const handleClose = () => {
      setShow(false);
    }

    useEffect(() => {
      setCustomerDetails(customerData.map((customer) => {
        return {
          ...customer,
          customerId: customer.customerId,
          customerName: customer.customerName,
          customerNumber: customer.customerNumber,
          customerEmail: customer.customerEmail,
          password: customer.password,
          isMembership: customer.isMembership,
          membershipType: customer.membershipType
        };
      }));
    }, [customerData]);

    const [formInputs, setFormInputs] = useState({
      customerId: "",
      customerName: "",
      customerNumber: "",
      customerEmail: "",
      password: "",
      isMembership: "",
      membershipType:"",
    });

    const handleShow = (customerId) => {
      const selectedCustomer = customerDetails.find(customer => customer.customerId === customerId);
      setSelectedCustomer(selectedCustomer);
      setShow(true);
      if (selectedCustomer) {
      setFormInputs({
        customerId: selectedCustomer.customerId,
        customerName: selectedCustomer.customerName,
        customerNumber: selectedCustomer.customerNumber,
        customerEmail: selectedCustomer.customerEmail,
        isMembership: selectedCustomer.isMembership,
        membershipType: selectedCustomer.membershipType,
      });
    }
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      // Update facility details with formInputs values
      setCustomerDetails((prevState) => {
      const updatedDetails = [...prevState];
      const index = updatedDetails.findIndex(
          (customer) => customer.customerId === selectedCustomer.customerId
      );
      updatedDetails[index].customerId = formInputs.customerId;
      updatedDetails[index].customerName = formInputs.customerName;
      updatedDetails[index].customerNumber = formInputs.customerNumber;
      updatedDetails[index].customerEmail = formInputs.customerEmail;
      updatedDetails[index].isMembership =  formInputs.isMembership;
      updatedDetails[index].membershipType =  formInputs.membershipType;

      return updatedDetails;
      });

      // Send updated facility details to server
      axios.put(`http://localhost:4000/api/customer/${selectedCustomer.customerId}`, {

        //staffId: formInputs.staffId,
        customerName: formInputs.customerName,
        customerNumber: formInputs.customerNumber,
        customerEmail: formInputs.customerEmail,
        isMembership: formInputs.isMembership,
        membershipType:  formInputs.membershipType
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

    const handleDelete = (customerId) => {
      const selectedCustomer = customerDetails.find(customer => customer.customerId === customerId);
      setSelectedCustomer(selectedCustomer);
      
      if (window.confirm("Are you sure you want to delete this staff member?")) {
        axios.delete(`http://localhost:4000/api/customer/${selectedCustomer.customerId}`)
          .then(() => {
            // remove the deleted staff member from staffDetails state
            setCustomerDetails(customerDetails.filter(customer => customer.customerId !== selectedCustomer.customerId));
            setIsSaved(true); // set a flag to show that the data has been saved
          })
          .catch(err => console.error('Failed to delete staff', err));
      }
    };
    
    

    return(
        <div>
            <Navbar/>
            <EditCustomerForm 
              show={show}
              handleClose={handleClose}
              handleSubmit={handleSubmit}
              customer={selectedCustomer}
              formInputs={formInputs}
              setFormInputs={setFormInputs}
            />
            <div  className="customerDetails">
                <h1 className="customerDetailsTitle">GymCorp Customers</h1>
                    <div className="customerDetailsTable">
                        <table>
                            <thead>
                                <tr>
                                    <th>Customer Name</th>
                                    <th>Customer Number</th>   
                                    <th>Customer Email</th>
                                    <th>Membership Status</th>
                                    <th>Membership Type</th>
                                    <th> </th>
                                    <th> </th>
                                </tr>
                            </thead>
                            <tbody>
                                {customerDetails && customerDetails.map(({customerId, customerName, customerNumber, customerEmail, isMembership, membershipType }) => (
                                <tr key = {customerId}>
                                    <td>
                                              <span>{customerName}</span>
                                    </td>
                                    <td>
                                              <span>{customerNumber}</span>
                                    </td>
                                    <td>
                                              <span>{customerEmail}</span>
                                    </td>
                                    <td>
                                    {!isEditable ? (
                                      <span>{isMembership ? "Member" : "Non-member"}</span>
                                    ) : (
                                      <select>
                                        <option value={true}>Member</option>
                                        <option value={false}>Non-member</option>
                                      </select>
                                    )}
                                    </td>
                                    <td>
                                              <span>{membershipType}</span>
                                    </td>
                                    <td>
                                    <button className="editCustomerButton" onClick={() => {handleShow(customerId);}}>
                                    {editableRows[customerId] ? "Done" : "Edit"}
                                    </button>
                                    </td>
                                    <td>
                                    <button className="editCustomerButton" onClick={() => {handleDelete(customerId);}}>
                                    {editableRows[customerId] ? "Delete" : "Delete"}
                                    </button>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
        </div>
    )
}

export default MembershipDetails;