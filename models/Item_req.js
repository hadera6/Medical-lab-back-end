const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const item_reqSchema = new Schema({
    item: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    user: {
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
    accepted: {
        type: Number,
        default: 2
    },
    state: {
        type: Number,
        default: 1
    }
});
module.exports = Item_req = mongoose.model("item_req", item_reqSchema);