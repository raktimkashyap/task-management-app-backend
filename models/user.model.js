const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "Name is required."],
      maxlength: 50,
      trim: true,
    },
    email: {
      required: [true, "Email is required"],
      type: String,
      unique: [true, "User already exists"],
      trim: true,
    },
    password: {
      required: [true, "Password is required"],
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
