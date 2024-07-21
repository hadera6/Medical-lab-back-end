const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const form_titleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    catagory: {
        type: String,
        required: true
    },
    catagory_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Form_catagory"
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
module.exports = Form_title = mongoose.model("form_title", form_titleSchema);