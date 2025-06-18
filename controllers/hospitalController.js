// controllers/hospitalController.js
const HospitalModel = require('../models/hospitalModel');

const HospitalController = {
  // Get all hospitals
  getAllHospitals: async (req, res) => {
    try {
      const hospitals = await HospitalModel.getAllHospitals();
      res.status(200).json(hospitals);
    } catch (error) {
      console.error('Error getting hospitals:', error);
      res.status(500).json({ error: 'Failed to retrieve hospitals' });
    }
  },

  // Get doctors by hospital ID
  getDoctorsByHospitalId: async (req, res) => {
    try {
      const { hospitalId } = req.params;
      const doctors = await HospitalModel.getDoctorsByHospitalId(hospitalId);
      res.status(200).json(doctors);
    } catch (error) {
      console.error('Error getting doctors by hospital:', error);
      res.status(500).json({ error: 'Failed to retrieve doctors' });
    }
  },

  // Get labs by doctor ID
  getLabsByDoctorId: async (req, res) => {
    try {
      const { doctorId } = req.params;
      const labs = await HospitalModel.getLabsByDoctorId(doctorId);
      res.status(200).json(labs);
    } catch (error) {
      console.error('Error getting labs by doctor:', error);
      res.status(500).json({ error: 'Failed to retrieve labs' });
    }
  }
};

module.exports = HospitalController;