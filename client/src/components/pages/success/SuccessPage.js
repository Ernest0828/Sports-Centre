import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { Auth } from '../../../context/Auth';
import { useNavigate, useLocation } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

function SuccessPage() {

  const{user} = useContext(Auth);
  const navigate = useNavigate();
  const query = useQuery();
  const location = useLocation();

  useEffect(() => {
    const createBooking = async () => {
      try {
				const response = await axios.post(`http://localhost:4000/api/bookings/bookingid`, {
					customerId: user.details.customerId,
				});
	
				console.log("Response data:", response.data);
	
				// Check response status for success or adjust the condition accordingly
				if (response.status === 200) {
					console.log("Booking created successfully");
					alert("Booking completed!");
				} else {
					console.log("Failed to create a booking");
					alert("Booking not complete");
				}
			} catch (error) {
				console.error("Error:", error.message);
				alert("An error occurred while completing the booking.");
			}
    };
    createBooking();
  }, []);

  const handleClick = () =>{
    navigate('/');
   }
        

  return (
    <div>
        <div>
        <Navbar/>
        <h1>BOOKING SUCCESSFUL!!</h1>
        <button onClick={handleClick}>Back to home</button>
        </div>
    </div>
  )
}

export default SuccessPage
