import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../services/api";
import BackIcon from "../components/BackIcon";
import { PrimaryButton } from "../components/Button";

export default function BasicDetails2() {
  // Replace with real API data
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
      await updateProfile({ hasGloves, gloveSize, hasHandwrap });
      navigate("/student/home");
    } catch {
      setError("Failed to update profile");
    } finally {
      setLoading(false);
    }
  }, [hasGloves, gloveSize, hasHandwrap, navigate]);

  const ynBtn = (selected) =>
    `w-[154px] h-12 grid place-items-center border bg-white ${
      selected ? "border-[#D62422]" : "border-[#B1B1B1]"
    }`;

  const sizeBtn = (selected) =>
    `w-10 h-12 grid place-items-center border bg-white ${
      selected ? "border-[#D62422]" : "border-[#B1B1B1]"
    }`;

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
              <div className="w-10 h-1 bg-[#D62422]" />
            </div>
            <h1 className="font-manrope font-bold text-[20px] leading-[26px]">
              Setup your gears
            </h1>
          </div>

          {/* Gloves */}
          <div className="space-y-4">
            <label className="font-manrope font-extrabold text-[12px] leading-[16px] tracking-[0.05em] uppercase text-black">
              Do you have a gloves
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setHasGloves(true)}
                className={ynBtn(hasGloves === true)}
              >
                <span className={hasGloves === true ? "text-black" : "text-[#717171] text-[12px]"}>
                  Yes
                </span>
              </button>
              <button
                type="button"
                onClick={() => setHasGloves(false)}
                className={ynBtn(hasGloves === false)}
              >
                <span className={hasGloves === false ? "text-black" : "text-[#717171] text-[12px]"}>
                  No
                </span>
              </button>
            </div>

            {hasGloves === false && (
              <div className="flex items-center gap-2 text-[#717171]">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="#B0B0B0" strokeWidth="2" />
                  <path d="M12 16v-4" stroke="#B0B0B0" strokeWidth="2" />
                  <path d="M12 8h.01" stroke="#B0B0B0" strokeWidth="2" />
                </svg>
                <span className="font-manrope text-[14px]">
                  Don't worry, your trainer will bring it
                </span>
              </div>
            )}
          </div>

          {/* Glove size */}
          <div className="space-y-4">
            <label className="font-manrope font-extrabold text-[12px] leading-[16px] tracking-[0.05em] uppercase text-black">
              Your glove size (in oz)
            </label>
            <div className="grid grid-cols-6 gap-3">
              {[8, 10, 12, 14, 16, 18].map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setGloveSize(size)}
                  className={sizeBtn(gloveSize === size)}
                >
                  <span
                    className={`font-manrope text-[12px] ${
                      gloveSize === size ? "text-black" : "text-[#717171]"
                    }`}
                  >
                    {size}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Handwraps */}
          <div className="space-y-4">
            <label className="font-manrope font-extrabold text-[12px] leading-[16px] tracking-[0.05em] uppercase text-black">
              Do you have handwraps
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setHasHandwrap(true)}
                className={ynBtn(hasHandwrap === true)}
              >
                <span className={hasHandwrap === true ? "text-black" : "text-[#717171] text-[12px]"}>
                  Yes
                </span>
              </button>
              <button
                type="button"
                onClick={() => setHasHandwrap(false)}
                className={ynBtn(hasHandwrap === false)}
              >
                <span className={hasHandwrap === false ? "text-black" : "text-[#717171] text-[12px]"}>
                  No
                </span>
              </button>
            </div>

            {hasHandwrap === false && (
              <div className="flex items-center gap-2 text-[#717171]">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="#B0B0B0" strokeWidth="2" />
                  <path d="M12 16v-4" stroke="#B0B0B0" strokeWidth="2" />
                  <path d="M12 8h.01" stroke="#B0B0B0" strokeWidth="2" />
                </svg>
                <span className="font-manrope text-[14px]">
                  Don't worry, your trainer will bring it
                </span>
              </div>
            )}
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}
        </div>

        {/* Fixed bottom action */}
        <div className="fixed inset-x-0 bottom-0 bg-white/95 backdrop-blur border-t">
          <div className="mx-auto max-w-[400px] px-5 py-4 pb-[max(16px,env(safe-area-inset-bottom))]">
            <PrimaryButton
              onClick={handleGetStarted}
              disabled={loading}
              label={loading ? "UPDATING..." : "GET STARTED"}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
