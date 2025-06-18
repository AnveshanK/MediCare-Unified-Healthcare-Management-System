// routes/prescriptions.js
const express = require('express');
const router = express.Router();
const prescriptionController = require('../controllers/prescriptionController');
router.get('/prescription', prescriptionController.getAllPresMedicine)

router.get('/prescription/count', prescriptionController.getPrescriptionCounts)

// Get prescriptions by patient ID
router.get('/patient/:patientId', prescriptionController.getPrescriptionsByPatientId);

// Get prescriptions by pharmacy ID
router.get('/pharmacy/:pharmacyId', prescriptionController.getPrescriptionsByPharmacyId);

// Get most prescribed medicines
router.get('/statistics/most-prescribed', prescriptionController.getMostPrescribedMedicines);


// Create new prescription
router.post('/', prescriptionController.createPrescription);

module.exports = router;