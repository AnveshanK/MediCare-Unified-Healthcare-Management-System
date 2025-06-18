// routes/reports.js
const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

// Get system report
router.get('/system', reportController.getSystemReport);

// Get monthly prescription analysis
router.get('/monthly-prescription-analysis', reportController.getMonthlyPrescriptionAnalysis);

module.exports = router;