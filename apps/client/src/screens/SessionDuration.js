import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TimePicker from "./TimePicker"; // Ensure this path is correct
import BackIcon from "../components/BackIcon";
import { PrimaryButton } from "../components/Button";
import SessionDurationCounter from "../components/SessionDurationCounter";
import CreditsBalance from "../components/CreditBalance";

const SessionDuration = () => {
  const navigate = useNavigate();
  const [startTime, setStartTime] = useState("9:00 AM");
  const [endTime, setEndTime] = useState("10:30 AM");
  const [sessionDuration, setSessionDuration] = useState(90); // Duration in minutes
  const [notes, setNotes] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [pickerType, setPickerType] = useState("start");

  const handleTimeChange = (newTime) => {
    if (pickerType === "start") {
      setStartTime(newTime);
    } else if (pickerType === "end") {
      setEndTime(newTime);
    }
    setShowTimePicker(false);
  };

  const handleBookNow = () => {
    if (agreed) {
      navigate("/buy-credits");
    } else {
      alert("You must agree to the terms and conditions");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 relative">
      <header className="flex justify-between items-center mb-4">
        <BackIcon />
        <CreditsBalance balance={300} />
      </header>

      <section>
        <h1 className="text-2xl font-bold mb-4">Session Duration</h1>

        {/* Start Time Row */}
        <div className="mb-4">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium text-gray-700">
              Start Time
            </label>
            <input
              type="text"
              value={startTime}
              onClick={() => {
                setPickerType("start");
                setShowTimePicker(true);
              }}
              className="block text-center border border-gray-400 shadow-sm p-2"
            />
          </div>
        </div>

        {/* End Time Row */}
        <div className="mb-4">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium text-gray-700">
              End Time
            </label>
            <input
              type="text"
              value={endTime}
              onClick={() => {
                setPickerType("end");
                setShowTimePicker(true);
              }}
              className="block text-center border border-gray-400 shadow-sm p-2"
            />
          </div>
        </div>

        {/* Session Duration Counter */}
        <div className="mb-4">
          <SessionDurationCounter
            sessionDuration={sessionDuration}
            decrementDuration={() => setSessionDuration(sessionDuration - 30)}
            incrementDuration={() => setSessionDuration(sessionDuration + 30)}
          />
        </div>

        {/* Notes Section */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Notes to Trainer
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Would like to train kicks and some cardio..."
            className="mt-1 block w-full rounded-md border-gray-400 shadow-sm h-32"
          ></textarea>
        </div>

        {/* Agreement Section */}
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
              className="form-checkbox text-red-600"
            />
            <span className="ml-2">
              I agree with FitAny{" "}
              <a href="#" className="text-red-600">
                Terms and policies
              </a>
              . And I shall be respectful towards my trainer.
            </span>
          </label>
        </div>

        {/* Total Credits and Book Now Button */}
        <div className="flex-col justify-between items-center mt-6">
          <span className="text-lg">
            Total Credits <span className="text-yellow-500">200</span>
          </span>
          <PrimaryButton label="BOOK NOW" onClick={handleBookNow} />
        </div>
      </section>

      {/* Time Picker Modal */}
      {showTimePicker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end z-50">
          <div className="bg-white w-full max-w-sm p-4 rounded-t-md">
            <TimePicker
              onConfirm={handleTimeChange}
              onClose={() => setShowTimePicker(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionDuration;
