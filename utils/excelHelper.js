const ExcelJS = require("exceljs");
const path = require("path");
const fs = require("fs");

const filePath = path.join(__dirname, "../reports/applicants.xlsx");

async function saveToExcel(applicant) {
  let workbook;
  let worksheet;

  // create folder if not exists
  const dir = path.join(__dirname, "../reports");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  if (fs.existsSync(filePath)) {
    workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    worksheet = workbook.getWorksheet("Applicants");
  } else {
    workbook = new ExcelJS.Workbook();
    worksheet = workbook.addWorksheet("Applicants");

    worksheet.columns = [
      { header: "Name", key: "name", width: 20 },
      { header: "Email", key: "email", width: 30 },
      { header: "Job ID", key: "jobId", width: 25 },
      { header: "Status", key: "status", width: 15 },
      { header: "Date", key: "date", width: 20 },
    ];
  }

  worksheet.addRow({
    name: applicant.name,
    email: applicant.email,
    jobId: applicant.jobId,
    status: applicant.status,
    date: new Date().toLocaleString(),
  });

  await workbook.xlsx.writeFile(filePath);
}

module.exports = saveToExcel;