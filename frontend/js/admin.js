const API_URL = "http://localhost:5000/api";

const applicantList = document.getElementById("applicantList");
let allApplicants = []; // store original data

// ================= LOAD APPLICANTS =================
async function loadApplicants() {
  try {
    const response = await fetch(`${API_URL}/applicants`);
    const applicants = await response.json();

    allApplicants = applicants; // save full list
    displayApplicants(applicants);

  } catch (error) {
    console.error("Fetch Error:", error);
    applicantList.innerHTML =
      "<p style='color:red'>Error loading applicants</p>";
  }
}

// ================= DISPLAY FUNCTION =================
function displayApplicants(applicants) {
  applicantList.innerHTML = "";

  if (!applicants || applicants.length === 0) {
    applicantList.innerHTML = "<p>No Applicants Found</p>";
    return;
  }

  applicants.forEach(applicant => {
    const div = document.createElement("div");
    div.classList.add("card");

    div.innerHTML = `
      <h3>${applicant.name}</h3>
      <p>Email: ${applicant.email}</p>
      <p>Job ID: ${applicant.jobId}</p>
      <p>Status: ${applicant.status || "Pending"}</p>

      <a href="http://localhost:5000/uploads/${applicant.resume}" target="_blank">
        👁 View Resume
      </a>
      <br><br>

      <a href="http://localhost:5000/uploads/${applicant.resume}" download>
        <button>⬇ Download Resume</button>
      </a>

      <br><br>

      <button onclick="updateStatus('${applicant._id}', 'Shortlisted')">
        ✅ Shortlist
      </button>

      <button onclick="updateStatus('${applicant._id}', 'Rejected')">
        ❌ Reject
      </button>

      <hr>
    `;

    applicantList.appendChild(div);
  });
}

// ================= SEARCH FUNCTION =================
function searchApplicants() {
  const searchValue = document
    .getElementById("searchInput")
    .value.toLowerCase();

  const filtered = allApplicants.filter(applicant =>
    applicant.name.toLowerCase().includes(searchValue) ||
    applicant.email.toLowerCase().includes(searchValue) ||
    applicant.jobId.toLowerCase().includes(searchValue) ||
    (applicant.status || "").toLowerCase().includes(searchValue)
  );

  displayApplicants(filtered);
}

// ================= UPDATE STATUS =================
async function updateStatus(id, status) {
  try {
    await fetch(`${API_URL}/applicants/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ status })
    });

    loadApplicants();

  } catch (error) {
    console.error("Update Error:", error);
  }
}

// ================= AUTO LOAD =================
loadApplicants();