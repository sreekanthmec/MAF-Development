// src/components/HomeHorizontalTrainerList.tsx
import React from "react";
import { Zap } from "lucide-react";
import Title from "./Title";
import { TertiaryButton } from "./Button";
import trainerImg from "../assets/trainer.png";
import OverflowHeader from "./OverflowHeader";

/* ---------- types ---------- */
export type HomeTrainer = {
  name: string;
  rate: number; // credits per hour
  age: number;
  sex: "M" | "F";
  schedule: { day: string; time: string }[];
  imageUrl?: string;
};

type Props = {
  trainers: HomeTrainer[];
  onCardClick: (trainer: HomeTrainer, index: number) => void;
  onExploreAll: () => void;
};


/* ---------- list (horizontal carousel) ---------- */
const HomeHorizontalTrainerList: React.FC<Props> = ({
  trainers,
  onCardClick,
  onExploreAll,
}) => {
  return (
    <section className="px-5 pt-12">
      <Title text="// Explore Trainers" />

      <div
        className="mt-3 flex gap-4 overflow-x-auto snap-x snap-mandatory
                   [-ms-overflow-style:none] [scrollbar-width:none]
                   [&::-webkit-scrollbar]:hidden"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {trainers.map((t, i) => (
          <div
            key={`${t.name}-${i}`}
            className="snap-start w-[280px] flex-shrink-0 overflow-visible bg-transparent"
          >
            {/* HEADER: transparent above gradient, no borders anywhere here */}
            <OverflowHeader
              name={t.name}
              rate={t.rate}
              gradient="red"
              meta={`${t.age}${t.sex}`}
              imageSrc={String(t.imageUrl || trainerImg)}
              imgHeight={140}   // image height (controls “peek above”)
              bandHeight={100}  // visible gradient band
              onClick={() => onCardClick(t, i)}
            />

            {/* SCHEDULE BOX: the only element with a border */}
            <div className="px-3 py-2 bg-white border border-[#DEDEDE] rounded">
              {(t.schedule ?? []).slice(0, 3).map((s, idx) => (
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
        ))}
      </div>

      <div className="mt-4">
        <TertiaryButton
          label="EXPLORE ALL"
          layout="split"
          onClick={onExploreAll}
          className="!w-full"
        />
      </div>
    </section>
  );
};

export default HomeHorizontalTrainerList;
