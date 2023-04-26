import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function SuccessPage() {

  const location = useLocation();

  useEffect(() => {
    const createBooking = async () => {
      try {
        // Retrieve session_id from the URL query string
        const sessionId = new URLSearchParams(location.search).get('session_id');

        // Make the API call to your backend to create the booking
        const response = await axios.post('http://localhost:5000/api/bookings/create', {
          sessionId,
          // Pass any other required data
        });

        if (response.data.success) {
          console.log('Booking created successfully');
        } else {
          console.log('Failed to create booking');
        }
      } catch (err) {
        console.log('Error:', err.message);
      }
    };

    createBooking();
  }, [location]);
  return (
    <div>Success!!</div>
  )
}

export default SuccessPage