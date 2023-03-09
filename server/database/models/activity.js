const Sequelize = require("sequelize");
const db = require("../db");
const Facility = require("./facility");

const { INTEGER, STRING, DATE, TIME } = Sequelize;

const Activity = db.define('Activity', {
    activityId: {
        type: INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    activityName: {
        type: STRING,
        allowNull: false
    },
    date: {
        type: DATE,
        allowNull: false,
    },
    time: {
        type: TIME,
        allowNull: false,
    }
});

// add foreign key constraint to facilityId column
Activity.belongsTo(Facility, { foreignKey: 'facilityId' });

module.exports = Activity;