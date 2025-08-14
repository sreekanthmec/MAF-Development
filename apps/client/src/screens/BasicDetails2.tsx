import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { PrimaryButton } from "../components/Button";
import { updateProfile } from "../services/api";

export default function BasicDetails2() {
  const navigate = useNavigate();

  // mock from API
  const userProfile = { hasGloves: true, gloveSize: 14, hasHandwrap: true };

  const [hasGloves, setHasGloves] = useState<boolean | null>(null);
  const [gloveSize, setGloveSize] = useState<number | null>(null);
  const [hasHandwrap, setHasHandwrap] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  const ynBtn = (selected: boolean) =>
    `w-[154px] h-12 grid place-items-center border bg-white ${
      selected ? "border-[#D62422]" : "border-[#B1B1B1]"
    }`;

  const sizeBtn = (selected: boolean) =>
    `w-10 h-12 grid place-items-center border bg-white ${
      selected ? "border-[#D62422]" : "border-[#B1B1B1]"
    }`;

  return (
    <div className="w-full bg-[#F7F7F7] min-h-[100dvh]">
      <div className="mx-auto max-w-[400px] h-[100dvh] flex flex-col">
        <Navbar onBack={() => navigate(-1)} />

        {/* content (no scroll) */}
        <div className="px-5 pt-2">
          {/* progress + title */}
          <div className="mb-7">
            <div className="flex items-center gap-3 mb-7">
              <div className="w-10 h-1 bg-[#D62422]" />
              <div className="w-10 h-1 bg-[#D62422]" />
            </div>
            <h1 className="font-manrope font-bold text-[20px] leading-[26px]">
              Setup your gears
            </h1>
          </div>

          {/* gloves */}
          <div className="mb-7">
            <label className="block font-manrope font-extrabold text-[12px] tracking-[0.05em] uppercase mb-3">
              Do you have a gloves
            </label>
            <div className="flex gap-3 mb-2">
              <button type="button" onClick={() => setHasGloves(true)} className={ynBtn(hasGloves === true)}>
                <span className={hasGloves === true ? "text-black" : "text-[#717171] text-[12px]"}>Yes</span>
              </button>
              <button type="button" onClick={() => setHasGloves(false)} className={ynBtn(hasGloves === false)}>
                <span className={hasGloves === false ? "text-black" : "text-[#717171] text-[12px]"}>No</span>
              </button>
            </div>
            {hasGloves === false && (
              <div className="flex items-center gap-2 text-[#717171]">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="#B0B0B0" strokeWidth="2" />
                  <path d="M12 16v-4" stroke="#B0B0B0" strokeWidth="2" />
                  <path d="M12 8h.01" stroke="#B0B0B0" strokeWidth="2" />
                </svg>
                <span className="font-manrope text-[14px]">Don't worry, your trainer will bring it</span>
              </div>
            )}
          </div>

          {/* glove size */}
          <div className="mb-7">
            <label className="block font-manrope font-extrabold text-[12px] tracking-[0.05em] uppercase mb-3">
              Your glove size (in oz)
            </label>
            <div className="grid grid-cols-6 gap-3">
              {[8, 10, 12, 14, 16, 18].map((s) => (
                <button key={s} type="button" onClick={() => setGloveSize(s)} className={sizeBtn(gloveSize === s)}>
                  <span className={`text-[12px] ${gloveSize === s ? "text-black" : "text-[#717171]"}`}>{s}</span>
                </button>
              ))}
            </div>
          </div>

          {/* handwraps */}
          <div className="mb-4">
            <label className="block font-manrope font-extrabold text-[12px] tracking-[0.05em] uppercase mb-3">
              Do you have handwraps
            </label>
            <div className="flex gap-3 mb-2">
              <button type="button" onClick={() => setHasHandwrap(true)} className={ynBtn(hasHandwrap === true)}>
                <span className={hasHandwrap === true ? "text-black" : "text-[#717171] text-[12px]"}>Yes</span>
              </button>
              <button type="button" onClick={() => setHasHandwrap(false)} className={ynBtn(hasHandwrap === false)}>
                <span className={hasHandwrap === false ? "text-black" : "text-[#717171] text-[12px]"}>No</span>
              </button>
            </div>
            {hasHandwrap === false && (
              <div className="flex items-center gap-2 text-[#717171]">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="#B0B0B0" strokeWidth="2" />
                  <path d="M12 16v-4" stroke="#B0B0B0" strokeWidth="2" />
                  <path d="M12 8h.01" stroke="#B0B0B0" strokeWidth="2" />
                </svg>
                <span className="font-manrope text-[14px]">Don't worry, your trainer will bring it</span>
              </div>
            )}
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}
        </div>

        {/* bottom button */}
        <div className="mt-auto w-full bg-white">
          <div className="mx-auto max-w-[400px] px-5 py-4 pb-[max(16px,env(safe-area-inset-bottom))]">
            <PrimaryButton
              onClick={handleGetStarted}
              disabled={loading}
              label={loading ? "UPDATING..." : "GET STARTED"}
              className="!w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
