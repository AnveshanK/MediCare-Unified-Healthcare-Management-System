// models/pharmacyModel.js
const db = require('../config/db');

const PharmacyModel = {
  // Query 9: Check Medicine Stock
  getMedicineStock: async (medicineId) => {
    try {
      const query = `
        SELECT pharmacy_id, medicine_id, SUM(quantity) AS total_stock
        FROM pharm_medicine_stock
        WHERE medicine_id = $1
        GROUP BY pharmacy_id, medicine_id

        UNION ALL

        SELECT NULL AS pharmacy_id, medicine_id, SUM(quantity) AS total_stock
        FROM pharm_medicine_stock
        WHERE medicine_id = $1
        GROUP BY medicine_id`;
      const result = await db.query(query, [medicineId]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },
  getAllMedicines: async () => {
    try {
      const query = `
        SELECT medicine_id, name, manufacturer, price, dosage
        FROM medicine;
      `;
      const result = await db.query(query);
      return result.rows;
    } catch (error) {
      console.error('Error getting all medicines from database:', error);
      throw error; // Re-throw the error to be caught in the controller
    }
  },
  // Query 10: Check medicine stock levels of a pharmacy
  getPharmacyStock: async (pharmacyId) => {
    try {
      const query = `
        SELECT M.Name, S.Quantity
        FROM Pharm_Medicine_Stock S
        JOIN Medicine M ON S.Medicine_Id = M.Medicine_Id
        WHERE S.Pharmacy_Id = $1`;
      const result = await db.query(query, [pharmacyId]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  //query to total no of prscription
  getTotalPrescriptions: async () => {
    try {
      const query = `SELECT COUNT(*) AS total_prescriptions FROM prescription`;
      const result = await db.query(query);
      return parseInt(result.rows[0].total_prescriptions); // Parse the count to integer
    } catch (error) {
      console.error("Error getting total prescriptions:", error);
      throw error;
    }
  },


  // Query 11: Update Inventory
  updateMedicineStock: async (pharmacyId, medicineId, quantity) => {
    try {
      const query = `
        UPDATE Pharm_Medicine_Stock
        SET Quantity = Quantity + $3
        WHERE Pharmacy_Id = $1 AND Medicine_Id = $2
        RETURNING *`;
      const result = await db.query(query, [pharmacyId, medicineId, quantity]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Query 12: Restock Notification
  getLowStockMedicines: async () => {
    try {
      const query = `
        SELECT medicine_id, SUM(quantity) AS total_stock
        FROM pharm_medicine_stock
        GROUP BY medicine_id
        HAVING SUM(quantity) < 400`;
      const result = await db.query(query);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  // Query 25: List the Medicines Available in All Pharmacies
  getMedicinesInAllPharmacies: async () => {
    try {
      const query = `
        SELECT m.Medicine_Id, m.Name, m.Manufacturer, m.Dosage, m.Price
        FROM Medicine m
        JOIN Pharm_Medicine_Stock pms ON m.Medicine_Id = pms.Medicine_Id
        GROUP BY m.Medicine_Id, m.Name, m.Manufacturer, m.Dosage, m.Price
        HAVING COUNT(DISTINCT pms.Pharmacy_Id) = (
          SELECT COUNT(*) FROM Pharmacy
        )`;
      const result = await db.query(query);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = PharmacyModel;