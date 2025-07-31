import React, { useEffect, useState } from "react";

const API_BASE_URL = 'https://healthcare-booking-web.onrender.com/api';

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/appointments`);
        if (!response.ok) {
          throw new Error('Failed to fetch appointments');
        }
        const data = await response.json();
        setAppointments(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching appointments:', err);
        setError('Failed to load appointments. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleDeleteAppointment = async (appointmentId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/appointments/${appointmentId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete appointment');
      }

      // Remove the appointment from the local state
      setAppointments(appointments.filter(apt => apt.id !== appointmentId));
    } catch (err) {
      console.error('Error deleting appointment:', err);
      alert('Failed to delete appointment. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-4">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading appointments...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-4">
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

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">All Appointments</h1>
      {appointments.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 dark:text-gray-500 mb-4">📅</div>
          <p className="text-gray-500 dark:text-gray-400 mb-4">No appointments found.</p>
          <p className="text-sm text-gray-400 dark:text-gray-500">Book your first appointment to see it here!</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-blue-100 dark:bg-gray-700">
              <tr>
                <th className="p-4 text-left text-gray-700 dark:text-gray-200 font-semibold">Doctor</th>
                <th className="p-4 text-left text-gray-700 dark:text-gray-200 font-semibold">Patient</th>
                <th className="p-4 text-left text-gray-700 dark:text-gray-200 font-semibold">Email</th>
                <th className="p-4 text-left text-gray-700 dark:text-gray-200 font-semibold">Date & Time</th>
                <th className="p-4 text-left text-gray-700 dark:text-gray-200 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt) => (
                <tr key={appt.id} className="border-t border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="p-4 text-gray-800 dark:text-gray-200 font-medium">{appt.doctor}</td>
                  <td className="p-4 text-gray-800 dark:text-gray-200">{appt.patient}</td>
                  <td className="p-4 text-gray-800 dark:text-gray-200">{appt.email}</td>
                  <td className="p-4 text-gray-800 dark:text-gray-200">
                    {new Date(appt.datetime).toLocaleString()}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleDeleteAppointment(appt.id)}
                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium"
                      title="Delete appointment"
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AppointmentsPage;