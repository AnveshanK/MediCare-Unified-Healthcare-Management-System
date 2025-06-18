// models/appointmentModel.js
const db = require('../config/db');

const AppointmentModel = {
  // Query 1: View Appointments for a specific patient
  getAppointmentsByPatientId: async (patientId) => {
    try {
      const query = `
        SELECT * 
        FROM Appointment 
        WHERE patient_id = $1
        ORDER BY Date_Of_Appointment`;
      const result = await db.query(query, [patientId]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  // Query 2: Delete an appointment
  deleteAppointment: async (appointmentId, patientId) => {
    try {
      const query = `
        DELETE FROM Appointment 
        WHERE appointment_id = $1 AND patient_id = $2
        RETURNING *`;
      const result = await db.query(query, [appointmentId, patientId]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Query 2: Update appointment (reschedule)
  updateAppointment: async (appointmentId, patientId, date, status) => {
    try {
      const query = `
        UPDATE Appointment
        SET Date_Of_Appointment = $3, Status = $4
        WHERE appointment_id = $1 AND patient_id = $2
        RETURNING *`;
      const result = await db.query(query, [appointmentId, patientId, date, status]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Query 5: Get upcoming appointments for a doctor
  getAppointmentsByDoctorId: async (doctorId, date = '2000-01-01') => {
    try {
      const query = `
        SELECT *
        FROM Appointment
        WHERE Doctor_Id = $1 AND Date_Of_Appointment >= $2
        ORDER BY Date_Of_Appointment`;
      const result = await db.query(query, [doctorId, date]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },
  
  // Query 21: Find Doctors with Most Appointments
  getDoctorsWithMostAppointments: async () => {
    try {
      const query = `
        SELECT D.Name AS DoctorName, COUNT(A.Appointment_Id) AS AppointmentCount
        FROM Doctor D
        JOIN Appointment A ON D.Doctor_Id = A.Doctor_Id
        GROUP BY D.Name
        ORDER BY AppointmentCount DESC`;
      const result = await db.query(query);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },
  //status
  getTotalAppointmentsByStatus: async (status) => {
    try {
      const query = `
        SELECT COUNT(*) AS total_appointments
        FROM appointment
        WHERE status = $1
      `;
      const result = await db.query(query, [status]);
      return parseInt(result.rows[0].total_appointments); // Parse the count to integer
    } catch (error) {
      console.error(`Error getting total ${status} appointments:`, error);
      throw error;
    }
  },
  
  // Create a new appointment
  createAppointment: async (appointmentData) => {
    try {
      const { patient_id, doctor_id, date_of_appointment, status } = appointmentData;
      const query = `
        INSERT INTO Appointment (patient_id, doctor_id, date_of_appointment, status)
        VALUES ($1, $2, $3, $4)
        RETURNING *`;
      const result = await db.query(query, [patient_id, doctor_id, date_of_appointment, status]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
};

module.exports = AppointmentModel;
