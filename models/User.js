const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const userSchema = new Schema({

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
  phone_number: {
    type: String,
    required: false
  },
  sex: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  profile_pic: {
    type: String,
    required: false
  },
  b_date: {
    type: String,
    required: true
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
  state: {
    type: Number,
    default: 1
  }
});
module.exports = User = mongoose.model("users", userSchema);