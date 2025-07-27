import React from "react";
import { useNavigate } from "react-router-dom";

const BackIcon = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="text-gray-500 bg-transparent border-0"
    >
      <svg
        width="24"
        height="18"
        viewBox="0 0 24 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M24 9H1.5" stroke="#717171" strokeWidth="2" />
        <path d="M9.5 17L1.5 9L9.5 1" stroke="#717171" strokeWidth="2" />
      </svg>
    </button>
  );
};

export default BackIcon;
