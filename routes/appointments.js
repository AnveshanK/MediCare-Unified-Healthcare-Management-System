// routes/appointments.js
const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

router.get('/counts', appointmentController.getAppointmentCounts); // GET /api/appointments/counts

// Get appointments by patient ID
router.get('/patient/:patientId', appointmentController.getAppointmentsByPatientId);

// Get appointments by doctor ID
router.get('/doctor/:doctorId', appointmentController.getAppointmentsByDoctorId);

// Get doctors with most appointments
router.get('/statistics/most-appointments', appointmentController.getDoctorsWithMostAppointments);

// Create new appointment
router.post('/', appointmentController.createAppointment);

// Update appointment
router.put('/:appointmentId/patient/:patientId', appointmentController.updateAppointment);

// Delete appointment
router.delete('/:appointmentId/patient/:patientId', appointmentController.deleteAppointment);

module.exports = router;