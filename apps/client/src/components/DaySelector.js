import React from "react";

const DaySelector = ({ days, selectedDay, setSelectedDay }) => {
  return (
    <div className="flex overflow-x-scroll space-x-4 mb-4">
      {days.map((day, index) => (
        <div
          key={index}
          onClick={() => setSelectedDay(index)} // Handle click to select day
          style={{
            borderRadius: "4px",
            border:
              index === selectedDay ? "2px solid #EB2726" : "1px solid #B0B0B0",
            padding: "16px",
            cursor: "pointer",
            backgroundColor: index === selectedDay ? "#FFFFFF" : "#F9F9F9",
          }}
          className="flex flex-col items-center w-24"
        >
          <p
            className={`text-sm font-medium mb-1 ${
              index === selectedDay ? "text-red-600" : "text-gray-500"
            }`}
          >
            {day.date.split(" ")[0]}
          </p>
          <p
            className={`text-xl font-bold ${
              index === selectedDay ? "text-red-600" : "text-black"
            }`}
          >
            {day.date.split(" ")[1]}
          </p>
          <p
            className={`text-sm font-medium ${
              index === selectedDay ? "text-red-600" : "text-gray-500"
            }`}
          >
            {day.day}
          </p>
        </div>
      ))}
    </div>
  );
};

export default DaySelector;
