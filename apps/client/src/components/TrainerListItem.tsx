// src/components/TrainerListItem.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import TrainerCardHeader from "./TrainerCardHeader";

const TrainerListItem = ({ trainer, isWeekly }: { trainer: any; isWeekly?: boolean }) => {
  const navigate = useNavigate();

  const meta = trainer.age ? `${trainer.age}${(trainer.sex || "F").charAt(0)}` : undefined;

  const handleTrainerClick = () => {
    navigate("/trainer-details", { state: { trainer } });
  };

  return (
    <div className="relative">
      {/* HEADER (DARK) – matches your working snippet */}
      <TrainerCardHeader
  name={trainer.name}
  rate={trainer.rate}
  meta={`${trainer.age ?? ""}${String(trainer.sex ?? "F").charAt(0)}`}
  imageSrc={trainer.imageUrl}
  variant="dark"
  height={200}                 // ⬅️ renamed from imgHeight
  onClick={handleTrainerClick}
/>

      {/* DETAILS (unchanged from your code) */}
      {isWeekly ? (
        <div className="cursor-pointer overflow-hidden p-4 border border-[#DEDEDE] shadow-md flex space-x-4">
          {trainer.weeklySchedule.map((slot: string, i: number) => (
            <div
              key={i}
              className="border p-2 rounded-md text-center flex-1"
              style={{ border: "1px solid #DEDEDE" }}
            >
              {slot}
            </div>
          ))}
        </div>
      ) : (
        <div className="cursor-pointer overflow-hidden p-4 border border-[#DEDEDE] shadow-md">
          {trainer.schedule.map((slot: any, i: number) => (
            <div key={i} className="flex justify-between text-gray-700">
              <span>{slot.day}</span>
              <span className={slot.time === "Busy" ? "text-red-600" : ""}>{slot.time}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrainerListItem;
