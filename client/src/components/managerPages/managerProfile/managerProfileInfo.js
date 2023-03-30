import React,{Fragment, useState} from "react";
import "./managerProfileInfo.css";
import { Link} from "react-router-dom";

export default function ManagerProfileInfo() {

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
                        <span className="editInfoTitle">GymCorp Manager</span>
                        <div className="userDetails"> 
                        {/*<img src="./images/picture.jpg" alt="Profile Photo" /> {}*/}
                            <label>Name</label>
                            {isEditMode ? (
                                <input type="text" defaultValue="Najmi Shahir" />
                            ) : (
                                <p>Najmi</p>
                            )}
                            <label>Email</label>
                            {isEditMode ? (
                                <input type="email" defaultValue="sc21ewkc@leeds.ac.uk" />
                            ) : (
                                <p>sc21ewkc@leeds.ac.uk</p>
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

                        </div>
                        {isEditMode && <button className="updateProfileButton" type="submit">Update</button>}
                        {!isEditMode && <button className="editProfileButton" onClick={handleEditMode}>Edit Profile</button>}
                    </form>
            </div>
        </Fragment>
  )
}
