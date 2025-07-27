import React from "react";
import { useNavigate } from "react-router-dom";

const TrainerListItem = ({ trainer, isWeekly }) => {
  const navigate = useNavigate();

  const handleTrainerClick = () => {
    navigate("/trainer-details", { state: { trainer } });
  };

  return (
    <div className="relative pt-20">
      <div
        className="flex justify-between items-center p-4 relative cursor-pointer"
        style={{
          background: "linear-gradient(157.07deg, #3A3A3A 0%, #252525 81.65%)",
        }}
        onClick={handleTrainerClick}
      >
        <div className="flex-1">
          <h4 className="text-xl font-bold text-white uppercase">
            {trainer.name.split(" ")[0]}
            <br />
            {trainer.name.split(" ")[1]}
          </h4>
          <div className="text-yellow-400 flex items-center">
            <svg
              className="w-5 h-5 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 13.0007H3L12.5833 1.33398H14.6667L12.1667 8.00065H17.1667L7.58333 19.6673H5.5L8 13.0007Z"
                stroke="#F4C505"
              />
            </svg>
            <span className="text-white text-lg">{trainer.rate}</span>
            <span className="ml-2 text-white">{trainer.age}F</span>
          </div>
        </div>
        <div className="absolute right-4 bottom-0">
          <img
            src={require("../assets/trainer.png")}
            alt={trainer.name}
            className="h-full object-cover"
            style={{
              height: "200px",
            }}
          />
        </div>
      </div>

      {isWeekly ? (
        // Weekly Schedule Layout
        <div className="cursor-pointer overflow-hidden p-4 border-1 border-[#DEDEDE] shadow-md flex space-x-4">
          {trainer.weeklySchedule.map((slot, i) => (
            <div
              key={i}
              className="border p-2 rounded-md text-center flex-1"
              style={{
                border: "1px solid #DEDEDE",
              }}
            >
              {slot}
            </div>
          ))}
        </div>
      ) : (
        // Daily Schedule Layout
        <div className="cursor-pointer overflow-hidden p-4 border-1 border-[#DEDEDE] shadow-md">
          {trainer.schedule.map((slot, i) => (
            <div key={i} className="flex justify-between text-gray-700">
              <span>{slot.day}</span>
              <span className={slot.time === "Busy" ? "text-red-600" : ""}>
                {slot.time}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrainerListItem;
