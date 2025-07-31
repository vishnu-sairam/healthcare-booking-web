import React from "react";
import { Link } from "react-router-dom";

const DoctorCard = ({ doctor }) => (
  <Link to={`/doctor/${doctor.id}`} className="bg-white dark:bg-gray-800 rounded shadow p-4 flex items-center hover:bg-blue-50 dark:hover:bg-gray-700 transition">
    <img src={doctor.profileImage} alt={doctor.name} className="w-20 h-20 rounded-full mr-4" />
    <div>
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{doctor.name}</h2>
      <p className="text-gray-600 dark:text-gray-300">{doctor.specialization}</p>
      <span className="inline-block mt-2 px-2 py-1 text-xs rounded bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
        {doctor.availability}
      </span>
    </div>
  </Link>
);

export default DoctorCard;