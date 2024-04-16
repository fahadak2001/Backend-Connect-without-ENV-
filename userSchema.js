const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "please provide email"],
    unique: [true, "Email Exist"],
  },
  password: {
    type: String,
    required: [true, "please provide password"],
    unique: [true, "Email Exist"],
  },
});

module.exports = mongoose.model("User", UserSchema); //model is our mongodb model in which we are tellin it to find or create a user db with the schema
