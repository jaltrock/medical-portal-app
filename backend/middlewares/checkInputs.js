const returnStatus = require("../helpers/returnStatus");

function checkPassword(req, res, next) {

    const { password } = req.body;

    if(!password) {
        returnStatus (res, 400, true, "Password is missing");
        return next(new Error("Password is missing"));
    }

    if(password.length > 20) {
        returnStatus(res, 400, true, "Password too long, max 20 characters allowed");
        return next(new Error("Password too long, max 20 characters allowed"));
    }
    // If this line is reached then continue
    next();
}

function checkEmail(req, res, next) {
    const { email } = req.body;

    if(!email) {
        returnStatus(res, 400, true, "Email is missing");
        return next(new Error("Email is missing"));
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Check that the total length of the email address does not exceed 50 characters
    if(email.length > 50) {
        returnStatus(res, 400, true, "Email too long");
        return next(new Error("Email too long"));
    }
    // This will either return true or false
    const result = emailRegex.test(email);
    if(!result) {
        returnStatus( res, 400, true, "Email is invalid");
        return next(new Error("Email is invalid"));
    }
    // If this line is reached then continue
    next();
}

module.exports = {
    checkPassword: checkPassword,
    checkEmail: checkEmail,
};