import React, { Fragment } from "react";
import "./ICalendar.css";
import Navbar from "../../navbar/navbar";

const ICalendar = () => {
  return (
    <div className="Cal-container">
      <Navbar />
      <div className="Calendar">
        <h1 className="title">Pool Timetable</h1>
        <table className="timetable">
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
          <tr>
            <td>0800-0900</td>
            <td rowspan="2">
              General Use, <br />
              Lane Swimming, <br /> Lessons{" "}
            </td>
            <td rowspan="2">
              General Use, <br />
              Lane Swimming, <br /> Lessons{" "}
            </td>
            <td rowspan="2">
              General Use, <br />
              Lane Swimming, <br /> Lessons{" "}
            </td>
            <td rowspan="2">
              General Use, <br />
              Lane Swimming, <br /> Lessons{" "}
            </td>
            <td rowspan="2">Team Events </td>
            <td rowspan="2">
              General Use, <br />
              Lane Swimming, <br /> Lessons{" "}
            </td>
            <td rowspan="2">Team Events </td>
          </tr>
          <tr>
            <td>0900-1000</td>
          </tr>
          <tr>
            <td>1000-1100</td>
            <td rowspan="10"></td>
            <td rowspan="10"></td>
            <td rowspan="10"></td>
            <td rowspan="10"></td>
            <td rowspan="10">
              General Use, <br />
              Lane Swimming, <br /> Lessons{" "}
            </td>
            <td rowspan="10"></td>
            <td rowspan="10">
              General Use, <br />
              Lane Swimming, <br /> Lessons{" "}
            </td>
          </tr>
          <tr>
            <td>1100-1200</td>
          </tr>
          <tr>
            <td>1200-1300</td>
          </tr>
          <tr>
            <td>1300-1400</td>
          </tr>
          <tr>
            <td>1400-1500</td>
          </tr>
          <tr>
            <td>1500-1600</td>
          </tr>
          <tr>
            <td>1600-1700</td>
          </tr>
          <tr>
            <td>1700-1800</td>
          </tr>
          <tr>
            <td>1800-1900</td>
          </tr>
          <tr>
            <td>1900-2000</td>
          </tr>
        </table>
      </div>
    </div>
  );
}
export default ICalendar;
