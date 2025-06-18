// models/patientModel.js
const db = require('../config/db');

const PatientModel = {
  // Query 4: View Medical History for a patient
  getMedicalHistory: async (patientId) => {
    try {
      const query = `
        SELECT L.Test_Id, L.Test_Type, L.Result, P.Prescription_Id, P.Dosage, P.Medicines, P.Duration
        FROM Labtest L
        LEFT JOIN Patient_Presc PP ON L.Patient_Id = PP.Patient_Id
        LEFT JOIN Prescription P ON PP.Prescription_Id = P.Prescription_Id
        WHERE L.Patient_Id = $1`;
      const result = await db.query(query, [patientId]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  // Query 7: View Patient Details
  getPatientDetails: async (patientId) => {
    try {
      const query = `
        SELECT P.Name AS Patient_Name,L.test_type, L.Test_Id, L.Result, PR.Prescription_Id, PR.Medicines
        FROM Patient P
        LEFT JOIN Labtest L ON P.Patient_Id = L.Patient_Id
        LEFT JOIN Patient_Presc PP ON P.Patient_Id = PP.Patient_Id
        LEFT JOIN Prescription PR ON PP.Prescription_Id = PR.Prescription_Id
        WHERE P.Patient_Id = $1`;
      const result = await db.query(query, [patientId]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  //all active patient model
  getActivePatientCount: async () => {
    try {
      const query = `
      SELECT COUNT(DISTINCT patient_id) AS active_patient_count
      FROM appointment
      WHERE status = 'Scheduled'
    `;
      const result = await db.query(query);
      return result.rows[0];  // returns: { active_patient_count: N }
    } catch (error) {
      console.error('Error getting active patients:', error);
      throw error;
    }
  },


  // Query 23: Patient-Doctor Interaction History
  getPatientDoctorInteractions: async (patientId) => {
    try {
      const query = `
        SELECT
          A.patient_id,
          A.doctor_id,
          A.date_of_appointment,
          A.status AS appointment_status,
          (SELECT STRING_AGG(P.medicines, ', ') 
           FROM Patient_Presc PP 
           JOIN Prescription P ON PP.prescription_id = P.prescription_id 
           WHERE PP.patient_id = A.patient_id) AS prescribed_medicines,
          (SELECT STRING_AGG(P.dosage, ', ') 
           FROM Patient_Presc PP 
           JOIN Prescription P ON PP.prescription_id = P.prescription_id 
           WHERE PP.patient_id = A.patient_id) AS dosage,
          (SELECT STRING_AGG(P.duration, ', ') 
           FROM Patient_Presc PP 
           JOIN Prescription P ON PP.prescription_id = P.prescription_id 
           WHERE PP.patient_id = A.patient_id) AS duration,
          (SELECT STRING_AGG(LT.test_type || ' (' || LT.result || ')', ', ') 
           FROM LabTest LT 
           WHERE LT.patient_id = A.patient_id) AS test_results
        FROM Appointment A
        WHERE A.patient_id = $1
        ORDER BY A.date_of_appointment DESC`;
      const result = await db.query(query, [patientId]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  // Query 24: Retrieve patient details who had an MRI test and were prescribed medicines
  getPatientsWithMRIAndPrescription: async () => {
    try {
      const query = `
        SELECT P.patient_id, P.name AS patient_name, PR.prescription_id
        FROM Patient P
        JOIN Patient_Presc PR ON P.patient_id = PR.patient_id
        WHERE P.patient_id IN (
          SELECT L.patient_id 
          FROM Labtest L 
          WHERE L.test_type = 'MRI'
        )`;
      const result = await db.query(query);
      return result.rows;
    } catch (error) {
      console.error("Error fetching patients with MRI and prescription:", error); // Log the error for debugging
      throw error;
    }
  },

  // Get all patients
  // getAllPatients: async () => {
  //   try {
  //     const query = 'SELECT * FROM Patient';
  //     const result = await db.query(query);
  //     return result.rows;
  //   } catch (error) {
  //     throw error;
  //   }
  // },

  getAllPatients: async () => {
    try {
      const result = await db.query('SELECT * FROM Patient');
      console.log('DB result:', result.rows); // 👈 Add this
      return result.rows;
    } catch (error) {
      console.error('DB error in getAllPatients:', error); // 👈 Add this too
      throw error;
    }
  },
  


  // Get patient by ID
  getPatientById: async (patientId) => {
    try {
      const query = 'SELECT * FROM Patient WHERE patient_id = $1';
      const result = await db.query(query, [patientId]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
};

module.exports = PatientModel;