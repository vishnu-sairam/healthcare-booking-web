import React from "react";
import DoctorCard from "./DoctorCard";

const DoctorList = ({ doctors }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {doctors.map((doc) => (
      <DoctorCard key={doc.id} doctor={doc} />
    ))}
  </div>
);

export default DoctorList;