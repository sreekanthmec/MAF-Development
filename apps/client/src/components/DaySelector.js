// src/components/DaySelector.tsx
import React from "react";

type Day = { date: string; day: string };
type Props = {
  days: Day[];
  selectedDay: number;
  setSelectedDay: (i: number) => void;
};

const DaySelector: React.FC<Props> = ({ days, selectedDay, setSelectedDay }) => {
  return (
    <div
      className="
        flex gap-4 overflow-x-auto pb-1
        [-ms-overflow-style:none] [scrollbar-width:none]
        [&::-webkit-scrollbar]:hidden
      "
    >
      {days.map((d, i) => {
        const [mon, dd] = d.date.split(" "); // e.g. "AUG 12"
        const isActive = i === selectedDay;

        return (
          <button
            key={i}
            onClick={() => setSelectedDay(i)}
            aria-pressed={isActive}
            className={[
              "shrink-0 w-[96px] text-center bg-white",
              isActive ? "border-2 border-[#EB2726]" : "border border-[#DBDBDB]",
              "focus:outline-none"
            ].join(" ")}
          >
            {/* Top header (month) */}
            <div className="px-3 pt-2 pb-2 bg-white rounded-t-[3px]">
              <div className="text-[14px] font-extrabold tracking-[0.06em] text-[#8C8C8C] uppercase">
                {mon}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-[#E7E7E7]" />

            {/* Bottom panel (date + weekday) */}
            <div className="px-3 py-3 bg-[#F7F7F7] rounded-b-[3px]">
              <div
                className={[
                  "leading-none font-extrabold",
                  // tweak size to your taste; screenshot looks ~28–32px
                  "text-[28px]",
                  isActive ? "text-[#EB2726]" : "text-black"
                ].join(" ")}
              >
                {dd}
              </div>
              <div
                className={[
                  "mt-1 text-[12px] font-extrabold tracking-[0.06em] uppercase",
                  isActive ? "text-[#EB2726]" : "text-[#7A7A7A]"
                ].join(" ")}
              >
                {d.day}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default DaySelector;
