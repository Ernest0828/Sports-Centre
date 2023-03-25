import React,{Fragment, useState, useEffect, useContext} from "react";
import "./memberProfileInfo.css";
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

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setIsEditMode(false);
        // code to save changes
    };

    const getMembershipType = () => {
        return user.details.membershipType || "NULL";
    };

    const getMembershipStartDate = () => {
        return user.details.startDate || "NULL";
    };
    
      const getMembershipEndDate = () => {
        return user.details.endDate || "NULL";
    };
    

    return (
        <Fragment>
                <div className="editInfo">
                    <form className="userDetailsForm" onSubmit={handleFormSubmit}>
                        <span className="editInfoTitle">Update Info</span>
                        <div className="userDetails"> 
                            <label>Name</label>
                            {isEditMode ? ( <input type="text" defaultValue={user.details.customerName} /> ) : 
                            (
                                <p>{user.details.customerName}</p>
                            )}
                            <label>Email</label>
                            {isEditMode ? ( <input type="email" defaultValue={user.details.customerEmail} /> ) : 
                            (
                                <p>{user.details.customerEmail}</p>
                            )}
                            <label>Number</label>
                            {isEditMode ? ( <input defaultValue={user.details.customerNumber} />) : 
                            (
                                <p>{user.details.customerNumber}</p>
                            )}
                            {isEditMode && (
                            <div className="editModePassword">
                                <label htmlFor="password">Password</label>
                                <input id="password" type="password" defaultValue="" />
                                <label htmlFor="retypePassword">Re-type Password</label>
                                <input id="retypePassword" type="password" defaultValue="" />
                            </div>
                            )}
                            {!isEditMode && (
                                <div className="membershipDetails">
                                    <label>Membership</label>
                                    <p className="membershipDetails">Type: {getMembershipType()}</p>
                                    <p className="membershipDetails">Start: {getMembershipStartDate()}</p>
                                    <p className="membershipDetails">End: {getMembershipEndDate()}</p>
                                </div>
                            )}

                        </div>
                        {isEditMode && <button className="updateProfileButton" type="submit">Update</button>}
                        {!isEditMode && <button className="editProfileButton" onClick={handleEditMode}>Edit Profile</button>}
                        {!isEditMode && <button className="cancelMembershipButton">Cancel membership</button>}
                    </form>
            </div>
        </Fragment>
  )
}
