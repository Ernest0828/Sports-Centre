const Sequelize = require("sequelize");
const db = require("../db");

const { INTEGER } = Sequelize;

const StaffBooking = db.define('StaffBooking', {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  }
});

module.exports = StaffBooking;