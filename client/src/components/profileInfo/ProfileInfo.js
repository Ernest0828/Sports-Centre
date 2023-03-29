import React,{Fragment, useState, useEffect, useContext} from "react";
import "./profileInfo.css";
import {Auth} from "../../context/Auth"
// import {Link} from "react-router-dom";
import axios from "axios";

export default function MemberProfileInfo() {
    
    const {user} = useContext(Auth);
    // State: Edit mode for update profile
    const [isEditMode, setIsEditMode] = useState(false);


    const handleEditMode = () => {
        setIsEditMode(!isEditMode);
    };

    const [customerName, setCustomerName] = useState(user.details.customerName);
    const [customerNumber, setCustomerNumber] = useState(user.details.customerNumber);
    const [customerEmail, setCustomerEmail] = useState(user.details.customerEmail);
    const [password, setPassword] = useState(user.details.password);

    const [updatedCustomerName, setUpdatedCustomerName] = useState(user.details.customerName);
    const [updatedCustomerNumber, setUpdatedCustomerNumber] = useState(user.details.customerNumber);
    const [updatedCustomerEmail, setUpdatedCustomerEmail] = useState(user.details.customerEmail);
    


    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsEditMode(false);
        //Updates customerName, customerNumber, customerEmail
        try {
            const res = await axios.put("http://localhost:5000/api/customer/"+user.details.customerId,{
                customerName,
                customerNumber,
                customerEmail,
            }); 
            setUpdatedCustomerName(res.data.customerName);
            setUpdatedCustomerNumber(res.data.customerNumber);
            setUpdatedCustomerEmail(res.data.customerEmail);
            localStorage.setItem("user", JSON.stringify({...user, details:
                {
                    "createdAt" : res.data.createdAt,
                    "customerEmail" : res.data.customerEmail,
                    "customerId":res.data.customerId,
                    "customerName": res.data.customerName,
                    "customerNumber":res.data.customerNumber,
                    "isMembership":res.data.isMembership,
                    "membershipType":res.data.membershipType,
                    "updatedAt":res.data.updatedAt,
                }
            }));
            
        } 
        catch (err) {
            console.log(err.response.data);
        }

        //Updates password
        try {
            
        } catch (err) {
            console.log(err.response.data);
        }
    };
   

    const [membershipType, setMembershipType] = useState("NULL");
    const [membershipStartDate, setMembershipStartDate] = useState("NULL");
    const [membershipEndDate, setMembershipEndDate] = useState("NULL");

    useEffect(() => {
      async function fetchMembershipDetails() {
        try{
            const res = await axios.get("http://localhost:5000/api/membership/membership-info/"+user.details.customerId);
            setMembershipType(res.data.membership.membershipType);
            setMembershipStartDate(res.data.membership.startDate.split("T")[0]);
            setMembershipEndDate(res.data.membership.endDate.split("T")[0]);
        }
        catch(err){
            console.log(err.response.data);
        }
      }
      fetchMembershipDetails();
    }, [user.details.customerId]);


    return (
        <Fragment>
                <div className="editInfo">
                    <form className="userDetailsForm" onSubmit={handleFormSubmit}>
                        <span className="editInfoTitle">Update Info</span>
                        <div className="userDetails"> 
                            <label>Name</label>
                            {isEditMode ? ( <input type="text" defaultValue={updatedCustomerName} onChange={(e)=> setCustomerName(e.target.value)}/> ) : 
                            (
                                <p>{updatedCustomerName}</p>
                            )}
                            <label>Email</label>
                            {isEditMode ? ( <input type="email" defaultValue={updatedCustomerEmail} onChange={(e)=> setCustomerEmail(e.target.value)} /> ) : 
                            (
                                <p>{updatedCustomerEmail}</p>
                            )}
                            <label>Number</label>
                            {isEditMode ? ( <input defaultValue={updatedCustomerNumber} onChange={(e)=> setCustomerNumber(e.target.value)}/>) : 
                            (
                                <p>{updatedCustomerNumber}</p>
                            )}
                            {isEditMode && (
                            <div className="editModePassword">
                                <label htmlFor="password">Password</label>
                                <input id="password" type="password" defaultValue="" onChange={(e)=> setPassword(e.target.value)}/>
                                <label htmlFor="retypePassword">Re-type Password</label>
                                <input id="retypePassword" type="password" defaultValue=""/>
                            </div>
                            )}
                            {!isEditMode && (
                                <div className="membershipDetails">
                                    <label>Membership</label>
                                    <p className="membershipDetails">Type: {membershipType}</p>
                                    <p className="membershipDetails">Start: {membershipStartDate}</p>
                                    <p className="membershipDetails">End: {membershipEndDate}</p>
                                </div>
                            )}

                        </div>
                        {isEditMode && <button className="updateProfileButton" type="submit">Update</button>}
                        {!isEditMode && <button className="editProfileButton" onClick={handleEditMode}>Edit Profile</button>}
                        {!isEditMode && user.details.membershipType !== null &&<button className="cancelMembershipButton">Cancel membership</button>}
                    </form>
            </div>
        </Fragment>
  )
}
