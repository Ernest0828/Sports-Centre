const Sequelize = require("sequelize");
const db = require("../db");

const { INTEGER, UUID, UUIDV4, STRING, BOOLEAN } = Sequelize;

const Staff = db.define('Staff', {
  staffId: {
    type: UUID,
    defaultValue: UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  staffName: {
    type: STRING,
    allowNull: false
  },
  staffNumber: {
    type: INTEGER,
    allowNull: false
  },
  staffEmail: {
    type: STRING,
    allowNull: false
  },
  password: {
    type: STRING,
    allowNull: false
  },
  isManager: {
    type: BOOLEAN,
    defaultValue: false
  }
});


module.exports = Staff;
