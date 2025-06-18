// models/labtestModel.js
const db = require('../config/db');

const LabTestModel = {
  // Query 6: View lab test reports for a patient
  getLabTestsByPatientId: async (patientId, doctorId) => {
    try {
      const query = `
        SELECT L.Test_Id, L.Test_Type, L.Result
        FROM LabTest L
        Join Doc_Pres_Test DP ON L.Test_Id = DP.Test_Id
        WHERE DP.Doctor_Id = $1 AND L.Patient_Id = $2`;
      const result = await db.query(query, [doctorId, patientId]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  // Query 13: View Test Requests
  getTestRequestsByLabId: async (labId) => {
    try {
      const query = `
        SELECT T.Test_Id, T.Test_Type, P.Name AS Patient_Name
        FROM Labtest T
        JOIN Conduct_Test C ON T.Test_Id = C.Test_Id
        JOIN Patient P ON T.Patient_Id = P.Patient_Id
        WHERE C.Lab_Id = $1`;
      const result = await db.query(query, [labId]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

//get all test 
getAllLabTests: async () => {
  try {
    const query = `
      SELECT
        lt.test_id,
        lt.test_type,
        lt.result,
        p.name
      FROM
        labtest lt
      INNER JOIN
        patient p ON lt.patient_id = p.patient_id
    `;
    const result = await db.query(query);
    return result.rows;
  } catch (error) {
    console.error('Error in LabTestModel.getAllLabTests:', error);
    throw error;
  }
},
  // Query 14: Upload Test Reports
  uploadTestReport: async (testData) => {
    try {
      const { test_id, test_type, result, patient_id } = testData;
      const query = `
        INSERT INTO labtest (test_id, test_type, result, patient_id) 
        VALUES ($1, $2, $3, $4)
        RETURNING *`;
      const result1 = await db.query(query, [test_id, test_type, result, patient_id]);
      return result1.rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Query 15: View Reports
  getLabReportsByLabId: async (labId) => {
    try {
      const query = `
        SELECT T.Test_Id, T.Test_Type, T.Result
        FROM Labtest T
        JOIN Conduct_Test C ON T.Test_Id = C.Test_Id
        WHERE C.Lab_Id = $1`;
      const result = await db.query(query, [labId]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  //no of tests
  getTotalLabTests: async () => {
    try {
      const query = `SELECT COUNT(*) AS total_tests FROM labtest`;
      const result = await db.query(query);
      return parseInt(result.rows[0].total_tests); // Parse the count to integer
    } catch (error) {
      console.error("Error getting total lab tests:", error);
      throw error;
    }
  },

  getTestsByLabId: async (labId) => {
    const query = `
      SELECT 
        T.Test_Id, 
        T.Test_Type, 
        P.Name AS Patient_Name
      FROM 
        Labtest T
      JOIN 
        Conduct_Test C ON T.Test_Id = C.Test_Id
      JOIN 
        Patient P ON T.Patient_Id = P.Patient_Id
      WHERE 
        C.Lab_Id = $1
    `;
    const result = await db.query(query, [labId]);
    return result.rows;
  },

  // Query 22: Average Test Results
  getAverageTestResults: async (patientId) => {
    try {
      const query = `
        SELECT Test_Type, 
              AVG(CASE 
                    WHEN Result = 'Positive' THEN 1
                    WHEN Result = 'Negative' THEN 0
                    WHEN Result = 'Inconclusive' THEN 0.5
                  END) AS AverageResult
        FROM Labtest
        WHERE Patient_Id = $1
        GROUP BY Test_Type`;
      const result = await db.query(query, [patientId]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = LabTestModel;