import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import trainerImage from "../assets/trainer.png"; // Replace with the correct path to your image
import BackIcon from "../components/BackIcon";

const TrainerDetails = ({ location }) => {
  const [tab, setTab] = useState("availability");
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const navigate = useNavigate();

  const trainer = location?.state?.trainer || {
    name: "Helena Padilla",
    rate: 2,
    totalSessions: 22,
    age: 28,
    sex: "Female",
  };

  const availabilityData = [
    {
      date: "AUG 12",
      day: "WED",
      slots: [
        { time: "9AM - 11AM", available: true },
        { time: "3PM - 5PM", available: false },
        { time: "7PM - 9PM", available: true },
      ],
    },
    {
      date: "AUG 13",
      day: "THU",
      slots: [
        { time: "9AM - 11AM", available: true },
        { time: "3PM - 5PM", available: false },
        { time: "7PM - 9PM", available: true },
      ],
    },
    {
      date: "AUG 14",
      day: "FRI",
      slots: [
        { time: "9AM - 11AM", available: true },
        { time: "3PM - 5PM", available: false },
        { time: "7PM - 9PM", available: true },
      ],
    },
    {
      date: "AUG 15",
      day: "SAT",
      slots: [
        { time: "9AM - 11AM", available: true },
        { time: "3PM - 5PM", available: false },
        { time: "7PM - 9PM", available: true },
      ],
    },
  ];

  const handleBook = () => {
    navigate("/select-address");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="flex justify-between items-center mb-4">
        <BackIcon />
      </header>

      <section className="flex flex-col items-center mb-4">
        <img src={trainerImage} alt={trainer.name} className="w-40 h-40 mb-4" />
        <h1 className="text-3xl font-bold text-red-600">{trainer.name}</h1>
        <p className="text-gray-500">{trainer.totalSessions} total sessions</p>
        <p className="text-yellow-500">{trainer.rate} credits per hour</p>
      </section>

      <section className="mb-4">
        <div className="flex justify-around">
          <button
            onClick={() => setTab("availability")}
            className={`flex-1 text-center py-2 ${
              tab === "availability" ? "border-b-4 border-red-500" : ""
            }`}
          >
            Availability
          </button>
          <button
            onClick={() => setTab("about")}
            className={`flex-1 text-center py-2 ${
              tab === "about" ? "border-b-4 border-red-500" : ""
            }`}
          >
            About
          </button>
        </div>
      </section>

      <section className="flex flex-col space-y-4">
        {tab === "availability" && (
          <>
            <div className="flex overflow-x-scroll space-x-2">
              {availabilityData.map((day, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedDateIndex(index)}
                  className={`flex flex-col items-center justify-center p-2 border rounded-lg ${
                    index === selectedDateIndex
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                >
                  <p className="text-red-600">{day.date}</p>
                  <p className="text-gray-600">{day.day}</p>
                </button>
              ))}
            </div>

            {availabilityData[selectedDateIndex].slots.map((slot, index) => (
              <div
                key={index}
                className={`flex justify-between p-4 rounded-md ${
                  slot.available ? "bg-white" : "bg-gray-100"
                }`}
              >
                <p className="text-lg">{slot.time}</p>
                <button
                  className={`${
                    slot.available
                      ? "bg-red-600 text-white"
                      : "bg-gray-400 text-gray-200"
                  } px-4 py-2 rounded-md`}
                  disabled={!slot.available}
                  onClick={() => handleBook(slot)}
                >
                  Book
                </button>
              </div>
            ))}
          </>
        )}

        {tab === "about" && (
          <div className="flex flex-col space-y-4">
            <p>
              A countdown timer picker in iOS style. This picker shows a
              countdown duration with hour, minute and second spinners. The
              duration is bounded between 0 and 23.
            </p>
            <div className="flex justify-around">
              <div className="text-center">
                <p className="text-sm font-bold text-gray-500">Age</p>
                <p className="text-xl">{trainer.age} years</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-gray-500">Gender</p>
                <p className="text-xl">{trainer.sex}</p>
              </div>
            </div>
            <div className="flex flex-col space-y-4">
              <img src={trainerImage} alt="Trainer Activity" />
              <img src={trainerImage} alt="Trainer Activity" />
              <img src={trainerImage} alt="Trainer Activity" />
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default TrainerDetails;
