import React,{Fragment, useState, useContext} from 'react';
import {BrowserRouter as Router, 
  Routes, 
  Route, 
  Navigate
} from 'react-router-dom';
import { Auth, AuthProvider } from './context/Auth';

//components
import Dashboard from "./components/pages/dashboard/Dashboard";
import Login from "./components/pages/login/Login";
import Register from "./components/pages/register/Register";
import Profile from "./components/pages/profile/Profile";
import BookFacility from './components/pages/bookFacility/BookFacility';
import BookClasses from './components/pages/bookClasses/BookClasses';
import Pricing from './components/pages/pricing/Pricing';


import FacilityDetails from "./components/managerPages/bookings/facilities/facilityDetails";
import Staff from "./components/managerPages/staff/staff";
import ClassDetails from "./components/managerPages/bookings/classes/classDetails";
import ManagerProfileInfo from "./components/managerPages/managerProfile/managerProfileInfo";
import ManagerProfile from "./components/managerPages/managerProfile/managerProfile";
import ManagerLogin from "./components/managerPages/managerLogin/managerLogin";

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
          <Route exact path="/classdetails" element={<ClassDetails/>}/>
          <Route exact path="/staff" element={<Staff/>}/>
          <Route exact path="/manager-profile" element={<ManagerProfile/>}/>
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/pricing" element={<Pricing />} />
        </Routes>
      </Router>
    </AuthProvider>
    
  );
}

export default App;
