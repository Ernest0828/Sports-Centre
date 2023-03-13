const Sequelize = require("sequelize");
const db = require("../db");
// const Facility = require("./facility");

const { INTEGER, STRING, TIME, FLOAT } = Sequelize;

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
    day: {
        type: STRING,
        allowNull: true,
    },
    time: {
        type: TIME,
        allowNull: true,
    },
    price: {
        type: FLOAT,
        allowNull: false
    }
});

// add foreign key constraint to facilityId column
// Activity.belongsTo(Facility, { foreignKey: 'facilityId' });

module.exports = Activity;