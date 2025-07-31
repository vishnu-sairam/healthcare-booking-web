import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8">
    <h1 className="text-5xl font-bold mb-4 text-blue-600">404</h1>
    <p className="text-xl mb-6">Oops! The page you are looking for does not exist.</p>
    <Link to="/" className="text-blue-600 underline">Go back to Home</Link>
  </div>
);

export default NotFoundPage;