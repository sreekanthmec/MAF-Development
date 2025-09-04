import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  date: Date;
  durationMinutes: number;
  slots: string[];
  onPrevDay?: () => void;
  onNextDay?: () => void;
  onPickSlot?: (slot: string) => void;
  className?: string;
};

function formatLongDate(d: Date) {
  return d.toLocaleDateString(undefined, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function DaySlotsPreview({
  date,
  durationMinutes,
  slots,
  onPrevDay,
  onNextDay,
  onPickSlot,
  className = "",
}: Props) {
  return (
    <div className={className}>
      {/* day header */}
      <div className="flex items-center justify-between mb-1">
        <button
          className="p-2 -ml-2 text-[#777]"
          onClick={onPrevDay}
          aria-label="Previous day"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="text-[16px] font-extrabold">{formatLongDate(date)}</div>
        <button
          className="p-2 -mr-2 text-[#777]"
          onClick={onNextDay}
          aria-label="Next day"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="text-[12px] text-[#8A8A8A] mb-3">
        Duration: {durationMinutes} Minutes
      </div>

      <div className="space-y-3">
        {slots.map((t) => (
          <button
            key={t}
            className="w-full h-[56px] bg-white border border-[#DEDEDE] rounded grid place-items-center text-[16px] font-semibold"
            onClick={() => onPickSlot?.(t)}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}
