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
          <Route path="/pricing" element={<Pricing />} />
        </Routes>
      </Router>
    </AuthProvider>
  // );
  );
// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<Login/>}/>
//         <Route path="/dashboard" element={<Dashboard/>}/>
//       </Routes>
//     </Router>
//   );
// }
        }

export default App;
