// src/screens/StudentSessionDetails.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Phone,
  Clock,
  MessageCircle,
  MapPin,
  NotebookPen,
  X,
} from "lucide-react";
import { PrimaryButton, SecondaryButton, TertiaryButton } from "../components/Button";
import TrainerCardHeader from "../components/TrainerCardHeader";
import trainerImg from "../assets/trainer.png";
import { ConfirmCancelModal, CancelledSuccessModal } from "../components/CancelSessionFlow";


export default function StudentSessionDetails() {
  const navigate = useNavigate();
    // 🔴 NEW: simple flow flags
    const [showConfirm, setShowConfirm] = useState(false);
    const [showDone, setShowDone] = useState(false);
  
    // mock — replace with real value from your data if you have it
    const refundableCredits = 3;

  // Example data; replace with real route state / API payload
  const session = {
    dateLabel: "Aug 12, Wednesday",
    time: "10:00 AM - 11:00 AM",
    duration: "90 mins Session",
    countdown: "2d 4h 30m",
    trainer: {
      name: "HELENA PADILLA",
      rate: 3,
      age: 27,
      sex: "F" as const,
      image: trainerImg as unknown as string,
    },
    location: {
      type: "HOME",
      address: "Building no 356, 3rd floor, 29th street",
    },
    notes:
      "Hi mam, I am looking to get back in shape. Haven't practised in a while. Would like to start slow.",
  };

  const onBack = () => navigate(-1);
  const onSupport = () => alert("Contacting support…");
  const onMessage = () => alert("Opening chat with trainer…");
  const onCall = () => alert("Calling trainer…");
  const onCancel = () => setShowConfirm(true);

  return (
    // Dedicated scroll container (works even if a parent is overflow-hidden)
    <div
      className="h-[100dvh] overflow-y-auto overflow-x-hidden bg-[#2d2d2d]"
      style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-y" }}
    >
      {/* Dark header (full-bleed) */}
      <div className="w-full bg-[linear-gradient(157.07deg,#3a3a3a_0%,#252525_81.65%)]">
        <div className="mx-auto max-w-[400px] px-5 pt-6 pb-6 text-white">
          {/* Top row */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={onBack}
              className="p-1 text-white hover:opacity-80 active:opacity-60"
              aria-label="Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <button
              onClick={onSupport}
              className="bg-black border border-white/80 rounded px-3 py-2 flex items-center gap-2 text-sm hover:bg-black/80"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Support</span>
            </button>
          </div>

          {/* Date & time */}
          <div className="mb-4">
            <p className="text-[#FA403F] text-sm font-bold mb-2">
              {session.dateLabel}
            </p>
            <h1 className="text-[22px] font-semibold mb-2">{session.time}</h1>
            <div className="flex items-center text-gray-300">
              <Clock className="w-4 h-4 mr-2" />
              <span className="text-sm">{session.duration}</span>
            </div>
          </div>

          {/* Countdown bar inside header */}
          <div className="mt-4 bg-black/60 border border-[#FA403F] px-4 py-3 rounded flex items-center justify-between">
            <span className="text-sm">Starts in</span>
            <span className="text-sm font-semibold">{session.countdown}</span>
          </div>
        </div>
      </div>

      {/* White content (full-bleed) */}
      <div className="w-full bg-white">
        <div className="mx-auto max-w-[400px] px-5 py-6 space-y-8">
          {/* SESSION DETAILS */}
          <div>
            <p className="text-gray-500 text-xs uppercase tracking-wide mb-4">
              // SESSION DETAILS
            </p>

            {/* Trainer banner card */}
            <div className="bg-white border border-gray-200 rounded overflow-visible">
              {/* Reuse the shared banner header used across the app */}
              <TrainerCardHeader
                name={session.trainer.name}
                rate={session.trainer.rate}
                meta={`${session.trainer.age}${session.trainer.sex}`}
                imageSrc={session.trainer.image}
                variant="dark"
                height="auto"
                imgHeight={140}
                // imgOffsetY={-12}
                fillToImageTop
              />

              {/* Actions */}
              <div className="p-4 space-y-3">
                <PrimaryButton
                  label="MESSAGE TRAINER"
                  // icon={MessageCircle}
                  onClick={onMessage}
                  className="!w-full"
                />
                <TertiaryButton
                  label="CALL TRAINER"
                  icon={Phone}
                  onClick={onCall}
                  className="!w-full"
                />
              </div>
            </div>
          </div>

          {/* LOCATION */}
          <div className="space-y-2">
            <div className="flex items-center text-gray-500 text-xs uppercase tracking-wide">
              <MapPin className="w-4 h-4 mr-2" />
              <span>Location</span>
            </div>
            <div className="text-black font-semibold">{session.location.type}</div>
            <p className="text-[#5E5E5E] text-sm">{session.location.address}</p>
          </div>

          {/* NOTES */}
          <div>
            <div className="flex items-center text-gray-500 text-xs uppercase tracking-wide mb-2">
              <NotebookPen className="w-4 h-4 mr-2" />
              <span>Notes</span>
            </div>
            <div className="bg-white border border-gray-200 rounded p-4">
              <p className="text-black text-sm leading-relaxed">{session.notes}</p>
            </div>
          </div>

          {/* CANCEL */}
          <div className="pt-2">
            <SecondaryButton
              label="CANCEL SESSION"
              icon={X}
              onClick={onCancel}
              className="!w-full"
            />
          </div>
        </div>
      </div>
       {/* ------- modals ------- */}
       <ConfirmCancelModal
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        onKeep={() => setShowConfirm(false)}
        onConfirm={() => {
          setShowConfirm(false);
          // Do any API call here to cancel; on success:
          setShowDone(true);
        }}
      />

      <CancelledSuccessModal
        open={showDone}
        refundableCredits={refundableCredits}
        onClose={() => setShowDone(false)}
        onBookNew={() => {
          setShowDone(false);
          navigate("/explore-trainers"); // or your booking flow route
        }}
      />
    </div>
  );
}
