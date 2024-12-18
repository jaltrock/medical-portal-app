const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const verifyToken = require("../middlewares/verifyToken");

const { checkEmail, checkPassword } = require("../middlewares/checkInputs");

router.post("/signin", checkEmail, checkPassword, usersController.signIn);

router.get("/checkifloggedin", verifyToken, usersController.checkIfLoggedIn);

router.use((err, req, res, next) => {
    console.log("From users route middleware", err.message);
});

module.exports = router;