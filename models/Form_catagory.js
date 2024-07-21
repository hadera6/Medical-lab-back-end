const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const form_catagorySchema = new Schema({
    catagory: {
        type: String,
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
module.exports = Form_catagory = mongoose.model("form_catagory", form_catagorySchema);