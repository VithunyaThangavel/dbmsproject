const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: { type: String, default: "Open" }
});

module.exports = mongoose.model("Job", jobSchema);
