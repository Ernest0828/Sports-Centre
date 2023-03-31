const express = require('express');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const db = require("./database/db")

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;
// middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser())

// routes
app.use("/api/auth", require("./routes/customerRoutes"));
app.use("/api/customer", require("./routes/customers"));
app.use("/auth/staff", require("./routes/staffRoutes"));
app.use("/api/employee", require("./routes/employee"));
app.use("/api/activities", require("./routes/activity"));
app.use("/api/classes", require("./routes/classes"));
app.use("/api/facilities", require("./routes/facility"));
app.use("/api/bookings", require("./routes/booking"));
app.use("/api/membership", require("./routes/membership"));
app.use("/api/stripe", require("./routes/stripe"));

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

app.listen(PORT, () => {
    console.log('App listening on port ' + PORT);
})

db.authenticate()
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Error: " + err));

// module.exports = app;