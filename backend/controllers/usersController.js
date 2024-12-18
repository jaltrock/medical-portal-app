const bcrypt = require("bcrypt");
const { getDatabase, client } = require("../helpers/connectDB");
const returnStatus = require("../helpers/returnStatus");
const signToken = require("../helpers/signToken");

const usersController = {
    signIn: async (req, res) => {
        try {
            const db = await getDatabase();
            var user = null;
            console.log(req.body);
            
            const admin = await db.collection("admin").findOne({
                email: req.body.email,
            });

            const doctor = await db.collection("doctors").findOne({
                email: req.body.email,
            });

            if(!admin && !doctor) {
                return returnStatus(res, 404, true, "Not found");
            }

            if(admin) {
                user = admin;
            }
            if(doctor) {
                user = doctor;
            }

            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err || !result) {
                    return returnStatus(res, 401, true, "Invalid email or password");
                }

                // Generate JWT
                const newjwt = signToken({
                    email: user.email,
                });

                // send token
                return returnStatus(res, 200, false, `Welcome ${user.username}`, {
                    token: newjwt,
                    username: user.username,
                });
            });
        } catch (error) {
            console.log(error);
            return returnStatus(res, 500, true, "Internal server error");
        } finally {
            if(client) {
                await client.close()
            }
        }
    },
};

module.exports = usersController;