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
import FacilityDetails from "./components/managerPages/bookings/facilities/facilityDetails";
import ActivityDetails from "./components/managerPages/bookings/facilities/activities/activityDetails";
import Staff from "./components/managerPages/staff/staff";
import ClassDetails from "./components/managerPages/bookings/classes/classDetails";
import ManagerProfileInfo from "./components/managerPages/managerProfile/managerProfileInfo";
import ManagerProfile from "./components/managerPages/managerProfile/managerProfile";
import ManagerLogin from "./components/managerPages/managerLogin/managerLogin";
import MembershipDetails from './components/managerPages/memberships/membershipDetails';
import BookingDetails from './components/managerPages/bookings/bookings/bookings';
import Dashboard from "./components/pages/dashboard/Dashboard"
// import Climbingwall from './components/pages/individual facilities/Climbingwall';
// import Aerobics from './components/pages/individual classes/Aerobics';

import DropDownChoice from './components/dropdownfacility/DropDownFacility';
import SuccessPage from './components/pages/success/SuccessPage';
import CancelPage from './components/pages/cancel/CancelPage';
import FacilityPage from './components/pages/individual-facilities/FacilityPage';
import MembershipPricing from './components/membershipPricing/MembershipPricing';
import MembershipSuccess from './components/pages/membershipSuccess/MembershipSuccess';

function App() {
  const {user} = useContext(Auth);

  return (

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
          <Route exact path="/activitydetails" element={<ActivityDetails/>}/>
          <Route exact path="/classdetails" element={<ClassDetails/>}/>
          <Route exact path="/staff" element={<Staff/>}/>
          <Route exact path="/membershipdetails" element={<MembershipDetails/>}/>
          <Route exact path="/bookingdetails" element={<BookingDetails/>}/>
          <Route exact path="/manager-profile" element={<ManagerProfile/>}/>
          <Route path="/pricing" element={<Pricing />} />
          {/* <Route exact path="/aerobics" element={<Aerobics/>}/>
          <Route exact path="/climbingwall" element={<Climbingwall/>}/> */}


          <Route exact path="/classdetails" element={<ClassDetails/>}/>
          <Route exact path="/staff" element={<Staff/>}/>
          <Route exact path="/manager-profile" element={<ManagerProfile/>}/>
          <Route exact path ="/successful" element={<SuccessPage/>}/>
          <Route exact path="/cancelled" element={<CancelPage/>}/>
          <Route exact path="/FacilityPage" element={<FacilityPage/>}/>
          <Route exact path="/MembershipCheckout" element={<MembershipPricing/>}/>
          <Route exact path="/MembershipSuccess" element={<MembershipSuccess/>}/>
          
          

          

        </Routes>
      </Router>
    </AuthProvider>
    
  );
}

export default App;
