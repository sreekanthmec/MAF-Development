import React from "react";

const SessionItem = ({
  date,
  time,
  trainer,
  sessionIn,
  isUpcoming,
  showFooter,
}) => {
  return (
    <div
      className="bg-white rounded-none overflow-hidden flex-shrink-0 w-64 mr-4"
      style={{
        border: "1px solid #DEDEDE",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        height: showFooter ? "auto" : "100px", // Explicit height when no footer
        minHeight: "100px", // Ensure minimum height
      }}
    >
      <div className="flex">
        <div className="bg-[#F7F7F7] p-4 flex flex-col justify-center items-center">
          <p className="text-lg font-bold">{date}</p>
        </div>
        <div className="p-4 flex-1">
          <p className="text-sm text-gray-500">{time}</p>
          <p className="text-lg font-bold">{trainer}</p>
        </div>
      </div>
      {isUpcoming && showFooter && (
        <div className="bg-[#EB2726] p-2 text-white flex justify-between items-center">
          <span>Session starts in</span>
          <span className="flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 20V4m8 4v8H4V8"
              ></path>
            </svg>
            {sessionIn}
          </span>
        </div>
      )}
    </div>
  );
};

export default SessionItem;
