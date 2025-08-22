// src/screens/SessionHistory.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Title from "../components/Title";
import TabBar from "../components/TabBar";
import SessionItem from "../components/SessionItem";

export default function SessionHistory() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0); // 0: Upcoming, 1: Completed

  const upcomingSessions = [
    { date: "AUG 12", time: "10:00 AM - 11:00 AM", trainer: "Takeru Segawa", sessionIn: "2d 4h 30m" },
    { date: "AUG 13", time: "9:00 AM - 10:00 AM", trainer: "Helena Padilla", sessionIn: "1d 6h 10m" },
  ];

  const completedSessions = [
    { date: "AUG 10", time: "9:00 AM - 10:00 AM", trainer: "Lazar Amigano" },
    { date: "AUG 09", time: "8:00 AM - 9:00 AM", trainer: "Sanchai Sor Kingstar" },
    { date: "AUG 08", time: "7:00 AM - 8:00 AM", trainer: "Helena Padilla" },
  ];

  return (
    <div className="h-[100dvh] w-full bg-[#F7F7F7] overflow-y-auto" style={{ WebkitOverflowScrolling: "touch" }}>
      <div className="mx-auto max-w-[400px] min-h-full flex flex-col">
        {/* Top nav */}
        <Navbar onBack={() => navigate(-1)} />

        {/* Title */}
        <section className="px-5 pt-2">
          <Title text="// Session History" />
        </section>

        {/* Tabs */}
        <TabBar tabs={["UPCOMING", "COMPLETED"]} active={activeTab} onChange={setActiveTab} />

        {/* List */}
        <main className="px-5 pt-4 pb-10">
          {activeTab === 0 ? (
            <div className="space-y-4">
              {upcomingSessions.map((s, i) => (
                <div key={`${s.date}-${s.trainer}-${i}`} className="w-full">
                  <SessionItem
                    date={s.date}
                    time={s.time}
                    trainer={s.trainer}
                    sessionIn={s.sessionIn}
                    isUpcoming={true}
                    showFooter={i === 0} // red countdown bar on the first card
                    className="mx-0"
                    fullWidth={true}
                    onClick={() => navigate(`/student/session-details`, { state: { session: s } })}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {completedSessions.map((s, i) => (
                <div key={`${s.date}-${s.trainer}-${i}`} className="w-full">
                  <SessionItem
                    date={s.date}
                    time={s.time}
                    trainer={s.trainer}
                    sessionIn=""        // keep prop for type safety if required
                    isUpcoming={false}
                    showFooter={false}
                    fullWidth={true}
                    className="mx-0"
                    onClick={() => navigate(`/student/session-details`, { state: { session: s } })}
                  />
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
