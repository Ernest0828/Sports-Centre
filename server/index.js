const express = require('express');
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
// body parsing middleware
app.use(express.json());

// register and login customer routes
app.use("/auth", require("./routes/jwtAuth"));

// dashboard route
app.use("/dashboard", require("./routes/dashboard"));

app.use("/staff", require("./routes/staffRoutes"));

app.listen(PORT, () => {
    console.log('App listening on port ' + PORT);
});