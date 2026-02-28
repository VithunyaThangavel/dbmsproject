const mongoose = require("mongoose");
const Job = require("./models/Job");

mongoose.connect("mongodb://127.0.0.1:27017/atsDB")
  .then(async () => {
    console.log("MongoDB Connected for seeding");

    // 🧹 optional: clear old jobs
    await Job.deleteMany();

    // 🚀 sample jobs
    const jobs = [
      {
        title: "Frontend Developer",
        company: "Tech Solutions",
        location: "Chennai",
        status: "Open"
      },
      {
        title: "Backend Developer",
        company: "CodeCraft",
        location: "Bangalore",
        status: "Open"
      },
      {
        title: "Full Stack Developer",
        company: "InnovateX",
        location: "Hyderabad",
        status: "Open"
      },
      {
        title: "UI/UX Designer",
        company: "DesignPro",
        location: "Mumbai",
        status: "Open"
      },
      {
        title: "Data Analyst",
        company: "DataMind",
        location: "Pune",
        status: "Open"
      },
      {
        title: "Software Tester",
        company: "QualitySoft",
        location: "Coimbatore",
        status: "Open"
      },
      {
        title: "DevOps Engineer",
        company: "CloudNet",
        location: "Chennai",
        status: "Open"
      },
      {
        title: "AI Engineer",
        company: "FutureAI",
        location: "Bangalore",
        status: "Open"
      }
    ];

    await Job.insertMany(jobs);

    console.log("✅ Sample jobs inserted");
    process.exit();
  })
  .catch(err => console.log(err));