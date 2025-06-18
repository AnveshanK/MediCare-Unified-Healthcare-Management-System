// routes/patients.js
const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

// Get all patients
router.get('/', patientController.getAllPatients);

//active patient count
router.get('/active', patientController.getActivePatientCount)

// Get patients with MRI and prescription
router.get('/mri-with-prescription', patientController.getPatientsWithMRIAndPrescription);
// Get patient by ID
router.get('/:patientId', patientController.getPatientById);

// Get medical history
router.get('/:patientId/medical-history', patientController.getMedicalHistory);

// Get patient details
router.get('/:patientId/details', patientController.getPatientDetails);

// Get patient-doctor interactions
router.get('/:patientId/interactions', patientController.getPatientDoctorInteractions);




module.exports = router;
