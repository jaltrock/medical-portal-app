require("dotenv").config();
const express = require("express");
const cors = require("cors");

const patientsRouter = require("./routes/patients");
const doctorsRouter = require("./routes/doctors");
const usersRouter = require("./routes/users");
const returnStatus = require("./helpers/returnStatus");
// Create an instance of Express
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.use(cors());

// apply route middlewares to these routes
app.use("/users", usersRouter);
app.use("/doctors", doctorsRouter);
app.use("/patients", patientsRouter);

app.get("/", (req, res) => {
    res.send("Hello");
});

app.use((req, res, next) => {
    return returnStatus(res, 404, true, "Not found");
});

const port = 5000 || process.env.PORT;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});