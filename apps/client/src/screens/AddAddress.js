import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import { PrimaryButton } from "../components/Button";
import LabeledInput from "../components/LabeledInput";
import SegmentedGroup from "../components/SegmentedGroup";
import AddressTypeBottomSheet from "../components/AddressTypeBottomSheet";

const AddAddress = () => {
  const [name, setName] = useState("");
  const [addressType, setAddressType] = useState("");
  const [flatDetails, setFlatDetails] = useState("");
  const [landmark, setLandmark] = useState("");
  const [showAddressTypeSheet, setShowAddressTypeSheet] = useState(false);
  const navigate = useNavigate();

  const handleSaveAddress = () => {
    navigate("/student/saved-addresses");
  };

  const handleAddressTypeSelect = (type) => {
    setAddressType(type);
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
            <PageTitle>Add Address</PageTitle>

            {/* NAME OF ADDRESS */}
            <div className="mb-2">
              <LabeledInput
                label="Name of Address"
                placeholder="Name of Address"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* ADDRESS TYPE TAGS */}
            <div className="mb-6">
              <SegmentedGroup
                label=""
                options={[
                  { label: "Home", value: "home" },
                  { label: "Gym", value: "gym" },
                  { label: "Park", value: "park" }
                ]}
                value={addressType}
                onChange={(value) => setAddressType(value)}
                size="sm"
              />
            </div>


            {/* ADDRESS TYPE DROPDOWN */}
            <div className="mb-6">
              <div 
                className="w-full p-3 border border-[#B1B1B1] bg-white text-gray-800 cursor-pointer flex items-center justify-between"
                onClick={() => setShowAddressTypeSheet(true)}
              >
                <span className={addressType ? "text-gray-800" : "text-gray-500"}>
                  {addressType || "Address type"}
                </span>
                <svg 
                  className="w-5 h-5 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* FLAT/HOUSE DETAILS */}
            <div className="mb-6">
              <LabeledInput
                label=""
                placeholder="Flat / House no / Floor / Building"
                value={flatDetails}
                onChange={(e) => setFlatDetails(e.target.value)}
              />
            </div>

            {/* NEARBY LANDMARK */}
            <div className="mb-8">
              <LabeledInput
                label=""
                placeholder="Nearby Landmark"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
              />
            </div>

            {/* SAVE ADDRESS BUTTON */}
            <div className="pb-[max(16px,env(safe-area-inset-bottom))]">
              <PrimaryButton
                label="SAVE ADDRESS"
                onClick={handleSaveAddress}
                className="!w-full"
              />
            </div>
          </div>
        </main>
      </div>

      {/* ADDRESS TYPE BOTTOM SHEET */}
      <AddressTypeBottomSheet
        isOpen={showAddressTypeSheet}
        onClose={() => setShowAddressTypeSheet(false)}
        onSelect={handleAddressTypeSelect}
        selectedValue={addressType}
      />
    </div>
  );
};

export default AddAddress;
