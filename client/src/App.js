import React,{Fragment, Profiler, useState} from 'react';
import './App.css';
import {BrowserRouter as Router, 
  Routes, 
  Route, 
  Navigate
} from 'react-router-dom';

//components
import Dashboard from "./components/pages/dashboard/Dashboard";
import Login from "./components/pages/login/Login";
import Register from "./components/pages/register/Register";
import Profile from "./components/pages/profile/Profile";
import Facilities from './components/pages/facilities/Facilities';
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
  return <Dashboard />
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const setAuth = boolean => {
  //   console.log("Setting auth to: ",boolean );
  //   setIsAuthenticated(boolean);
  //   console.log("Auth is: ",isAuthenticated );
  // };

  // return (
  //   <Fragment>
  //     <Router>
  //       <div className="container">
  //         <Routes>
  //           <Route path="/register" 
  //           element = {!isAuthenticated? (<Register setAuth={setAuth}/>) : (<Navigate to ="/login"/>)}/>
  //           <Route path="/login" 
  //           element = {!isAuthenticated? (<Login setAuth={setAuth}/>) : (<Navigate to ="/dashboard"/>)}/>
  //           <Route path="/dashboard" 
  //           element = {!isAuthenticated? (<Dashboard setAuth={setAuth}/>) : (<Navigate to ="/login"/>)}/>

  //         </Routes>
  //       </div>
        
  //     </Router>
  //   </Fragment>
  // );
}

export default App;
