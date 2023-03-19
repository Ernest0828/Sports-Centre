const express = require('express');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser())

// routes
app.use("/auth", require("./routes/customerRoutes"));
app.use("/dashboard", require("./routes/dashboard"));
app.use("/auth/staff", require("./routes/staffRoutes"));


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
});