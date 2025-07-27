import React from "react";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../components/Button"; // Assuming you have a PrimaryButton component

const Failure = () => {
  const navigate = useNavigate();

  const handleRetry = () => {
    navigate("/buy-credits"); // Redirect to the Buy Credits page to retry
  };

  const handleContactSupport = () => {
    navigate("/support"); // Redirect to the support page
  };

  return (
    <div className="min-h-screen bg-red-100 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold text-red-800 mb-4">Payment Failed</h1>
      <p className="text-lg text-red-700 mb-8">
        Unfortunately, your payment could not be processed. Please try again or
        contact support.
      </p>
      <div className="flex space-x-4">
        <PrimaryButton label="Retry" onClick={handleRetry} />
        <PrimaryButton label="Contact Support" onClick={handleContactSupport} />
      </div>
    </div>
  );
};

export default Failure;
