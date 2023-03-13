import React,{Fragment, useState} from "react";
import "./profile.css";
import { Link} from "react-router-dom";

  
const Profile = () => {
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
        <div className="profile">
            <div className="profileWrapper">
                <div className="profileLeft">
                    <div className="editInfo">
                        <form className="userDetailsForm" onSubmit={handleFormSubmit}>
                            <span className="editInfoTitle">Update Info</span>
                            <label>Name</label>
                            {isEditMode ? (
                                <input type="text" placeholder="Edmund" />
                            ) : (
                                <p>Edmund</p>
                            )}
                            <label>Email</label>
                            {isEditMode ? (
                                <input type="email" placeholder="sc21ewkc@leeds.ac.uk" />
                            ) : (
                                <p>sc21ewkc@leeds.ac.uk</p>
                            )}
                            <label>Number</label>
                            {isEditMode ? (
                                <input placeholder="07867274700" />
                            ) : (
                                <p>07867274700</p>
                            )}
                            <label>Password</label>
                            {isEditMode ? (
                                <input type="password" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;" />
                            ) : (
                                <p>&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;</p>
                            )}
                            {isEditMode && <button className="updateProfileButton" type="submit">Update</button>}
                            {!isEditMode && <button className="editProfileButton" onClick={handleEditMode}>Edit Profile</button>}
                        </form>
                    </div>
                </div>
                <div className="profileRight">
                    <span className="userBookingsTitle">Your bookings</span>
                    <div className="userBookingsTable">
                        <table>
                            <thead>
                                <tr>
                                    <th>Facility</th>
                                    <th>Description</th>
                                    <th>Time</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Sports Hall</td>
                                    <td>Volleyball</td>
                                    <td>16:00</td>
                                    <td>19/2/2023</td>
                                </tr>
                                <tr>
                                    <td>Sports Hall</td>
                                    <td>Volleyball</td>
                                    <td>16:00</td>
                                    <td>19/2/2023</td>
                                </tr>
                                <tr>
                                    <td>Sports Hall</td>
                                    <td>Volleyball</td>
                                    <td>16:00</td>
                                    <td>19/2/2023</td>
                                </tr>
                                <tr>
                                    <td>Sports Hall</td>
                                    <td>Volleyball</td>
                                    <td>16:00</td>
                                    <td>19/2/2023</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
      </div>
    </Fragment>
  );
};
export default Profile;
