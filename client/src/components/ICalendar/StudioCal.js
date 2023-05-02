import { useState, useEffect } from "react";
import axios from "axios";
import "./ICalendar.css";
import { Modal, Button } from "react-bootstrap";
import BookingDetails from "./ClassBooking";
import "../ICalendar/studioCal.css";


const StudioSchedule = () => {
  const [studioSchedule, setStudioSchedule] = useState([]);
  const [studioClasses, setStudioClasses] = useState([]);
  const [bookingCapacity, setBookingCapacity] = useState(0);
  const [numBookings, setNumBookings] = useState(0);
  
  useEffect(() => {

    let studio = {};

    async function getStudioSchedule() {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/facilities/"
        );
        
        studio = response.data.find(
          (facility) => facility.facilityName === "Studio"
        );
        const startTime = parseInt(studio.startTime.slice(0, 2));
        const endTime = parseInt(studio.endTime.slice(0, 2));
        const schedule = [];
        for (let i = startTime; i < endTime; i++) {
          schedule.push({
            time: `${i < 10 ? "0" + i : i}:00-${i + 1}:00`,
            capacity: studio.capacity
          });
        }
        console.log("Availability:",studio.capacity)
        setStudioSchedule(schedule);
      } catch (error) {
        console.error(error);
      }
    }
    let bookings = [];
    
    async function getBookings() {
      try {
        const response = await axios.get("http://localhost:4000/api/bookings/");
        bookings = response.data;
        let bookingCapacity = 0;
        let numBookings = 0;
        const bookingsMap = new Map();
        let day = "";
        let booking = "";
    
        bookings.forEach((booking) => {
          if (booking.facilityName === "Studio") {
            bookingCapacity += booking.noOfPeople;
    
            const date = new Date(booking.date);
            console.log(booking.date)
            day = date.toLocaleDateString("en-US", {weekday: "long"});
            const time = date.toLocaleTimeString("en-US", {hour: "2-digit", minute: "2-digit"}).replace(/:\d{2}\s/, ' ');
    
            const bookingKey = `${day} at ${time}`;
            if (booking.startTime === "18:00:00" && day === "Monday") {//change this part
              numBookings++;
            }
          }
        });
    

      } catch (error) {
        console.error(error);
      }
    }

function getRemainingSpots(bookings, classData, studio) {
  const classBookings = bookings.filter(
    (b) =>
      b.facilityName === classData.facilityName &&
      b.day === classData.day &&
      b.startTime === classData.startTime &&
      b.date === classData.date
  );
  const totalPeople = classBookings.reduce((acc, curr) => acc + curr.noOfPeople, 0);
  console.log("TOTAL PEOPLE:", totalPeople);
  const remainingSpots = studio.capacity - totalPeople;
  return remainingSpots;
}

    async function getStudioClasses() {
      try {
        const response = await axios.get("http://localhost:4000/api/classes/");
        const classes = response.data.filter((c) => c.facilityName === "Studio");
        for (const c of classes) {
          const remainingSpots = getRemainingSpots(bookings, c, studio);
          if (remainingSpots <= 0) {
            console.log(`${c.className} is fully booked.`);
          } else {
            console.log(`${c.className} has ${remainingSpots} spots remaining.`);
          }
    
          // Display all the times and days for the class
          const days = [];
          if (c.day.includes("M")) {
            days.push("Monday");
          }
          if (c.day.includes("Tu")) {
            days.push("Tuesday");
          }
          if (c.day.includes("W")) {
            days.push("Wednesday");
          }
          if (c.day.includes("Th")) {
            days.push("Thursday");
          }
          if (c.day.includes("F")) {
            days.push("Friday");
          }
          if (c.day.includes("Sa")) {
            days.push("Saturday");
          }
          if (c.day.includes("Su")) {
            days.push("Sunday");
          }
          console.log(`${c.className} has classes on ${days.join(", ")} at ${c.startTime}`);
        }
    
        setStudioClasses(classes);
      } catch (error) {
        console.error(error);
      }
    }
    
    
   
    getStudioSchedule();
    getStudioClasses();
    getBookings();
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState([]);
  const [selectedTime, setSelectedTime] = useState([]);
  const [selectedClass, setSelectedClass] = useState([]);

  const handleOpenModal = (day, time, className) => {
    setSelectedDay(day);
    setSelectedTime(time);
    setSelectedClass(className);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const renderStudioSchedule = () => {
  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return (
    <>
      {studioSchedule.map((timeSlot) => (
        <tr key={timeSlot.time}>
          <td>{timeSlot.time}</td>
          {weekdays.map((day) => {
            
            return (
              <td key={day} >
                {studioClasses
                  .filter(
                    (c) =>
                      c.day === day &&
                      c.startTime.slice(0, 5) === timeSlot.time.slice(0, 5)
                  )
                  .map((c) => {
                    return (
                      <div className="studioCalDiv" key={c.className}
                          onClick={() =>
                            handleOpenModal(day, timeSlot.time.slice(0, 5), c.className)
                          }
                        >
                          {c.className}
                          <br />
                          <span> </span>
                      </div>
                    );
                  })}
              </td>
            );
          })}
        </tr>
      ))}
    </>
  );
};

  return (
    <div className="calContainer">
      <div className="calendar">
        <h1 className="calendarTitle">Studio Timetable</h1>
        <table className="timetable">
          <thead>
            <tr>
              <th>Time</th>
              <th>Monday</th>
              <th>Tuesday</th>
              <th>Wednesday</th>
              <th>Thursday</th>
              <th>Friday</th>
              <th>Saturday</th>
              <th>Sunday</th>
            </tr>
          </thead>
          <tbody>{studioSchedule.length > 0 && renderStudioSchedule()}</tbody>
        </table>
      </div>
      <Modal show={showModal}>
        <Modal.Header>
          <Modal.Title>Booking Details</Modal.Title>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Header>
        <Modal.Body>
          <BookingDetails
            selectedDay={selectedDay}
            selectedTime={selectedTime}
            selectedClass={selectedClass}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default StudioSchedule;