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
import BookFacility from './components/pages/bookFacility/BookFacility';
import BookClasses from './components/pages/bookClasses/BookClasses';
import NonMemberProfile from './components/pages/profile/NonMemberProfile';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };

  return (
    // <Fragment>
    //   <Router>
    //     <Routes>
    //       <Route exact path="/login" element={<Login setAuth={setAuth}/>}/>
    //       <Route exact path="/register" element={<Register setAuth={setAuth}/>}/>
    //       <Route exact path="/profile" element={<MemberProfile/>}/>
    //       <Route exact path="/book-facility" element={<BookFacility/>}/>
    //       <Route exact path="/book-class" element={<BookClasses/>}/>
    //     </Routes>
    //   </Router>
    // </Fragment>
    <Fragment>
      <Router>
        <Routes>
          <Route exact path="/register" 
          element = {!isAuthenticated? (<Register setAuth={setAuth}/>) : (<Navigate to ="/dashboard"/>)}/>
          <Route path="/login" 
          element = {!isAuthenticated? (<Login setAuth={setAuth}/>) : (<Navigate to ="/dashboard"/>)}/>
          <Route path="/dashboard" 
          element = {!isAuthenticated? (<Dashboard setAuth={setAuth}/>) : (<Navigate to ="/login"/>)}/>       
          <Route exact path="/profile" element={<MemberProfile/>}/>
          <Route exact path="/book-facility" element={<BookFacility/>}/>
          <Route exact path="/book-class" element={<BookClasses/>}/>      
        </Routes>
      </Router>
    </Fragment>
  // );
  );
}

export default App;
