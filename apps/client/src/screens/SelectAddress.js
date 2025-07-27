import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackIcon from "../components/BackIcon";

const SelectAddress = () => {
  const navigate = useNavigate();
  const [selectedAddress, setSelectedAddress] = useState("HOME");

  const addresses = [
    { label: "HOME", address: "Building no 356, 3rd floor, 29th street" },
    { label: "PARK", address: "Building no 356, 3rd floor, 29th street" },
  ];

  const handleAddressSelect = (label) => {
    setSelectedAddress(label);
  };

  const handleNext = () => {
    navigate("/session-duration", {
      state: { selectedAddress },
    });
  };

  const handleAddNewAddress = () => {
    navigate("/set-location"); // Navigate to SetLocation screen
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="flex justify-between items-center mb-4">
        <BackIcon />
      </header>

      <section className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Select Address
        </h1>

        <div className="space-y-4">
          {addresses.map((item, index) => (
            <div
              key={index}
              onClick={() => handleAddressSelect(item.label)}
              className={`p-4 border rounded-md cursor-pointer ${
                selectedAddress === item.label
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            >
              <p
                className={`text-lg font-bold ${
                  selectedAddress === item.label
                    ? "text-red-600"
                    : "text-gray-600"
                }`}
              >
                {item.label}
              </p>
              <p className="text-gray-500">{item.address}</p>
            </div>
          ))}
        </div>

        <button
          className="mt-6 text-red-600 flex items-center"
          onClick={handleAddNewAddress} // Link to SetLocation screen
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            ></path>
          </svg>
          Add New Address
        </button>
      </section>

      <footer className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
        <button
          onClick={handleNext}
          className="w-full bg-red-600 text-white font-bold py-3 px-4 rounded-md flex items-center justify-center focus:outline-none"
        >
          Select Session Duration
          <svg
            className="w-5 h-5 ml-2 -mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </button>
      </footer>
    </div>
  );
};

export default SelectAddress;
