import React from "react";

interface QuantitySelectorProps {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  min?: number;
  max?: number;
  disabled?: boolean;
  className?: string;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  value,
  onIncrement,
  onDecrement,
  min = 1,
  max,
  disabled = false,
  className = "",
}) => {
  const canDecrement = value > min && !disabled;
  const canIncrement = !max || value < max;

  return (
    <div className={`border border-[#DEDEDE] bg-white h-[48px] flex items-stretch ${className}`}>
      <button
        onClick={onDecrement}
        disabled={!canDecrement}
        className="w-[56px] grid place-items-center disabled:opacity-40"
      >
        <div className="w-[32px] h-[32px] bg-[#F7B4B4] grid place-items-center">
          <span className="text-[#EB2726] text-xl leading-none">−</span>
        </div>
      </button>
      
      <div className="flex-1 grid place-items-center font-semibold">
        {value}
      </div>
      
      <button
        onClick={onIncrement}
        disabled={!canIncrement || disabled}
        className="w-[56px] grid place-items-center disabled:opacity-40"
      >
        <div className="w-[32px] h-[32px] bg-[#EB2726] grid place-items-center">
          <span className="text-white text-xl leading-none">+</span>
        </div>
      </button>
    </div>
  );
};

export default QuantitySelector;
