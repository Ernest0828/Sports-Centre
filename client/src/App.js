import React,{Fragment, useState} from 'react';
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
import MemberProfile from "./components/pages/profile/MemberProfile";
import Facilities from './components/facilities/Facilities';
import BookFacility from './components/pages/bookFacility/BookFacility';
import BookClasses from './components/pages/bookClasses/BookClasses';
import NonMemberProfile from './components/pages/profile/NonMemberProfile';

function App() {
  return <BookFacility/>
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
