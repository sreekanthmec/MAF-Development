// src/screens/AllTrainers.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import Title from "../components/Title";
import CreditsBalance from "../components/CreditBalance";
import Navbar from "../components/Navbar";
import OverflowHeader from "../components/OverflowHeader";
import trainerImg from "../assets/trainer.png";

/* --------------------------------- types ---------------------------------- */
type AllTrainer = {
  name: string;
  rate: number;
  age: number;
  sex: "M" | "F";
  schedule: { day: string; time: string }[];
  imageUrl?: string;
};

/* ------------------------------ components -------------------------------- */

const SearchBar: React.FC<{ value: string; onChange: (value: string) => void }> = ({
  value,
  onChange,
}) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
      <input
        type="text"
        placeholder="Search Trainer"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-12 pl-10 pr-4 border border-gray-300 rounded bg-white text-[14px] placeholder:text-gray-400 focus:outline-none focus:border-[#D62422]"
      />
    </div>
  );
};

const TrainerCard: React.FC<{ trainer: AllTrainer; onClick: () => void }> = ({
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
const allTrainersData: AllTrainer[] = [
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
    rate: 4,
    age: 27,
    sex: "F",
    schedule: [
      { day: "Tomorrow", time: "9AM - 10AM" },
      { day: "Thursday", time: "9AM - 10AM" },
      { day: "Friday", time: "Busy" },
    ],
    imageUrl: trainerImg,
  },
];

/* --------------------------------- screen --------------------------------- */
export default function AllTrainers() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleTrainerClick = (trainer: AllTrainer) => {
    navigate("/student/trainer-details", { state: { trainer } });
  };

  // Filter trainers based on search query
  const filteredTrainers = allTrainersData.filter(trainer =>
    trainer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <Title text="// ALL TRAINERS" />
          
          {/* Search Bar */}
          <div className="mt-4 mb-6">
            <SearchBar 
              value={searchQuery}
              onChange={setSearchQuery}
            />
          </div>
          
          {/* Trainer List */}
          <div className="pb-20">
            {filteredTrainers.map((trainer, index) => (
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
