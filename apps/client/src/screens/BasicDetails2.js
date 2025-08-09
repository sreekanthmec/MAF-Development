import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../services/api";
import BackIcon from "../components/BackIcon";
import { PrimaryButton } from "../components/Button";

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
      navigate("/student/home");
    } catch (error) {
      setError("Failed to update profile");
      setLoading(false);
    }
  }, [hasGloves, gloveSize, hasHandwrap, navigate]);

  return (
    <div className="flex flex-col justify-between items-center p-0 gap-[42px] relative w-[360px] h-[800px] bg-[#F7F7F7]">
      {/* Main Content Frame */}
      <div className="flex flex-col items-start p-0 m-0 auto w-[360px] h-[602px]">
        {/* Header */}
        <div className="flex flex-row items-center p-5 gap-[10px] w-[360px] h-[80px] bg-[#F7F7F7]">
          <BackIcon />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center items-start p-6 gap-[40px] w-[360px] h-[522px]">
          {/* Title Section */}
          <div className="flex flex-col items-start p-0 gap-[28px] w-[165px] h-[58px]">
            {/* Progress Bar */}
            <div className="flex flex-row items-center p-0 gap-[12px] w-[92px] h-[4px]">
              <div className="w-[40px] h-[4px] bg-[#D62422]"></div>
              <div className="w-[40px] h-[4px] bg-[#D62422]"></div>
            </div>
            
            {/* Title */}
            <h1 className="w-[165px] h-[26px] font-manrope font-bold text-[20px] leading-[26px]">
              Setup your gears
            </h1>
          </div>

          {/* Form Fields */}
          <div className="flex flex-col items-start p-0 gap-[28px] w-[320px] h-[376px]">
            {/* Gloves Question */}
            <div className="flex flex-col items-start p-0 gap-[16px] w-[320px] h-[120px]">
              <label className="w-[320px] h-[16px] font-manrope font-extrabold text-[12px] leading-[16px] tracking-[0.05em] uppercase text-black">
                DO YOU HAVE A GLOVES
              </label>
              <div className="flex flex-row items-start p-0 gap-[12px] w-[320px] h-[48px]">
                {["Yes", "No"].map((option) => (
                  <button
                    key={option}
                    onClick={() => setHasGloves(option === "Yes")}
                    className={`box-border flex flex-col justify-center items-center p-[10px_8px] gap-[6px] w-[154px] h-[48px] bg-white ${
                      hasGloves === (option === "Yes")
                        ? "border border-[#D62422]"
                        : "border border-[#B1B1B1]"
                    }`}
                  >
                    <span className={`w-[20px] h-[14px] font-manrope font-medium text-[12px] leading-[14px] text-center ${
                      hasGloves === (option === "Yes") ? "text-black" : "text-[#717171]"
                    }`}>
                      {option}
                    </span>
                  </button>
                ))}
              </div>
              {hasGloves === false && (
                <div className="flex flex-row items-center p-0 gap-[8px] w-[301px] h-[24px]">
                  <svg className="w-[24px] h-[24px]" fill="none" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="#B0B0B0" strokeWidth="2"/>
                    <path d="M12 16v-4" stroke="#B0B0B0" strokeWidth="2"/>
                    <path d="M12 8h.01" stroke="#B0B0B0" strokeWidth="2"/>
                  </svg>
                  <span className="w-[269px] h-[19px] font-manrope font-medium text-[14px] leading-[19px] text-[#717171]">
                    Don't worry, your trainer will bring it
                  </span>
                </div>
              )}
            </div>

            {/* Glove Size */}
            <div className="flex flex-col items-start p-0 gap-[16px] w-[320px] h-[80px]">
              <label className="w-[320px] h-[16px] font-manrope font-extrabold text-[12px] leading-[16px] tracking-[0.05em] uppercase text-black">
                YOUR GLOVE SIZE (IN OZ)
              </label>
              <div className="flex flex-row items-start p-0 gap-[12px] w-[320px] h-[48px]">
                {[8, 10, 12, 14, 16, 18].map((size) => (
                  <button
                    key={size}
                    onClick={() => setGloveSize(size)}
                    className={`box-border flex flex-col justify-center items-center p-[10px_8px] gap-[6px] w-[43.33px] h-[48px] bg-white ${
                      gloveSize === size
                        ? "border border-[#D62422]"
                        : "border border-[#B1B1B1]"
                    }`}
                  >
                    <span className={`w-[13px] h-[14px] font-manrope font-medium text-[12px] leading-[14px] text-center ${
                      gloveSize === size ? "text-black" : "text-[#717171]"
                    }`}>
                      {size}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Handwraps Question */}
            <div className="flex flex-col items-start p-0 gap-[16px] w-[320px] h-[120px]">
              <label className="w-[320px] h-[16px] font-manrope font-extrabold text-[12px] leading-[16px] tracking-[0.05em] uppercase text-black">
                DO YOU HAVE HANDWRAPS
              </label>
              <div className="flex flex-row items-start p-0 gap-[12px] w-[320px] h-[48px]">
                {["Yes", "No"].map((option) => (
                  <button
                    key={option}
                    onClick={() => setHasHandwrap(option === "Yes")}
                    className={`box-border flex flex-col justify-center items-center p-[10px_8px] gap-[6px] w-[154px] h-[48px] bg-white ${
                      hasHandwrap === (option === "Yes")
                        ? "border border-[#D62422]"
                        : "border border-[#B1B1B1]"
                    }`}
                  >
                    <span className={`w-[20px] h-[14px] font-manrope font-medium text-[12px] leading-[14px] text-center ${
                      hasHandwrap === (option === "Yes") ? "text-black" : "text-[#717171]"
                    }`}>
                      {option}
                    </span>
                  </button>
                ))}
              </div>
              {hasHandwrap === false && (
                <div className="flex flex-row items-center p-0 gap-[8px] w-[301px] h-[24px]">
                  <svg className="w-[24px] h-[24px]" fill="none" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="#B0B0B0" strokeWidth="2"/>
                    <path d="M12 16v-4" stroke="#B0B0B0" strokeWidth="2"/>
                    <path d="M12 8h.01" stroke="#B0B0B0" strokeWidth="2"/>
                  </svg>
                  <span className="w-[269px] h-[19px] font-manrope font-medium text-[14px] leading-[19px] text-[#717171]">
                    Don't worry, your trainer will bring it
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Button Section */}
      <div className="flex flex-col items-start p-[16px_20px_28px] gap-[10px] m-0 auto w-[360px] h-[96px]">
        {error && <div className="text-red-500 mb-4">{error}</div>}
        
        <PrimaryButton
          onClick={handleGetStarted}
          disabled={loading}
          label={loading ? "UPDATING..." : "GET STARTED"}
        />
      </div>
    </div>
  );
};

export default BasicDetails2;
