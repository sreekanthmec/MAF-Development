import React from "react";

const SessionDurationCounter = ({ duration, onIncrease, onDecrease }) => {
  return (
    <div
      className="flex justify-between items-center w-[320px] h-[48px] border border-[#B1B1B1] px-4 py-2.5"
      style={{
        boxSizing: "border-box",
      }}
    >
      <button
        onClick={onDecrease}
        className="relative flex justify-center items-center w-6 h-6 bg-[#FA403F] rounded"
        disabled={duration <= 30}
      >
        <div
          className="w-4 h-0.5 bg-white absolute"
        />
      </button>

      <div
        className="flex justify-center items-center font-manrope font-extrabold text-sm leading-4 text-center w-[110px] h-4"
      >
        {duration} mins Session
      </div>

      <button
        onClick={onIncrease}
        className="relative flex justify-center items-center w-6 h-6 bg-[#FA403F] rounded"
      >
        <div
          className="w-4 h-4 relative"
        >
          <div
            className="w-4 h-0.5 bg-white absolute top-1/2 transform -translate-y-1/2"
          />
          <div
            className="w-0.5 h-4 bg-white absolute left-1/2 transform -translate-x-1/2"
          />
        </div>
      </button>
    </div>
  );
};

export default SessionDurationCounter;
