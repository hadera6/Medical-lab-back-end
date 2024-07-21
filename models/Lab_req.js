const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const lab_reqSchema = new Schema({

    patient_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    mrn: {
        type: String,
        required: true
    },
    lab_req: {
        type: [],
        required: true
    },
    collected: {
        type: Number,
        default: 0
    },
    payed: {
        type: Number,
        default: 0
    },
    cash_id: {
        type: Schema.Types.ObjectId,
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
    state: {
        type: Number,
        default: 1
    }
});
module.exports = Lab_req = mongoose.model("lab_req", lab_reqSchema);