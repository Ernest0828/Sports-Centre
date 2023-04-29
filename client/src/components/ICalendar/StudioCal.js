import { useState, useEffect } from "react";
import axios from "axios";
import "./ICalendar.css";
import { Modal, Button, Form } from "react-bootstrap";
import Datepicker from "react-datepicker";
import BookingDetails from "./ClassBooking";
import useFetch from "../../hooks/useFetch";

const StudioSchedule = () => {
  const [studioSchedule, setStudioSchedule] = useState([]);
  const [studioClasses, setStudioClasses] = useState([]);

  useEffect(() => {
    async function getStudioSchedule() {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/facilities/"
        );
        const studio = response.data.find(
          (facility) => facility.facilityName === "Studio"
        );
        const startTime = parseInt(studio.startTime.slice(0, 2));
        const endTime = parseInt(studio.endTime.slice(0, 2));
        const schedule = [];
        for (let i = startTime; i < endTime; i++) {
          schedule.push(`${i < 10 ? "0" + i : i}:00-${i + 1}:00`);
        }
        setStudioSchedule(schedule);
      } catch (error) {
        console.error(error);
      }
    }
    async function getStudioClasses() {
      try {
        const response = await axios.get("http://localhost:4000/api/classes/");
        const classes = response.data.filter(
          (c) => c.facilityName === "Studio"
        );
        setStudioClasses(classes);
      } catch (error) {
        console.error(error);
      }
    }

    getStudioSchedule();
    getStudioClasses();
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState([]);
  const [selectedTime, setSelectedTime] = useState([]);
  const [selectedClass, setSelectedClass] = useState([]);
  const {
    data: bookingData,
    loading: bookingLoading,
    error: bookingError,
  } = useFetch("http://localhost:4000/api/bookings/");

  const formattedBookings = bookingData.map((booking) => {
    const dateObj = new Date(booking.date);
    const dayOfWeek = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
    }).format(dateObj);
    const formattedStartTime = booking.startTime.slice(0, -3);

    return {
      ...booking,
      date: dayOfWeek,
      startTime: formattedStartTime,
    };
  });

  const bookingCount = bookingData.reduce((acc, booking) => {
    const { dayOfWeek, formattedstartTime } = booking;
    const key = `${dayOfWeek}_${formattedstartTime}`;
    if (!acc[key]) {
      acc[key] = { dayOfWeek, formattedstartTime, count: 0 };
    }
    acc[key].count += booking.noOfPeople;
    return acc;
  }, {});

  const bookingCountArray = Object.values(bookingCount);

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
    const weekdays = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    return (
      <>
        {studioSchedule.map((time) => (
          <tr key={time}>
            <td>{time}</td>
            {weekdays.map((day) => (
              <td key={day}>
                {studioClasses
                  .filter(
                    (c) =>
                      c.day === day &&
                      c.startTime.slice(0, 5) === time.slice(0, 5)
                  )
                  .map((c) => {
                    const countObj = bookingCountArray.find(
                      (b) =>
                        b.dayOfWeek === day &&
                        b.formattedstartTime === c.startTime.slice(0, -3)
                    );
                    const count = countObj ? countObj.count : 0;
                    return (
                      <div key={c.className}>
                        <button onClick={() => handleOpenModal(day, time.slice(0,5), c.className)}>{bookingCount[`${day}_${time.slice(0,5)}`]?.count || 0}</button>

                      </div>
                    );
                  })}
              </td>
            ))}
          </tr>
        ))}
      </>
    );
  };

  return (
    <div className="Cal-container">
      <div className="Calendar">
        <h1 className="title">Timetable</h1>
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
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Booking Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BookingDetails
            selectedDay={selectedDay}
            selectedTime={selectedTime}
            selectedClass={selectedClass}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default StudioSchedule;
