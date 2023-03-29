import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./database/db.js"
import customerAuth from "./routes/customerRoutes.js";
import customer from "./routes/customers.js";
import staffAuth from "./routes/staffRoutes.js";
import activityRoute from "./routes/activity.js";
import classRoute from "./routes/classes.js";
import facilityRoute from "./routes/facility.js";
import bookingRoute from "./routes/booking.js";
import membershipRoute from "./routes/membership.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser())

// routes
app.use("/api/auth", customerAuth);
app.use("/api/customer", customer);
app.use("/auth/staff", staffAuth);
app.use("/api/activities", activityRoute);
app.use("/api/classes", classRoute);
app.use("/api/facilities", facilityRoute);
app.use("/api/bookings", bookingRoute);
app.use("/api/membership", membershipRoute);

app.use((err, req, res, next) => {
  const errStatus = err.status || 500;
  const errMessage = err.message || "Something went wrong.";
  return res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMessage,
    stack: err.stack,
  });
});

db.authenticate()
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Error: " + err));

// module.exports = app;
app.listen(PORT, () => {
    console.log('App listening on port ' + PORT);
})