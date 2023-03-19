import React,{Fragment, useState} from "react";
import "./memberProfileInfo.css";
import { Link} from "react-router-dom";

export default function MemberProfileInfo() {

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


    return (
        <Fragment>
                <div className="editInfo">
                    <form className="userDetailsForm" onSubmit={handleFormSubmit}>
                        <span className="editInfoTitle">Update Info</span>
                        <div className="userDetails"> 
                            <label>Name</label>
                            {isEditMode ? (
                                <input type="text" defaultValue="Edmund" />
                            ) : (
                                <p>Brayden</p>
                            )}
                            <label>Email</label>
                            {isEditMode ? (
                                <input type="email" defaultValue="sc21ewkc@leeds.ac.uk" />
                            ) : (
                                <p>sc22bmj@leeds.ac.uk</p>
                            )}
                            <label>Number</label>
                            {isEditMode ? (
                                <input defaultValue="07867274700" />
                            ) : (
                                <p>07867274700</p>
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
                                    <p className="membershipDetails">Type: Annual</p>
                                    <p className="membershipDetails">Start: 19/03/2023</p>
                                    <p className="membershipDetails">End: 19/03/2024</p>
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
