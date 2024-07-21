const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const casherSchema = new Schema({

    mrn: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    payed: {
        type: Number,
        default: 0
    },
    remainder: {
        type: Number,
        required: true
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
module.exports = Casher = mongoose.model("casher", casherSchema);