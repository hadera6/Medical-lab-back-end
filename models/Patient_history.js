const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const patient_historySchema = new Schema({
    mrn: {
        type: String,
        required: true
    },
    patient_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    lab_id: {
        type: Schema.Types.ObjectId,
        required: false
    },
    lab_result: {
        type: {}
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
module.exports = Patient_history = mongoose.model("patient_history", patient_historySchema);