const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const lab_formSchema = new Schema({
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
        required: true
    },
    title_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    test: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    range: {
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
module.exports = Lab_form = mongoose.model("lab_form", lab_formSchema);