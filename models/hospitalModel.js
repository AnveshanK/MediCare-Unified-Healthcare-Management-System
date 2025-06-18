// models/hospitalModel.js
const db = require('../config/db');

const HospitalModel = {
  // Query 16: Hospital-Doctor Association
  getDoctorsByHospitalId: async (hospitalId) => {
    try {
      const query = `
        SELECT D.Name AS Name, H.Name AS HospitalName
        FROM Doctor D
        JOIN Doc_Hospital DH ON D.Doctor_Id = DH.Doctor_Id
        JOIN Hospital H ON DH.Hospital_Id = H.Hospital_Id
        WHERE H.Hospital_Id = $1`;
      const result = await db.query(query, [hospitalId]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  // Query 17: Lab-Doctor Association
  // getLabsByDoctorId: async (doctorId) => {
  //   try {
  //     const query = `
  //       SELECT L.Name AS LabName, D.Name AS DoctorName
  //       FROM Lab L
  //       JOIN Conduct_Test CT ON L.Lab_Id = CT.Lab_Id
  //       JOIN Doc_Pres_Test DT ON CT.Test_Id = DT.Test_Id
  //       JOIN Doctor D ON DT.Doctor_Id = D.Doctor_Id
  //       WHERE D.Doctor_Id = $1`;
  //     const result = await db.query(query, [doctorId]);
  //     return result.rows;
  //   } catch (error) {
  //     throw error;
  //   }
  // },
  getLabsByDoctorId: async (doctorId) => {
    try {
      const query = `
        SELECT L.Lab_Id, L.Name AS LabName, L.contact AS LabContact, CT.Test_Id
        FROM Lab L
        JOIN Conduct_Test CT ON L.Lab_Id = CT.Lab_Id
        JOIN Doc_Pres_Test DT ON CT.Test_Id = DT.Test_Id
        JOIN Doctor D ON DT.Doctor_Id = D.Doctor_Id
        WHERE D.Doctor_Id = $1`;
      const result = await db.query(query, [doctorId]);
      return result.rows;
    } catch (error) {
      console.error("Error fetching labs by doctor ID:", error); // Log the error for debugging
      throw error;
    }
  },
  // Get all hospitals
  getAllHospitals: async () => {
    try {
      const query = 'SELECT * FROM Hospital';
      const result = await db.query(query);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = HospitalModel;