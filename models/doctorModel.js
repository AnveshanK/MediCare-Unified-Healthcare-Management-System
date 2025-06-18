// models/doctor.js
const db = require('../config/db');

class Doctor {
  // Get all doctors
  static async getAllDoctors() {
    try {
      const result = await db.query('SELECT * FROM Doctor');
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  // Get a doctor by ID
  static async getDoctorById(doctorId) {
    try {
      const result = await db.query('SELECT * FROM Doctor WHERE Doctor_Id = $1', [doctorId]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Get doctors working at a specific hospital
  static async getDoctorsByHospital(hospitalId) {
    try {
      const query = `
        SELECT D.Doctor_Id, D.Name, D.Specialization, D.Email, D.Phone_Number
        FROM Doctor D
        JOIN Doc_Hospital DH ON D.Doctor_Id = DH.Doctor_Id
        JOIN Hospital H ON DH.Hospital_Id = H.Hospital_Id
        WHERE H.Hospital_Id = $1
      `;
      const result = await db.query(query, [hospitalId]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  // Get upcoming appointments for a doctor
  static async getDoctorAppointments(doctorId, date = null) {
    try {
      let query = `
        SELECT A.*, P.Name as Patient_Name
        FROM Appointment A
        JOIN Patient P ON A.Patient_Id = P.Patient_Id
        WHERE A.Doctor_Id = $1
      `;

      const params = [doctorId];

      if (date) {
        query += ' AND A.Date_Of_Appointment >= $2';
        params.push(date);
      } else {
        query += ' AND A.Date_Of_Appointment >= CURRENT_DATE';
      }

      query += ' ORDER BY A.Date_Of_Appointment ASC';

      const result = await db.query(query, params);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  // Get doctors with most appointments (for analytics)
  static async getDoctorsWithMostAppointments(limit = 10) {
    try {
      const query = `
        SELECT D.Doctor_Id, D.Name, COUNT(A.Appointment_Id) AS AppointmentCount
        FROM Doctor D
        JOIN Appointment A ON D.Doctor_Id = A.Doctor_Id
        GROUP BY D.Doctor_Id, D.Name
        ORDER BY AppointmentCount DESC
        LIMIT $1
      `;
      const result = await db.query(query, [limit]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  // Create a new doctor
  static async createDoctor(doctorData) {
    try {
      const { name, specialization, email, phone_number } = doctorData;
      const query = `
        INSERT INTO Doctor (Name, Specialization, Email, Phone_Number)
        VALUES ($1, $2, $3, $4)
        RETURNING *
      `;
      const result = await db.query(query, [name, specialization, email, phone_number]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Update a doctor
  static async updateDoctor(doctorId, doctorData) {
    try {
      const { name, specialization, email, phone_number } = doctorData;
      const query = `
        UPDATE Doctor
        SET Name = $1, Specialization = $2, Email = $3, Phone_Number = $4
        WHERE Doctor_Id = $5
        RETURNING *
      `;
      const result = await db.query(query, [name, specialization, email, phone_number, doctorId]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Delete a doctor
  static async deleteDoctor(doctorId) {
    try {
      const result = await db.query('DELETE FROM Doctor WHERE Doctor_Id = $1 RETURNING *', [doctorId]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Associate a doctor with a hospital
  static async associateDoctorWithHospital(doctorId, hospitalId) {
    try {
      const query = `
        INSERT INTO Doc_Hospital (Doctor_Id, Hospital_Id)
        VALUES ($1, $2)
        RETURNING *
      `;
      const result = await db.query(query, [doctorId, hospitalId]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Doctor;