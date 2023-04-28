import { useState, useEffect } from "react";
import axios from "axios";
import "./ICalendar.css";

const ClibmingWallSchedule = () => {
  const [ClibmingWallSchedule, setClibmingWallSchedule] = useState([]);

  useEffect(() => {
    const getClibmingWallSchedule = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/facilities/"
        );
        const ClibmingWall = response.data.find(
          (facility) => facility.facilityName === "Climbing wall"
        );
        const startTime = parseInt(ClibmingWall.startTime.slice(0, 2));
        const endTime = parseInt(ClibmingWall.endTime.slice(0, 2));
        const poolSchedule = [];
        for (let i = startTime; i < endTime; i++) {
          poolSchedule.push(`${i < 10 ? "0" + i : i}:00-${i + 1}:00`);
        }
        setClibmingWallSchedule(poolSchedule);
      } catch (error) {
        console.error(error);
      }
    };
    getClibmingWallSchedule();
  }, []);

  const renderClibmingWallSchedule = () => {
    const mondaySchedule = ClibmingWallSchedule.slice(0, 2);

    return (
      <>
        {ClibmingWallSchedule.map((time) => (
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
            {ClibmingWallSchedule.length > 0 && renderClibmingWallSchedule()}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClibmingWallSchedule;
