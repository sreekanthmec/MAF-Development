import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Phone, MapPin, Clock, User, Edit, X } from "lucide-react";
import { PrimaryButton, SecondaryButton, TertiaryButton } from "../components/Button";

export default function TrainerSessionDetails() {
  const navigate = useNavigate();

  const sessionData = {
    date: "Jul 24, Thursday",
    time: "10:00 AM - 12:00 PM",
    duration: "120 mins Session",
    location: {
      type: "HOME",
      address: "Block 105, Lew Lian Vale Serangoon 537016",
      distance: "20 km Away",
    },
    countdown: "2d 4h 30m",
    student: {
      name: "Arun P",
      age: "22",
      gender: "Female",
      level: "BEGINNER",
      requirements: { gloves: "YES", gloveSize: "8", handWraps: "YES" },
    },
    notes:
      "Hi sir, I am looking to get back in shape. Haven't practised in a while. Would like to start slow.",
  };

  const onBack = () => navigate(-1);
  const onSupport = () => alert("Contacting support…");
  const onMessage = () => alert("Opening chat with student…");
  const onCall = () => alert("Calling student…");
  const onCancel = () => alert("Cancel flow…");

  return (
    // 👉 Dedicated scroll container so the page scrolls even if a parent is overflow-hidden
    <div
      className="h-screen overflow-y-auto overflow-x-hidden bg-[#2d2d2d]"
      style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-y" }}
    >
      {/* Full-bleed dark header */}
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
              <Phone className="w-4 h-4" />
              <span>Support</span>
            </button>
          </div>

          {/* Date & time */}
          <div className="mb-6">
            <h1 className="text-[#FA403F] text-2xl font-bold mb-2">{sessionData.date}</h1>
            <p className="text-lg mb-2">{sessionData.time}</p>
            <div className="flex items-center text-gray-300">
              <Clock className="w-4 h-4 mr-2" />
              <span className="text-sm">{sessionData.duration}</span>
            </div>
          </div>

          {/* Location */}
          <div className="mb-6">
            <h2 className="text-white font-semibold text-base mb-2">{sessionData.location.type}</h2>
            <div className="flex items-start text-gray-300 mb-1">
              <MapPin className="w-4 h-4 mr-2 mt-0.5" />
              <span className="text-sm">{sessionData.location.address}</span>
            </div>
            <p className="text-gray-300 text-sm">{sessionData.location.distance}</p>
          </div>

          {/* Countdown */}
          <div className="bg-black/60 border border-[#FA403F] px-4 py-3 rounded flex items-center justify-between">
            <span className="text-sm">Starts in</span>
            <span className="text-sm font-semibold">{sessionData.countdown}</span>
          </div>
        </div>
      </div>

      {/* Full-bleed white content */}
      <div className="w-full bg-white">
        <div className="mx-auto max-w-[400px] px-5 py-6 space-y-6">
          {/* Student details */}
          <div>
            <p className="text-gray-500 text-xs uppercase tracking-wide mb-4">// STUDENT DETAILS</p>

            <div className="bg-white border border-gray-200 rounded">
              <div className="p-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-black rounded flex items-center justify-center mr-3">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-black font-semibold text-base">{sessionData.student.name}</h3>
                      <p className="text-gray-500 text-sm">
                        {sessionData.student.age}, {sessionData.student.gender}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-black font-semibold text-sm">{sessionData.student.level}</span>
                  </div>
                </div>

                {/* Requirements */}
                <div className="space-y-2 pt-3 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <span className="text-black text-sm">Gloves</span>
                    <span className="text-black text-sm font-medium">
                      {sessionData.student.requirements.gloves}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-black text-sm">Glove Size</span>
                    <span className="text-black text-sm font-medium">
                      {sessionData.student.requirements.gloveSize}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-black text-sm">Hand Wraps</span>
                    <span className="text-black text-sm font-medium">
                      {sessionData.student.requirements.handWraps}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <PrimaryButton label="MESSAGE STUDENT" onClick={onMessage} className="!w-full" />
            <TertiaryButton label="CALL STUDENT" icon={Phone} onClick={onCall} className="!w-full" />
          </div>

          {/* Notes */}
          <div>
            <div className="flex items-center mb-3">
              <Edit className="w-4 h-4 text-gray-500 mr-2" />
              <h3 className="text-black font-semibold text-base">NOTES</h3>
            </div>
            <div className="bg-white border border-gray-200 rounded p-4">
              <p className="text-black text-sm leading-relaxed">{sessionData.notes}</p>
            </div>
          </div>

          {/* Cancel session */}
          <div className="pt-2">
            <SecondaryButton label="CANCEL SESSION" icon={X} onClick={onCancel} className="!w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
