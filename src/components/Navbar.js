import React from "react";
import { Link } from "react-router-dom";

function toggleDarkMode() {
  const html = document.documentElement;
  if (html.classList.contains('dark')) {
    html.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  } else {
    html.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }
}

const Navbar = () => (
  <nav className="bg-blue-600 dark:bg-gray-900 text-white px-4 py-3 flex justify-between items-center shadow">
    <div className="font-bold text-xl">
      <Link to="/">HealthCare Booking</Link>
    </div>
    <div className="space-x-4 flex items-center">
      <Link to="/" className="hover:underline">Home</Link>
      <Link to="/appointments" className="hover:underline">Appointments</Link>
      {/* <Link to="/about" className="hover:underline">About</Link>
      <Link to="/contact" className="hover:underline">Contact</Link> */}
      <button
        onClick={toggleDarkMode}
        className="ml-4 px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        title="Toggle dark mode"
      >
        🌓
      </button>
    </div>
  </nav>
);

export default Navbar;