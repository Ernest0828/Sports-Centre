import { useState, useEffect } from "react";
import axios from "axios";
import "./ICalendar.css";

const FitnessRoomSchedule = () => {
  const [FitnessRoomSchedule, setFitnessRoomSchedule] = useState([]);

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
    };
    getFitnessRoomSchedule();
  }, []);

  const renderFitnessRoomSchedule = () => {
    const mondaySchedule = FitnessRoomSchedule.slice(0, 2);

    return (
      <>
        {FitnessRoomSchedule.map((time) => (
          <tr key={time}>
        <td>{time}</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
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
          <tbody>
            {FitnessRoomSchedule.length > 0 && renderFitnessRoomSchedule()}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FitnessRoomSchedule;
