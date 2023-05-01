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
  const [bookings, setBookings] = useState([]);

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
            capacity: studio.capacity,
          });
        }
        // console.log("Availability:",studio.capacity)
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
        let day = "";

        const bookingsResponse = await axios.get(
          "http://localhost:4000/api/bookings/"
        );
        const bookings = bookingsResponse.data;
        const date = new Date(bookings.date);
        day = date.toLocaleDateString("en-US", { weekday: "long" });

        for (const c of classes) {
          let numBookings = 0;
          for (const b of bookings) {
            const bookingDate = new Date(b.date);
            const bookingDay = bookingDate.toLocaleDateString("en-US", {
              weekday: "long",
            });

            if (
              b.facilityName === "Studio" &&
              bookingDay === c.day &&
              b.startTime === c.startTime
            ) {
              numBookings++;
            }
          }
          console.log("Number of bookings for", c.day, "is", numBookings);

          if (numBookings >= studio.capacity) {
            console.log(`${c.className} is fully booked.`);
          } else {
            console.log(
              `${c.className} has ${
                studio.capacity - numBookings
              } spots remaining.`
            );
          }
        }
        setBookings(bookings);

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
        {studioSchedule.map((timeSlot) => (
          <tr key={timeSlot.time}>
            <td>{timeSlot.time}</td>
            {weekdays.map((day) => {
              return (
                <td key={day}>
                  {studioClasses
                    .filter(
                      (c) =>
                        c.day === day &&
                        c.startTime.slice(0, 5) === timeSlot.time.slice(0, 5)
                    )
                    .map((c) => {
                      const numBookings = bookings.filter(
                        (b) =>
                          b.facilityName === "Studio" &&
                          new Date(b.date).toLocaleDateString("en-US", {
                            weekday: "long",
                          }) === c.day &&
                          b.startTime === c.startTime
                      ).length;
                      const spotsRemaining =
                        studioSchedule[0].capacity - numBookings;
                      const isFullyBooked =
                        numBookings >= studioSchedule[0].capacity;
                      return (
                        <div key={c.className}>
                          <button
                            onClick={() =>
                              handleOpenModal(
                                day,
                                timeSlot.time.slice(0, 5),
                                c.className
                              )
                            }
                            disabled={isFullyBooked}
                          >
                            {c.className}
                          </button>
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
      <div className="Calendar">
        <h1 className="calendarTitle">Timetable</h1>
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
