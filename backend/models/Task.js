const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  priority: {
    type: Number,
    required: true,
    default: 5,
    enum: [1, 2, 3, 4, 5]
  },
  status: {
    type: String,
    required: true,
    default: "PENDING",
    enum: ["PENDING", "PROCESSING", "COMPLETED"]
  }
}, {
  timestamps: true
});


const Task = mongoose.model("Task", taskSchema);
module.exports = Task;