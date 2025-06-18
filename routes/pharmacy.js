// routes/pharmacy.js
const express = require('express');
const router = express.Router();
const pharmacyController = require('../controllers/pharmacyController');
//get all medicines name
router.get('/all-name', pharmacyController.getAllMedicine);

router.get('/all-pharm', pharmacyController.getTotalPrescriptions);

// Check medicine stock
router.get('/medicine-stock/:medicineId', pharmacyController.getMedicineStock);

// Check pharmacy stock
router.get('/:pharmacyId/stock', pharmacyController.getPharmacyStock);

// Get low stock medicines
router.get('/low-stock', pharmacyController.getLowStockMedicines);

// Get medicines available in all pharmacies
router.get('/medicines/available-everywhere', pharmacyController.getMedicinesInAllPharmacies);

// Update medicine stock
router.put('/:pharmacyId/medicine/:medicineId', pharmacyController.updateMedicineStock);


module.exports = router;