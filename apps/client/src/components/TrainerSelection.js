import React from "react";
import { useNavigate } from "react-router-dom";

const TrainerSelection = () => {
  const navigate = useNavigate();

  return (
    <section className="mb-4">
      <div className="flex justify-start">
        <button
          onClick={() => navigate("/trainers?view=myTrainers")}
          className="flex border-1 border-gray-300 p-4 text-center flex-col items-start mr-2"
        >
          <svg
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.47079 2.74523L10.0022 4.27668L11.532 2.74523C13.8885 0.388733 17.9123 1.467 18.7749 4.68598C19.1751 6.17998 18.748 7.77405 17.6544 8.86766L10.0022 16.5215L2.34836 8.86766C-0.00828545 6.51116 1.06998 2.4874 4.28911 1.62476C5.78296 1.22452 7.37703 1.65162 8.47079 2.74523Z"
              stroke="#EB2726"
              strokeWidth="2"
            />
            <path
              d="M8.47079 2.74523L10.0022 4.27668L11.532 2.74523C13.8885 0.388733 17.9123 1.467 18.7749 4.68598C19.1751 6.17998 18.748 7.77405 17.6544 8.86766L10.0022 16.5215L2.34836 8.86766C-0.00828545 6.51116 1.06998 2.4874 4.28911 1.62476C5.78296 1.22452 7.37703 1.65162 8.47079 2.74523Z"
              stroke="black"
              strokeOpacity="0.2"
              strokeWidth="2"
            />
          </svg>
          <span className="mt-2 font-bold text-black">MY TRAINERS</span>
        </button>
        <button
          onClick={() => navigate("/trainers?view=allTrainers")}
          className="flex border-1 border-gray-300 p-4 text-center flex-col items-start mr-2"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2.84375L9.18999 9.21975L2.81299 12.0308L9.18999 14.8418L12 21.2197L14.812 14.8428L21.188 12.0317L14.812 9.22075L12 2.84375Z"
              stroke="#EB2726"
              strokeWidth="2"
            />
            <path
              d="M12 2.84375L9.18999 9.21975L2.81299 12.0308L9.18999 14.8418L12 21.2197L14.812 14.8428L21.188 12.0317L14.812 9.22075L12 2.84375Z"
              stroke="black"
              strokeOpacity="0.2"
              strokeWidth="2"
            />
          </svg>
          <span className="mt-2 font-bold text-black">ALL TRAINERS</span>
        </button>
      </div>
    </section>
  );
};

export default TrainerSelection;
