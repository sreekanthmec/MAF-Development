import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackIcon from "../components/BackIcon";
import Title from "../components/Title";
import TrainerListItem from "../components/TrainerListItem";
import TrainerSelection from "../components/TrainerSelection";
import DaySelector from "../components/DaySelector";

const ExploreTrainers = () => {
  const navigate = useNavigate();

  const topTrainers = [
    {
      name: "Takeru Segawa",
      rate: "3 / hour",
      totalSessions: 12,
      sex: "Male",
      age: "27",
      experience: "Advanced",
      schedule: [
        { day: "Tomorrow", time: "9AM - 10AM" },
        { day: "Thursday", time: "9AM - 10AM" },
        { day: "Friday", time: "Busy" },
      ],
      weeklySchedule: ["9AM - 10AM", "10AM - 11AM", "11AM - 12PM"],
      imageUrl: require("../assets/trainer.png"),
    },
    {
      name: "Helena Padilla",
      rate: "2 / hour",
      totalSessions: 22,
      sex: "Female",
      age: "30",
      experience: "Intermediate",
      schedule: [
        { day: "Tomorrow", time: "9AM - 10AM" },
        { day: "Thursday", time: "9AM - 10AM" },
        { day: "Friday", time: "Busy" },
      ],
      weeklySchedule: ["9AM - 10AM", "10AM - 11AM", "11AM - 12PM"],
      imageUrl: require("../assets/trainer.png"),
    },
    {
      name: "Singdam Kiatmoo9",
      rate: "2 / hour",
      totalSessions: 18,
      sex: "Male",
      age: "35",
      experience: "Professional",
      schedule: [
        { day: "Tomorrow", time: "9AM - 10AM" },
        { day: "Thursday", time: "9AM - 10AM" },
        { day: "Friday", time: "Busy" },
      ],
      weeklySchedule: ["9AM - 10AM", "10AM - 11AM", "11AM - 12PM"],
      imageUrl: require("../assets/trainer.png"),
    },
  ];

  const availableTrainers = [
    {
      name: "Takeru Segawa",
      rate: "3 / hour",
      totalSessions: 12,
      sex: "Male",
      age: "27",
      experience: "Advanced",
      schedule: [
        { day: "Tomorrow", time: "9AM - 10AM" },
        { day: "Thursday", time: "9AM - 10AM" },
        { day: "Friday", time: "Busy" },
      ],
      weeklySchedule: ["9AM - 10AM", "10AM - 11AM", "11AM - 12PM"],
      imageUrl: require("../assets/trainer.png"),
    },
    {
      name: "Helena Padilla",
      rate: "2 / hour",
      totalSessions: 22,
      sex: "Female",
      age: "30",
      experience: "Intermediate",
      schedule: [
        { day: "Tomorrow", time: "9AM - 10AM" },
        { day: "Thursday", time: "9AM - 10AM" },
        { day: "Friday", time: "Busy" },
      ],
      weeklySchedule: ["9AM - 10AM", "10AM - 11AM", "11AM - 12PM"],
      imageUrl: require("../assets/trainer.png"),
    },
    {
      name: "Singdam Kiatmoo9",
      rate: "2 / hour",
      totalSessions: 18,
      sex: "Male",
      age: "35",
      experience: "Professional",
      schedule: [
        { day: "Tomorrow", time: "9AM - 10AM" },
        { day: "Thursday", time: "9AM - 10AM" },
        { day: "Friday", time: "Busy" },
      ],
      weeklySchedule: ["9AM - 10AM", "10AM - 11AM", "11AM - 12PM"],
      imageUrl: require("../assets/trainer.png"),
    },
  ];

  const [selectedDay, setSelectedDay] = useState(0); // State to track selected day

  const days = [
    { date: "AUG 12", day: "WED" },
    { date: "AUG 13", day: "THU" },
    { date: "AUG 14", day: "FRI" },
    { date: "AUG 15", day: "SAT" },
    { date: "AUG 16", day: "SUN" },
    { date: "AUG 17", day: "MON" },
    { date: "AUG 18", day: "TUE" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="flex justify-between items-center mb-4">
        <BackIcon />
      </header>

      <TrainerSelection />

      <section className="mb-4">
        <Title text={"// Top Trainers"} />
        <div className="flex overflow-x-scroll space-x-4">
          {topTrainers.map((trainer, index) => (
            <div key={index} className="flex-shrink-0 w-60">
              <TrainerListItem
                trainer={trainer}
                onClick={() => navigate(`/trainer-details/${index}`)}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="mb-4">
        <Title text={"// Available Trainers"} />

        {/* Use the DaySelector component */}
        <DaySelector
          days={days}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
        />

        <div className="flex flex-wrap -mx-2">
          {availableTrainers.map((trainer, index) => (
            <div key={index} className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4">
              <TrainerListItem
                trainer={trainer}
                isWeekly={true}
                onClick={() => navigate(`/trainer-details/${index}`)}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ExploreTrainers;
