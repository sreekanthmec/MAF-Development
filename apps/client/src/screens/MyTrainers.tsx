// src/screens/MyTrainers.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Title from "../components/Title";
import CreditsBalance from "../components/CreditBalance";
import Navbar from "../components/Navbar";
import OverflowHeader from "../components/OverflowHeader";
import trainerImg from "../assets/trainer.png";

/* --------------------------------- types ---------------------------------- */
type MyTrainer = {
  name: string;
  rate: number;
  age: number;
  sex: "M" | "F";
  schedule: { day: string; time: string }[];
  imageUrl?: string;
};

/* ------------------------------ components -------------------------------- */

const TrainerCard: React.FC<{ trainer: MyTrainer; onClick: () => void }> = ({
  trainer,
  onClick,
}) => {
  return (
    <div className="bg-transparent overflow-visible mb-4">
      {/* HEADER: transparent above gradient, no borders anywhere here */}
      <OverflowHeader
        name={trainer.name}
        rate={trainer.rate}
        gradient="dark"
        meta={`${trainer.age}${trainer.sex}`}
        imageSrc={String(trainer.imageUrl || trainerImg)}
        imgHeight={140}   // image height (controls "peek above")
        bandHeight={100}  // visible gradient band
        onClick={onClick}
      />

      {/* SCHEDULE BOX: the only element with a border */}
      <div className="px-3 py-2 bg-white border border-[#DEDEDE] rounded">
        {(trainer.schedule ?? []).slice(0, 3).map((s, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between text-[#3A3A3A]"
          >
            <span className="text-[16px]">{s.day}</span>
            <span
              className={
                s.time.toLowerCase() === "busy"
                  ? "text-[#EB2726] font-semibold"
                  : ""
              }
            >
              {s.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ---------------------------------- data ---------------------------------- */
const myTrainersData: MyTrainer[] = [
  {
    name: "TAKERU SEGAWA",
    rate: 3,
    age: 27,
    sex: "M",
    schedule: [
      { day: "Tomorrow", time: "9AM - 10AM" },
      { day: "Thursday", time: "9AM - 10AM" },
      { day: "Friday", time: "Busy" },
    ],
    imageUrl: trainerImg,
  },
  {
    name: "HELENA PADILLA",
    rate: 2,
    age: 27,
    sex: "F",
    schedule: [
      { day: "Tomorrow", time: "9AM - 10AM" },
      { day: "Thursday", time: "9AM - 10AM" },
      { day: "Friday", time: "Busy" },
    ],
    imageUrl: trainerImg,
  },
  {
    name: "SINGDAM KIATMOO9",
    rate: 2,
    age: 27,
    sex: "M",
    schedule: [
      { day: "Tomorrow", time: "9AM - 10AM" },
      { day: "Thursday", time: "9AM - 10AM" },
      { day: "Friday", time: "Busy" },
    ],
    imageUrl: trainerImg,
  },
];

/* --------------------------------- screen --------------------------------- */
export default function MyTrainers() {
  const navigate = useNavigate();

  const handleTrainerClick = (trainer: MyTrainer) => {
    navigate("/student/trainer-details", { state: { trainer } });
  };

  return (
    <div className="h-[100dvh] bg-[#F7F7F7] overflow-y-auto" style={{ WebkitOverflowScrolling: "touch" }}>
      <div className="mx-auto max-w-[400px] pt-[max(12px,env(safe-area-inset-top))]">
        <Navbar 
          background="transparent"
          right={
            <CreditsBalance 
              balance={100} 
              variant="white-with-button"
              onAdd={() => navigate("/student/buy-credits")} 
            />
          }
        />
        
        {/* Content */}
        <main className="px-5">
          {/* Section Title */}
          <Title text="// MY TRAINERS" />
          
          {/* Trainer List */}
          <div className="mt-4 pb-20">
            {myTrainersData.map((trainer, index) => (
              <TrainerCard
                key={`${trainer.name}-${index}`}
                trainer={trainer}
                onClick={() => handleTrainerClick(trainer)}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
