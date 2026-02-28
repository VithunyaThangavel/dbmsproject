const API_URL = "http://localhost:5000/api";

// ================= JOB LIST =================
async function loadJobs() {
  const jobList = document.getElementById("jobList");
  if (!jobList) return;

  try {
    const res = await fetch(`${API_URL}/jobs`);
    const jobs = await res.json();

    jobList.innerHTML = "";

    jobs.forEach(job => {
      jobList.innerHTML += `
  <div class="card">
    <h3>${job.title}</h3>

    <p><b>🏢 Company:</b> ${job.company || "Tech Corp"}</p>
    <p><b>📍 Location:</b> ${job.location || "Chennai"}</p>
    <p><b>💰 Salary:</b> ${job.salary || "₹4–8 LPA"}</p>
    <p><b>🕒 Type:</b> ${job.jobType || "Full-time"}</p>

    <p>${job.description}</p>

    <p>Status:
      <span class="status-open">${job.status}</span>
    </p>

    <button onclick="applyJob('${job._id}')">
      🚀 Apply Now
    </button>
  </div>
`;
    });

  } catch (err) {
    console.error("Job load error:", err);
  }
}

// ================= APPLY BUTTON =================
function applyJob(jobId) {
  window.location.href = `apply.html?jobId=${jobId}`;
}

// ================= APPLY FORM =================
const form = document.getElementById("applyForm");

if (form) {
  // 🔥 auto-fill jobId from URL
  const params = new URLSearchParams(window.location.search);
  const jobIdFromUrl = params.get("jobId");

  if (jobIdFromUrl) {
    form.jobId.value = jobIdFromUrl;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(form);

      const res = await fetch(`${API_URL}/apply`, {
        method: "POST",
        body: formData
      });

      if (!res.ok) throw new Error("Apply failed");

      alert("✅ Application submitted successfully!");

      // 🔥 redirect after apply
      window.location.href = "jobs.html";

    } catch (err) {
      console.error("Apply error:", err);
      alert("❌ Failed to apply");
    }
  });
}

// ================= AUTO LOAD =================
loadJobs();