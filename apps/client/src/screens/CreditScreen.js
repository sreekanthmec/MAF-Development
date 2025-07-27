import React from "react";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../components/Button";
import BackIcon from "../components/BackIcon";

const CreditsScreen = () => {
  const navigate = useNavigate();

  const creditHistory = [
    {
      date: "Aug 12, 10:00 AM",
      description: "Session with Lazerano",
      change: -2,
      changeType: "decrease",
    },
    {
      date: "Aug 12, 10:00 AM",
      description: "Credit Purchase",
      change: 50,
      changeType: "increase",
    },
    {
      date: "Aug 11, 10:00 AM",
      description: "Session with Helena",
      change: -2,
      changeType: "decrease",
    },
    {
      date: "Aug 10, 10:00 AM",
      description: "Session with Helena",
      change: -2,
      changeType: "decrease",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header
        className="p-4 text-white"
        style={{
          background: "linear-gradient(157.07deg, #3A3A3A 0%, #252525 81.65%)",
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <BackIcon />
          <button className="bg-black text-white px-4 py-2 rounded-md flex items-center space-x-2">
            <span>Support</span>
          </button>
        </div>

        <div className="text-center mb-8">
          <p className="text-sm text-gray-400">YOUR CREDITS REMAINING</p>
          <div className="flex items-center justify-center space-x-2 mt-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                fill="#FFCC00"
              />
            </svg>
            <h1 className="text-5xl font-bold">100</h1>
          </div>
          <PrimaryButton
            label="BUY CREDITS"
            onClick={() => {
              navigate("/buy-credits");
            }}
          />
        </div>
      </header>

      <section className="p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-2">CREDIT HISTORY</h3>
        <div className="space-y-4">
          {creditHistory.map((item, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-500">{item.date}</p>
                  <p className="text-lg font-bold">{item.description}</p>
                </div>
                <div
                  className={`text-xl font-bold ${
                    item.changeType === "decrease"
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {item.change > 0 ? `+${item.change}` : item.change}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CreditsScreen;
