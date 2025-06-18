// controllers/prescriptionController.js
const PrescriptionModel = require('../models/prescriptionModel');

const PrescriptionController = {
  // Get prescriptions by patient ID
  getPrescriptionsByPatientId: async (req, res) => {
    try {
      const { patientId } = req.params;
      const prescriptions = await PrescriptionModel.getPrescriptionsByPatientId(patientId);
      res.status(200).json(prescriptions);
    } catch (error) {
      console.error('Error getting prescriptions:', error);
      res.status(500).json({ error: 'Failed to retrieve prescriptions' });
    }
  },

  // Get prescriptions by pharmacy ID
  getPrescriptionsByPharmacyId: async (req, res) => {
    try {
      const { pharmacyId } = req.params;
      const prescriptions = await PrescriptionModel.getPrescriptionsByPharmacyId(pharmacyId);
      res.status(200).json(prescriptions);
    } catch (error) {
      console.error('Error getting pharmacy prescriptions:', error);
      res.status(500).json({ error: 'Failed to retrieve pharmacy prescriptions' });
    }
  },

  // Get most prescribed medicines
  getMostPrescribedMedicines: async (req, res) => {
    try {
      const medicines = await PrescriptionModel.getMostPrescribedMedicines();
      res.status(200).json(medicines);
    } catch (error) {
      console.error('Error getting most prescribed medicines:', error);
      res.status(500).json({ error: 'Failed to retrieve prescription statistics' });
    }
  },

  getAllPresMedicine: async (req, res) => {
    try {
      const medicines = await PrescriptionModel.functionReq();
      res.status(200).json(medicines);
    } catch (error) {
      console.error('Error getting most prescribed medicines:', error);
      res.status(500).json({ error: 'Failed to retrieve prescription statistics' });
    }
  },

  //no of time prescribed medicine
  getPrescriptionCounts: async (req, res) => {
    try {
      const prescriptionCounts = await PrescriptionModel.getMedicinePrescriptionCounts();
      res.status(200).json(prescriptionCounts); // Send the data as JSON
    } catch (error) {
      console.error("Error in controller:", error);
      res.status(500).json({ message: "Failed to get medicine prescription counts", error: error.message });
    }
  },
  
  // Create new prescription
  createPrescription: async (req, res) => {
    try {
      const prescriptionData = req.body;
      const newPrescription = await PrescriptionModel.createPrescription(prescriptionData);
      res.status(201).json(newPrescription);
    } catch (error) {
      console.error('Error creating prescription:', error);
      res.status(500).json({ error: 'Failed to create prescription' });
    }
  }
};

module.exports = PrescriptionController;