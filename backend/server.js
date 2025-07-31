const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import routes
const doctorsRoutes = require('./routes/doctors');
const appointmentsRoutes = require('./routes/appointments');

// Use routes
app.use('/api/doctors', doctorsRoutes);
app.use('/api/appointments', appointmentsRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ message: 'Healthcare Booking API is running!', timestamp: new Date().toISOString() });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Healthcare Booking API', 
    endpoints: {
      health: '/api/health',
      doctors: '/api/doctors',
      appointments: '/api/appointments'
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`👨‍⚕️ Doctors API: http://localhost:${PORT}/api/doctors`);
  console.log(`📅 Appointments API: http://localhost:${PORT}/api/appointments`);
}); 