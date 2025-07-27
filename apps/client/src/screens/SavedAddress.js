import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../components/Button"; // Assuming you have this button component
import BackIcon from "../components/BackIcon";

const SavedAddressesScreen = () => {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([
    { label: "HOME", address: "Building no 356, 3rd floor, 29th street" },
    { label: "GYM", address: "Building no 356, 3rd floor, 29th street" },
    { label: "BEACH", address: "Building no 356, 3rd floor, 29th street" },
  ]);

  const handleDelete = (label) => {
    setAddresses(addresses.filter((item) => item.label !== label));
  };

  const handleEdit = (label) => {
    alert(`Editing ${label}`);
    // You can navigate to an edit screen here or handle the editing in another way.
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="flex justify-between items-center mb-4">
        <BackIcon />
      </header>

      <section>
        <h1 className="text-2xl font-bold mb-6">Saved Addresses</h1>

        <div className="space-y-4 mb-8">
          {addresses.map((item, index) => (
            <div key={index} className="p-4 border rounded-md bg-white">
              <p className="text-lg font-bold text-black">{item.label}</p>
              <p className="text-gray-500 mb-2">{item.address}</p>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleEdit(item.label)}
                  className="text-red-600 font-bold"
                >
                  EDIT
                </button>
                <button
                  onClick={() => handleDelete(item.label)}
                  className="text-red-600 font-bold"
                >
                  DELETE
                </button>
              </div>
            </div>
          ))}
        </div>

        <PrimaryButton
          label="ADD NEW ADDRESS"
          onClick={() => navigate("/set-location")}
        />
      </section>
    </div>
  );
};

export default SavedAddressesScreen;
