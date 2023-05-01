import { useState, useEffect } from "react";
import axios from "axios";
import "./ICalendar.css";
import { Modal, Button, Form} from "react-bootstrap";
import Datepicker from 'react-datepicker';
import BookingDetails from "./FacilityBooking";

const FitnessRoomSchedule = () => {
  const [fitnessRoomSchedule, setFitnessRoomSchedule] = useState([]);
  const [fitnessRoomActivities, setFitnessRoomActivities] = useState([]);
  
  useEffect(() => {
    const getFitnessRoomSchedule = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/facilities/"
        );
        const FitnessRoom = response.data.find(
          (facility) => facility.facilityName === "Fitness room"
        );
        const startTime = parseInt(FitnessRoom.startTime.slice(0, 2));
        const endTime = parseInt(FitnessRoom.endTime.slice(0, 2));
        const poolSchedule = [];
        for (let i = startTime; i < endTime; i++) {
          poolSchedule.push(`${i < 10 ? "0" + i : i}:00-${i + 1}:00`);
        }
        setFitnessRoomSchedule(poolSchedule);
      } catch (error) {
        console.error(error);
      }
    }
    const getFitnessRoomActivities = async () =>{
      try {
        const response = await axios.get(
          "http://localhost:4000/api/activities/"
        );
        const activity = response.data.filter(
          (a) => a.facilityName === "Fitness room");
          setFitnessRoomActivities(activity);
      } catch (error) {
        console.error(error);
      }
    }
    getFitnessRoomActivities();
    getFitnessRoomSchedule();
  }, []);

  const addOneHour = (timeString) => {
    const hour = parseInt(timeString.slice(0, 2));
    const nextHour = hour - 1;
    const formattedNextHour = nextHour < 10 ? "0" + nextHour : nextHour;
    return `${formattedNextHour}${timeString.slice(2)}`;
  };

  const [showModal, setShowModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState([]);
  const [selectedTime, setSelectedTime] = useState([]);

  const handleOpenModal = (day, time) => {
    setSelectedDay(day);
    setSelectedTime(time);
    setShowModal(true);
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const renderFitnessRoomSchedule = () => {
    const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    return (
      <>
        {fitnessRoomSchedule.map((time) => {
            const nextHourTime = addOneHour(time);
            const formattedTime = time.slice(0, 5);
            return (
            <tr key={time}>
          <td>{time}</td>
          {weekdays.map((day) => {
            const activities = fitnessRoomActivities.filter((a) =>
            (a.day === day && a.startTime.slice(0, 5) === time.slice(0, 5)) ||
                (a.day === day && a.startTime.slice(0,5) === nextHourTime.slice(0,5))
                );
                return (
                  <td key={day} onClick={() => handleOpenModal(day, formattedTime)}>
                  {activities.map((a) => (
                    <div key={a.activityName}>
                      <div>{a.activityName}</div>
                    </div>
                  ))}
                </td>
              );
              })}
            </tr>
          );
          })}
      </>
    );
  };

  return (
    <div className="Cal-container">
      <div className="Calendar">
        <h1 className="title">Fitness Room Timetable</h1>
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
          <tbody>
            {fitnessRoomSchedule.length > 0 && renderFitnessRoomSchedule()}
          </tbody>
        </table>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
    <Modal.Header closeButton>
      <Modal.Title>Booking Details</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <BookingDetails selectedDay={selectedDay} selectedTime={selectedTime} />
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

export default FitnessRoomSchedule;
