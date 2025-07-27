import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextInput,
  SingleInput,
  Dropdown,
} from "../components/InputComponents";
import BackIcon from "../components/BackIcon";

const AddAddress = () => {
  const [name, setName] = useState("");
  const [addressCategory, setAddressCategory] = useState("Home");
  const [addressType, setAddressType] = useState("");
  const [showAddressTypeSheet, setShowAddressTypeSheet] = useState(false);
  const [flatDetails, setFlatDetails] = useState("");
  const [landmark, setLandmark] = useState("");
  const navigate = useNavigate();

  const handleSaveAddress = () => {
    navigate("/select-address");
  };

  const addressTypeOptions = [
    "Public Property",
    "Park",
    "My own house",
    "Friends house",
    "Hotel",
    "Others",
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="flex justify-between items-center mb-4">
        <BackIcon />
      </header>

      <section>
        <h1 className="text-2xl font-bold mb-6">Add Address</h1>
        <TextInput
          label="Name of Address"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <SingleInput
          label="Address Category"
          options={["Home", "Gym", "Park"]}
          selected={addressCategory}
          onSelect={(category) => setAddressCategory(category)}
        />
        <Dropdown
          label="Address Type"
          placeholder="Select Address Type"
          value={addressType}
          onClick={() => setShowAddressTypeSheet(!showAddressTypeSheet)}
          options={addressTypeOptions}
          showDropdown={showAddressTypeSheet}
          onSelect={(type) => {
            setAddressType(type);
            setShowAddressTypeSheet(false);
          }}
        />
        <TextInput
          label="Flat / House no / Floor / Building"
          placeholder="Enter details"
          value={flatDetails}
          onChange={(e) => setFlatDetails(e.target.value)}
        />
        <TextInput
          label="Nearby Landmark"
          placeholder="Enter landmark"
          value={landmark}
          onChange={(e) => setLandmark(e.target.value)}
        />
      </section>

      <footer className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
        <button
          onClick={handleSaveAddress}
          className="w-full bg-red-600 text-white font-bold py-3 px-4 rounded-md flex items-center justify-center focus:outline-none"
        >
          Save Address
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

export default AddAddress;
