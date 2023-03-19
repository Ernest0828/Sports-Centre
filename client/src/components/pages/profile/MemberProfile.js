import React,{Fragment, useState} from "react";
import "./memberProfile.css";
import { Link} from "react-router-dom";
import ProfileInfo from "../../profileInfo/MemberProfileInfo";
  
const MemberProfile = () => {
    return (
    <Fragment>
        <div className="profile">
            <div className="profileWrapper">
                <ProfileInfo/>
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
export default MemberProfile;
