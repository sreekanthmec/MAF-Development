import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  /** Any date in the month you want to show (we only use its month/year) */
  monthDate: Date;
  /** Days-of-month that are marked available (e.g., [15,16,17,18,19,22,23,24,25,26]) */
  selectedDays: number[];
  onToggleDay?: (day: number) => void;
  onPrevMonth?: () => void;
  onNextMonth?: () => void;
  className?: string;
};

function formatMonthTitle(d: Date) {
  return d.toLocaleDateString(undefined, { month: "long", year: "numeric" });
}

export default function CalendarMonth({
  monthDate,
  selectedDays,
  onToggleDay,
  onPrevMonth,
  onNextMonth,
  className = "",
}: Props) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstOfMonth = new Date(year, month, 1);
  const startWeekday = firstOfMonth.getDay(); // 0 Sun .. 6 Sat
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // build an array with leading blanks + 1..daysInMonth
  const cells: (number | null)[] = [
    ...Array.from({ length: startWeekday }).map(() => null),
    ...Array.from({ length: daysInMonth }).map((_, i) => i + 1),
  ];

  return (
    <div className={className}>
      {/* month header */}
      <div className="flex items-center justify-between mb-2">
        <button
          className="p-2 -ml-2 text-[#777]"
          onClick={onPrevMonth}
          aria-label="Previous month"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="text-[16px] font-extrabold">{formatMonthTitle(monthDate)}</div>

        <button
          className="p-2 -mr-2 text-[#777]"
          onClick={onNextMonth}
          aria-label="Next month"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* weekday row */}
      <div className="grid grid-cols-7 mb-2 text-[12px] text-[#8A8A8A]">
        {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
          <div key={d} className="grid place-items-center py-1">
            {d}
          </div>
        ))}
      </div>

      {/* days grid */}
      <div className="grid grid-cols-7 gap-y-2">
        {cells.map((day, i) => {
          if (!day) return <div key={i} />;
          const selected = selectedDays.includes(day);
          return (
            <button
              key={i}
              onClick={() => onToggleDay?.(day)}
              className={[
                "w-10 h-10 grid place-items-center rounded",
                selected
                  ? "border-2 border-[#EB2726] text-[#EB2726] bg-white"
                  : "border border-[#E5E5E5] bg-white text-black",
              ].join(" ")}
            >
              <span className="text-[14px] font-bold leading-none">{day}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
