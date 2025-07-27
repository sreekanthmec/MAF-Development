import React from "react";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../components/Button"; // Assuming you have a PrimaryButton component

const Success = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/"); // Redirect to the home page or another appropriate page
  };

  return (
    <div className="min-h-screen bg-green-100 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold text-green-800 mb-4">
        Payment Successful!
      </h1>
      <p className="text-lg text-green-700 mb-8">
        Thank you for your purchase. Your credits have been added to your
        account.
      </p>
      <PrimaryButton label="Continue" onClick={handleContinue} />
    </div>
  );
};

export default Success;
