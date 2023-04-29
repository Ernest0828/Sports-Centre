import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { Auth } from '../../../context/Auth';
import { useNavigate } from 'react-router-dom';


function SuccessPage() {

  const{user} = useContext(Auth);
  const navigate = useNavigate();

  useEffect(() => {
    const createBooking = async () => {
      try {
        const items = JSON.parse(localStorage.getItem("basketItems")) || [];
        const bookingsData = [];
  
        for (const item of items) {
          // Get the required data for the API call
          const selectedDate = item.date; 
          const selectedTime = item.time; 
          const activityId = item.activityId;  
          const facilityName = item.facilityName;
          const bookingData = {
            date: selectedDate,
            start: selectedTime,
            customerId: user.details.customerId,
            activityId: activityId,
            classId: null,
            facilityName: facilityName,
          };
          bookingsData.push(bookingData);
        }
        console.log(bookingsData)
        
        // Send the data to the backend
        const response = await axios.post("http://localhost:4000/api/bookings", bookingsData);
        if (response.data.success) {
          console.log("Booking created successfully");
          alert("Booking successful!");
        } else {
          console.log("Failed to create booking");
          alert("Booking unsuccessful!");
        }
      } catch (err) {
        console.log("Error:", err.message);
        alert("Booking unsuccessful!");
      }
    };
    createBooking();
  }, []);
          
  //         const response = await axios.post("http://localhost:4000/api/bookings/bookingid", {
  //           date: selectedDate,
  //           start: selectedTime,
  //           customerId: user.details.customerId,
  //           activityId: activityId,
  //           classId: null,
  //           facilityName: facilityName,
  //         });

  //         if (response.data.success) {
  //           console.log("Booking created successfully");
  //           alert("Booking successful!");
  //         } else {
  //           console.log("Failed to create booking");
  //           alert("Booking unsuccessful!");
  //         }
  //       }
  //     } catch (err) {
  //       console.log("Error:", err.message);
  //       alert("Booking unsuccessful!");
  //     }
  //   };
  
  //   createBooking();
  // }, []);

const handleClick = () =>{
 navigate('/');
}

  return (
    <div>
      <h1>BOOKING SUCCESSFUL!!</h1>
      <button onClick={handleClick}>Back to home</button>
    </div>
  )
}

export default SuccessPage

// function SuccessPage() {

//   const{user} = useContext(Auth);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const createBooking = async () => {
//       try {
//         const items = JSON.parse(localStorage.getItem("cartItems")) || [];
//         const bookings = new Set();
  
//         for (const item of items) {
//           // Get the required data for the API call
//           const selectedDate = item.date; 
//           const selectedTime = item.time; 
//           const activityId = item.activityId;  
//           const facilityName = item.facilityName;
          
//           const bookingData = {
//             date: selectedDate,
//             start: selectedTime,
//             customerId: user.details.customerId,
//             activityId: activityId,
//             classId: null,
//             facilityName: facilityName,
//           };

//           // Check if this booking has already been sent
//           if (!bookings.has(JSON.stringify(bookingData))) {
//             const response = await axios.post(
//               "http://localhost:4000/api/bookings/bookingid",
//               bookingData
//             );

//             if (response.data.success) {
//               console.log("Booking created successfully");
//               alert("Booking successful!");
//             } else {
//               console.log("Failed to create booking");
//               alert("Booking unsuccessful!");
//             }

//             // Add booking to Set
//             bookings.add(JSON.stringify(bookingData));
//           }
//         }

//         // Remove items from localStorage
//         localStorage.removeItem("cartItems");
//       } catch (err) {
//         console.log("Error:", err.message);
//         alert("Booking unsuccessful!");
//       }
//     };

//     createBooking();
//   }, [user.details.customerId]);

//   const handleClick = () => {
//     navigate("/");
//   };
//   return (
//     <div>
//       <h1>BOOKING SUCCESSFUL!!</h1>
//       <button onClick={handleClick}>Back to home</button>
//     </div>
//   )
// }

// export default SuccessPage