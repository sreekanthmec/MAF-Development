import React from "react";
import TrainerCardHeader from "./TrainerCardHeader";

export interface AvailableTrainerCardProps {
  name: string;
  rate: number | string;
  meta?: string;          // e.g. "27F"
  imageSrc: string;
  slots: string[];        // e.g. ["9AM - 10AM", ...]
  onHeaderClick?: () => void;
  onSlotClick?: (slot: string) => void;
  className?: string;
}

const AvailableTrainerCard: React.FC<AvailableTrainerCardProps> = ({
  name,
  rate,
  meta,
  imageSrc,
  slots,
  onHeaderClick,
  onSlotClick,
  className = "",
}) => {
  return (
    <div className={["border border-[#DEDEDE] bg-white", className].join(" ")}>
      <TrainerCardHeader
        name={name}
        rate={rate}
        meta={meta}
        imageSrc={imageSrc}
        variant="dark"
        height={172}
        onClick={onHeaderClick}
      />

      {/* time chips */}
      <div className="px-5 py-4 grid grid-cols-3 gap-4">
        {slots.slice(0, 3).map((time) => (
          <button
            key={time}
            className="h-[56px] bg-white border border-[#DBDBDB] grid place-items-center text-[16px] font-semibold"
            onClick={() => onSlotClick?.(time)}
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AvailableTrainerCard;
