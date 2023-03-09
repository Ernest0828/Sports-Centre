const Sequelize = require("sequelize");
const db = require("../db");

const { INTEGER, STRING, BOOLEAN } = Sequelize;

const Facility = db.define('Facility', {
  facilityId: {
    type: INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  faciltiyName: {
    type: STRING,
    allowNull: false
  },
  capacity: {
    type: INTEGER,
    allowNull: false
  },
  isAvailable: {
    type: BOOLEAN,
    defaultValue : false
  }
});

module.exports = Facility;