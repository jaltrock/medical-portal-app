const { getDatabase, client } = require("../helpers/connectDB");
const returnStatus = require("../helpers/returnStatus");

const patientsController = {
  registerPatient: async (req, res, next) => {
    try {
      const db = await getDatabase();
      const doctorid = await db.collection("doctors").findOne({
        $or: [{ email: req.body.email }, { idnumber: req.body.idnumber }],
      });

      if (doctorid) {
        return returnStatus(
          res,
          400,
          true,
          "You are not authorized to register a patient using this id number or email"
        );
      }

      const doctor = await db.collection("doctors").findOne({
        email: req.decodedtoken.email,
      });

      const admin = await db.collection("admin").findOne({
        email: req.decodedtoken.email,
      });

      const emailExistsForAdmin = await db.collection("admin").findOne({
        email: req.body.email,
      });

      if (emailExistsForAdmin) {
        return returnStatus(
          res,
          400,
          true,
          "You are not authorized to register a patient using this email"
        );
      }

      const medicalrecord = doctor
        ? [
            {
              date: new Date().toLocaleDateString("en-GB"),
              record: req.body.medicalrecord,
            },
          ]
        : [];

      if (doctor || admin) {
        const patients_collection = db.collection("patients");

        const patient = await patients_collection.findOne({
          $or: [{ email: req.body.email }, { idnumber: req.body.idnumber }],
        });

        if (patient) {
          return returnStatus(res, 400, true, "Patient already exists");
        }

        const result = await patients_collection.insertOne({
          idnumber: req.body.idnumber,
          username: req.body.username,
          email: req.body.email,
          address: req.body.address,
          phone: req.body.phone,
          medicalrecord: medicalrecord,
        });

        return returnStatus(res, 200, false, "Patient added");
      }

      return returnStatus(
        res,
        401,
        true,
        "You are not authorized to register a patient"
      );
    } catch (error) {
      console.log(error);
      return returnStatus(res, 500, true, "Internal server error");
    } finally {
      if (client) {
        await client.close();
      }
    }
  },
};

module.exports = patientsController;
