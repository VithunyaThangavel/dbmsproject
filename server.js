const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const jobRoutes = require("./routes/jobRoutes");
const applicantRoutes = require("./routes/applicantRoutes");

const app = express();

// ========================
// MIDDLEWARE
// ========================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve uploaded resumes (IMPORTANT for download)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ========================
// DATABASE CONNECTION
// ========================
mongoose.connect("mongodb://127.0.0.1:27017/atsDB")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ DB Error:", err));

// ========================
// ROUTES
// ========================
app.use("/api/jobs", jobRoutes);
app.use("/api", applicantRoutes);

// ========================
// TEST ROUTE
// ========================
app.get("/", (req, res) => {
  res.send("ATS Backend Running 🚀");
});

// ========================
// SERVER START
// ========================
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});