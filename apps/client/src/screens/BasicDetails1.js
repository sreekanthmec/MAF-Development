import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../services/api";
import { PrimaryButton } from "../components/Button";
import BackIcon from "../components/BackIcon";
import { ReactComponent as BeginnerIcon } from "../assets/icon_beginner.svg";
import { ReactComponent as IntermediateIcon } from "../assets/icon_intermediate.svg";
import { ReactComponent as ProfessionalIcon } from "../assets/icon_professional.svg";

export default function BasicDetails1() {
  // Mock: replace with API response you already get
  const userProfile = {
    _id: "66bdb6ff3be330bad19a3f34",
    mobileNumber: "9037511920",
    countryCode: "91",
    name: "test student",
    age: 30,
    sex: "Male",
    experience: "Intermediate",
  };

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [experience, setExperience] = useState("Beginner");
  const [sex, setSex] = useState("Male");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setName(userProfile.name || "");
    setAge(userProfile.age ? String(userProfile.age) : "");
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
      navigate("/student/basic-details2");
    } catch {
      setError("Failed to update profile");
    } finally {
      setLoading(false);
    }
  }, [name, age, sex, experience, navigate]);

  return (
    <div className="min-h-screen w-full bg-[#F7F7F7]">
      <div className="mx-auto max-w-[400px] min-h-screen flex flex-col">
        {/* Header */}
        <div className="p-5">
          <BackIcon />
        </div>

        {/* Scrollable content */}
        <div className="flex-1 px-5 pb-28 space-y-10">
          {/* Title + progress */}
          <div className="space-y-7">
            <div className="flex items-center gap-3">
              <div className="w-10 h-1 bg-[#D62422]" />
              <div className="w-10 h-1 bg-[#B0B0B0]" />
            </div>
            <h1 className="font-manrope font-bold text-[20px] leading-[26px]">
              Let us know about you
            </h1>
          </div>

          {/* Form */}
          <div className="space-y-7">
            {/* Name */}
            <div className="space-y-3">
              <label className="font-manrope font-extrabold text-[12px] leading-[16px] tracking-[0.05em] uppercase text-black">
                What should trainers call you?
              </label>
              <div className="border border-[#B1B1B1] bg-white px-4 py-2.5">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full font-manrope text-[14px] text-[#2d2d2d] placeholder:text-[#717171] outline-none bg-transparent"
                />
              </div>
            </div>

            {/* Experience */}
            <div className="space-y-3">
              <label className="font-manrope font-extrabold text-[12px] leading-[16px] tracking-[0.05em] uppercase text-black">
                Your Muaythai Experience
              </label>

              <div className="grid grid-cols-3 gap-4">
                {[
                  { key: "Beginner", Icon: BeginnerIcon },
                  { key: "Intermediate", Icon: IntermediateIcon },
                  { key: "Professional", Icon: ProfessionalIcon },
                ].map(({ key, Icon }) => {
                  const selected = experience === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setExperience(key)}
                      className={`border bg-white flex flex-col items-center justify-center gap-1.5 py-2 ${
                        selected ? "border-[#D62422]" : "border-[#B1B1B1]"
                      }`}
                    >
                      <Icon
                        fill={getExperienceIconColor(key)}
                        stroke={getExperienceIconColor(key)}
                        width={48}
                        height={60}
                      />
                      <span
                        className={`font-manrope text-[12px] ${
                          selected ? "text-black" : "text-[#717171]"
                        }`}
                      >
                        {key}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Age & Sex */}
            <div className="grid grid-cols-2 gap-7">
              {/* Age */}
              <div className="space-y-3">
                <label className="font-manrope font-extrabold text-[12px] leading-[16px] tracking-[0.05em] uppercase text-black">
                  How old are you?
                </label>
                <div className="border border-[#B1B1B1] bg-white px-4 py-2.5">
                  <input
                    type="number"
                    inputMode="numeric"
                    placeholder="Your Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full font-manrope text-[14px] text-[#2d2d2d] placeholder:text-[#717171] outline-none bg-transparent"
                  />
                </div>
              </div>

              {/* Sex */}
              <div className="space-y-3">
                <label className="font-manrope font-extrabold text-[12px] leading-[16px] tracking-[0.05em] uppercase text-black">
                  Division (Sex)
                </label>
                <div className="flex gap-3">
                  {["Male", "Female"].map((g) => {
                    const selected = sex === g;
                    return (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setSex(g)}
                        className={`w-[72px] h-[48px] border bg-white grid place-items-center ${
                          selected ? "border-[#D62422]" : "border-[#B1B1B1]"
                        }`}
                      >
                        <span
                          className={`font-manrope text-[12px] ${
                            selected ? "text-black" : "text-[#717171]"
                          }`}
                        >
                          {g === "Male" ? "M" : "F"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Error (if any) */}
          {error && <p className="text-red-600 text-sm">{error}</p>}
        </div>

        {/* Fixed bottom action */}
        <div className="fixed inset-x-0 bottom-0 bg-white/95 backdrop-blur border-t">
          <div className="mx-auto max-w-[400px] px-5 py-4 pb-[max(16px,env(safe-area-inset-bottom))]">
            <PrimaryButton
              onClick={handleNext}
              disabled={loading}
              label={loading ? "UPDATING..." : "NEXT"}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
