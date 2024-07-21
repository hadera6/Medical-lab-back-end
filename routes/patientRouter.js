const express = require("express");
const passport = require("passport")
const router = express.Router();
const patientController = require("../Controller/patientController")

Authorize = passport.authenticate("jwt", { session: false });

router.post("/reception/patient/store", patientController.StorePatient);
router.post("/reception/patient/store/:id", patientController.StoreOldPatient);
router.post("/reception/patient/search", patientController.SearchPatient);
router.get("/reception/patient/detail/:id", patientController.OnePatient);
router.get("/reception/patient/payment", patientController.AllPatientToCasher);
router.get("/reception/patient/payment/:id", patientController.OnePatientToCasher);
router.get("/reception/patient", patientController.AllPatient);
router.get("/reception/report", patientController.Report);
router.put("/reception/patient/payed/:id", patientController.PatientInCasher);
router.put("/reception/patient/delete/:id", patientController.DeletePatient);
router.put("/reception/patient/update/:id", patientController.UpdatePatient);

router.get("/collection/patient/detail/:id", patientController.OnePatientToCollection);
router.get("/collection/patient", patientController.AllPatientToCollection);
router.post("/collection/patient/store/:id", patientController.PatientInCollection);

router.get("/laboratory/patient/detail/:id", patientController.OnePatientToLab);
router.get("/laboratory/patient", patientController.AllPatientToLab);
router.post("/laboratory/patient/store/:id", patientController.PatientInLab);
router.get("/laboratory/patient_history/:id", patientController.OnePatientHistory);
router.get("/laboratory/patient_history", patientController.AllPatientHistory);


module.exports = router;