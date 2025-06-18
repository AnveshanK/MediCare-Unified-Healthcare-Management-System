// controllers/pharmacyController.js
const PharmacyModel = require('../models/pharmacyModel');

const PharmacyController = {
  // Check medicine stock
  getMedicineStock: async (req, res) => {
    try {
      const { medicineId } = req.params;
      const stockInfo = await PharmacyModel.getMedicineStock(medicineId);
      res.status(200).json(stockInfo);
    } catch (error) {
      console.error('Error checking medicine stock:', error);
      res.status(500).json({ error: 'Failed to retrieve medicine stock' });
    }
  },

  // Check pharmacy stock
  getPharmacyStock: async (req, res) => {
    try {
      const { pharmacyId } = req.params;
      const pharmacyStock = await PharmacyModel.getPharmacyStock(pharmacyId);
      res.status(200).json(pharmacyStock);
    } catch (error) {
      console.error('Error checking pharmacy stock:', error);
      res.status(500).json({ error: 'Failed to retrieve pharmacy stock' });
    }
  },
  getAllMedicine: async (req, res) => {
    try {
      const medicines = await PharmacyModel.getAllMedicines();
      res.status(200).json(medicines);
    } catch (error) {
      console.error('Error getting all medicines:', error);
      res.status(500).json({ error: 'Failed to retrieve medicines' });
    }
  },


  //total no of presc
  getTotalPrescriptions: async (req, res) => {
    try {
      const totalPrescriptions = await PharmacyModel.getTotalPrescriptions();
      res.status(200).json({ total_prescriptions: totalPrescriptions });
    } catch (error) {
      console.error("Error in controller:", error);
      res.status(500).json({ message: "Failed to get total prescriptions", error: error.message });
    }
  },

  // Update medicine stock
  updateMedicineStock: async (req, res) => {
    try {
      const { pharmacyId, medicineId } = req.params;
      const { quantity } = req.body;
      
      const updatedStock = await PharmacyModel.updateMedicineStock(pharmacyId, medicineId, 100);
      
      if (!updatedStock) {
        return res.status(404).json({ error: 'Medicine stock not found' });
      }
      
      res.status(200).json(updatedStock);
    } catch (error) {
      console.error('Error updating medicine stock:', error);
      res.status(500).json({ error: 'Failed to update medicine stock' });
    }
  },

  // Get low stock medicines
  getLowStockMedicines: async (req, res) => {
    try {
      const lowStockMedicines = await PharmacyModel.getLowStockMedicines();
      res.status(200).json(lowStockMedicines);
    } catch (error) {
      console.error('Error getting low stock medicines:', error);
      res.status(500).json({ error: 'Failed to retrieve low stock medicines' });
    }
  },

  // Get medicines available in all pharmacies
  getMedicinesInAllPharmacies: async (req, res) => {
    try {
      const medicines = await PharmacyModel.getMedicinesInAllPharmacies();
      res.status(200).json(medicines);
    } catch (error) {
      console.error('Error getting medicines in all pharmacies:', error);
      res.status(500).json({ error: 'Failed to retrieve medicines' });
    }
  }
};

module.exports = PharmacyController;