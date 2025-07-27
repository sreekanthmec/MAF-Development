import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SessionItem from "../components/SessionItem"; // Adjust the import path as necessary
import BackIcon from "../components/BackIcon";

const SessionHistory = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Upcoming");

  const upcomingSessions = [
    {
      date: "AUG 12",
      time: "10:00 AM - 11:00 AM",
      trainer: "Takeru Segawa",
      sessionIn: "2d 4h 30m",
    },
    {
      date: "AUG 13",
      time: "9:00 AM - 10:00 AM",
      trainer: "Helena Padilla",
      sessionIn: "1d 6h 10m",
    },
  ];

  const completedSessions = [
    {
      date: "AUG 10",
      time: "9:00 AM - 10:00 AM",
      trainer: "Lazar Amigano",
    },
    {
      date: "AUG 09",
      time: "8:00 AM - 9:00 AM",
      trainer: "Sanchai Sor Kingstar",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="flex items-center mb-4">
        <BackIcon />
        <h1 className="ml-4 text-2xl font-bold">Session History</h1>
      </header>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <nav className="flex justify-between mb-4">
          <button
            className={`flex-1 text-center font-bold pb-2 ${
              activeTab === "Upcoming"
                ? "border-b-2 border-black text-black"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("Upcoming")}
          >
            Upcoming
          </button>
          <button
            className={`flex-1 text-center font-bold pb-2 ${
              activeTab === "Completed"
                ? "border-b-2 border-black text-black"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("Completed")}
          >
            Completed
          </button>
        </nav>

        <div>
          {activeTab === "Upcoming" && (
            <div className="space-y-4">
              {upcomingSessions.map((session, index) => (
                <SessionItem
                  key={index}
                  date={session.date}
                  time={session.time}
                  trainer={session.trainer}
                  sessionIn={session.sessionIn}
                  isUpcoming={true}
                  showFooter={index === 0} // Show footer only for the first item
                />
              ))}
            </div>
          )}

          {activeTab === "Completed" && (
            <div className="space-y-4">
              {completedSessions.map((session, index) => (
                <SessionItem
                  key={index}
                  date={session.date}
                  time={session.time}
                  trainer={session.trainer}
                  isUpcoming={false} // Set to false for completed sessions
                  showFooter={false} // No footer for completed sessions
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SessionHistory;
