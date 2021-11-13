const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "project title is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    owner: {
      type: String,
      required: [true, "project owner is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
