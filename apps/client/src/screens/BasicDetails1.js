import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../services/api";
import { PrimaryButton } from "../components/Button";
import BackIcon from "../components/BackIcon";
import { SingleInput, TextInput } from "../components/InputComponents";
import { ReactComponent as BeginnerIcon } from "../assets/icon_beginner.svg";
import { ReactComponent as IntermediateIcon } from "../assets/icon_intermediate.svg";
import { ReactComponent as ProfessionalIcon } from "../assets/icon_professional.svg";

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

  const getExperienceIconColor = (level) =>
    experience === level ? "#D62422" : "#B0B0B0";

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
      navigate("/student/basic-details2");
    } catch (error) {
      setError("Failed to update profile");
      setLoading(false);
    }
  }, [name, age, sex, experience, navigate]);

  return (
    <div className="flex flex-col justify-between items-center p-0 gap-[42px] relative w-[360px] h-[800px] bg-[#F7F7F7]">
      {/* Main Content Frame */}
      <div className="flex flex-col items-start p-0 m-0 auto w-[360px] h-[578px]">
        {/* Header */}
        <div className="flex flex-row items-center p-5 gap-[10px] w-[360px] h-[80px] bg-[#F7F7F7]">
          <BackIcon />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center items-start p-6 gap-[40px] w-[360px] h-[498px]">
          {/* Title Section */}
          <div className="flex flex-col items-start p-0 gap-[28px] w-[215px] h-[58px]">
            {/* Progress Bar */}
            <div className="flex flex-row items-center p-0 gap-[12px] w-[92px] h-[4px]">
              <div className="w-[40px] h-[4px] bg-[#D62422]"></div>
              <div className="w-[40px] h-[4px] bg-[#B0B0B0]"></div>
            </div>
            
            {/* Title */}
            <h1 className="w-[215px] h-[26px] font-manrope font-bold text-[20px] leading-[26px]">
              Let us know about you
            </h1>
          </div>

          {/* Form Fields */}
          <div className="flex flex-col items-start p-0 gap-[28px] w-[320px] h-[352px]">
            {/* Name Input */}
            <div className="flex flex-col items-start p-0 gap-[16px] w-[320px] h-[80px]">
              <label className="w-[320px] h-[16px] font-manrope font-extrabold text-[12px] leading-[16px] tracking-[0.05em] uppercase text-black">
                WHAT SHOULD TRAINERS CALL YOU?
              </label>
              <div className="flex flex-col items-start p-0 gap-[16px] w-[320px] h-[48px]">
                <div className="box-border flex flex-row items-center p-[10px_8px_10px_16px] gap-[160px] w-[320px] h-[48px] border border-[#B1B1B1] bg-white">
                  <div className="flex flex-row items-start p-0 gap-[12px] w-[70px] h-[17px]">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-[70px] h-[17px] font-manrope font-medium text-[14px] leading-[120%] text-left text-[#717171] border-none outline-none bg-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Experience Selection */}
            <div className="flex flex-col items-start p-0 gap-[16px] w-[320px] h-[136px]">
              <label className="w-[320px] h-[16px] font-manrope font-extrabold text-[12px] leading-[16px] tracking-[0.05em] uppercase text-black">
                YOUR MUAYTHAI EXPERIENCE
              </label>
              <div className="flex flex-row items-start p-0 gap-[16px] w-[320px] h-[104px]">
                {["Beginner", "Intermediate", "Professional"].map((level) => (
                  <button
                    key={level}
                    onClick={() => setExperience(level)}
                    className={`box-border flex flex-col justify-center items-center p-[8px_8px_16px] gap-[6px] w-[96px] h-[104px] ${
                      experience === level
                        ? "border border-[#D62422] bg-white"
                        : "border border-[#B1B1B1] bg-white"
                    }`}
                  >
                    <div className="w-[48px] h-[60px] flex flex-col justify-center items-center">
                      {level === "Beginner" && (
                        <BeginnerIcon
                          fill={getExperienceIconColor(level)}
                          stroke={getExperienceIconColor(level)}
                        />
                      )}
                      {level === "Intermediate" && (
                        <IntermediateIcon
                          fill={getExperienceIconColor(level)}
                          stroke={getExperienceIconColor(level)}
                        />
                      )}
                      {level === "Professional" && (
                        <ProfessionalIcon
                          fill={getExperienceIconColor(level)}
                          stroke={getExperienceIconColor(level)}
                        />
                      )}
                    </div>
                    <span className={`w-full h-[14px] font-manrope font-medium text-[12px] leading-[14px] text-center ${
                      experience === level ? "text-black" : "text-[#717171]"
                    }`}>
                      {level}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Age and Sex Row */}
            <div className="flex flex-row items-start p-0 gap-[28px] w-[320px] h-[80px]">
              {/* Age Input */}
              <div className="flex flex-col items-start p-0 gap-[16px] w-[146px] h-[80px]">
                <label className="w-[146px] h-[16px] font-manrope font-extrabold text-[12px] leading-[16px] tracking-[0.05em] uppercase text-black">
                  HOW OLD ARE YOU?
                </label>
                <div className="flex flex-col items-start p-0 gap-[16px] w-[146px] h-[48px]">
                  <div className="box-border flex flex-row items-center p-[10px_8px_10px_16px] gap-[160px] w-[146px] h-[48px] border border-[#B1B1B1] bg-white">
                    <div className="flex flex-row items-start p-0 gap-[12px] w-[58px] h-[17px]">
                      <input
                        type="text"
                        placeholder="Your Age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="w-[58px] h-[17px] font-manrope font-medium text-[14px] leading-[120%] text-left text-[#717171] border-none outline-none bg-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Sex Selection */}
              <div className="flex flex-col items-start p-0 gap-[16px] w-[146px] h-[80px]">
                <label className="w-[146px] h-[16px] font-manrope font-extrabold text-[12px] leading-[16px] tracking-[0.05em] uppercase text-black">
                  DIVISION (SEX)
                </label>
                <div className="flex flex-row items-start p-0 gap-[12px] w-[146px] h-[48px]">
                  {["Male", "Female"].map((gender) => (
                    <button
                      key={gender}
                      onClick={() => setSex(gender)}
                      className={`box-border flex flex-col justify-center items-center p-[10px_8px] gap-[6px] w-[67px] h-[48px] bg-white ${
                        sex === gender
                          ? "border border-[#D62422]"
                          : "border border-[#B1B1B1]"
                      }`}
                    >
                      <span className={`w-[11px] h-[14px] font-manrope font-medium text-[12px] leading-[14px] text-center ${
                        sex === gender ? "text-black" : "text-[#717171]"
                      }`}>
                        {gender === "Male" ? "M" : "F"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Button Section */}
      <div className="flex flex-col items-start p-[16px_20px_28px] gap-[10px] m-0 auto w-[360px] h-[96px]">
        {error && <div className="text-red-500 mb-4">{error}</div>}

        <PrimaryButton
          onClick={handleNext}
          disabled={loading}
          label={loading ? "UPDATING..." : "NEXT"}
        />
      </div>
    </div>
  );
};

export default BasicDetails1;
