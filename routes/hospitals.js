// routes/hospitals.js
const express = require('express');
const router = express.Router();
const hospitalController = require('../controllers/hospitalController');

// Get all hospitals
router.get('/', hospitalController.getAllHospitals);

// Get doctors by hospital ID
router.get('/:hospitalId/doctors', hospitalController.getDoctorsByHospitalId);

// Get labs by doctor ID
router.get('/doctor/:doctorId/labs', hospitalController.getLabsByDoctorId);

module.exports = router; 