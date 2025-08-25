import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../components/Button";
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";

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
    <div className="h-[100dvh] w-full bg-[#F7F7F7] overflow-y-auto" style={{ WebkitOverflowScrolling: "touch" }}>
      
      <div className="mx-auto max-w-[400px] min-h-full flex flex-col">
        {/* NAVBAR */}
        <Navbar
          onBack={() => navigate(-1)}
          background="transparent"
          spacerHeight={40}
        />

        {/* CONTENT */}
        <main className="flex-1 bg-transparent px-5">
          <div className="pt-4">
            {/* TITLE */}
            <PageTitle>Saved Addresses</PageTitle>

            {/* ADDRESS CARDS */}
            <div className="space-y-4 mb-8">
              {addresses.map((item, index) => (
                <div key={index} className="p-4 bg-[#F5F5F5] rounded-lg">
                  <p className="text-lg font-bold text-black mb-2">{item.label}</p>
                  <p className="text-gray-600 mb-3">{item.address}</p>
                  <div className="flex space-x-6">
                    <button
                      onClick={() => handleEdit(item.label)}
                      className="text-[#EB2726] font-bold text-sm"
                    >
                      EDIT
                    </button>
                    <button
                      onClick={() => handleDelete(item.label)}
                      className="text-[#EB2726] font-bold text-sm"
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* ADD NEW ADDRESS BUTTON */}
            <div className="pb-[max(16px,env(safe-area-inset-bottom))]">
              <PrimaryButton
                label="ADD NEW ADDRESS"
                onClick={() => navigate("/student/set-location")}
                className="!w-full"
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SavedAddressesScreen;
