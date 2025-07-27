import React from "react";
import { useNavigate } from "react-router-dom";
import { PrimaryButton, SecondaryButton } from "../components/Button";
import TrainerListItem from "../components/TrainerListItem";
import SessionItem from "../components/SessionItem";
import Title from "../components/Title";
import CreditsBalance from "../components/CreditBalance";

const Home = () => {
  const navigate = useNavigate();

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

  const trainers = [
    {
      name: "Helena Padilla",
      rate: "3 / hour",
      schedule: [
        { day: "Tomorrow", time: "9AM - 10AM" },
        { day: "Thursday", time: "9AM - 10AM" },
        { day: "Friday", time: "Busy" },
      ],
      weeklySchedule: ["9AM - 10AM", "10AM - 11AM", "11AM - 12PM"],
      imageUrl: require("../assets/trainer.png"), // Ensure image path is correct
    },
    {
      name: "Takeru Segawa",
      rate: "2 / hour",
      schedule: [
        { day: "Tomorrow", time: "10AM - 11AM" },
        { day: "Thursday", time: "10AM - 11AM" },
        { day: "Friday", time: "Busy" },
      ],
      weeklySchedule: ["9AM - 10AM", "10AM - 11AM", "11AM - 12PM"],
      imageUrl: require("../assets/trainer.png"), // Ensure image path is correct
    },
  ];

  const completedSessions = [
    {
      date: "AUG 12",
      time: "10:00 AM - 11:00 AM",
      trainer: "Lazar Amigano",
    },
    {
      date: "AUG 11",
      time: "9:00 AM - 10:00 AM",
      trainer: "Takeru Segawa",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="relative h-60 bg-gradient-to-b from-[#3A3A3A] to-[#252525] mb-6 overflow-hidden">
        <div className="flex justify-between items-center p-4 relative z-10">
          <div
            onClick={() => navigate("/profile")}
            className="flex items-center"
          >
            <div className="h-12 w-12">
              <svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Profile Icon SVG */}
                <rect x="0.5" y="0.5" width="35" height="35" fill="#252525" />
                <rect
                  x="0.5"
                  y="0.5"
                  width="35"
                  height="35"
                  fill="black"
                  fillOpacity="0.2"
                />
                <rect
                  x="0.5"
                  y="0.5"
                  width="35"
                  height="35"
                  fill="black"
                  fillOpacity="0.2"
                />
                <rect
                  x="0.5"
                  y="0.5"
                  width="35"
                  height="35"
                  fill="black"
                  fillOpacity="0.2"
                />
                <rect
                  x="0.5"
                  y="0.5"
                  width="35"
                  height="35"
                  fill="black"
                  fillOpacity="0.2"
                />
                <rect
                  x="0.5"
                  y="0.5"
                  width="35"
                  height="35"
                  fill="black"
                  fillOpacity="0.2"
                />
                <rect x="0.5" y="0.5" width="35" height="35" stroke="#727272" />
                <path
                  d="M18 21C11 21 7.5 24 7.5 24V28.5H28.5V24C28.5 24 25 21 18 21Z"
                  stroke="#B0B0B0"
                  strokeWidth="2"
                />
                <path
                  d="M23 12.5C23 15.2614 20.7614 17.5 18 17.5C15.2386 17.5 13 15.2614 13 12.5C13 9.73858 15.2386 7.5 18 7.5C20.7614 7.5 23 9.73858 23 12.5Z"
                  stroke="#B0B0B0"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <div className="ml-2 text-white">
              <h2 className="text-lg font-bold">Ryuki</h2>
            </div>
          </div>
          <CreditsBalance balance={23} />
        </div>
        <div className="absolute bottom-0 left-0 z-20 p-4">
          <div className="flex items-baseline">
            <h2 className="text-[30px] font-bold italic text-[#EB2726]">12</h2>
            <p className="text-lg font-bold text-white ml-2">SESSIONS</p>
          </div>
          <p className="text-[#B0B0B0] mt-1">in last 30 days</p>
        </div>
        <div className="absolute top-0 right-0 opacity-50 pointer-events-none z-0">
          <svg
            width="157"
            height="213"
            viewBox="0 0 157 213"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M63.4118 143.818H2L119.706 0H145.294L114.588 82.1818H176L58.2941 226H32.7059L63.4118 143.818Z"
              fill="url(#paint0_linear_1725_518)"
              stroke="url(#paint1_linear_1725_518)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_1725_518"
                x1="89"
                y1="0"
                x2="89"
                y2="226"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#353535" />
                <stop offset="0.5" stopColor="#363636" />
                <stop offset="1" stopColor="#282828" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_1725_518"
                x1="89"
                y1="0"
                x2="77.8668"
                y2="191.929"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#333333" stopOpacity="0.12" />
                <stop offset="0.5" stopColor="#3F3E3E" />
                <stop offset="1" stopColor="#333333" stopOpacity="0.12" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </header>

      <section className="mb-4 p-6">
        <Title text="// Upcoming Sessions" />
        <div className="flex overflow-x-scroll space-x-4 mb-6">
          {upcomingSessions.map((session, index) => (
            <SessionItem
              key={index}
              date={session.date}
              time={session.time}
              trainer={session.trainer}
              sessionIn={session.sessionIn}
              isUpcoming={true}
              showFooter={index === 0} // Show footer only on the first item
            />
          ))}
        </div>
        <SecondaryButton
          label="VIEW ALL"
          onClick={() => navigate("/session-history")}
        />
      </section>

      {/* Explore Trainers Section */}
      <section className="mb-4 p-6">
        <Title text="// Explore Trainers" />
        <div className="flex overflow-x-scroll space-x-4 mb-6">
          {trainers.map((trainer, index) => (
            <div key={index} className="flex-shrink-0 w-60">
              <TrainerListItem
                trainer={trainer}
                onClick={() => navigate(`/trainer-details/${index}`)}
              />
            </div>
          ))}
        </div>
        <SecondaryButton
          label="EXPLORE ALL"
          onClick={() => navigate("/explore-trainers")}
        />
      </section>

      <section className="mb-4 p-6">
        <Title text="// Completed Sessions" />
        <div className="flex overflow-x-scroll space-x-4 items-stretch mb-6">
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
        <SecondaryButton
          label="VIEW ALL"
          onClick={() => navigate("/session-history")}
        />
      </section>

      <footer className="mt-6">
        <p className="text-gray-400 font-bold text-center">
          Good Teachers Matter
        </p>
        <p>Talk with us</p>
      </footer>
    </div>
  );
};

export default Home;
