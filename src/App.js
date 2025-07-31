import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import DoctorProfilePage from './pages/DoctorProfilePage';
import BookAppointmentPage from './pages/BookAppointmentPage';
import NotFoundPage from './pages/NotFoundPage';
import AppointmentsPage from './pages/AppointmentsPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/doctor/:id" element={<DoctorProfilePage />} />
        <Route path="/book/:id" element={<BookAppointmentPage />} />
        <Route path="/appointments" element={<AppointmentsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
