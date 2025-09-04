// src/screens/TrainerEditAvailability.tsx
import React, { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import TabBar from "../components/TabBar";
import { PrimaryButton } from "../components/Button";
import { Plus, X } from "lucide-react";

// Reusable preview pieces (add from components folder)
import CalendarMonth from "../components/CalendarMonth";
import DaySlotsPreview from "../components/DaySlotsPreview";

/* --------------------------------- types ---------------------------------- */
type DayKey =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";

type DayAvailability = {
  enabled: boolean;
  /** simple time points like "9:00am", "5:00pm" */
  times: string[];
};

type AvailabilityState = Record<DayKey, DayAvailability>;

const DAY_KEYS: DayKey[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

/* ------------------------------ small atoms ------------------------------- */

function SettingRow({
  label,
  helper,
  valueText,
  onClick,
}: {
  label: string;
  helper: string;
  valueText: string;
  onClick?: () => void;
}) {
  return (
    <div className="border border-[#DEDEDE] bg-white">
      <button
        onClick={onClick}
        className="w-full px-4 py-3 flex items-center justify-between"
      >
        <div className="text-left">
          <div className="text-[14px] font-extrabold text-[#2D2D2D]">
            {label}
          </div>
          <div className="text-[12px] text-[#8A8A8A]">
            {helper}
          </div>
        </div>

        <div className="text-[12px] font-bold text-[#EB2726]">{valueText}</div>
      </button>
    </div>
  );
}

function SquareCheckbox({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={[
        "w-5 h-5 grid place-items-center border",
        checked ? "bg-[#EB2726] border-[#EB2726]" : "bg-white border-[#CFCFCF]",
      ].join(" ")}
      aria-pressed={checked}
    >
      {checked ? (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M3 6.5 5 8.5 9.5 3.5"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ) : null}
    </button>
  );
}

function TimeChip({
  label,
  onRemove,
}: {
  label: string;
  onRemove?: () => void;
}) {
  return (
    <div className="relative">
      <div className="h-[40px] px-3 border border-[#DEDEDE] bg-white grid place-items-center text-[14px]">
        {label}
      </div>
      {onRemove && (
        <button
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white border border-[#DEDEDE] grid place-items-center"
          onClick={onRemove}
          aria-label="Remove time"
        >
          <X className="w-3.5 h-3.5 text-[#8A8A8A]" />
        </button>
      )}
    </div>
  );
}

function DayCard({
  day,
  state,
  onToggle,
  onAddTime,
  onRemoveTime,
}: {
  day: DayKey;
  state: DayAvailability;
  onToggle: (enabled: boolean) => void;
  onAddTime: () => void;
  onRemoveTime: (idx: number) => void;
}) {
  return (
    <div className="border border-[#DEDEDE] bg-white px-4 py-3">
      <div className="flex items-center gap-2">
        <SquareCheckbox checked={state.enabled} onChange={onToggle} />
        <div className="font-extrabold text-[14px]">{day}</div>
      </div>

      {state.enabled ? (
        <>
          <div className="mt-3 flex flex-wrap gap-3">
            {state.times.map((t, i) => (
              <TimeChip
                key={`${t}-${i}`}
                label={t}
                onRemove={() => onRemoveTime(i)}
              />
            ))}
          </div>
          <button
            className="mt-3 inline-flex items-center gap-2 text-[#2D2D2D] border border-[#DEDEDE] px-3 h-[36px] text-[14px]"
            onClick={onAddTime}
          >
            <Plus className="w-4 h-4" />
            Add another time
          </button>
        </>
      ) : (
        <div className="mt-2 text-[12px] text-[#8A8A8A]">Unavailable</div>
      )}
    </div>
  );
}

/* ---------------------------------- screen --------------------------------- */

export default function TrainerEditAvailability() {
  const [tab, setTab] = useState(0);

  // A. Auto-accept + session limits
  const [autoAccept, setAutoAccept] = useState(false);
  const [advanceHours, setAdvanceHours] = useState(3);
  const [coolOffHours, setCoolOffHours] = useState(3);
  const [dailyLimit, setDailyLimit] = useState(6);

  // B. Per-day availability
  const [availability, setAvailability] = useState<AvailabilityState>({
    Sunday: { enabled: true, times: ["9:00am", "5:00pm"] },
    Monday: { enabled: false, times: [] },
    Tuesday: { enabled: false, times: [] },
    Wednesday: { enabled: false, times: [] },
    Thursday: { enabled: false, times: [] },
    Friday: { enabled: false, times: [] },
    Saturday: { enabled: false, times: [] },
  });

  const toggleDay = (day: DayKey, enabled: boolean) =>
    setAvailability((s) => ({ ...s, [day]: { ...s[day], enabled } }));

  const addTime = (day: DayKey) =>
    setAvailability((s) => {
      const next = prompt("Enter time (e.g., 9:00am)")?.trim();
      if (!next) return s;
      return { ...s, [day]: { ...s[day], times: [...s[day].times, next] } };
    });

  const removeTime = (day: DayKey, idx: number) =>
    setAvailability((s) => {
      const times = [...s[day].times];
      times.splice(idx, 1);
      return { ...s, [day]: { ...s[day], times } };
    });

  const save = () => {
    // TODO: call API
    console.log({
      autoAccept,
      limits: { advanceHours, coolOffHours, dailyLimit },
      availability,
    });
    window.history.back();
  };

  /* ----------------------------- PREVIEW state ---------------------------- */
  const [monthDate, setMonthDate] = useState(() => new Date(2022, 7, 1)); // August 2022
  const [selectedDays, setSelectedDays] = useState<number[]>([
    15, 16, 17, 18, 19, 22, 23, 24, 25, 26,
  ]);
  const [focusDay, setFocusDay] = useState<number | null>(null);
  const focusedDate = useMemo(
    () =>
      focusDay == null
        ? null
        : new Date(monthDate.getFullYear(), monthDate.getMonth(), focusDay),
    [focusDay, monthDate]
  );
  const durationMinutes = 90;
  const sampleSlots = ["9:00 am", "10:30 am", "12:00 pm"];

  const prevMonth = () =>
    setMonthDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  const nextMonth = () =>
    setMonthDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));

  /* -------------------------------- render -------------------------------- */
  return (
    <div
      className="h-[100dvh] w-full bg-[#F7F7F7] overflow-y-auto"
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      <div className="mx-auto max-w-[400px] min-h-full flex flex-col">
        {/* NAVBAR (consistent with EditProfile) */}
        <Navbar
          onBack={() => window.history.back()}
          background="transparent"
          spacerHeight={40}
        />

        {/* CONTENT */}
        <main className="flex-1 px-5">
          <div className="pt-4">
            {/* TITLE */}
            <PageTitle>Edit Availability</PageTitle>

            {/* TABS */}
            <div className="mt-2">
              <TabBar
                tabs={["SESSSION & AVAILABILITY", "PREVIEW"]}
                active={tab}
                onChange={setTab}
                leftPad={0}
              />
            </div>

            {/* ---------------------- TAB 0: Session & Availability ---------------------- */}
            {tab === 0 && (
              <div className="mt-4 space-y-6">
                {/* auto-accept note */}
                <div className="flex items-start gap-3">
                  <SquareCheckbox
                    checked={autoAccept}
                    onChange={setAutoAccept}
                  />
                  <p className="text-[13px] leading-5 text-[#2D2D2D]">
                    By setting my availability, I understand that the system
                    will automatically accept bookings for any available
                    timeslots.
                  </p>
                </div>

                {/* section label */}
                <p className="text-[12px] text-[#8A8A8A] uppercase tracking-wide">
                  // SESSION LIMITS
                </p>

                <div className="space-y-3">
                  <SettingRow
                    label="Advance Booking"
                    helper="Set the minimum hours required before a session can be booked."
                    valueText={`Book before ${advanceHours} hrs`}
                    onClick={() => {
                      const v = prompt("Advance booking (hours):", String(advanceHours));
                      if (v && !isNaN(+v)) setAdvanceHours(Math.max(0, +v));
                    }}
                  />
                  <SettingRow
                    label="Session Cool-off Time"
                    helper="Set the required break time between consecutive sessions."
                    valueText={`${coolOffHours} hrs Rest`}
                    onClick={() => {
                      const v = prompt("Cool-off time (hours):", String(coolOffHours));
                      if (v && !isNaN(+v)) setCoolOffHours(Math.max(0, +v));
                    }}
                  />
                  <SettingRow
                    label="Daily Session Limit"
                    helper="Limit the total number of sessions you can take in a day."
                    valueText={`${dailyLimit} per day`}
                    onClick={() => {
                      const v = prompt("Daily session limit:", String(dailyLimit));
                      if (v && !isNaN(+v)) setDailyLimit(Math.max(0, +v));
                    }}
                  />
                </div>

                {/* section label */}
                <p className="text-[12px] text-[#8A8A8A] uppercase tracking-wide">
                  // AVAILABILITY
                </p>

                <div className="space-y-3">
                  {DAY_KEYS.map((day) => {
                    const s = availability[day];
                    return (
                      <DayCard
                        key={day}
                        day={day}
                        state={s}
                        onToggle={(en) => toggleDay(day, en)}
                        onAddTime={() => addTime(day)}
                        onRemoveTime={(idx) => removeTime(day, idx)}
                      />
                    );
                  })}
                </div>

                {/* date-specific hours (placeholder CTA) */}
                <button
                  className="inline-flex items-center gap-2 text-[#EB2726] font-semibold mt-1"
                  onClick={() => alert("Date-specific hours flow")}
                >
                  <Plus className="w-4 h-4" />
                  DATE SPECIFIC HOURS
                </button>
              </div>
            )}

            {/* ---------------------------- TAB 1: Preview ---------------------------- */}
            {tab === 1 && (
              <div className="mt-4">
                {/* note */}
                <div className="flex items-start gap-3 mb-4">
                  <SquareCheckbox
                    checked={autoAccept}
                    onChange={setAutoAccept}
                  />
                  <p className="text-[13px] leading-5 text-[#2D2D2D]">
                    By setting my availability, I understand that the system
                    will automatically accept bookings for any available
                    timeslots.
                  </p>
                </div>

                <p className="text-[12px] text-[#8A8A8A] uppercase tracking-wide mb-3">
                  // AVAILABILITY
                </p>

                {/* View A: Month grid */}
                {focusDay == null && (
                  <CalendarMonth
                    monthDate={monthDate}
                    selectedDays={selectedDays}
                    onToggleDay={(d) => setFocusDay(d)}
                    onPrevMonth={prevMonth}
                    onNextMonth={nextMonth}
                  />
                )}

                {/* View B: Single-day slots */}
                {focusDay != null && focusedDate && (
                  <DaySlotsPreview
                    date={focusedDate}
                    durationMinutes={durationMinutes}
                    slots={sampleSlots}
                    onPrevDay={() =>
                      setFocusDay((d) => (d ? Math.max(1, d - 1) : 1))
                    }
                    onNextDay={() =>
                      setFocusDay((d) =>
                        d
                          ? Math.min(
                              new Date(
                                monthDate.getFullYear(),
                                monthDate.getMonth() + 1,
                                0
                              ).getDate(),
                              d + 1
                            )
                          : 1
                      )
                    }
                  />
                )}
              </div>
            )}

            {/* SAVE BUTTON AT BOTTOM OF SCROLLVIEW (same pattern as EditProfile) */}
            <div className="pt-8 pb-[max(16px,env(safe-area-inset-bottom))]">
              <PrimaryButton
                label="SAVE AND EXIT"
                onClick={save}
                className="!w-full"
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
