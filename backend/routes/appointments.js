const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

// Helper function to read appointments data
const getAppointmentsData = async () => {
  try {
    const data = await fs.readFile(path.join(__dirname, '../data/appointments.json'), 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading appointments data:', error);
    return [];
  }
};

// Helper function to write appointments data
const writeAppointmentsData = async (appointments) => {
  try {
    await fs.writeFile(
      path.join(__dirname, '../data/appointments.json'), 
      JSON.stringify(appointments, null, 2)
    );
  } catch (error) {
    console.error('Error writing appointments data:', error);
    throw error;
  }
};

// GET /api/appointments - Get all appointments
router.get('/', async (req, res) => {
  try {
    const appointments = await getAppointmentsData();
    res.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});

// POST /api/appointments - Create new appointment
router.post('/', async (req, res) => {
  try {
    const { doctor, patient, email, datetime } = req.body;
    
    // Basic validation
    if (!doctor || !patient || !email || !datetime) {
      return res.status(400).json({ 
        error: 'Missing required fields: doctor, patient, email, datetime' 
      });
    }

    const appointments = await getAppointmentsData();
    
    // Create new appointment with ID and timestamp
    const newAppointment = {
      id: Date.now().toString(), // Simple ID generation
      doctor,
      patient,
      email,
      datetime,
      createdAt: new Date().toISOString()
    };
    
    appointments.push(newAppointment);
    await writeAppointmentsData(appointments);
    
    res.status(201).json(newAppointment);
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ error: 'Failed to create appointment' });
  }
});

// DELETE /api/appointments/:id - Delete appointment
router.delete('/:id', async (req, res) => {
  try {
    const appointments = await getAppointmentsData();
    const appointmentIndex = appointments.findIndex(apt => apt.id === req.params.id);
    
    if (appointmentIndex === -1) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    
    appointments.splice(appointmentIndex, 1);
    await writeAppointmentsData(appointments);
    
    res.json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    res.status(500).json({ error: 'Failed to delete appointment' });
  }
});

module.exports = router; 