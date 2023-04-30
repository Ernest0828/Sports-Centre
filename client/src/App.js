import React,{Fragment, Profiler, useState, useContext} from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter as Router, 
  Routes, 
  Route, 
  Navigate
} from 'react-router-dom';
import { Auth, AuthProvider } from './context/Auth';

//components
import Login from "./components/pages/login/Login";
import Register from "./components/pages/register/Register";
import Profile from "./components/pages/profile/Profile";
import BookFacility from './components/pages/bookFacility/BookFacility';
import BookClasses from './components/pages/bookClasses/BookClasses';
import Pricing from './components/pages/pricing/Pricing';


import FacilityDetails from "./components/managerPages/amenities/facilities/facilityDetails";
import ActivityDetails from "./components/managerPages/amenities/facilities/activities/activityDetails";
import Staff from "./components/managerPages/staff/staff";
import ClassDetails from "./components/managerPages/amenities/classes/classDetails";
import ManagerProfileInfo from "./components/managerPages/managerProfile/managerProfileInfo";
import ManagerProfile from "./components/managerPages/managerProfile/managerProfile";
import ManagerLogin from "./components/managerPages/managerLogin/managerLogin";
import MembershipDetails from './components/managerPages/memberships/membershipDetails';
import BookingDetails from './components/managerPages/amenities/bookings/bookings';
import Statistics from './components/managerPages/statistics/Statistics';

import Dashboard from "./components/pages/dashboard/Dashboard"
import DropDownChoice from './components/dropdownfacility/DropDownFacility';
import SuccessPage from './components/pages/success/SuccessPage';
import CancelPage from './components/pages/cancel/CancelPage';
import FacilityPage from './components/pages/individual-facilities/FacilityPage';
import FacilityBookingDetails from './components/ICalendar/FacilityBooking';

function App() {
  const {user} = useContext(Auth);

  return (
    // <ReactDatePicker />
    <AuthProvider>
      <Router>
        <Routes>
        <Route exact path="/" element={<Dashboard />} />
          <Route path="/register" element={user ? (<Dashboard/>): (<Register/>)} />
          <Route path="/login" element={user ? (<Dashboard/>) : (<Login/>)} />
          <Route path="/profile" element={user ? (<Profile/>) : (<Login/>)} />
          <Route path="/book-facility" element={<BookFacility />} />
          <Route path="/book-class" element={<BookClasses />} />

          <Route exact path="/manager-login" element={user ? (<ManagerProfile/>) : (<ManagerLogin/>)}/>
          <Route exact path="/facilitydetails" element={<FacilityDetails/>}/>
          <Route exact path="/classdetails" element={<ClassDetails/>}/>
          <Route exact path="/activitydetails" element={<ActivityDetails/>}/>
          <Route exact path="/staff" element={<Staff/>}/>
          <Route exact path="/membershipdetails" element={<MembershipDetails/>}/>
          <Route exact path="/bookingdetails" element={<BookingDetails/>}/>
          <Route exact path="/statistics" element={<Statistics/>}/>
          <Route exact path="/manager-profile" element={<ManagerProfile/>}/>
          <Route path="/pricing" element={<Pricing />} />

          <Route exact path="/classdetails" element={<ClassDetails/>}/>
          <Route exact path="/staff" element={<Staff/>}/>
          <Route exact path="/manager-profile" element={<ManagerProfile/>}/>
          <Route exact path="/success" element={<SuccessPage/>}/>
          <Route exact path="/FacilityPage" element={<FacilityPage/>}/>
          <Route exact path="/FacilityBookingDetails" element={<FacilityBookingDetails/>}/>
          

          

        </Routes>
      </Router>
    </AuthProvider>
    
  );
}

export default App;
