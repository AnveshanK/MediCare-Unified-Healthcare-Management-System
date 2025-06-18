// controllers/doctorController.js
const Doctor = require('../models/doctorModel');

// Controller methods for Doctor
const doctorController = {
  // Get all doctors
  getAllDoctors: async (req, res) => {
    try {
      const doctors = await Doctor.getAllDoctors();
      res.status(200).json(doctors);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      res.status(500).json({ message: 'Error fetching doctors', error: error.message });
    }
  },

  // Get a doctor by ID
  getDoctorById: async (req, res) => {
    try {
      const { id } = req.params;
      const doctor = await Doctor.getDoctorById(id);
      
      if (!doctor) {
        return res.status(404).json({ message: 'Doctor not found' });
      }
      
      res.status(200).json(doctor);
    } catch (error) {
      console.error('Error fetching doctor by ID:', error);
      res.status(500).json({ message: 'Error fetching doctor', error: error.message });
    }
  },

  // Get doctors working at a specific hospital
  getDoctorsByHospital: async (req, res) => {
    try {
      const { hospitalId } = req.params;
      const doctors = await Doctor.getDoctorsByHospital(hospitalId);
      res.status(200).json(doctors);
    } catch (error) {
      console.error('Error fetching doctors by hospital:', error);
      res.status(500).json({ message: 'Error fetching doctors by hospital', error: error.message });
    }
  },

  // Get appointments for a doctor
  getDoctorAppointments: async (req, res) => {
    try {
      const { id } = req.params;
      const { date, patientName, status } = req.query;
      
      let appointments = await Doctor.getDoctorAppointments(id, date);
      
      // Apply filters if provided (these would need to be implemented in frontend)
      if (patientName) {
        appointments = appointments.filter(a => 
          a.Patient_Name.toLowerCase().includes(patientName.toLowerCase())
        );
      }
      
      if (status) {
        appointments = appointments.filter(a => a.status === status);
      }
      
      res.status(200).json(appointments);
    } catch (error) {
      console.error('Error fetching doctor appointments:', error);
      res.status(500).json({ message: 'Error fetching appointments', error: error.message });
    }
  },

  // Get doctors with most appointments
  getDoctorsWithMostAppointments: async (req, res) => {
    try {
      const { limit } = req.query;
      const doctors = await Doctor.getDoctorsWithMostAppointments(limit || 10);
      res.status(200).json(doctors);
    } catch (error) {
      console.error('Error fetching doctors with most appointments:', error);
      res.status(500).json({ message: 'Error fetching statistics', error: error.message });
    }
  },

  // Create a new doctor
  createDoctor: async (req, res) => {
    try {
      const doctorData = req.body;
      const newDoctor = await Doctor.createDoctor(doctorData);
      res.status(201).json(newDoctor);
    } catch (error) {
      console.error('Error creating doctor:', error);
      res.status(500).json({ message: 'Error creating doctor', error: error.message });
    }
  },

  // Update a doctor
  updateDoctor: async (req, res) => {
    try {
      const { id } = req.params;
      const doctorData = req.body;
      const updatedDoctor = await Doctor.updateDoctor(id, doctorData);
      
      if (!updatedDoctor) {
        return res.status(404).json({ message: 'Doctor not found' });
      }
      
      res.status(200).json(updatedDoctor);
    } catch (error) {
      console.error('Error updating doctor:', error);
      res.status(500).json({ message: 'Error updating doctor', error: error.message });
    }
  },

  // Delete a doctor
  deleteDoctor: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedDoctor = await Doctor.deleteDoctor(id);
      
      if (!deletedDoctor) {
        return res.status(404).json({ message: 'Doctor not found' });
      }
      
      res.status(200).json({ message: 'Doctor deleted successfully', doctor: deletedDoctor });
    } catch (error) {
      console.error('Error deleting doctor:', error);
      res.status(500).json({ message: 'Error deleting doctor', error: error.message });
    }
  },

  // Associate a doctor with a hospital
  associateDoctorWithHospital: async (req, res) => {
    try {
      const { doctorId, hospitalId } = req.body;
      const association = await Doctor.associateDoctorWithHospital(doctorId, hospitalId);
      res.status(201).json(association);
    } catch (error) {
      console.error('Error associating doctor with hospital:', error);
      res.status(500).json({ message: 'Error creating association', error: error.message });
    }
  }
};

module.exports = doctorController;