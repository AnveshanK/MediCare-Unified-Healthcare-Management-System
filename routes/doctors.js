// routes/doctorRoutes.js
const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

// GET all doctors
router.get('/', doctorController.getAllDoctors);

// GET doctors with most appointments (for analytics)
router.get('/most-appointments', doctorController.getDoctorsWithMostAppointments);

// GET a specific doctor by ID
router.get('/:id', doctorController.getDoctorById);

// GET doctors by hospital
router.get('/hospital/:hospitalId', doctorController.getDoctorsByHospital);

// GET appointments for a doctor
router.get('/:id/appointments', doctorController.getDoctorAppointments);

// POST create a new doctor
router.post('/', doctorController.createDoctor);

// POST associate a doctor with a hospital
router.post('/associate-hospital', doctorController.associateDoctorWithHospital);

// PUT update a doctor
router.put('/:id', doctorController.updateDoctor);

// DELETE a doctor
router.delete('/:id', doctorController.deleteDoctor);

module.exports = router;