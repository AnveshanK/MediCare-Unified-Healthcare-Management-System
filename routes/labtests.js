// routes/labtests.js
const express = require('express');
const router = express.Router();
const labtestController = require('../controllers/labtestController');

router.get('/no', labtestController.getTotalLabTests)

router.get('/all', labtestController.getAllLabTests)

// Upload test report
router.post('/upload', labtestController.uploadTestReport);

router.get('/lab/:labId', labtestController.getTestsByLabId);

// Get lab tests by patient ID and doctor ID
router.get('/patient/:patientId/doctor/:doctorId', labtestController.getLabTestsByPatientId);

// Get test requests by lab ID
router.get('/requests/lab/:labId', labtestController.getTestRequestsByLabId);

// Get lab reports by lab ID
router.get('/reports/lab/:labId', labtestController.getLabReportsByLabId);

// Get average test results
router.get('/average-results/patient/:patientId', labtestController.getAverageTestResults);



module.exports = router;