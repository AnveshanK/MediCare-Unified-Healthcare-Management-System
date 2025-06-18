// models/reportModel.js
const db = require('../config/db');

const ReportModel = {
  // Query 18: Overall System Report
  getSystemReport: async () => {
    try {
      const query = `
        SELECT 'Appointments' AS Category, COUNT(*) AS Total FROM Appointment
        UNION ALL
        SELECT 'Prescriptions', COUNT(*) FROM Prescription
        UNION ALL
        SELECT 'Lab Tests', COUNT(*) FROM Labtest
        UNION ALL
        SELECT 'Reimbursements', COUNT(*) FROM Reimbursement`;
      const result = await db.query(query);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  // Query 19: Data Analytics - Monthly analysis of prescriptions
  getMonthlyPrescriptionAnalysis: async () => {
    try {
      const query = `
        SELECT TO_CHAR(A.Date_Of_Appointment, 'Month') AS Month, 
              COUNT(PP.Prescription_Id) AS TotalPrescriptions
        FROM Appointment A
        LEFT JOIN Patient_Presc PP ON A.Patient_Id = PP.Patient_Id
        LEFT JOIN Prescription P ON PP.Prescription_Id = P.Prescription_Id
        GROUP BY Month
        ORDER BY MIN(A.Date_Of_Appointment)`;
      const result = await db.query(query);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = ReportModel;