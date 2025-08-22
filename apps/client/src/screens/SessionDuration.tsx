// src/screens/SessionDuration.tsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AdvancedTimePicker from "../components/AdvancedTimePicker";
import { PrimaryButton } from "../components/Button";
import CreditsBalance from "../components/CreditBalance";
import Navbar from "../components/Navbar";

/** Small helper: extract "9AM - 11AM" -> "9:00 AM", "11:00 AM" */
const parseTimeFromSlot = (timeSlot?: string) => {
  if (!timeSlot) return { start: "9:00 AM", end: "10:30 AM" };
  const m = timeSlot.match(/(\d+)(AM|PM)\s*-\s*(\d+)(AM|PM)/i);
  if (!m) return { start: "9:00 AM", end: "10:30 AM" };
  const [, sh, sp, eh, ep] = m;
  return { start: `${sh}:00 ${sp.toUpperCase()}`, end: `${eh}:00 ${ep.toUpperCase()}` };
};

export default function SessionDuration() {
  const navigate = useNavigate();
  const { state } = useLocation() as any;
  const { trainer, time, day } = state || {};

  const { start: defaultStart, end: defaultEnd } = parseTimeFromSlot(time);
  const [startTime, setStartTime] = useState(defaultStart);
  const [endTime, setEndTime] = useState(defaultEnd);
  const [duration, setDuration] = useState<number>(90);
  const [notes, setNotes] = useState<string>("");
  const [agreed, setAgreed] = useState<boolean>(true);
  const [showPicker, setShowPicker] = useState(false);
  const [pickerType, setPickerType] = useState<"start" | "end">("start");

  const openPicker = (type: "start" | "end") => {
    setPickerType(type);
    setShowPicker(true);
  };
  const onPickTime = (t: string) => {
    if (pickerType === "start") setStartTime(t);
    else setEndTime(t);
    setShowPicker(false);
  };

  const dec = () => setDuration((d) => Math.max(30, d - 30));
  const inc = () => setDuration((d) => d + 30);

  const bookNow = () => {
    if (!agreed) return alert("You must agree to the terms and policies");
    navigate("/student/buy-credits", {
      state: {
        trainer,
        time,
        day,
        startTime,
        endTime,
        sessionDuration: duration,
        notes,
        selectedAddress: state?.selectedAddress,
      },
    });
  };

  return (
    <div className="h-[100dvh] flex flex-col bg-[#F7F7F7] pt-[max(12px,env(safe-area-inset-top))]">
      <Navbar 
          background="transparent"
          right={
            <CreditsBalance 
              balance={100} 
              variant="white-only"
            />
          }
        />
      {/* Scrollable content */}
      <div 
        className="flex-1 overflow-y-auto"
        style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-y" }}
      >
        <div className="mx-auto max-w-[400px] px-5 pb-4">
        {/* header */}
        

        {/* title */}
        <h1 className="text-[22px] font-extrabold text-black mt-2">Session Duration</h1>

        {/* time rows */}
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-[14px] font-semibold text-black">Start Time</label>
            <button
              onClick={() => openPicker("start")}
              className="min-w-[160px] h-[44px] border border-[#DEDEDE] bg-white px-4 grid place-items-center text-[14px] font-semibold"
            >
              {startTime}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <label className="text-[14px] font-semibold text-black">End Time</label>
            <button
              onClick={() => openPicker("end")}
              className="min-w-[160px] h-[44px] border border-[#DEDEDE] bg-white px-4 grid place-items-center text-[14px] font-semibold"
            >
              {endTime}
            </button>
          </div>
        </div>

        {/* duration bar */}
        <div className="mt-6 border border-[#DEDEDE] flex items-stretch">
          <button
            aria-label="decrease duration"
            onClick={dec}
            className="w-[24px] h-[24px] m-5 grid place-items-center bg-[#EB2726] text-white"
          >
            <svg width="18" height="2" viewBox="0 0 18 2" fill="none">
              <rect width="18" height="2" fill="currentColor" />
            </svg>
          </button>
          <div className="flex-1 grid place-items-center text-[14px]">
            <span className="font-bold">{duration} mins Session</span>
          </div>
          <button
            aria-label="increase duration"
            onClick={inc}
            className="w-[24px] h-[24px] m-5 grid place-items-center bg-[#EB2726] text-white"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M8 0h2v18H8zM0 8h18v2H0z" fill="currentColor" />
            </svg>
          </button>
        </div>

        {/* notes */}
        <div className="mt-6">
          <div className="text-[12px] text-[#8A8A8A] mb-2">Notes to Trainer</div>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={`“Would like to train kicks and some cardio”\n“Haven’t practised in a while”`}
            className="w-full h-[120px] border border-[#DEDEDE] bg-[#F7F7F7] rounded-none p-4 text-[14px] resize-none outline-none"
          />
        </div>

        {/* agreement */}
        <label className="mt-6 flex items-start gap-3">
          <button
            type="button"
            onClick={() => setAgreed((a) => !a)}
            className={[
              "mt-0.5 w-5 h-5 border-2",
              agreed ? "bg-[#EB2726] border-[#EB2726]" : "border-[#EB2726]",
            ].join(" ")}
          >
            {agreed && (
              <svg className="mx-auto mt-[2px]" width="12" height="12" viewBox="0 0 20 20" fill="none">
                <path d="M4 10l4 4 8-8" stroke="white" strokeWidth="2" />
              </svg>
            )}
          </button>
          <span className="text-[14px] text-[#2D2D2D]">
            I agree with FitAny{" "}
            <a href="#" className="underline text-[#EB2726]">
              Terms and policies
            </a>
            . And I shall be respectful towards my trainer.
          </span>
        </label>
        </div>
      </div>

      {/* Fixed footer */}
      <div className="bg-white border-t border-[#EAEAEA]">
        <div className="mx-auto max-w-[400px] px-5 py-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[16px] font-semibold text-black">Total Credits</span>
            <span className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M4.17657 11.0585H1L11.3812 0H13.6188L10.7647 6.21159H14L3.6188 16H1.38121L4.17657 11.0585Z"
                  fill="#FFC800"
                />
              </svg>
              <span className="text-[16px] font-extrabold text-[#202020]">200</span>
            </span>
          </div>

          <PrimaryButton label="BOOK NOW" onClick={bookNow} className="!w-full" />
        </div>
      </div>

      {/* time picker modal */}
      {showPicker && (
        <AdvancedTimePicker
          onConfirm={onPickTime}
          onClose={() => setShowPicker(false)}
          initialTime={pickerType === "start" ? startTime : endTime}
        />
      )}
    </div>
  );
}
