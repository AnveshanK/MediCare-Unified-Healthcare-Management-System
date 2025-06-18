// controllers/labtestController.js
const LabTestModel = require('../models/labtestModel');

const LabTestController = {
  // Get lab tests by patient ID and doctor ID
  getLabTestsByPatientId: async (req, res) => {
    try {
      const { patientId, doctorId } = req.params;
      const labTests = await LabTestModel.getLabTestsByPatientId(patientId, doctorId);
      res.status(200).json(labTests);
    } catch (error) {
      console.error('Error getting lab tests:', error);
      res.status(500).json({ error: 'Failed to retrieve lab tests' });
    }
  },

  // Get test requests by lab ID
  getTestRequestsByLabId: async (req, res) => {
    try {
      const { labId } = req.params;
      const testRequests = await LabTestModel.getTestRequestsByLabId(labId);
      res.status(200).json(testRequests);
    } catch (error) {
      console.error('Error getting test requests:', error);
      res.status(500).json({ error: 'Failed to retrieve test requests' });
    }
  },

  // Upload test report
  uploadTestReport: async (req, res) => {
    try {
      const testData = req.body;
      const newTest = await LabTestModel.uploadTestReport(testData);
      res.status(201).json(newTest);
    } catch (error) {
      console.error('Error uploading test report:', error);
      res.status(500).json({ error: 'Failed to upload test report' });
    }
  },

  // Get lab reports by lab ID
  getLabReportsByLabId: async (req, res) => {
    try {
      const { labId } = req.params;
      const labReports = await LabTestModel.getLabReportsByLabId(labId);
      res.status(200).json(labReports);
    } catch (error) {
      console.error('Error getting lab reports:', error);
      res.status(500).json({ error: 'Failed to retrieve lab reports' });
    }
  },

  getTestsByLabId: async (req, res) => {
    try {
      const labId = req.params.labId;
      const tests = await LabTestModel.getTestsByLabId(labId);
      res.status(200).json(tests);
    } catch (err) {
      console.error('Error fetching lab tests:', err);
      res.status(500).json({ message: 'Failed to fetch lab tests' });
    }
  },


  //no of testse
    getTotalLabTests: async (req, res) => {
      try {
        const totalTests = await LabTestModel.getTotalLabTests();
        res.status(200).json({ total_lab_tests: totalTests });
      } catch (error) {
        console.error("Error in controller:", error);
        res.status(500).json({ message: "Failed to get total lab tests", error: error.message });
      }
    },

    getTotalLabTests: async (req, res) => {
      try {
        const totalTests = await LabTestModel.getTotalLabTests();
        res.status(200).json({ total_lab_tests: totalTests });
      } catch (error) {
        console.error("Error in controller:", error);
        res.status(500).json({ message: "Failed to get total lab tests", error: error.message });
      }
    },

    getAllLabTestsWithPatientName: async (req, res) => {
      try {
        const labTests = await LabTestModel.getAllLabTests(); // Assuming we have a function in the model
        res.status(200).json(labTests);
      } catch (error) {
        console.error("Error fetching lab tests with patient name:", error);
        res.status(500).json({ message: "Failed to get lab tests with patient name", error: error.message });
      }
    },

    getAllLabTests: async (req, res) => {
      try {
        const tests = await LabTestModel.getAllLabTests();
        res.status(200).json(tests);
      } catch (err) {
        console.error('Error fetching lab tests:', err);
        res.status(500).json({ message: 'Error fetching lab tests' });
      }
    },

  // Get average test results
  getAverageTestResults: async (req, res) => {
    try {
      const { patientId } = req.params;
      const averageResults = await LabTestModel.getAverageTestResults(patientId);
      res.status(200).json(averageResults);
    } catch (error) {
      console.error('Error getting average test results:', error);
      res.status(500).json({ error: 'Failed to retrieve average test results' });
    }
  }
};

module.exports = LabTestController;