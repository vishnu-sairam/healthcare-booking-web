const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

// Helper function to read doctors data
const getDoctorsData = async () => {
  try {
    const data = await fs.readFile(path.join(__dirname, '../data/doctors.json'), 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading doctors data:', error);
    return [];
  }
};

// GET /api/doctors - Get all doctors
router.get('/', async (req, res) => {
  try {
    const doctors = await getDoctorsData();
    res.json(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ error: 'Failed to fetch doctors' });
  }
});

// GET /api/doctors/:id - Get specific doctor by ID
router.get('/:id', async (req, res) => {
  try {
    const doctors = await getDoctorsData();
    const doctor = doctors.find(doc => String(doc.id) === String(req.params.id));
    
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    
    res.json(doctor);
  } catch (error) {
    console.error('Error fetching doctor:', error);
    res.status(500).json({ error: 'Failed to fetch doctor' });
  }
});

module.exports = router; 