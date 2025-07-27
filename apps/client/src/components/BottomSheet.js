import React from "react";
import { PrimaryButton } from "../components/Button";

const BottomSheet = ({ credits, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end z-50">
      <div className="bg-white w-full p-6 rounded-t-xl">
        <div className="flex justify-center mb-4">
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24 4C13.5066 4 5 12.5066 5 23C5 33.4934 13.5066 42 24 42C34.4934 42 43 33.4934 43 23C43 12.5066 34.4934 4 24 4ZM20.6667 32L11.3333 22.6667L14.7867 19.2133L20.6667 25.0933L33.2133 12.5467L36.6667 16L20.6667 32Z"
              fill="#4CAF50"
            />
          </svg>
        </div>
        <p className="text-center text-green-600 font-bold text-lg mb-4">
          +50 Credits added
        </p>
        <div className="bg-gray-100 p-4 rounded-md flex justify-between items-center mb-6">
          <p className="text-gray-600">Remaining Credits</p>
          <div className="flex items-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                fill="#FFD700"
              />
            </svg>
            <span className="ml-2 font-bold text-xl">{credits}</span>
          </div>
        </div>
        <PrimaryButton label={"BOOK TRAINER"} onClick={onClose} />
      </div>
    </div>
  );
};

export default BottomSheet;
