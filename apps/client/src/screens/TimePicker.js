import React, { useState } from "react";
import { PrimaryButton } from "../components/Button";

const TimePicker = ({ onConfirm, onClose }) => {
  const [hour, setHour] = useState(9);
  const [minute, setMinute] = useState(0);
  const [period, setPeriod] = useState("AM");

  const handleConfirm = () => {
    const time = `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")} ${period}`;
    onConfirm(time);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end z-50">
      <div className="bg-white w-full max-w-sm p-4 rounded-t-md">
        <div className="flex justify-between items-center">
          <div className="flex flex-col items-center">
            <div className="overflow-y-scroll h-40">
              {[...Array(12).keys()].map((h) => (
                <div
                  key={h}
                  className={`p-2 cursor-pointer ${
                    h + 1 === hour ? "text-red-600" : "text-gray-700"
                  }`}
                  onClick={() => setHour(h + 1)}
                >
                  {h + 1}
                </div>
              ))}
            </div>
            <span>Hours</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="overflow-y-scroll h-40">
              {[...Array(60).keys()].map((m) => (
                <div
                  key={m}
                  className={`p-2 cursor-pointer ${
                    m === minute ? "text-red-600" : "text-gray-700"
                  }`}
                  onClick={() => setMinute(m)}
                >
                  {m.toString().padStart(2, "0")}
                </div>
              ))}
            </div>
            <span>Minutes</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="overflow-y-scroll h-40">
              {["AM", "PM"].map((p) => (
                <div
                  key={p}
                  className={`p-2 cursor-pointer ${
                    p === period ? "text-red-600" : "text-gray-700"
                  }`}
                  onClick={() => setPeriod(p)}
                >
                  {p}
                </div>
              ))}
            </div>
            <span>AM/PM</span>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <button onClick={onClose} className="p-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 18L18 6M6 6l12 12"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <PrimaryButton onClick={handleConfirm} label={"CONFIRM"} />
        </div>
      </div>
    </div>
  );
};

export default TimePicker;
