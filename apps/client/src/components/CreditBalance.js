import React from "react";
import { useNavigate } from "react-router-dom";

const CreditsBalance = ({ balance }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center bg-black rounded-md overflow-hidden">
      <div className="flex items-center bg-black text-white px-2 py-1">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.17657 11.0585H1L11.3812 0H13.6188L10.7647 6.21159H14L3.6188 16H1.38121L4.17657 11.0585Z"
            fill="#FFD700"
          />
        </svg>
        <span className="ml-2">{balance}</span>
      </div>
      <button
        onClick={() => navigate("/credits")}
        className="bg-[#EB2726] text-white px-2 py-1 flex items-center justify-center"
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M6 0V12M0 6H12" stroke="white" strokeWidth="2" />
        </svg>
      </button>
    </div>
  );
};

export default CreditsBalance;
