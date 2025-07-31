import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const API_BASE_URL = 'http://localhost:5000/api';

const BookAppointmentPage = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", selectedSlot: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/doctors/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch doctor');
        }
        const data = await response.json();
        setDoctor(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching doctor:', err);
        setError('Failed to load doctor information. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.email.trim()) newErrors.email = "Email is required.";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) newErrors.email = "Invalid email address.";
    if (!form.selectedSlot) newErrors.selectedSlot = "Please select a time slot.";
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setSubmitting(true);
      const response = await fetch(`${API_BASE_URL}/appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          doctor: doctor.name,
          patient: form.name,
          email: form.email,
          datetime: form.selectedSlot,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to book appointment');
      }

      const appointment = await response.json();
      console.log('Appointment booked:', appointment);
      setSubmitted(true);
    } catch (err) {
      console.error('Error booking appointment:', err);
      setErrors({ submit: 'Failed to book appointment. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-md mx-auto p-4">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading doctor information...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto p-4">
        <div className="text-center py-12">
          <div className="text-red-600 mb-4">⚠️</div>
          <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="max-w-md mx-auto p-4">
        <div className="text-center py-12">
          <div className="text-gray-600 dark:text-gray-400 mb-4">👨‍⚕️</div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">Doctor not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Book Appointment</h1>
      <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900 rounded">
        <p className="font-medium text-gray-900 dark:text-white">Booking with: {doctor.name}</p>
        <p className="text-sm text-gray-600 dark:text-gray-300">{doctor.specialization}</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium text-gray-900 dark:text-white">Patient Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className={`w-full p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 ${errors.name ? 'border-red-500 dark:border-red-400' : ''} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          />
          {errors.name && <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.name}</p>}
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-900 dark:text-white">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className={`w-full p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 ${errors.email ? 'border-red-500 dark:border-red-400' : ''} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          />
          {errors.email && <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.email}</p>}
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-900 dark:text-white">Select Time Slot</label>
          <select
            name="selectedSlot"
            value={form.selectedSlot}
            onChange={handleChange}
            className={`w-full p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 ${errors.selectedSlot ? 'border-red-500 dark:border-red-400' : ''} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          >
            <option value="">Choose a time slot</option>
            {doctor.slots.map((slot, index) => (
              <option key={index} value={slot}>
                {new Date(slot).toLocaleString()}
              </option>
            ))}
          </select>
          {errors.selectedSlot && <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.selectedSlot}</p>}
        </div>
        {errors.submit && <p className="text-red-500 dark:text-red-400 text-sm">{errors.submit}</p>}
        <button 
          type="submit" 
          disabled={submitting}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? 'Booking...' : 'Book Appointment'}
        </button>
      </form>
      {submitted && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white dark:bg-gray-800 rounded shadow-lg p-8 max-w-sm w-full text-center">
            <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Appointment Confirmed!</h2>
            <p className="mb-2 text-gray-700 dark:text-gray-300">Thank you, {form.name}. Your appointment has been booked.</p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">We have sent a confirmation to {form.email}.</p>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              onClick={() => setSubmitted(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookAppointmentPage;