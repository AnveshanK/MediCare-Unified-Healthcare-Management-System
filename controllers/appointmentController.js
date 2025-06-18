// controllers/appointmentController.js
const AppointmentModel = require('../models/appointmentModel');

const AppointmentController = {
  // Get appointments by patient ID
  getAppointmentsByPatientId: async (req, res) => {
    try {
      const { patientId } = req.params;
      const appointments = await AppointmentModel.getAppointmentsByPatientId(patientId);
      res.status(200).json(appointments);
    } catch (error) {
      console.error('Error getting appointments:', error);
      res.status(500).json({ error: 'Failed to retrieve appointments' });
    }
  },

  getAppointmentsByDoctorId: async (req, res) => {
    try {
      const { doctorId } = req.params;
      const { date } = req.query;
      
      const appointments = await AppointmentModel.getAppointmentsByDoctorId(doctorId, date);
      res.status(200).json(appointments);
    } catch (error) {
      console.error('Error getting appointments for doctor:', error);
      res.status(500).json({ error: 'Failed to retrieve appointments' });
    }
  },

  // Delete appointment
  deleteAppointment: async (req, res) => {
    try {
      const { appointmentId, patientId } = req.params;
      const deletedAppointment = await AppointmentModel.deleteAppointment(appointmentId, patientId);
      
      if (!deletedAppointment) {
        return res.status(404).json({ error: 'Appointment not found' });
      }
      
      res.status(200).json({ message: 'Appointment deleted successfully', appointment: deletedAppointment });
    } catch (error) {
      console.error('Error deleting appointment:', error);
      res.status(500).json({ error: 'Failed to delete appointment' });
    }
  },

  // Update appointment
  updateAppointment: async (req, res) => {
    try {
      const { appointmentId, patientId } = req.params;
      const { date, status } = req.body;
      
      const updatedAppointment = await AppointmentModel.updateAppointment(appointmentId, patientId, date, status);
      
      if (!updatedAppointment) {
        return res.status(404).json({ error: 'Appointment not found' });
      }
      
      res.status(200).json(updatedAppointment);
    } catch (error) {
      console.error('Error updating appointment:', error);
      res.status(500).json({ error: 'Failed to update appointment' });
    }
  },

  // Get appointments by doctor ID
  

  // Get doctors with most appointments
  getDoctorsWithMostAppointments: async (req, res) => {
    try {
      const doctors = await AppointmentModel.getDoctorsWithMostAppointments();
      res.status(200).json(doctors);
    } catch (error) {
      console.error('Error getting doctors with most appointments:', error);
      res.status(500).json({ error: 'Failed to retrieve doctors statistics' });
    }
  },

  //all status
  getAppointmentCounts: async (req, res) => {
    try {
      const cancelled = await AppointmentModel.getTotalAppointmentsByStatus('Cancelled');
      const scheduled = await AppointmentModel.getTotalAppointmentsByStatus('Scheduled');
      const completed = await AppointmentModel.getTotalAppointmentsByStatus('Completed');

      const counts = {
        cancelled: cancelled,
        scheduled: scheduled,
        completed: completed,
      };

      res.status(200).json(counts);
    } catch (error) {
      console.error("Error in appointment controller:", error);
      res.status(500).json({ message: "Failed to get appointment counts", error: error.message });
    }
  },


  // Create new appointment
  createAppointment: async (req, res) => {
    try {
      const appointmentData = req.body;
      const newAppointment = await AppointmentModel.createAppointment(appointmentData);
      res.status(201).json(newAppointment);
    } catch (error) {
      console.error('Error creating appointment:', error);
      res.status(500).json({ error: 'Failed to create appointment' });
    }
  }
};

module.exports = AppointmentController;
