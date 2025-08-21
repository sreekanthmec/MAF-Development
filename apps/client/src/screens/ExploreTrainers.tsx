// src/screens/ExploreTrainers.tsx
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Sparkles, Plus, Zap } from "lucide-react";
import Title from "../components/Title";
import DaySelector from "../components/DaySelector";
import OverflowHeader from "../components/OverflowHeader";
import trainerImg from "../assets/trainer.png";

/* --------------------------------- types ---------------------------------- */
type Trainer = {
  name: string;
  rate: number;
  age: number;
  sex: "M" | "F";
  schedule: { day: string; time: string }[];
  imageUrl?: string;
};

/* ------------------------------ tiny atoms -------------------------------- */
const CreditsPill: React.FC<{ balance: number; onAdd?: () => void }> = ({
  balance,
  onAdd,
}) => (
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
  return (
    <div className="grid grid-cols-2 gap-4">
      <button className={base} onClick={() => onChange("left")}>
        {left.icon}
        <span className="text-[12px] font-extrabold tracking-[0.06em]">
          {left.label}
        </span>
      </button>
      <button className={base} onClick={() => onChange("right")}>
        {right.icon}
        <span className="text-[12px] font-extrabold tracking-[0.06em]">
          {right.label}
        </span>
      </button>
    </div>
  );
};

/* ---------------------------------- data ---------------------------------- */
const daysData = [
  { date: "AUG 12", day: "WED" },
  { date: "AUG 13", day: "THU" },
  { date: "AUG 14", day: "FRI" },
  { date: "AUG 15", day: "SAT" },
  { date: "AUG 16", day: "SUN" },
  { date: "AUG 17", day: "MON" },
  { date: "AUG 18", day: "TUE" },
];

/* --------------------------------- screen --------------------------------- */
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
      {
        name: "TAKERU SEGAWA",
        rate: 2,
        age: 27,
        sex: "M",
        schedule: [
          { day: "Tomorrow", time: "10AM - 11AM" },
          { day: "Thursday", time: "10AM - 11AM" },
          { day: "Friday", time: "Busy" },
        ],
        imageUrl: trainerImg,
      },
    ],
    []
  );

  const availableTrainers = useMemo<Trainer[]>(
    () => [
      { name: "HELENA PADILLA", rate: 3, age: 27, sex: "F", schedule: [], imageUrl: trainerImg },
      { name: "TAKERU SEGAWA", rate: 4, age: 27, sex: "M", schedule: [], imageUrl: trainerImg },
      { name: "SINGDAM KIATMOO9", rate: 2, age: 27, sex: "M", schedule: [], imageUrl: trainerImg },
    ],
    []
  );

  return (
    <div className="h-[100dvh] w-full bg-[#F7F7F7] overflow-y-auto" style={{ WebkitOverflowScrolling: "touch" }}>
      <div className="mx-auto max-w-[400px] min-h-full flex flex-col">
        {/* Header */}
        <header className="px-5 pt-4 pb-2 bg-white">
          <div className="flex items-center justify-between">
            <button onClick={() => navigate(-1)} aria-label="Back" className="-ml-1 p-1">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <CreditsPill balance={100} onAdd={() => navigate("/buy-credits")} />
          </div>
        </header>

        {/* Content */}
        <main className="flex-1">
          {/* Segmented control */}
          <section className="px-5 pt-4">
            <SegmentedTwo
              value={seg}
              onChange={setSeg}
              left={{ icon: <Heart className="w-5 h-5" />, label: "MY TRAINERS" }}
              right={{ icon: <Sparkles className="w-5 h-5" />, label: "ALL TRAINERS" }}
            />
          </section>

          {/* TOP TRAINERS — horizontal (header is transparent; schedule box has the border) */}
          <section className="px-5 pt-6">
            <Title text="// Top Trainers" />
            <div className="mt-3 flex gap-4 overflow-x-auto snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {topTrainers.map((t, i) => (
                <div key={i} className="snap-start w-[300px] flex-shrink-0 bg-transparent overflow-visible">
                  <OverflowHeader
                    name={t.name}
                    rate={t.rate}
                    meta={`${t.age}${t.sex}`}
                    imageSrc={String(t.imageUrl || trainerImg)}
                    gradient="red"
                    imgHeight={184}
                    bandHeight={100}
                    onClick={() => navigate(`/trainer-details/${i}`, { state: { trainer: t } })}
                  />
                  {/* schedule box (the only bordered part) */}
                  <div className="px-3 py-2 bg-white border border-[#DEDEDE] rounded">
                    {t.schedule.map((s, idx) => (
                      <div key={idx} className="flex items-center justify-between py-2 text-[#3A3A3A]">
                        <span className="text-[16px]">{s.day}</span>
                        <span className={s.time.toLowerCase() === "busy" ? "text-[#EB2726] font-semibold" : ""}>
                          {s.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* AVAILABLE TRAINERS — vertical list */}
          <section className="px-5 pt-6 pb-10">
            <Title text="// Available Trainers" />

            <div className="mt-3">
              <DaySelector days={daysData} selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
            </div>

            <div className="mt-4 space-y-4">
              {availableTrainers.map((t, i) => (
                <div key={i} className="bg-transparent overflow-visible">
                  <OverflowHeader
                    name={t.name}
                    rate={t.rate}
                    meta={`${t.age}${t.sex}`}
                    imageSrc={String(t.imageUrl || trainerImg)}
                    gradient="dark"
                    imgHeight={210}
                    bandHeight={100}
                    onClick={() => navigate(`/trainer-details/${i}`, { state: { trainer: t } })}
                  />
                  {/* time slots box (again, only this part has a border) */}
                  <div className="px-5 py-4 bg-white border border-[#DEDEDE] rounded grid grid-cols-3 gap-4">
                    {["9AM - 10AM", "9AM - 10AM", "9AM - 10AM"].map((time, k) => (
                      <button
                        key={k}
                        className="px-2 py-2 bg-white border border-[#DBDBDB] grid place-items-center text-[12px] font-semibold"
                        onClick={() => navigate("/booking", { state: { trainer: t, time } })}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
