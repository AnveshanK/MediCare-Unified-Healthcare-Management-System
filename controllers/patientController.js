// controllers/patientController.js
const PatientModel = require('../models/patientModel');

const PatientController = {
  // Get all patients
  getAllPatients: async (req, res) => {
    try {
      const patients = await PatientModel.getAllPatients();
      res.status(200).json(patients);
    } catch (error) {
      console.error('Error getting patients:', error);
      res.status(500).json({ error: 'Failed to retrieve patients' });
    }
  },

  // Get patient by ID
  getPatientById: async (req, res) => {
    try {
      const { patientId } = req.params;
      const patient = await PatientModel.getPatientById(patientId);
      
      if (!patient) {
        return res.status(404).json({ error: 'Patient not found' });
      }
      
      res.status(200).json(patient);
    } catch (error) {
      console.error('Error getting patient:', error);
      res.status(500).json({ error: 'Failed to retrieve patient' });
    }
  },

  // Get medical history
  getMedicalHistory: async (req, res) => {
    try {
      const { patientId } = req.params;
      const medicalHistory = await PatientModel.getMedicalHistory(patientId);
      res.status(200).json(medicalHistory);
    } catch (error) {
      console.error('Error getting medical history:', error);
      res.status(500).json({ error: 'Failed to retrieve medical history' });
    }
  },

  // Get patient details
  getPatientDetails: async (req, res) => {
    try {
      const { patientId } = req.params;
      const patientDetails = await PatientModel.getPatientDetails(patientId);
      res.status(200).json(patientDetails);
    } catch (error) {
      console.error('Error getting patient details:', error);
      res.status(500).json({ error: 'Failed to retrieve patient details' });
    }
  },


  //model to get all patient active count
  getActivePatientCount : async (req, res) => {
    try {
      const result = await PatientModel.getActivePatientCount();
      res.status(200).json(result);  // should return { active_patient_count: N }
    } catch (error) {
      console.error('Error fetching active patient count:', error);
      res.status(500).json({ error: 'Failed to get active patient count' });
    }
  },

  // Get patient-doctor interactions
  getPatientDoctorInteractions: async (req, res) => {
    try {
      const { patientId } = req.params;
      const interactions = await PatientModel.getPatientDoctorInteractions(patientId);
      res.status(200).json(interactions);
    } catch (error) {
      console.error('Error getting patient-doctor interactions:', error);
      res.status(500).json({ error: 'Failed to retrieve interactions' });
    }
  },

  // Get patients with MRI and prescriptions
  getPatientsWithMRIAndPrescription: async (req, res) => {
    try {
      const patients = await PatientModel.getPatientsWithMRIAndPrescription();
      res.status(200).json(patients);
    } catch (error) {
      console.error('Error retrieving patients with MRI and prescription:', error);
      res.status(500).json({ error: 'Failed to retrieve data' });
    }
  }
};

module.exports = PatientController;
