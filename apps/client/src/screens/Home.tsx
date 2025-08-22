import React from "react";
import { useNavigate } from "react-router-dom";
import CreditsBalance from "../components/CreditBalance";
import Title from "../components/Title";
import SessionItem from "../components/SessionItem";
import { TertiaryButton } from "../components/Button";
import { ReactComponent as SupportIcon } from "../assets/icon_whatsapp.svg";
import HomeHorizontalTrainerList, {
  HomeTrainer,
} from "../components/HomeHorizontalTrainerList";
import trainerImg from "../assets/trainer.png";

export default function Home() {
  const navigate = useNavigate();

  const upcomingSessions = [
    {
      date: "AUG 12",
      time: "10:00 AM - 11:00 AM",
      trainer: "Takeru Segawa",
      sessionIn: "2d 4h 30m",
    },
    {
      date: "AUG 13",
      time: "9:00 AM - 10:00 AM",
      trainer: "Helena Padilla",
      sessionIn: "1d 6h 10m",
    },
  ];

  const trainers: HomeTrainer[] = [
    {
      name: "Helena Padilla",
      rate: 3,
      age: 27,
      sex: "F",
      schedule: [
        { day: "Tomorrow", time: "9AM - 10AM" },
        { day: "Thursday", time: "9AM - 10AM" },
        { day: "Friday", time: "Busy" },
      ],
      imageUrl: trainerImg as unknown as string,
    },
    {
      name: "Takeru Segawa",
      rate: 2,
      age: 27,
      sex: "M",
      schedule: [
        { day: "Tomorrow", time: "10AM - 11AM" },
        { day: "Thursday", time: "10AM - 11AM" },
        { day: "Friday", time: "Busy" },
      ],
      imageUrl: trainerImg as unknown as string,
    },
  ];

  const completedSessions = [
    { date: "AUG 12", time: "10:00 AM - 11:00 AM", trainer: "Lazar Amigano" },
    { date: "AUG 11", time: "9:00 AM - 10:00 AM", trainer: "Takeru Segawa" },
  ];

  return (
    // Make ONE full-viewport scroll container
    <div className="h-[100dvh] w-full bg-[#F2F2F2] overflow-y-auto">
      {/* Constrain to your 400px shell */}
      <div className="mx-auto max-w-[400px] min-h-[100dvh] flex flex-col">
        {/* Header */}
        <header className="relative w-full bg-[linear-gradient(157.07deg,#3a3a3a_0%,#252525_81.65%)] pt-8">
          <div className="px-5 pt-5 relative z-10">
            <div className="flex items-center justify-between">
              <button
                onClick={() => navigate("/profile")}
                className="flex items-center gap-2"
                aria-label="Profile"
              >
                <div className="h-9 w-9 grid place-items-center bg-[#252525] border border-[#727272]">
                  <svg width="20" height="20" viewBox="0 0 36 36" fill="none">
                    <path
                      d="M18 21C11 21 7.5 24 7.5 24V28.5H28.5V24C28.5 24 25 21 18 21Z"
                      stroke="#B0B0B0"
                      strokeWidth="2"
                    />
                    <path
                      d="M23 12.5C23 15.26 20.76 17.5 18 17.5C15.24 17.5 13 15.26 13 12.5C13 9.74 15.24 7.5 18 7.5C20.76 7.5 23 9.74 23 12.5Z"
                      stroke="#B0B0B0"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <div className="text-white">
                  <div className="text-sm font-semibold leading-none">Kishan P</div>
                </div>
              </button>
              <CreditsBalance balance={23} />
            </div>

            <div className="mt-20 mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-[32px] leading-none italic font-extrabold text-[#EB2726]">
                  12
                </span>
                <span className="text-white italic font-extrabold">SESSIONS</span>
              </div>
              <div className="text-[#B0B0B0] mt-1 text-sm">in last 30 days</div>
            </div>
          </div>

          <div className="absolute top-0 right-0 opacity-50 pointer-events-none">
            <svg
              width="157"
              height="213"
              viewBox="0 0 157 213"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M63.41 143.818H2L119.706 0H145.294L114.588 82.182H176L58.294 226H32.706L63.41 143.818Z"
                fill="url(#g0)"
                stroke="url(#g1)"
              />
              <defs>
                <linearGradient
                  id="g0"
                  x1="89"
                  y1="0"
                  x2="89"
                  y2="226"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#353535" />
                  <stop offset="0.5" stopColor="#363636" />
                  <stop offset="1" stopColor="#282828" />
                </linearGradient>
                <linearGradient
                  id="g1"
                  x1="89"
                  y1="0"
                  x2="77.867"
                  y2="191.929"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#333" stopOpacity="0.12" />
                  <stop offset="0.5" stopColor="#3F3E3E" />
                  <stop offset="1" stopColor="#333" stopOpacity="0.12" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </header>

        {/* Scrollable content */}
        <main className="flex-1 pb-10">
          {/* Upcoming */}
          <section className="px-5 pt-6">
            <Title text="// Upcoming Sessions" />
            <div
              className="mt-3 flex gap-4 overflow-x-auto snap-x snap-mandatory
                         [-ms-overflow-style:none] [scrollbar-width:none]
                         [&::-webkit-scrollbar]:hidden"
            >
{upcomingSessions.map((s, i) => (
  <div key={i} className="snap-start flex-shrink-0">
    <SessionItem
      date={s.date}
      time={s.time}
      trainer={s.trainer}
      sessionIn={s.sessionIn}
      isUpcoming
      showFooter={i === 0}
      onClick={() =>
        navigate(`/student/session-details`, { state: { session: s } })
      }
    />
  </div>
))}

            </div>
            <div className="mt-4">
              <TertiaryButton
                label="VIEW ALL"
                layout="split"
                onClick={() => navigate("/session-history")}
                className="!w-full"
              />
            </div>
          </section>

          {/* Explore Trainers */}
          <HomeHorizontalTrainerList
            trainers={trainers}
            onCardClick={(t, i) =>
              navigate(`/trainer-details`, { state: { trainer: t } })
            }
            onExploreAll={() => navigate("/explore-trainers")}
          />

          {/* Completed */}
          <section className="px-5 pt-12">
            <Title text="// Completed Sessions" />
            <div
              className="mt-3 flex gap-4 overflow-x-auto snap-x snap-mandatory
                         [-ms-overflow-style:none] [scrollbar-width:none]
                         [&::-webkit-scrollbar]:hidden items-stretch"
            >
              {completedSessions.map((s, i) => (
                <div key={i} className="snap-start flex-shrink-0">
                  <SessionItem
                    date={s.date}
                    time={s.time}
                    trainer={s.trainer}
                    sessionIn=""           // required by SessionItem props
                    isUpcoming={false}
                    showFooter={false}
                  />
                </div>
              ))}
            </div>
            <div className="mt-4">
              <TertiaryButton
                label="VIEW ALL"
                layout="split"
                onClick={() => navigate("/session-history")}
                className="!w-full"
              />
            </div>
          </section>

          {/* Footer */}
          <section className="px-5 pt-8 pb-2">
            <div className="text-left text-[#D1D1D1] font-extrabold italic tracking-wide">
              GOOD TEACHERS MATTER
            </div>

            <button
              onClick={() => navigate("/support")}
              className="mt-4 flex items-center gap-2 text-[#D62422] font-semibold"
              aria-label="Talk with us"
            >
              <SupportIcon className="w-5 h-5 flex-shrink-0" />
              <span>TALK WITH US</span>
            </button>
          </section>
        </main>
      </div>
    </div>
  );
}
