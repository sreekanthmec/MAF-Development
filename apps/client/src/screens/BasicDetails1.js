import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../services/api";
import { PrimaryButton } from "../components/Button";
import BackIcon from "../components/BackIcon";
import { SingleInput, TextInput } from "../components/InputComponents";

const BasicDetails1 = () => {
  // Replace this with the actual API response
  const userProfile = {
    _id: "66bdb6ff3be330bad19a3f34",
    mobileNumber: "9037511920",
    countryCode: "91",
    name: "test student",
    age: 30,
    sex: "Male",
    experience: "Intermediate", // Added experience level
  };

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [experience, setExperience] = useState("Beginner");
  const [sex, setSex] = useState("Male");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Populate the fields with data from userProfile
  useEffect(() => {
    setName(userProfile.name || "");
    setAge(userProfile.age ? userProfile.age.toString() : "");
    setExperience(userProfile.experience || "Beginner");
    setSex(userProfile.sex || "Male");
  }, []);

  const handleNext = useCallback(async () => {
    if (!name || !age || !sex) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    try {
      const profileData = { name, age, sex, experience };
      await updateProfile(profileData);
      setLoading(false);
      navigate("/basic-details2");
    } catch (error) {
      setError("Failed to update profile");
      setLoading(false);
    }
  }, [name, age, sex, experience, navigate]);

  return (
    <div className="min-h-screen flex flex-col justify-start items-center bg-gray-100 p-6">
      <header className="flex justify-start items-start mb-4 w-full p-4">
        <BackIcon />
      </header>
      <div className="w-full max-w-md bg-white">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Let us know about you
        </h1>

        <TextInput
          id="name"
          label="What should trainers call you?"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {/* <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            What should trainers call you?
          </label>

          <input
            type="text"
            name="name"
            id="name"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
          />
        </div> */}

        <SingleInput
          label="YOUR MAUY THAI EXPERIENCE"
          options={["Beginner", "Intermediate", "Professional"]}
          selected={experience}
          onSelect={(level) => setExperience(level)}
        />

        {/* <div className="mb-4">
          <p className="block text-sm font-medium text-gray-700">
            Your Muay Thai Experience
          </p>
          <div className="flex space-x-2 mt-2">
            {["Beginner", "Intermediate", "Professional"].map((level) => (
              <button
                key={level}
                onClick={() => setExperience(level)}
                className={`flex-1 p-3 border-2 rounded-lg text-center ${
                  experience === level
                    ? "border-red-500 text-red-600"
                    : "border-gray-300 text-gray-500"
                }`}
              >
                <span className="block text-sm font-medium">{level}</span>
              </button>
            ))}
          </div>
        </div> */}

        <TextInput
          label="HOW OLD ARE YOU?"
          placeholder="Enter your age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <SingleInput
          label="Division (Sex)"
          options={["Male", "Female"]}
          selected={sex}
          onSelect={(g) => setSex(g)}
        />

        {/* <div className="mb-4">
          <label
            htmlFor="age"
            className="block text-sm font-medium text-gray-700"
          >
            How old are you?
          </label>
          <input
            type="text"
            name="age"
            id="age"
            placeholder="Your Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
          />
        </div> */}

        {/* <div className="mb-6">
          <p className="block text-sm font-medium text-gray-700">
            Division (Sex)
          </p>
          <div className="flex space-x-2 mt-2">
            {["Male", "Female"].map((gender) => (
              <button
                key={gender}
                onClick={() => setSex(gender)}
                className={`flex-1 p-3 border-2 rounded-lg text-center ${
                  sex === gender
                    ? "border-red-500 text-red-600"
                    : "border-gray-300 text-gray-500"
                }`}
              >
                <span className="block text-sm font-medium">{gender}</span>
              </button>
            ))}
          </div>
        </div> */}

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <PrimaryButton
          onClick={handleNext}
          label={loading ? "UPDATING..." : "NEXT"}
          disabled={loading}
        />
        {/* <button
          onClick={handleNext}
          className="w-full bg-red-600 text-white font-bold py-2 px-4 rounded-md flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          disabled={loading}
        >
          {loading ? "Updating..." : "Next"}
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
        </button> */}
      </div>
    </div>
  );
};

export default BasicDetails1;
