const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "task title is required"],
    },
    description: {
      trim: true,
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "ongoing", "completed"],
      required: [true, "status cannot be blank"],
      default: "pending",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      required: [true, "priority cannot be blank"],
      default: "low",
    },
    dueDate: {
      type: Date,
    },
    owner: {
      type: String,
      requried: [true, "task owner is required"],
    },
    projectId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Project",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", taskSchema);
