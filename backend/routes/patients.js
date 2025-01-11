const express = require("express");
const router = express.Router();
const patientsController = require("../controllers.patientsController");
const verifyToken = require("../middlewares/verifyToken");

const {
  checkIDNumber,
  checkPhoneNumber,
  checkMedicalRecord,
  checkAddress,
  checkEmail,
  checkUserName,
} = require("../middlewares/checkInputs");

router.post(
  "/registerpatient",
  verifyToken,
  checkIDNumber,
  checkUserName,
  checkEmail,
  checkAddress,
  checkPhoneNumber,
  checkMedicalRecord,
  patientsController.registerPatient,
);

router.use((err, req, res, next) => {
  console.log("FROM patients route middleware", err.message);
});

module.exports = router;
