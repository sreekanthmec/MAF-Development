import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../services/api";

const BasicDetails2 = () => {
  // Replace this with the actual API response
  const userProfile = {
    _id: "66bdb6ff3be330bad19a3f34",
    hasGloves: true,
    gloveSize: 14,
    hasHandwrap: true,
  };

  const [hasGloves, setHasGloves] = useState(null);
  const [gloveSize, setGloveSize] = useState(null);
  const [hasHandwrap, setHasHandwrap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Populate the fields with data from userProfile
  useEffect(() => {
    setHasGloves(userProfile.hasGloves);
    setGloveSize(userProfile.gloveSize);
    setHasHandwrap(userProfile.hasHandwrap);
  }, []);

  const handleGetStarted = useCallback(async () => {
    if (hasGloves === null || gloveSize === null || hasHandwrap === null) {
      setError("Please select all options.");
      return;
    }

    setLoading(true);
    try {
      const profileData = {
        hasGloves,
        gloveSize,
        hasHandwrap,
      };
      await updateProfile(profileData);
      setLoading(false);
      navigate("/");
    } catch (error) {
      setError("Failed to update profile");
      setLoading(false);
    }
  }, [hasGloves, gloveSize, hasHandwrap, navigate]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-500 focus:outline-none mb-4"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
        </button>

        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Setup your gears
        </h1>

        <div className="mb-4">
          <p className="block text-sm font-medium text-gray-700">
            Do you have gloves?
          </p>
          <div className="flex space-x-2 mt-2">
            {["Yes", "No"].map((option) => (
              <button
                key={option}
                onClick={() => setHasGloves(option === "Yes")}
                className={`flex-1 p-3 border-2 rounded-lg text-center ${
                  hasGloves === (option === "Yes")
                    ? "border-red-500 text-red-600"
                    : "border-gray-300 text-gray-500"
                }`}
              >
                <span className="block text-sm font-medium">{option}</span>
              </button>
            ))}
          </div>
          {hasGloves === false && (
            <p className="text-sm text-gray-500 mt-2">
              <i className="fas fa-info-circle mr-1"></i> Don’t worry, your
              trainer will bring it
            </p>
          )}
        </div>

        <div className="mb-4">
          <p className="block text-sm font-medium text-gray-700">
            Your Glove Size (in oz)
          </p>
          <div className="flex space-x-2 mt-2">
            {[8, 10, 12, 14, 16, 18].map((size) => (
              <button
                key={size}
                onClick={() => setGloveSize(size)}
                className={`flex-1 p-3 border-2 rounded-lg text-center ${
                  gloveSize === size
                    ? "border-red-500 text-red-600"
                    : "border-gray-300 text-gray-500"
                }`}
              >
                <span className="block text-sm font-medium">{size}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <p className="block text-sm font-medium text-gray-700">
            Do you have handwraps?
          </p>
          <div className="flex space-x-2 mt-2">
            {["Yes", "No"].map((option) => (
              <button
                key={option}
                onClick={() => setHasHandwrap(option === "Yes")}
                className={`flex-1 p-3 border-2 rounded-lg text-center ${
                  hasHandwrap === (option === "Yes")
                    ? "border-red-500 text-red-600"
                    : "border-gray-300 text-gray-500"
                }`}
              >
                <span className="block text-sm font-medium">{option}</span>
              </button>
            ))}
          </div>
          {hasHandwrap === false && (
            <p className="text-sm text-gray-500 mt-2">
              <i className="fas fa-info-circle mr-1"></i> Don’t worry, your
              trainer will bring it
            </p>
          )}
        </div>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <button
          onClick={handleGetStarted}
          className="w-full bg-red-600 text-white font-bold py-2 px-4 rounded-md flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          disabled={loading}
        >
          {loading ? "Updating..." : "Get Started"}
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
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default BasicDetails2;
