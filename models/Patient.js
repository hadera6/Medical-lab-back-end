const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema

const patientSchema = new Schema({

    first_name: {
        type: String,
        required: true
    },
    middle_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: false
    },
    mrn: {
        type: String,
        required: true
    },
    cash_id: {
        type: Schema.Types.ObjectId,
        required: false
    },
    region: {
        type: String,
        required: false
    },
    zone: {
        type: String,
        required: false
    },
    wereda: {
        type: String,
        required: false
    },
    kebele: {
        type: String,
        required: false
    },
    Efull_name: {
        type: String,
        required: false
    },
    Eaddress: {
        type: String,
        required: false
    },
    Ephone_number: {
        type: String,
        required: false
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    deleted_at: {
        type: Date,
        required: false
    },
    payed: {
        type: Number,
        default: 1
    },
    state: {
        type: Number,
        default: 1
    }
});
module.exports = Patient = mongoose.model("patient", patientSchema);