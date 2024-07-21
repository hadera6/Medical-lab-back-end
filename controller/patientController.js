const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
// Load input validation
const patientValidator = require("../validation/patientValidator");
// Load Patient model
const Patient = require("../models/Patient");
// Load Casher model
const Casher = require("../models/Casher");
// Load Patient History model
const Patient_history = require("../models/Patient_history");
// Load Lab req model
const Lab_req = require("../models/Lab_req");
// Load MRN generator
const generateMRN = require("../utils/generateMRN");

const patientController = {

    StorePatient: (req, res) => {

        //Return if request body is empty
        if (!req.body.lab_req)
            return res.status(400).json({ status: "fail", message: "At least one lab requests is required" });
        if (!req.body.price)
            return res.status(400).json({ status: "fail", message: "Price is required" });

        const { first_name, middle_name, last_name, sex, age, region,
            zone, wereda, kebele, Efull_name, Ephone_number, Eaddress,
            phone_number } = req.body;

        var type2 = "laboratory";
        var price2 = req.body.price;
        var lab_req = req.body.lab_req;
        var mrn;

        // Form validation
        const { errors, isValid } = patientValidator.StorePatient(req.body);
        // Check validation
        if (!isValid) {
            return res.status(400).json({ status: "fail", errors });
        }
        while (!mrn) {
            mrn = generateMRN(first_name, middle_name, last_name);

            Patient.findOne({ mrn }).then(patient => {
                if (patient)
                    mrn = null;

            }).catch(err => console.log(err));
        }
        const newPatient = new Patient({
            mrn, first_name, middle_name, last_name, sex, age, region, zone,
            wereda, kebele, Efull_name, Ephone_number, Eaddress, phone_number
        });

        newPatient.save().then(
            patient => {

                patientController.createLab_req(patient, type2, price2, lab_req);

                res.json({
                    status: "success",
                    massage: "Patient added successfully",
                    data: { patient }
                });
            }
        ).catch(err => res.status(400).json({ status: "fail", message: "Patient not registered" }));
    },
    StoreOldPatient: (req, res) => {
        //Return if request body is empty
        if (!req.body.lab_req)
            return res.status(400).json({ status: "fail", message: "At least one lab requests is required" });
        if (!req.body.price)
            return res.status(400).json({ status: "fail", message: "Price is required" });

        const { price, lab_req } = req.body
        const type = "laboratory";
        Patient.findOne({ _id: req.params.id, state: 1, payed: 1 }).then(
            patient => {
                if (!patient)
                    return res.status(400).json({ status: "fail", massage: "Patient not found" });
                patientController.createLab_req(patient, type, price, lab_req);
                res.json({ status: "success", massage: "Patient sent to casher" });
            }
        ).catch(err => res.status(400).json({ status: "fail", massage: "Patient not found" }));
    },
    createLab_req: (patient, type, price, lab_req) => {
        const newLab_req = new Lab_req({
            patient_id: patient._id,
            mrn: patient.mrn, lab_req
        });
        newLab_req.save().then(
            req => {
                const newCasher = new Casher({ mrn: patient.mrn, type, price, remainder: price });
                newCasher.save().then(
                    casher => {
                        req.cash_id = casher._id;
                        req.save();
                    }
                );
            }
        );
    },
    UpdatePatient: (req, res) => {

        //Return if request body is empty

        const { first_name, middle_name, last_name, sex, age, region,
            zone, wereda, kebele, Efull_name, Ephone_number, Eaddress,
            phone_number } = req.body;

        // Form validation
        const { errors, isValid } = patientValidator.StorePatient(req.body);
        // Check validation
        if (!isValid) {
            return res.status(400).json({ status: "fail", errors });
        }
        Patient.findOne({ _id: req.params.id, state: 1 }).then(
            patient => {
                if (patient) {
                    patient.first_name = first_name;
                    patient.middle_name = middle_name;
                    patient.last_name = last_name;
                    patient.sex = sex;
                    patient.age = age;
                    patient.phone_number = phone_number;
                    patient.region = region;
                    patient.zone = zone;
                    patient.wereda = wereda;
                    patient.kebele = kebele;
                    patient.Efull_name = Efull_name;
                    patient.Ephone_number = Ephone_number;
                    patient.Eaddress = Eaddress;

                    patient.save()
                    res.json({ status: "success", data: { patient } })
                } else
                    res.status(400).json({ status: "fail", massage: "Patient not found" })
            }
        ).catch(err => res.status(400).json({ status: "fail", err, massage: "Patient not found" }));
    },
    SearchPatient: async (req, res) => {
        const { search } = req.body

        var result = []

        await Patient.find({ mrn: search, state: 1 }).then(
            patients => {
                if (patients.length)
                    result = result.concat(patients);
            }
        ).catch(err => console.log(err));

        await Patient.find({ first_name: search, state: 1 }).then(
            patients => {
                if (patients.length)
                    result = result.concat(patients);
            }
        ).catch(err => console.log(err));

        await Patient.find({ middle_name: search, state: 1 }).then(
            patients => {
                if (patients.length)
                    result = result.concat(patients);
            }
        ).catch(err => console.log(err));

        await Patient.find({ last_name: search, state: 1 }).then(
            patients => {
                if (patients.length)
                    result = result.concat(patients);
            }
        ).catch(err => console.log(err));

        if (result.length)
            return res.json({ status: "success", data: { patients: result } });
        else
            return res.status(400).json({ status: "fail", massage: "Patient not found" });

    },
    OnePatient: (req, res) => {

        Patient.findOne({ _id: req.params.id, state: 1 }).then(
            patient => {
                if (patient.state)
                    res.json({ status: "success", data: { patient } });
                else
                    res.status(400).json({ status: "fail", massage: "Patient not found" });
            }
        ).catch(err => res.status(400).json(err));
    },
    AllPatient: (req, res) => {

        Patient.find({ state: 1 }).then(
            patients => res.json({ status: "success", data: { patients } })
        ).catch(err => res.status(400).json(err));
    },
    OnePatientHistory: (req, res) => {

        Patient_history.findOne({ _id: req.params.id, state: 1 }).then(
            patient_history => {
                if (!patient_history)
                    return res.status(400).json({ status: "fail", massage: "Patient not found" });
                Patient.findOne({ _id: patient_history.patient_id, state: 1, payed: 1 }).then(
                    patient => {
                        if (patient)
                            res.json({ status: "success", data: { patient: { patient, patient_history } } });
                        else
                            res.status(400).json({ status: "fail", massage: "Patient not found" });
                    }
                )
            }
        ).catch(err => res.status(400).json({ status: "fail", massage: "Patient not found" }));
    },
    AllPatientHistory: (req, res) => {

        Patient_history.find({ state: 1 }).then(
            patient_historys => {
                Patient.find({ state: 1, payed: 1 }).then(
                    patients => {
                        historyPatient = patient_historys.map(
                            patient_history => {
                                let i = 0;
                                while (i < patients.length) {
                                    if (patient_history.mrn == patients[i].mrn) {
                                        return { patient: patients[i], patient_history: patient_history }
                                    }
                                    i = i + 1;
                                }
                            }
                        );
                        if (!historyPatient[0])
                            res.json({ status: "success", data: { patients: [] } });
                        else
                            res.json({ status: "success", data: { patients: historyPatient } })
                    }
                );
            }
        ).catch(err => res.status(400).json(err));
    },
    AllPatientToCasher: (req, res) => {

        Casher.find({ state: 1 }).then(
            cash => {
                filteredCash = cash.filter(
                    oneCash => {
                        return !(oneCash.remainder == 0)
                    }
                );
                Patient.find({ state: 1 }).then(
                    patients => {
                        cashPatient = filteredCash.map(
                            cash => {

                                let i = 0;
                                while (i < patients.length) {
                                    if (cash.mrn == patients[i].mrn) {
                                        return { patient: patients[i], cash }
                                    }
                                    i = i + 1;
                                }
                            }
                        );

                        res.json({
                            status: "success", data: {
                                patients: cashPatient.filter(item => (item))
                            }
                        })
                    }
                );
            }
        ).catch(err => res.status(400).json(err));

    },
    OnePatientToCasher: (req, res) => {

        Casher.findOne({ _id: req.params.id, state: 1 }).then(
            cash => {
                if (cash.remainder != 0)
                    res.json({ status: "success", data: { cash } });
                else
                    res.status(400).json({ status: "fail", massage: "cash not found" });
            }
        ).catch(err => res.status(400).json(err));
    },
    PatientInCollection: (req, res) => {

        Lab_req.findOne({ _id: req.params.id, state: 1, collected: 0, payed: 1 }).then(
            lab_req => {

                if (!lab_req) return res.status(400).json({ status: "fail", massage: "Patient not found" });

                Patient.findOne({ _id: lab_req.patient_id, state: 1, payed: 1 }).then(
                    patient => {
                        if (!patient) return res.status(400).json({ status: "fail", massage: "Patient not found" });

                        lab_req.collected = 1;
                        lab_req.save();
                        res.json({ status: "success", massage: "Successfully Collected" });
                    }
                );
            }
        ).catch(err => res.status(400).json({ status: "fail", massage: "Patient not found" }));
    },
    OnePatientToCollection: (req, res) => {

        Lab_req.findOne({ _id: req.params.id, state: 1, collected: 0, payed: 1 }).then(
            lab_req => {
                if (!lab_req)
                    return res.status(400).json({ status: "fail", massage: "Patient not found" });
                Patient.findOne({ _id: lab_req.patient_id, state: 1, payed: 1 }).then(
                    patient => {
                        if (patient)
                            res.json({ status: "success", data: { patient: { patient, lab_req } } });
                        else
                            res.status(400).json({ status: "fail", massage: "Patient not found" });
                    }
                )
            }

        ).catch(err => res.status(400).json({ status: "fail", massage: "Patient not found" }));
    },
    AllPatientToCollection: (req, res) => {

        Lab_req.find({ state: 1, collected: 0, payed: 1 }).then(
            lab_reqs => {
                Patient.find({ state: 1, payed: 1 }).then(
                    patients => {
                        labPatient = lab_reqs.map(
                            lab_req => {
                                let i = 0;
                                while (i < patients.length) {
                                    if (lab_req.mrn == patients[i].mrn) {
                                        return { patient: patients[i], lab_req: lab_req }
                                    }
                                    i = i + 1;
                                }
                            }
                        );
                        if (!labPatient[0])
                            res.json({ status: "success", data: { patients: [] } });
                        else
                            res.json({ status: "success", data: { patients: labPatient } })
                    }
                );
            }
        ).catch(err => res.status(400).json(err));

    },
    PatientInLab: async (req, res) => {

        //Return if request body is empty
        if (!req.body.lab_result)
            return res.status(400).json({ status: "fail", message: "lab result is required" });

        var lab_result = req.body.lab_result;
        var lab_id;
        var token;

        if (req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1]
        }
        if (!token) {
            return res.status(400).json({ status: "fail", massage: "lab_id not provided or not autherized" })
        }
        decoded = jwt.verify(token, keys.secretOrKey);
        lab_id = decoded.id;

        Lab_req.findOne({ _id: req.params.id, state: 1, collected: 1, payed: 1 }).then(
            lab_req => {

                if (!lab_req) return res.status(400).json({ status: "fail", massage: "Patient not found" });

                Patient.findOne({ _id: lab_req.patient_id, state: 1, payed: 1 }).then(
                    patient => {
                        if (!patient) return res.status(400).json({ status: "fail", massage: "Patient not found" });

                        const newPatientHistory = new Patient_history({
                            patient_id: patient._id, mrn: patient.mrn,
                            lab_id, lab_result
                        });

                        newPatientHistory.save().then(
                            patient_history => {
                                res.json({
                                    status: "success", message: "Lab result sent successfully",
                                    data: { patient: { patient_history, lab_req } }
                                });
                                lab_req.state = 0;
                                lab_req.save();
                            }
                        );
                    }
                );
            }
        ).catch(err => res.status(400).json({ status: "fail", massage: "Patient not found" }));
    },
    OnePatientToLab: (req, res) => {

        Lab_req.findOne({ _id: req.params.id, state: 1, collected: 1, payed: 1 }).then(
            lab => {
                if (!lab)
                    return res.status(400).json({ status: "fail", massage: "Patient not found" });
                Patient.findOne({ _id: lab.patient_id, state: 1, payed: 1 }).then(
                    patient => {
                        if (patient) {
                            patient = { patient, lab_req: lab }
                            res.json({ status: "success", data: { patient } });
                        }
                        else
                            res.status(400).json({ status: "fail", massage: "Patient not found" });
                    }
                )
            }

        ).catch(err => res.status(400).json({ status: "fail", massage: "Patient not found" }));
    },
    AllPatientToLab: (req, res) => {
        Lab_req.find({ state: 1, payed: 1, collected: 1 }).then(
            lab_reqs => {
                Patient.find({ state: 1, payed: 1 }).then(
                    patients => {
                        labPatient = lab_reqs.map(
                            lab_req => {
                                let i = 0;
                                while (i < patients.length) {
                                    if (lab_req.mrn == patients[i].mrn) {
                                        return { patient: patients[i], lab_req: lab_req }
                                    }
                                    i = i + 1;
                                }
                            }
                        );
                        res.json({ status: "success", data: { patients: labPatient } })
                    }
                );
            }
        ).catch(err => res.status(400).json(err));
    },
    PatientInCasher: (req, res) => {
        var { remainder } = req.body;

        if (!remainder)
            remainder = 0;

        Casher.findOne({ _id: req.params.id, state: 1 }).then(
            casher => {
                if (casher.type == "laboratory") {
                    Lab_req.findOne({ cash_id: casher._id, state: 1 }).then(
                        lab_req => {
                            lab_req.payed = 1;
                            lab_req.save();
                            casher.payed = 1;
                            casher.remainder = remainder;
                            casher.save();
                            res.json({ status: "success", massage: "Payment successfull" });
                        }
                    );
                } else
                    res.status(400).json({ status: "fail", massage: "Patient not found" });

            }
        ).catch(err => res.status(400).json({ status: "fail", err, massage: "Patient not found" }));;
    },
    Report: async (req, res) => {


        const currTime = new Date();
        const currDate = currTime.getDate();
        const currMonth = currTime.getMonth();
        const currYear = currTime.getFullYear();
        var DatePatient = 0, DateTest = 0, DateCash = 0, totallPatient = 0;
        var totallCash = 0; var totallTest = 0;

        await Patient.find({ state: 1 }).then(
            allPatients => {
                allPatients.filter(
                    patient => {
                        if (patient) {
                            let joinDate = patient.created_at.getDate();
                            let joinMonth = patient.created_at.getMonth();
                            let joinYear = patient.created_at.getFullYear();

                            if (joinDate == currDate &&
                                joinMonth == currMonth &&
                                joinYear == currYear) {

                                DatePatient = DatePatient + 1;
                            }
                        }
                    }
                );
                allPatients.map(
                    patient => {
                        if (patient && patient.state == 1) {
                            totallPatient = totallPatient + 1;
                        }
                    }
                );
            }
        ).catch(err => console.log(err));
        await Lab_req.find({ payed: 1 }).then(
            allLab_reqs => {
                allLab_reqs.filter(
                    lab_req => {
                        if (lab_req) {
                            let testDate = lab_req.created_at.getDate();
                            let testMonth = lab_req.created_at.getMonth();
                            let testYear = lab_req.created_at.getFullYear();

                            if (testDate == currDate &&
                                testMonth == currMonth &&
                                testYear == currYear) {

                                DateTest = DateTest + lab_req.lab_req.length;

                            }
                        }
                    }

                );
                allLab_reqs.map(
                    lab_req => {
                        if (lab_req) {
                            totallTest = totallTest + lab_req.lab_req.length;

                        }
                    }
                );
            }
        ).catch(err => console.log(err));
        await Casher.find({ payed: 1 }).then(
            allCasher => {
                allCasher.filter(
                    cash => {
                        if (cash) {
                            let payedDate = cash.created_at.getDate();
                            let payedMonth = cash.created_at.getMonth();
                            let payedYear = cash.created_at.getFullYear();

                            if (payedDate == currDate &&
                                payedMonth == currMonth &&
                                payedYear == currYear &&
                                cash.payed == 1) {

                                DateCash = DateCash + cash.price;

                            }
                        }
                    }
                );
                allCasher.map(
                    cash => {
                        if (cash && cash.payed == 1) {
                            totallCash = totallCash + cash.price;
                        }
                    }
                );
            }
        ).catch(err => console.log(err));

        res.json({
            status: "success",
            report: {
                DatePatient, DateCash, DateTest,
                totallPatient, totallCash, totallTest
            }
        });

    },
    DeletePatient: (req, res) => {
        Patient.findOne({ _id: req.params.id }).then(
            patient => {
                if (patient) {
                    patient.state = 0;
                    patient.deleted_at = Date.now()
                    patient.save();
                    res.json({ status: "success", massage: "Patient deleted successfully" })
                }
                else
                    res.status(400).json({ status: "fail", massage: "Patient not found" })
            }
        ).catch(err => res.status(400).json({ status: "fail", err, massage: "Patient not found" }));
    }
}
module.exports = patientController;