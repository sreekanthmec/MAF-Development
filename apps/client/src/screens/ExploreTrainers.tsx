// src/screens/ExploreTrainers.tsx
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Sparkles, Plus, Zap } from "lucide-react";

import Title from "../components/Title";
import DaySelector from "../components/DaySelector";

import trainerImg from "../assets/trainer.png";

/* --------------------------------- helpers -------------------------------- */

type Trainer = {
  name: string;
  rate: number;        // credits per hour
  age: number;
  sex: "M" | "F";
  schedule: { day: string; time: string }[];
  imageUrl?: string;
};

const daysData = [
  { date: "AUG 12", day: "WED" },
  { date: "AUG 13", day: "THU" },
  { date: "AUG 14", day: "FRI" },
  { date: "AUG 15", day: "SAT" },
  { date: "AUG 16", day: "SUN" },
  { date: "AUG 17", day: "MON" },
  { date: "AUG 18", day: "TUE" },
];

/* -------------------------- small reusable atoms -------------------------- */

const CreditsPill: React.FC<{
  balance: number;
  onAdd?: () => void;
}> = ({ balance, onAdd }) => (
  <div className="flex items-center gap-2">
    <div className="h-9 px-3 rounded-md border border-[#DEDEDE] bg-white flex items-center gap-2">
      <Zap className="w-4 h-4 text-[#FFC800]" />
      <span className="text-sm font-extrabold">{balance}</span>
    </div>
    <button
      onClick={onAdd}
      className="h-9 w-9 grid place-items-center rounded-md bg-[#EB2726]"
      aria-label="Add credits"
    >
      <Plus className="w-4 h-4 text-white" />
    </button>
  </div>
);

const SegmentedTwo: React.FC<{
  left: { icon: React.ReactNode; label: string };
  right: { icon: React.ReactNode; label: string };
  value: "left" | "right";
  onChange: (v: "left" | "right") => void;
}> = ({ left, right, value, onChange }) => {
  const base =
    "flex items-center gap-2 px-5 h-[56px] border border-black bg-white";
  const ghost = "text-black";
  return (
    <div className="grid grid-cols-2 gap-4">
      <button className={`${base} ${ghost}`} onClick={() => onChange("left")}>
        {left.icon}
        <span className="text-[12px] font-extrabold tracking-[0.06em]">
          {left.label}
        </span>
      </button>
      <button className={`${base} ${ghost}`} onClick={() => onChange("right")}>
        {right.icon}
        <span className="text-[12px] font-extrabold tracking-[0.06em]">
          {right.label}
        </span>
      </button>
    </div>
  );
};

/* ----------------------------- card components ---------------------------- */

// 1) Top-trainers horizontal card (red banner + image + small schedule)
const TopTrainerCard: React.FC<{
  trainer: Trainer;
  onClick?: () => void;
}> = ({ trainer, onClick }) => (
  <div
    className="w-[300px] bg-white border border-[#DEDEDE] overflow-hidden"
    onClick={onClick}
  >
    <div className="relative bg-[#EB2726] h-[128px]">
      <div className="absolute inset-0 px-4 py-3 flex">
        <div className="flex-1">
          <div className="text-white text-[22px] leading-[22px] italic font-extrabold uppercase">
            {trainer.name.split(" ").slice(0, -1).join(" ")}
            <br />
            {trainer.name.split(" ").slice(-1)}
          </div>
          <div className="mt-2 flex items-center gap-2 text-white/90">
            <Zap className="w-4 h-4 text-[#FFC800]" />
            <span className="text-[12px]">{trainer.rate} / hour</span>
            <span className="text-[12px] ml-2">{trainer.age}{trainer.sex}</span>
          </div>
        </div>
        <img
          src={trainer.imageUrl || trainerImg}
          alt={trainer.name}
          className="absolute right-2 bottom-0 h-[120px] object-contain pointer-events-none select-none"
        />
      </div>
    </div>

    <div className="p-4">
      {trainer.schedule.slice(0, 3).map((s, i) => (
        <div
          key={i}
          className="flex items-center justify-between text-[12px] py-1.5"
        >
          <span className="text-[#6B6B6B]">{s.day}</span>
          <span
            className={
              s.time === "Busy" ? "text-[#D62422] font-semibold" : "text-black"
            }
          >
            {s.time}
          </span>
        </div>
      ))}
    </div>
  </div>
);

// 2) Available-trainer wide card (dark gradient + big image + slot pills)
const SlotPill: React.FC<{ label: string; onClick?: () => void }> = ({
  label,
  onClick,
}) => (
  <button
    onClick={onClick}
    className="px-4 h-9 border border-[#DEDEDE] bg-white text-[12px] font-semibold"
  >
    {label}
  </button>
);

const TrainerWideCard: React.FC<{
  trainer: Trainer;
  slots: string[];
  onClick?: () => void;
}> = ({ trainer, slots, onClick }) => (
  <div className="bg-white border border-[#DEDEDE]">
    {/* banner */}
    <div
      className="relative h-[140px] overflow-hidden"
      style={{
        background:
          "linear-gradient(157.07deg, #3A3A3A 0%, #252525 81.65%)",
      }}
      onClick={onClick}
    >
      <div className="absolute inset-0 px-4 py-4">
        <div className="text-white text-[22px] leading-[22px] italic font-extrabold uppercase">
          {trainer.name.split(" ").slice(0, -1).join(" ")}
          <br />
          {trainer.name.split(" ").slice(-1)}
        </div>
        <div className="mt-2 flex items-center gap-2 text-white/90">
          <Zap className="w-4 h-4 text-[#FFC800]" />
          <span className="text-[12px]">{trainer.rate} / hour</span>
          <span className="text-[12px] ml-2">{trainer.age}{trainer.sex}</span>
        </div>
      </div>
      <img
        src={trainer.imageUrl || trainerImg}
        alt={trainer.name}
        className="absolute right-2 bottom-0 h-[160px] object-contain pointer-events-none select-none"
      />
    </div>

    {/* slots row */}
    <div className="p-4 flex gap-3">
      {slots.slice(0, 3).map((t, i) => (
        <SlotPill key={i} label={t} />
      ))}
    </div>
  </div>
);

/* ---------------------------------- screen --------------------------------- */

export default function ExploreTrainers() {
  const navigate = useNavigate();
  const [seg, setSeg] = useState<"left" | "right">("right");
  const [selectedDay, setSelectedDay] = useState(0);

  const topTrainers = useMemo<Trainer[]>(
    () => [
      {
        name: "SINGDAM KIATMOO9",
        rate: 3,
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
        name: "HELENA PADILLA",
        rate: 3,
        age: 27,
        sex: "F",
        schedule: [
          { day: "Tomorrow", time: "9AM - 10AM" },
          { day: "Thursday", time: "9AM - 10AM" },
          { day: "Friday", time: "Busy" },
        ],
        imageUrl: trainerImg,
      },
    ],
    []
  );

  const availableTrainers = useMemo<Trainer[]>(
    () => [
      {
        name: "HELENA PADILLA",
        rate: 3,
        age: 27,
        sex: "F",
        schedule: [],
        imageUrl: trainerImg,
      },
      {
        name: "TAKERU SEGAWA",
        rate: 4,
        age: 27,
        sex: "F",
        schedule: [],
        imageUrl: trainerImg,
      },
      {
        name: "SINGDAM KIATMOO9",
        rate: 2,
        age: 27,
        sex: "F",
        schedule: [],
        imageUrl: trainerImg,
      },
    ],
    []
  );

  return (
    <div
      className="h-[100dvh] w-full bg-[#F7F7F7] overflow-y-auto"
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      <div className="mx-auto max-w-[400px] min-h-full flex flex-col">
        {/* HEADER BAR */}
        <header className="px-5 pt-4 pb-2 bg-white">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              aria-label="Back"
              className="-ml-1 p-1"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <CreditsPill
              balance={100}
              onAdd={() => navigate("/buy-credits")}
            />
          </div>
        </header>

        {/* CONTENT */}
        <main className="flex-1">
          {/* segmented */}
          <section className="px-5 pt-4">
            <SegmentedTwo
              value={seg}
              onChange={setSeg}
              left={{
                icon: <Heart className="w-5 h-5" />,
                label: "MY TRAINERS",
              }}
              right={{
                icon: <Sparkles className="w-5 h-5" />,
                label: "ALL TRAINERS",
              }}
            />
          </section>

          {/* top trainers */}
          <section className="px-5 pt-6">
            <Title text="// Top Trainers" />
            <div
              className="mt-3 flex gap-4 overflow-x-auto snap-x snap-mandatory
                         [-ms-overflow-style:none] [scrollbar-width:none]
                         [&::-webkit-scrollbar]:hidden"
            >
              {topTrainers.map((t, i) => (
                <div key={i} className="snap-start flex-shrink-0">
                  <TopTrainerCard
                    trainer={t}
                    onClick={() => navigate("/trainer-details", { state: { trainer: t } })}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* available trainers */}
          <section className="px-5 pt-6 pb-10">
            <Title text="// Available Trainers" />
            <div className="mt-3">
              <DaySelector
                days={daysData}
                selectedDay={selectedDay}
                setSelectedDay={setSelectedDay}
              />
            </div>

            <div className="mt-4 grid gap-6">
              {availableTrainers.map((t, i) => (
                <TrainerWideCard
                  key={i}
                  trainer={t}
                  slots={["9AM - 10AM", "9AM - 10AM", "9AM - 10AM"]}
                  onClick={() => navigate("/trainer-details", { state: { trainer: t } })}
                />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
