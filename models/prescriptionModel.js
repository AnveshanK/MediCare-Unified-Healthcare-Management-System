// models/prescriptionModel.js
const db = require('../config/db');

const PrescriptionModel = {
  // Query 3: View Prescription for a specific patient
  getPrescriptionsByPatientId: async (patientId) => {
    try {
      const query = `
        SELECT P.prescription_id, P.dosage, P.medicines, P.duration
        FROM prescription P
        JOIN patient_presc PP ON P.prescription_id = PP.prescription_id
        WHERE PP.patient_id = $1`;
      const result = await db.query(query, [patientId]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  // Query 8: View Prescription Requests for a pharmacy
  getPrescriptionsByPharmacyId: async (pharmacyId) => {
    try {
      const query = `
        SELECT P.Prescription_Id, P.Medicines, P.Duration
        FROM Prescription P
        JOIN Pharm_Presc_Updated PP ON P.Prescription_Id = PP.Prescription_Id
        WHERE PP.Pharmacy_Id = $1`;
      const result = await db.query(query, [pharmacyId]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  // Query 20: Monthly Prescription Report
  getMostPrescribedMedicines: async () => {
    try {
      const query = `
        SELECT M.Name, COUNT(*) AS PrescriptionCount
        FROM Presc_Medicine PM
        JOIN Medicine M ON PM.Medicine_Id = M.Medicine_Id
        JOIN Prescription P ON PM.Prescription_Id = P.Prescription_Id
        GROUP BY M.Name
        ORDER BY PrescriptionCount DESC`;
      const result = await db.query(query);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },
  functionReq: async () => {
    try {
      const query = `
        SELECT 
  p.prescription_id,
  p.dosage,
  STRING_AGG(m.name, ', ') AS medicine_names,
  p.duration
FROM prescription p
JOIN LATERAL UNNEST(STRING_TO_ARRAY(p.medicines, '-')) AS med_id(id) ON TRUE
JOIN medicine m ON m.medicine_id = med_id.id::INT
GROUP BY p.prescription_id, p.dosage, p.duration;

      `;
      const result = await db.query(query);
      return result.rows;
    } catch (error) {
      console.error('Error getting all prescriptions from database:', error);
      throw error;
    }
  }
  ,
  //no of time prescribed medicines
  getMedicinePrescriptionCounts: async () => {
    try {
      const query = `
        SELECT
          m.name AS medicine_name,
          COUNT(pt.medicine_id) AS prescription_count
        FROM
          presc_medicine pt
        INNER JOIN
          medicine m ON pt.medicine_id = m.medicine_id
        GROUP BY
          pt.medicine_id, m.name
        ORDER BY
          prescription_count DESC;  -- Optional: Order by popularity
      `;

      const result = await db.query(query);
      console.log("Raw database result:", result); // Debugging

      // The result object contains the rows directly in the 'rows' property
      const rows = result.rows;

      console.log("Extracted rows:", rows); // Debugging
      return rows;


    } catch (error) {
      console.error("Error in model:", error);
      throw error; // Re-throw so the controller can handle it
    }
  },


  // Create a new prescription
  createPrescription: async (prescriptionData) => {
    try {
      const { medicines, dosage, duration, patient_id } = prescriptionData;
      
      // First insert the prescription
      const prescInsertQuery = `
        INSERT INTO Prescription (medicines, dosage, duration)
        VALUES ($1, $2, $3)
        RETURNING prescription_id`;
      const prescResult = await db.query(prescInsertQuery, [medicines, dosage, duration]);
      const prescriptionId = prescResult.rows[0].prescription_id;
      
      // Then link it to the patient
      const patientPrescQuery = `
        INSERT INTO Patient_Presc (patient_id, prescription_id)
        VALUES ($1, $2)
        RETURNING *`;
      await db.query(patientPrescQuery, [patient_id, prescriptionId]);
      
      return prescResult.rows[0];
    } catch (error) {
      throw error;
    }
  }
};

module.exports = PrescriptionModel;