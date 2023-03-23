import { Sequelize } from "sequelize";
import db from "../db.js";
import Customer from "./customer.js";
import Payment from "./payment.js";

const { STRING, DATE } = Sequelize;

const Membership = db.define('Membership', {
    membershipType: {
        type: STRING,
        allowNull: false
    },
    startDate: {
        type: DATE,
        allowNull: true
    },
    endDate: {
        type: DATE,
        allowNull: true
    }
});

Membership.belongsTo(Customer, { foreignKey: 'customerId'});
Membership.belongsTo(Payment, { foreignKey: 'paymentId' });

export default Membership