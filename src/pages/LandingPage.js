import React, { useEffect, useState } from "react";
import DoctorList from "../components/DoctorList";
import SearchBar from "../components/SearchBar";

const AVAILABILITY_OPTIONS = [
  "All",
  "Available Today",
  "Fully Booked",
  "On Leave"
];

const API_BASE_URL = 'https://healthcare-booking-web.onrender.com/api';

const LandingPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [availability, setAvailability] = useState("All");
  const [specialization, setSpecialization] = useState("All Specializations");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/doctors`);
        if (!response.ok) {
          throw new Error('Failed to fetch doctors');
        }
        const data = await response.json();
        setDoctors(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching doctors:', err);
        setError('Failed to load doctors. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const specializations = [
    "All Specializations",
    ...Array.from(new Set(doctors.map((doc) => doc.specialization)))
  ];

  let filteredDoctors = doctors.filter((doc) =>
    doc.name.toLowerCase().includes(search.toLowerCase()) ||
    doc.specialization.toLowerCase().includes(search.toLowerCase())
  );

  if (availability !== "All") {
    filteredDoctors = filteredDoctors.filter((doc) => doc.availability === availability);
  }

  if (specialization !== "All Specializations") {
    filteredDoctors = filteredDoctors.filter((doc) => doc.specialization === specialization);
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading doctors...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-4">
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
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Find a Doctor</h1>
      <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
      <div className="mb-4 flex flex-wrap gap-2 items-center">
        {AVAILABILITY_OPTIONS.map((option) => (
          <button
            key={option}
            onClick={() => setAvailability(option)}
            className={`px-3 py-1 rounded border transition ${
              availability === option
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-500 hover:bg-blue-50 dark:hover:bg-gray-700"
            }`}
          >
            {option}
          </button>
        ))}
        <select
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
          className="ml-4 p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
        >
          {specializations.map((spec) => (
            <option key={spec} value={spec}>{spec}</option>
          ))}
        </select>
      </div>
      <DoctorList doctors={filteredDoctors} />
    </div>
  );
};

export default LandingPage;