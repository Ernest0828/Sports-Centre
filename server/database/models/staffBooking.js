import { Sequelize } from "sequelize";
import db from "../db.js";
import Staff from "./staff.js";
import Booking from "./booking.js";

const { INTEGER } = Sequelize;

const StaffBooking = db.define('StaffBooking', {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  }
});

StaffBooking.belongsTo(Staff, { foreignKey: 'staffId' });
StaffBooking.belongsTo(Booking, { foreignKey: 'bookingId' });

export default StaffBooking