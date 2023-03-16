const Sequelize = require("sequelize");
const db = require("../db");

const { INTEGER, STRING, TIME } = Sequelize;

const Facility = db.define('Facility', {
  facilityId: {
    type: INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  facilityName: {
    type: STRING,
    allowNull: false
  },
  capacity: {
    type: INTEGER,
    allowNull: false
  },
  startTime: {
    type: TIME,
    allowNull: false
  },
  endTime: {
    type: TIME,
    allowNull: false
  }
    
});

module.exports = Facility;