// src/screens/TrainerDetails.tsx
import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import ProfileHero from "../components/ProfileHero";
import TabBar from "../components/TabBar";
import DaySelector from "../components/DaySelector";
import { StatCard, TwoCol } from "../components/StatCard";
import MediaGallery, { MediaItem } from "../components/MediaGallery";

import trainerImg from "../assets/trainer.png";
import trainerPlaceholder from "../assets/image-trainer.png";

/* ------------------------------ small pieces ------------------------------ */

function SlotRow({
  time,
  available,
  onBook,
}: {
  time: string;
  available: boolean;
  onBook: () => void;
}) {
  return (
    <div className="bg-white border border-[#E7E7E7] px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span
          className={[
            "inline-block w-2 h-2 rotate-45 rounded-[1px]",
            available ? "bg-[#2FAE5E]" : "bg-[#D7B7B0]",
          ].join(" ")}
        />
        <span className="text-[14px]">{time}</span>
      </div>

      <button
        disabled={!available}
        onClick={onBook}
        className={[
          "h-[36px] px-4 flex items-center gap-2 font-bold text-[12px] tracking-wide",
          available
            ? "bg-[#EB2726] text-white"
            : "bg-[#F3C9C7] text-white/60 cursor-not-allowed",
        ].join(" ")}
      >
        BOOK
        <svg width="20" height="16" viewBox="0 0 24 18" fill="none">
          <path d="M0 9H22.5" stroke="currentColor" strokeWidth="2" />
          <path d="M14.5 17L22.5 9L14.5 1" stroke="currentColor" strokeWidth="2" />
        </svg>
      </button>
    </div>
  );
}

/* ---------------------------------- screen --------------------------------- */

export default function TrainerDetails() {
  const navigate = useNavigate();
  const { state } = useLocation() as {
    state?: {
      trainer?: {
        name: string;
        totalSessions: number;
        creditsPerHour: number;
        ageYears: number;
        gender: string;
        imageUrl?: string;
        about?: string;
      };
    };
  };

  // Fallback when navigated directly
  const trainer =
    state?.trainer || ({
      name: "HELENA PADILLA",
      totalSessions: 22,
      creditsPerHour: 2,
      ageYears: 28,
      gender: "Female",
      imageUrl: trainerImg,
      about:
        "A countdown timer picker in iOS style. This picker shows a countdown duration with hour, minute and second spinners. The duration is bound between 0 and 23.",
    } as const);

  const [activeTab, setActiveTab] = useState(0); // 0: Availability, 1: About
  const [selectedDay, setSelectedDay] = useState(0);

  const days = useMemo(
    () => [
      { date: "AUG 12", day: "WED" },
      { date: "AUG 13", day: "THU" },
      { date: "AUG 14", day: "FRI" },
      { date: "AUG 15", day: "SAT" },
      { date: "AUG 16", day: "SUN" },
      { date: "AUG 17", day: "MON" },
      { date: "AUG 18", day: "TUE" },
    ],
    []
  );

  // Demo slot data
  const slotsByDay: Record<number, { time: string; available: boolean }[]> = {
    0: [
      { time: "9AM - 11AM", available: true },
      { time: "3PM - 5PM", available: false },
      { time: "7PM - 9PM", available: true },
      { time: "3PM - 5PM", available: false },
    ],
    1: [{ time: "10AM - 12PM", available: true }],
  };
  const todaysSlots = slotsByDay[selectedDay] ?? [];

  // Media for ABOUT (videos open in a new tab via MediaGallery)
  const media: MediaItem[] = [
    { type: "video", url: "https://www.youtube.com/watch?v=6OHYeV7iQSo", title: "Highlight" },
    { type: "image", src: trainerPlaceholder, title: "Gallery 1" },
    { type: "image", src: trainerPlaceholder, title: "Gallery 2" },
    { type: "image", src: trainerPlaceholder, title: "Gallery 3" },
  ];

  return (
    <div
      className="h-[100dvh] w-full bg-[#F7F7F7] overflow-y-auto"
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      <div className="mx-auto max-w-[400px] min-h-full flex flex-col">
        {/* HERO */}
        <ProfileHero
          onBack={() => navigate(-1)}
          name={trainer.name}
          totalSessions={trainer.totalSessions}
          creditsPerHour={trainer.creditsPerHour}
          imageSrc={trainer.imageUrl || trainerImg}
        />

        {/* CONTENT */}
        <main className="flex-1 bg-white">
          <TabBar
            tabs={["AVAILABILITY", "ABOUT"]}
            active={activeTab}
            onChange={setActiveTab}
          />

          {activeTab === 0 ? (
            <section className="px-5 pb-20">
              <div className="mt-4">
                <DaySelector
                  days={days}
                  selectedDay={selectedDay}
                  setSelectedDay={setSelectedDay}
                />
              </div>

              <div className="mt-4 grid gap-4">
                {todaysSlots.map((s, idx) => (
                  <SlotRow
                    key={idx}
                    time={s.time}
                    available={s.available}
                    onBook={() => {
                      if (!s.available) return;
                      navigate("/student/session-duration", {
                        state: { trainer, time: s.time, day: days[selectedDay] },
                      });
                    }}
                  />
                ))}
              </div>
            </section>
          ) : (
            <section className="px-5 pb-20">
              {/* about blurb */}
              <div className="mt-5 bg-white border border-[#DEDEDE] rounded">
                <div className="p-4">
                  <p className="text-sm leading-relaxed text-[#2d2d2d]">
                    {trainer.about}
                  </p>
                </div>
              </div>

              {/* stats */}
              <div className="mt-5">
                <TwoCol>
                  <StatCard label="Age" value={`${trainer.ageYears} years`} />
                  <StatCard label="Gender" value={trainer.gender} />
                </TwoCol>
              </div>

              {/* media stack */}
              <div className="mt-5">
                <MediaGallery items={media} />
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
