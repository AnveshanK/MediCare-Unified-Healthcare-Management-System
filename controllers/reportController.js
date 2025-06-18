// controllers/reportController.js
const ReportModel = require('../models/reportModel');

const ReportController = {
  // Get system report
  getSystemReport: async (req, res) => {
    try {
      const systemReport = await ReportModel.getSystemReport();
      res.status(200).json(systemReport);
    } catch (error) {
      console.error('Error getting system report:', error);
      res.status(500).json({ error: 'Failed to retrieve system report' });
    }
  },

  // Get monthly prescription analysis
  getMonthlyPrescriptionAnalysis: async (req, res) => {
    try {
      const monthlyAnalysis = await ReportModel.getMonthlyPrescriptionAnalysis();
      res.status(200).json(monthlyAnalysis);
    } catch (error) {
      console.error('Error getting monthly prescription analysis:', error);
      res.status(500).json({ error: 'Failed to retrieve monthly analysis' });
    }
  }
};

module.exports = ReportController;
