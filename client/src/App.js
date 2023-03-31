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
import Staff from "./components/managerPages/staff/staff";
import ClassDetails from "./components/managerPages/bookings/classes/classDetails";
import ManagerProfileInfo from "./components/managerPages/managerProfile/managerProfileInfo";
import ManagerProfile from "./components/managerPages/managerProfile/managerProfile";
import ManagerLogin from "./components/managerPages/managerLogin/managerLogin";

import Dashboard from "./components/pages/dashboard/Dashboard"


import Climbingwall from './components/pages/individual facilities/Climbingwall';
import Fitnessroom from './components/pages/individual facilities/Fitnessroom';
import Sportshall from './components/pages/individual facilities/Sportshall';
import Swimmingpool from './components/pages/individual facilities/Swimmingpool';
import Squashcourt from './components/pages/individual facilities/Squashcourt';
import Studio from './components/pages/individual facilities/Studio';
import Aerobics from './components/pages/individual classes/Aerobics';
import Pilates from './components/pages/individual classes/Pilates';
import Yoga from './components/pages/individual classes/Yoga';
import MyComponent from './components/dropdownfacility/dropdown';
import DropdownChoice from './components/dropdownfacility/dropdown';
import successPage from './components/pages/success/successPage';

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
          <Route exact path="/staff" element={<Staff/>}/>
          <Route exact path="/manager-profile" element={<ManagerProfile/>}/>
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route exact path="/aerobics" element={<Aerobics/>}/>
          <Route exact path="/pilates" element={<Pilates/>}/>
          <Route exact path="/yoga" element={<Yoga/>}/>

          <Route exact path="/facilitydetails" element={<FacilityDetails/>}/>
          <Route exact path="/climbingwall" element={<Climbingwall/>}/>
          <Route exact path="/fitnessroom" element={<Fitnessroom/>}/>
          <Route exact path="/sportshall" element={<Sportshall/>}/>
          <Route exact path="/swimmingpool" element={<Swimmingpool/>}/>
          <Route exact path="/squashcourt" element={<Squashcourt/>}/>
          <Route exact path="/studio" element={<Studio/>}/>

          <Route exact path="/classdetails" element={<ClassDetails/>}/>
          <Route exact path="/staff" element={<Staff/>}/>
          <Route exact path="/manager-profile" element={<ManagerProfile/>}/>
          <Route exact path="/success" element={<successPage/>}/>
          

          

        </Routes>
      </Router>
    </AuthProvider>
    
  );
}

export default App;
