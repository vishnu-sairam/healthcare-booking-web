import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API_BASE_URL = 'https://healthcare-booking-web.onrender.com/api';

const DoctorProfilePage = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading doctor information...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">⚠️</div>
          <p className="text-red-600 mb-4">{error}</p>
          <Link 
            to="/" 
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-600 mb-4">👨‍⚕️</div>
          <p className="text-gray-600 mb-4">Doctor not found</p>
          <Link 
            to="/" 
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case "Available Today":
        return "bg-green-100 text-green-800 border-green-200";
      case "Fully Booked":
        return "bg-red-100 text-red-800 border-red-200";
      case "On Leave":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatTimeSlot = (slot) => {
    const date = new Date(slot);
    return {
      date: date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      }),
      time: date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      })
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/3 mb-6 md:mb-0">
              <img 
                src={doctor.profileImage} 
                alt={doctor.name} 
                className="w-48 h-48 rounded-full border-4 border-white shadow-lg mx-auto md:mx-0"
              />
            </div>
            <div className="md:w-2/3 md:pl-8 text-center md:text-left">
              <h1 className="text-4xl font-bold mb-2">{doctor.name}</h1>
              <p className="text-xl text-blue-100 mb-4">{doctor.specialization}</p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-6">
                <span className={`px-4 py-2 rounded-full border ${getAvailabilityColor(doctor.availability)}`}>
                  {doctor.availability}
                </span>
                <span className="px-4 py-2 rounded-full bg-white bg-opacity-20 border border-white border-opacity-30">
                  {doctor.details.split('.')[0]} years experience
                </span>
              </div>
              <Link 
                to={`/book/${doctor.id}`} 
                className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition duration-300 shadow-lg"
              >
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Doctor Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">About Dr. {doctor.name.split(' ')[1]}</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{doctor.details}</p>
            </div>

            {/* Specializations & Expertise */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Specializations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-gray-700 dark:text-gray-300">{doctor.specialization}</span>
                </div>
                <div className="flex items-center p-3 bg-green-50 dark:bg-green-900 rounded-lg">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700 dark:text-gray-300">General Consultation</span>
                </div>
                <div className="flex items-center p-3 bg-purple-50 dark:bg-purple-900 rounded-lg">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                  <span className="text-gray-700 dark:text-gray-300">Preventive Care</span>
                </div>
                <div className="flex items-center p-3 bg-orange-50 dark:bg-orange-900 rounded-lg">
                  <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
                  <span className="text-gray-700 dark:text-gray-300">Follow-up Care</span>
                </div>
              </div>
            </div>

            {/* Available Time Slots */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Available Time Slots</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {doctor.slots.map((slot, index) => {
                  const formattedSlot = formatTimeSlot(slot);
                  return (
                    <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:border-blue-300 dark:hover:border-blue-500 transition-colors">
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">{formattedSlot.date}</div>
                      <div className="font-semibold text-gray-800 dark:text-white">{formattedSlot.time}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column - Quick Info */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Quick Info</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Experience</span>
                  <span className="font-semibold text-gray-800 dark:text-white">10+ years</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Languages</span>
                  <span className="font-semibold text-gray-800 dark:text-white">English, Hindi</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Consultation Fee</span>
                  <span className="font-semibold text-gray-800 dark:text-white">₹800</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Available Slots</span>
                  <span className="font-semibold text-gray-800 dark:text-white">{doctor.slots.length}</span>
                </div>
              </div>
            </div>

            {/* Contact & Location */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Contact & Location</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3">
                    📍
                  </div>
                  <div>
                    <div className="font-medium text-gray-800 dark:text-white">City Hospital</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Main Street, City Center</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-3">
                    📞
                  </div>
                  <div>
                    <div className="font-medium text-gray-800 dark:text-white">+91 98765 43210</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Available 9 AM - 6 PM</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mr-3">
                    ✉️
                  </div>
                  <div>
                    <div className="font-medium text-gray-800 dark:text-white">doctor@hospital.com</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Response within 24h</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Book Appointment CTA */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-md p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Ready to Book?</h3>
              <p className="text-blue-100 mb-4">Select your preferred time slot and book your appointment today.</p>
              <Link 
                to={`/book/${doctor.id}`} 
                className="block w-full bg-white text-blue-600 text-center py-3 rounded-lg font-semibold hover:bg-blue-50 transition duration-300"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfilePage;