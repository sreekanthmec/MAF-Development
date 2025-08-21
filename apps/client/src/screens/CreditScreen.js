import React from "react";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../components/Button";
import Navbar from "../components/Navbar"; // reuse your navbar with back
import CreditHistoryItem from "../components/CreditHistoryItem";
import SupportChip from "../components/SupportChip";

export default function CreditsScreen() {
  const navigate = useNavigate();

  const creditHistory = [
    { date: "Aug 12, 10:00 AM", description: "Session with Lazerano", change: -2,  changeType: "decrease" },
    { date: "Aug 12, 10:00 AM", description: "Credit Purchase",       change: 50,  changeType: "increase" },
    { date: "Aug 11, 10:00 AM", description: "Session with Helena",    change: -2,  changeType: "decrease" },
    { date: "Aug 10, 10:00 AM", description: "Session with Helena",    change: -2,  changeType: "decrease" },
  ];

  return (
    <div className="min-h-[100dvh] w-full bg-[#F7F7F7]">
      <div className="mx-auto max-w-[400px] min-h-[100dvh] flex flex-col">
        {/* Header / hero */}
        <header className="relative w-full bg-[linear-gradient(157.07deg,#3a3a3a_0%,#252525_81.65%)] text-white">
          {/* <div className="px-5 pt-2"> */}
            <Navbar
              onBack={() => navigate(-1)}
              rightSlot={<SupportChip onClick={() => navigate("/support")} />}
              // transparent navbar is default per your component
            />
          {/* </div> */}

          <div className="px-5 pb-6 pt-4">
            <div className="text-center">
              <div className="text-[12px] tracking-wide text-[#B0B0B0] font-extrabold">
                YOUR CREDITS REMAINING
              </div>

              <div className="mt-4 flex items-end justify-center gap-2">
                {/* Lightning icon */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 21L15 13H11L13 3L5 13H9V21Z"
                    fill="#F4C505"
                    stroke="#F4C505"
                    strokeWidth="1"
                  />
                </svg>
                <div className="text-white italic font-extrabold text-[48px] leading-none">
                  100
                </div>
              </div>

              <div className="mt-5">
                <PrimaryButton
                  label="BUY CREDITS"
                  onClick={() => navigate("/buy-credits")}
                  className="!w-full"
                />
              </div>
            </div>
          </div>
        </header>

        {/* List */}
        <main className="flex-1 w-full">
          <div className="px-5 py-4">
            <div className="text-[12px] tracking-[0.05em] font-extrabold text-[#8B8B8B] mb-3">
              // CREDIT HISTORY
            </div>

            <div className="space-y-3">
              {creditHistory.map((item, i) => (
                <CreditHistoryItem
                  key={`${item.date}-${i}`}
                  date={item.date}
                  description={item.description}
                  change={item.change}
                  changeType={item.changeType}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
