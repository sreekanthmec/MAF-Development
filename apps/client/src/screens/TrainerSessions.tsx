import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ArrowLeft, Calendar } from "lucide-react";
import SessionCardItem from "../components/SessionCardItem";

type Tab = "upcoming" | "completed";

type UpcomingSessionItem = {
  id: number;
  date: string;              // "AUG 12"
  time: string;              // "10:00 AM - 11:00AM"
  participant: string;       // "Name, age, gender"
  countdown?: string | null; // if present -> green bar shows
  isHighlighted?: boolean;
};

type CompletedSessionItem = {
  id: number;
  date: string;
  time: string;
  participant: string;
  earnings: string;
};

/* ─────────────────────────────
   Shell scroll area (works with AppLayout)
────────────────────────────── */
const PageScroller = styled.div`
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  background: #ffffff;
`;

const Screen = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

const Header = styled.header`
  background: #ffffff;
  padding: 24px 20px 16px;
`;

const BackRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const BackBtn = styled.button`
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  background: transparent;
  border: 0;
  cursor: pointer;
`;

const HeaderTag = styled.p`
  color: #6b7280; /* gray-500 */
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

const TabsBar = styled.div`
  background: #ffffff;
  padding: 0 20px 12px;
`;

const Tabs = styled.div`
  display: flex;
`;

const TabBtn = styled.button<{ $active: boolean }>`
  flex: 1;
  text-align: center;
  padding: 8px 0;
  font-weight: 600;
  font-size: 14px;
  color: ${(p) => (p.$active ? "#000" : "#6b7280")};
  border: 0;
  border-bottom: 2px solid ${(p) => (p.$active ? "#000" : "transparent")};
  background: transparent;
  cursor: pointer;
`;

const DatePickerWrap = styled.div`
  background: #ffffff;
  padding: 0 20px 24px;
`;

const DateScroller = styled.div`
  display: flex;
  gap: 12px;
  overflow-x: auto;
`;

const DateBtn = styled.button<{ $selected: boolean }>`
  flex: 0 0 auto;
  text-align: center;
  padding: 12px;
  background: #ffffff;
  border: ${(p) => (p.$selected ? "2px solid #D62422" : "1px solid #e5e7eb")};
  cursor: pointer;
`;

const DateMonth = styled.div<{ $sel: boolean }>`
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 4px;
  color: ${(p) => (p.$sel ? "#D62422" : "#6b7280")};
`;

const DateDay = styled.div<{ $sel: boolean }>`
  font-size: 20px;
  font-weight: 800;
  margin-bottom: 4px;
  color: ${(p) => (p.$sel ? "#D62422" : "#111827")};
`;

const DateWeekday = styled.div<{ $sel: boolean }>`
  font-size: 12px;
  font-weight: 600;
  color: ${(p) => (p.$sel ? "#D62422" : "#6b7280")};
`;

const ListSection = styled.section`
  background: #f3f4f6; /* gray-100 */
  padding: 24px 20px;
  flex: 1 0 auto;
`;

const StackY = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const CompletedCard = styled.div`
  background: #ffffff;
  border: 1px solid #e5e7eb;
  padding: 16px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const Badge = styled.div`
  background: #e5e7eb;
  color: #4b5563;
  font-size: 14px;
  font-weight: 600;
  padding: 6px 12px;
`;

const Right = styled.div`
  text-align: right;
  margin-left: 16px;
  flex: 1;
`;

const Small = styled.div`
  color: #6b7280;
  font-size: 14px;
`;

const Strong = styled.div`
  color: #111827;
  font-weight: 600;
  font-size: 14px;
`;

const Earned = styled.div`
  margin-top: 4px;
  color: #16a34a;
  font-weight: 800;
  font-size: 14px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 48px 0 8px;
  color: #6b7280;
`;

/* ─────────────────────────────
   Component
────────────────────────────── */
const TrainerSessions: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("upcoming");
  const [selectedDate, setSelectedDate] = useState("12");

  const sessionsData: {
    upcomingSessions: UpcomingSessionItem[];
    completedSessions: CompletedSessionItem[];
  } = {
    upcomingSessions: [
      { id: 1, date: "AUG 12", time: "10:00 AM - 11:00AM", participant: "Arun P, 22, F", countdown: "2d 4h 30m", isHighlighted: true },
      { id: 2, date: "AUG 12", time: "10:00 AM - 11:00AM", participant: "Lazar Amigano, 22, M", countdown: null },
      { id: 3, date: "AUG 12", time: "10:00 AM - 11:00AM", participant: "Lazar Amigano, 22, M", countdown: null },
      { id: 4, date: "AUG 12", time: "10:00 AM - 11:00AM", participant: "Lazar Amigano, 22, M", countdown: null },
      { id: 5, date: "AUG 12", time: "10:00 AM - 11:00AM", participant: "Lazar Amigano, 22, M", countdown: null },
    ],
    completedSessions: [
      { id: 6, date: "AUG 11", time: "9:00 AM - 10:00AM", participant: "Emma Davis, 25, F", earnings: "$50" },
      { id: 7, date: "AUG 10", time: "1:00 PM - 2:30PM", participant: "Ryan Lee, 28, M", earnings: "$75" },
      { id: 8, date: "AUG 9", time: "5:00 PM - 7:00PM", participant: "Lisa Chen, 23, F", earnings: "$100" },
    ],
  };

  const calendarDates = [
    { day: "12", month: "AUG", weekday: "WED", isSelected: true },
    { day: "13", month: "AUG", weekday: "THU", isSelected: false },
    { day: "14", month: "AUG", weekday: "FRI", isSelected: false },
    { day: "15", month: "AUG", weekday: "SAT", isSelected: false },
  ];

  return (
    <PageScroller>
      <Screen>
        {/* Header */}
        <Header>
          <BackRow>
            <BackBtn onClick={() => navigate(-1)} aria-label="Back">
              <ArrowLeft size={20} color="#4b5563" />
            </BackBtn>
          </BackRow>
          <HeaderTag>// ALL SESSIONS</HeaderTag>
        </Header>

        {/* Tabs */}
        <TabsBar>
          <Tabs>
            <TabBtn $active={activeTab === "upcoming"} onClick={() => setActiveTab("upcoming")}>
              UPCOMING
            </TabBtn>
            <TabBtn $active={activeTab === "completed"} onClick={() => setActiveTab("completed")}>
              COMPLETED
            </TabBtn>
          </Tabs>
        </TabsBar>

        {/* Date Picker */}
        <DatePickerWrap>
          <DateScroller>
            {calendarDates.map((d, i) => (
              <DateBtn key={i} $selected={selectedDate === d.day} onClick={() => setSelectedDate(d.day)}>
                <DateMonth $sel={selectedDate === d.day}>{d.month}</DateMonth>
                <DateDay $sel={selectedDate === d.day}>{d.day}</DateDay>
                <DateWeekday $sel={selectedDate === d.day}>{d.weekday}</DateWeekday>
              </DateBtn>
            ))}
          </DateScroller>
        </DatePickerWrap>

        {/* List */}
        <ListSection>
          <StackY>
            {activeTab === "upcoming" &&
              sessionsData.upcomingSessions.map((session) => {
                const [m, d] = session.date.split(" ");
                return (
                  <SessionCardItem
                    key={session.id}
                    month={m}
                    day={d}
                    time={session.time}
                    participant={session.participant}
                    countdown={session.countdown ?? undefined} // hides bar when null/empty
                    layout="column"
                    onClick={() => navigate("/trainer/session-details")}
                  />
                );
              })}

            {activeTab === "completed" &&
              sessionsData.completedSessions.map((session) => {
                const [m, d] = session.date.split(" ");
                return (
                  <SessionCardItem
                    key={session.id}
                    month={m}
                    day={d}
                    time={session.time}
                    participant={session.participant}
                    layout="column"
                    // extraLine={{ text: `Earned: ${session.earnings}`, color: "#16a34a" }}
                    onClick={() => navigate("/trainer/session-details")}
                  />
                );
              })}
          </StackY>

          {/* Empty States */}
          {activeTab === "upcoming" && sessionsData.upcomingSessions.length === 0 && (
            <EmptyState>
              <Calendar size={48} color="#9ca3af" />
              <div style={{ marginTop: 12, fontWeight: 600, color: "#111827" }}>No upcoming sessions</div>
              <div style={{ fontSize: 14, marginTop: 4 }}>You don't have any upcoming sessions scheduled.</div>
            </EmptyState>
          )}

          {activeTab === "completed" && sessionsData.completedSessions.length === 0 && (
            <EmptyState>
              <Calendar size={48} color="#9ca3af" />
              <div style={{ marginTop: 12, fontWeight: 600, color: "#111827" }}>No completed sessions</div>
              <div style={{ fontSize: 14, marginTop: 4 }}>You haven't completed any sessions yet.</div>
            </EmptyState>
          )}
        </ListSection>
      </Screen>
    </PageScroller>
  );
};

export default TrainerSessions;
