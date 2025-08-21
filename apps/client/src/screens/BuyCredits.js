// src/screens/BuyCredits.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackIcon from "../components/BackIcon";
import { PrimaryButton, TertiaryButton } from "../components/Button";

/* small inline icon */
const Bolt = ({ className = "" }) => (
  <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path
      d="M8 13H3L13 1h3l-3 8h6L12 23H9l3-10H8Z"
      stroke="#F4C505"
      strokeWidth="2"
      fill="none"
    />
  </svg>
);

/* Result modal */
function PaymentResultModal({
  open,
  type, // "success" | "failure"
  remainingCredits,
  onClose,
  onRetry,
  onBook,
}) {
  if (!open) return null;

  const isSuccess = type === "success";

  return (
    <div className="fixed inset-0 z-[100] bg-black/40 grid place-items-center px-5">
      <div className="w-full max-w-[400px] bg-white p-6 shadow-xl">
        {/* top divider */}
        <div className="w-14 h-[3px] mx-auto bg-[#E6E6E6] rounded mb-8" />
        <div className="grid place-items-center gap-4">
          {/* Icon */}
          {isSuccess ? (
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <rect x="18" y="14" width="28" height="28" stroke="#269347" strokeWidth="3" />
              <path d="M26 29l6 6 10-12" stroke="#269347" strokeWidth="4" fill="none" />
              <rect x="24" y="20" width="28" height="28" stroke="#269347" strokeWidth="3" />
            </svg>
          ) : (
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <rect x="18" y="14" width="28" height="28" stroke="#B9452F" strokeWidth="3" />
              <path d="M26 26l14 14M40 26L26 40" stroke="#B9452F" strokeWidth="4" />
              <rect x="24" y="20" width="28" height="28" stroke="#B9452F" strokeWidth="3" />
            </svg>
          )}

          <div
            className={`text-[18px] font-bold ${
              isSuccess ? "text-[#269347]" : "text-[#B9452F]"
            }`}
          >
            {isSuccess ? "+ Credits added" : "Oops! Payment Failed"}
          </div>

          {isSuccess ? (
            <div className="w-full border border-[#DEDEDE] px-4 py-3 flex items-center justify-between">
              <span className="text-[#8F9098]">Remaining Credits</span>
              <span className="flex items-center gap-2">
                <Bolt />
                <span className="font-extrabold">{remainingCredits}</span>
              </span>
            </div>
          ) : null}

          <div className="w-full mt-4">
            {isSuccess ? (
              <PrimaryButton
                label="BOOK TRAINER"
                onClick={onBook}
                className="!w-full"
              />
            ) : (
              <>
                <PrimaryButton label="RETRY" onClick={onRetry} className="!w-full" />
                <TertiaryButton
                  label="CONTACT SUPPORT"
                  layout="split"
                  onClick={onClose}
                  className="!w-full mt-3"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BuyCredits() {
  const navigate = useNavigate();

  // UI state
  const [credits, setCredits] = useState(10);
  const creditCost = 30; // $/credit
  const totalCost = credits * creditCost;

  // fake remaining for success modal
  const [remainingCredits, setRemainingCredits] = useState(100);

  // modal state
  const [result, setResult] = useState(null); // "success" | "failure" | null
  const [processing, setProcessing] = useState(false);

  const quickPicks = [20, 50, 100, 250];

  const dec = () => setCredits((c) => Math.max(1, c - 1));
  const inc = () => setCredits((c) => c + 1);

  const handlePay = async () => {
    setProcessing(true);

    // simulate a short processing delay then randomly show success/failure
    setTimeout(() => {
      const ok = Math.random() > 0.5;
      if (ok) {
        setRemainingCredits((prev) => prev + credits);
        setResult("success");
      } else {
        setResult("failure");
      }
      setProcessing(false);
    }, 700);
  };

  return (
    <div className="w-full bg-[#F7F7F7] min-h-[100dvh]">
      {/* 400px app shell */}
      <div className="mx-auto max-w-[400px] min-h-[100dvh] flex flex-col">
        {/* Header */}
        <header className="px-5 pt-4">
          <button aria-label="Back" onClick={() => navigate(-1)} className="-ml-1">
            <BackIcon />
          </button>
          <h1 className="text-[24px] font-extrabold mt-6">Buy Credits</h1>
        </header>

        {/* Content (scrollable) */}
        <main className="px-5 flex-1 pb-28">
          {/* stepper */}
          <div className="mt-6 border border-[#DEDEDE] bg-white h-[48px] flex items-stretch">
            <button
              onClick={dec}
              disabled={credits <= 1 || processing}
              className="w-[56px] grid place-items-center disabled:opacity-40"
            >
              <div className="w-[32px] h-[24px] bg-[#F7B4B4] grid place-items-center">
                <span className="text-[#EB2726] text-xl leading-none">−</span>
              </div>
            </button>
            <div className="flex-1 grid place-items-center font-semibold">{credits}</div>
            <button
              onClick={inc}
              disabled={processing}
              className="w-[56px] grid place-items-center"
            >
              <div className="w-[32px] h-[24px] bg-[#EB2726] grid place-items-center">
                <span className="text-white text-xl leading-none">+</span>
              </div>
            </button>
          </div>

          {/* quick picks */}
          <div className="mt-4 grid grid-cols-4 gap-4">
            {quickPicks.map((v) => (
              <button
                key={v}
                onClick={() => setCredits(v)}
                className={`h-[40px] bg-white border ${
                  credits === v ? "border-black" : "border-[#DEDEDE]"
                } grid place-items-center text-[14px]`}
              >
                {v}
              </button>
            ))}
          </div>

          {/* price banner */}
          <div className="mt-5 bg-[#FFF6D9] border border-[#F5E6AB] px-4 py-3 flex items-center justify-between">
            <Bolt />
            <div className="text-[14px]">
              <span className="text-[#616161] mr-2">1 Credit</span>
              <span className="font-extrabold">${creditCost}</span>
            </div>
            <Bolt />
          </div>
        </main>

        {/* Sticky footer constrained to the shell */}
        <footer className="sticky bottom-0 z-40 bg-white border-t">
          <div className="px-5 py-3 pb-[max(12px,env(safe-area-inset-bottom))]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[#8C8C8C]">Total cost</span>
              <span className="font-extrabold text-[16px]">${totalCost}</span>
            </div>
            <PrimaryButton
              label={processing ? "PROCESSING..." : "PAY"}
              onClick={handlePay}
              disabled={processing}
              className="!w-full"
            />
          </div>
        </footer>
      </div>

      {/* Result modal */}
      <PaymentResultModal
        open={result !== null}
        type={result || "success"}
        remainingCredits={remainingCredits}
        onClose={() => setResult(null)}
        onRetry={() => {
          setResult(null);
          handlePay();
        }}
        onBook={() => {
          setResult(null);
          navigate("/explore-trainers");
        }}
      />
    </div>
  );
}
