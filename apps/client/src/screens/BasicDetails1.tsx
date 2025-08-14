import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { PrimaryButton } from "../components/Button";
import { ReactComponent as BeginnerIcon } from "../assets/icon_beginner.svg";
import { ReactComponent as IntermediateIcon } from "../assets/icon_intermediate.svg";
import { ReactComponent as ProfessionalIcon } from "../assets/icon_professional.svg";
import { updateProfile } from "../services/api";

export default function BasicDetails1() {
  const navigate = useNavigate();

  // mock coming from API
  const userProfile = {
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

  useEffect(() => {
    setName(userProfile.name || "");
    setAge(userProfile.age ? String(userProfile.age) : "");
    setExperience(userProfile.experience || "Beginner");
    setSex(userProfile.sex || "Male");
  }, []);

  const colorFor = (level: string) => (experience === level ? "#D62422" : "#B0B0B0");

  const handleNext = useCallback(async () => {
    if (!name || !age || !sex) {
      setError("All fields are required");
      return;
    }
    setLoading(true);
    try {
      await updateProfile({ name, age, sex, experience });
      navigate("/student/basic-details2");
    } catch {
      setError("Failed to update profile");
    } finally {
      setLoading(false);
    }
  }, [name, age, sex, experience, navigate]);

  return (
    <div className="w-full bg-[#F7F7F7] min-h-[100dvh]">
      <div className="mx-auto max-w-[400px] h-[100dvh] flex flex-col">
        <Navbar onBack={() => navigate(-1)} />

        {/* content (fits viewport; no scroll) */}
        <div className="px-5 pt-2">
          {/* progress + title */}
          <div className="mb-7">
            <div className="flex items-center gap-3 mb-7">
              <div className="w-10 h-1 bg-[#D62422]" />
              <div className="w-10 h-1 bg-[#B0B0B0]" />
            </div>
            <h1 className="font-manrope font-bold text-[20px] leading-[26px]">
              Let us know about you
            </h1>
          </div>

          {/* name */}
          <div className="mb-7">
            <label className="block font-manrope font-extrabold text-[12px] tracking-[0.05em] uppercase mb-3">
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

          {/* experience */}
          <div className="mb-7">
            <label className="block font-manrope font-extrabold text-[12px] tracking-[0.05em] uppercase mb-3">
              Your Muaythai Experience
            </label>
            <div className="grid grid-cols-3 gap-4">
              {[
                { k: "Beginner", Icon: BeginnerIcon },
                { k: "Intermediate", Icon: IntermediateIcon },
                { k: "Professional", Icon: ProfessionalIcon },
              ].map(({ k, Icon }) => {
                const selected = experience === k;
                return (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setExperience(k)}
                    className={`border bg-white flex flex-col items-center justify-center gap-1.5 py-2 ${
                      selected ? "border-[#D62422]" : "border-[#B1B1B1]"
                    }`}
                  >
                    <Icon fill={colorFor(k)} stroke={colorFor(k)} width={48} height={60} />
                    <span className={`text-[12px] ${selected ? "text-black" : "text-[#717171]"}`}>
                      {k}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* age + sex */}
          <div className="grid grid-cols-2 gap-7">
            <div>
              <label className="block font-manrope font-extrabold text-[12px] tracking-[0.05em] uppercase mb-3">
                How old are you?
              </label>
              <div className="border border-[#B1B1B1] bg-white px-4 py-2.5">
                <input
                  type="number"
                  inputMode="numeric"
                  placeholder="Your Age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full font-manrope text-[14px] placeholder:text-[#717171] outline-none bg-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block font-manrope font-extrabold text-[12px] tracking-[0.05em] uppercase mb-3">
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
                      <span className={`text-[12px] ${selected ? "text-black" : "text-[#717171]"}`}>
                        {g === "Male" ? "M" : "F"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {error && <p className="text-red-600 text-sm mt-4">{error}</p>}
        </div>

        {/* bottom button */}
        <div className="mt-auto w-full bg-white">
          <div className="mx-auto max-w-[400px] px-5 py-4 pb-[max(16px,env(safe-area-inset-bottom))]">
            <PrimaryButton
              onClick={handleNext}
              disabled={loading}
              label={loading ? "UPDATING..." : "NEXT"}
              className="!w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
