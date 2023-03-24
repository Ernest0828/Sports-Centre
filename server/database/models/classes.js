import { Sequelize } from "sequelize";
import db from "../db.js";
import Facility from "./facility.js";
import Payment from "./payment.js";

const { INTEGER, STRING, TIME, FLOAT } = Sequelize;

const Classes = db.define('Classes', {
    classId: {
        type: INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    className: {
        type: STRING,
        allowNull: false
    },
    day: {
        type: STRING,
        allowNull: false
    },
    startTime: {
        type: TIME,
        allowNull: false
    },
    endTime: {
        type: TIME,
        allowNull: false
    },
    price: {
        type: FLOAT,
        allowNull: false
    }
});

// add foreign key constraint
Classes.belongsTo(Facility, { foreignKey: 'facilityName' });

export default Classes