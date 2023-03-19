import React,{Fragment, Profiler, useState} from 'react';
import './App.css';
import {BrowserRouter as Router, 
  Routes, 
  Route, 
  Navigate
} from 'react-router-dom';

//components
import Login from "./components/pages/login/Login";
import Register from "./components/pages/register/Register";
import MemberProfile from "./components/pages/profile/MemberProfile";
import BookFacility from './components/pages/bookFacility/BookFacility';
import BookClasses from './components/pages/bookClasses/BookClasses';
import NonMemberProfile from './components/pages/profile/NonMemberProfile';
import FacilityDetails from "./components/managerPages/bookings/facilities/facilityDetails"
import Staff from "./components/managerPages/staff/staff"
import ClassDetails from "./components/managerPages/bookings/classes/classDetails"
import Navbar from "./components/managerPages/navbar/navbar"
import ManagerProfileInfo from "./components/managerPages/managerProfile/managerProfileInfo"
import ManagerProfile from "./components/managerPages/managerProfile/managerProfile"

import Climbingwall from './components/pages/individual facilities/Climbingwall';
import Fitnessroom from './components/pages/individual facilities/Fitnessroom';
import Sportshall from './components/pages/individual facilities/Sportshall';
import Swimmingpool from './components/pages/individual facilities/Swimmingpool';
import Squashcourt from './components/pages/individual facilities/Squashcourt';
import Studio from './components/pages/individual facilities/Studio';
import Aerobics from './components/pages/individual classes/Aerobics';
import Pilates from './components/pages/individual classes/Pilates';
import Yoga from './components/pages/individual classes/Yoga';

function App() {
  return(
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const setAuth = boolean => {
  //   console.log("Setting auth to: ",boolean );
  //   setIsAuthenticated(boolean);
  //   console.log("Auth is: ",isAuthenticated );
  // };

    <Fragment>
      <Router>
        <Routes>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/register" element={<Register/>}/>
          <Route exact path="/profile" element={<MemberProfile/>}/>
          <Route exact path="/book-facility" element={<BookFacility/>}/>
          <Route exact path="/book-class" element={<BookClasses/>}/>
          <Route exact path="/facilitydetails" element={<FacilityDetails/>}/>
          <Route exact path="/classdetails" element={<ClassDetails/>}/>
          <Route exact path="/staff" element={<Staff/>}/>
          <Route exact path="/manager-profile" element={<ManagerProfile/>}/>

        </Routes>
      </Router>
    </Fragment>

  );
}

export default App;

/*
    <Fragment>
      <Router>
        <Routes>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/register" element={<Register/>}/>
          <Route exact path="/profile" element={<MemberProfile/>}/>
          <Route exact path="/book-facility" element={<BookFacility/>}/>
          <Route exact path="/book-class" element={<BookClasses/>}/>
        </Routes>
      </Router>
    </Fragment>
*/