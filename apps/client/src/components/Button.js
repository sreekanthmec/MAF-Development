import React from "react";

export const PrimaryButton = ({ label, onClick, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex justify-between items-center px-6 py-[19px] w-[320px] h-[52px] border-0 bg-[#EB2726] text-white font-bold"
    >
      <span className="font-manrope font-extrabold text-[14px] leading-[20px] tracking-[0.02em] text-left">
        {label}
      </span>
      <svg
        width="24"
        height="18"
        viewBox="0 0 24 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 9H22.5" stroke="white" strokeWidth="2" />
        <path d="M14.5 17L22.5 9L14.5 1" stroke="white" strokeWidth="2" />
      </svg>
    </button>
  );
};

export const SecondaryButton = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex justify-between items-center px-6 py-[10px] w-[320px] h-[52px] border bg-transparent border-gray-800"
    >
      <span className="font-manrope font-extrabold text-[14px] leading-[20px] tracking-[0.02em] text-left">
        {label}
      </span>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 12H22.5" stroke="#B0B0B0" strokeWidth="2" />
        <path d="M14.5 20L22.5 12L14.5 4" stroke="#B0B0B0" strokeWidth="2" />
      </svg>
    </button>
  );
};
