const express = require("express");
const multer = require("multer");
const path = require("path");
const Applicant = require("../models/Applicant");
const saveToExcel = require("../utils/excelHelper");
const router = express.Router();

console.log("✅ Applicant Routes Loaded");

// =======================
// MULTER CONFIGURATION
// =======================

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// =======================
// APPLY JOB
// =======================

router.post("/apply", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Resume file required" });
    }

    const applicant = new Applicant({
      name: req.body.name,
      email: req.body.email,
      jobId: req.body.jobId,
      resume: req.file.filename,
      status: "Pending"
    });

    const savedApplicant = await applicant.save();
    res.status(201).json(savedApplicant);

  } catch (error) {
    console.error("Apply Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// =======================
// GET ALL APPLICANTS
// =======================

router.get("/applicants", async (req, res) => {
  try {
    const applicants = await Applicant.find().sort({ createdAt: -1 });
    res.json(applicants);
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// =======================
// UPDATE STATUS
// =======================

router.put("/applicants/:id", async (req, res) => {
  try {
    const updatedApplicant = await Applicant.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!updatedApplicant) {
      return res.status(404).json({ message: "Applicant not found" });
    }

    res.json(updatedApplicant);

  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});
router.put("/applicants/:id", async (req, res) => {
  try {
    const { status } = req.body;

    const updatedApplicant = await Applicant.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    // 🔥 SAVE TO EXCEL when shortlisted or rejected
    if (status === "Shortlisted" || status === "Rejected") {
      await saveToExcel(updatedApplicant);
    }

    res.json(updatedApplicant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
