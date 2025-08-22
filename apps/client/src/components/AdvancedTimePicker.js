import React, { useState, useRef, useEffect } from "react";
import { PrimaryButton } from "./Button";

const AdvancedTimePicker = ({ onConfirm, onClose, initialTime = "04:30 PM" }) => {
  const [hour, setHour] = useState(4);
  const [minute, setMinute] = useState(30);
  const [period, setPeriod] = useState("PM");
  
  const hoursRef = useRef(null);
  const minutesRef = useRef(null);
  const periodRef = useRef(null);

  // Parse initial time
  useEffect(() => {
    const timeMatch = initialTime.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
    if (timeMatch) {
      setHour(parseInt(timeMatch[1]));
      setMinute(parseInt(timeMatch[2]));
      setPeriod(timeMatch[3].toUpperCase());
    }
  }, [initialTime]);

  const handleConfirm = () => {
    const time = `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")} ${period}`;
    onConfirm(time);
  };

  // Generate time options
  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = [0, 15, 30, 45];
  const periods = ["AM", "PM"];

  // Scroll to selected item
  const scrollToSelected = (ref, selectedIndex, itemHeight = 40) => {
    if (ref.current) {
      const scrollTop = selectedIndex * itemHeight - ref.current.clientHeight / 2 + itemHeight / 2;
      ref.current.scrollTo({ top: scrollTop, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    // Scroll to selected items after component mounts
    setTimeout(() => {
      scrollToSelected(hoursRef, hour - 1);
      scrollToSelected(minutesRef, minutes.indexOf(minute));
      scrollToSelected(periodRef, periods.indexOf(period));
    }, 100);
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end z-50">
      <div className="bg-white w-full max-w-sm rounded-t-lg overflow-hidden">
        {/* Time Picker Content */}
        <div className="p-6">
          <div className="flex justify-center items-center mb-6">
            {/* Hours Column */}
            <div className="flex flex-col items-center mr-8">
              <div 
                ref={hoursRef}
                className="h-40 overflow-y-auto scrollbar-hide relative"
                style={{ width: '60px' }}
              >
                <div className="h-20"></div> {/* Top spacer */}
                {hours.map((h) => (
                  <div
                    key={h}
                    className={`h-10 flex items-center justify-center cursor-pointer transition-colors ${
                      h === hour 
                        ? "text-red-600 font-bold text-lg" 
                        : "text-gray-400 text-sm"
                    }`}
                    onClick={() => setHour(h)}
                  >
                    {h.toString().padStart(2, "0")}
                  </div>
                ))}
                <div className="h-20"></div> {/* Bottom spacer */}
              </div>
            </div>

            {/* Minutes Column */}
            <div className="flex flex-col items-center mr-8">
              <div 
                ref={minutesRef}
                className="h-40 overflow-y-auto scrollbar-hide relative"
                style={{ width: '60px' }}
              >
                <div className="h-20"></div> {/* Top spacer */}
                {minutes.map((m) => (
                  <div
                    key={m}
                    className={`h-10 flex items-center justify-center cursor-pointer transition-colors ${
                      m === minute 
                        ? "text-red-600 font-bold text-lg" 
                        : "text-gray-400 text-sm"
                    }`}
                    onClick={() => setMinute(m)}
                  >
                    {m.toString().padStart(2, "0")}
                  </div>
                ))}
                <div className="h-20"></div> {/* Bottom spacer */}
              </div>
            </div>

            {/* AM/PM Column */}
            <div className="flex flex-col items-center">
              <div 
                ref={periodRef}
                className="h-40 overflow-y-auto scrollbar-hide relative"
                style={{ width: '60px' }}
              >
                <div className="h-20"></div> {/* Top spacer */}
                {periods.map((p) => (
                  <div
                    key={p}
                    className={`h-10 flex items-center justify-center cursor-pointer transition-colors ${
                      p === period 
                        ? "text-red-600 font-bold text-lg" 
                        : "text-gray-400 text-sm"
                    }`}
                    onClick={() => setPeriod(p)}
                  >
                    {p}
                  </div>
                ))}
                <div className="h-20"></div> {/* Bottom spacer */}
              </div>
            </div>
          </div>

          {/* Selection Indicator */}
          <div className="flex justify-center mb-6">
            <div className="border border-gray-300 rounded-lg px-6 py-2 bg-gray-50">
              <span className="text-lg font-semibold text-gray-900">
                {hour.toString().padStart(2, "0")} : {minute.toString().padStart(2, "0")} : {period}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center p-4 border-t border-gray-200">
          <button 
            onClick={onClose} 
            className="w-12 h-12 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 18L18 6M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          
          <PrimaryButton 
            label="CONFIRM" 
            onClick={handleConfirm}
            className="flex-1 ml-4"
          />
        </div>
      </div>
    </div>
  );
};

export default AdvancedTimePicker;
