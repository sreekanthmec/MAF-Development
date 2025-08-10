import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Edit, ArrowRight, Clock, User } from "lucide-react";
import styled from "styled-components";
import SessionCardItem from "../components/SessionCardItem";
import SessionPopup from "../components/SessionPopup";

/* ─────────────────────────────
   Types (same as your file)
────────────────────────────── */
interface SessionCard {
  id: number;
  date: string;
  day: string;
  time: string;
  duration: string;
  location: {
    type: string;
    address: string;
  };
  student: {
    name: string;
    age: string;
    gender: string;
    level: string;
    preferences: {
      gloves: string;
      gloveSize: string;
      handWraps: string;
    };
  };
  notes: string;
}
interface UpcomingSession {
  id: number;
  month: string;
  day: string;
  time: string;
  student: string;
  gender: string;
  countdown?: string | null; // <-- allow missing or null
}

interface CalendarDay {
  id: number;
  month: string;
  day: string;
  dayName: string;
  isSelected: boolean;
}
interface TimeSlot {
  id: number;
  time: string;
  status: "available" | "unavailable";
  action: "edit" | "arrow";
}
interface DayTimeSlots {
  [key: number]: TimeSlot[];
}

/* ─────────────────────────────
   Layout wrappers (assume 400px shell from AppLayout)
────────────────────────────── */

const PageScroller = styled.div`
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  /* optional: make the base white so no dark peeks through anywhere */
  background: #ffffff;
`;

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  /* make sure the container itself spans the viewport */
  min-height: 100vh;
  box-sizing: border-box;
`;

/* ─────────────────────────────
   Header
────────────────────────────── */

const HeaderSection = styled.header`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 48px;
  padding: 28px 20px;
  width: 100%;
  background: linear-gradient(157.07deg, #3a3a3a 0%, #252525 81.65%);
  flex-shrink: 0; /* <- don't shrink the header */
`;

const ContentSection = styled.section`
  width: 100%;
  background: #ffffff;
  padding: 20px 20px 40px;
  /* <- this makes the white area fill remaining height */
  flex: 1 0 auto;
`;

const HeaderVector = styled.div`
  position: absolute;
  width: 174px;
  height: 226px;
  right: 0;          /* align to the right edge instead of hardcoding left:205 */
  top: 0;
  background: linear-gradient(180deg, #353535 0%, #363636 50%, #282828 100%);
  z-index: 0;
`;

const RowBetween = styled.div`
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserLink = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  background: none;
  border: 0;
  padding: 0;
  cursor: pointer;
`;

const Avatar = styled.div`
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  background: #252525;
  border: 1px solid rgba(114, 114, 114, 0.6);
`;

const UserName = styled.div`
  font-family: Manrope, sans-serif;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  color: #f7f7f7;
`;

/* ─────────────────────────────
   Stats + Upcoming
────────────────────────────── */
const Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 100%;
  z-index: 1;
`;

const SessionsBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const SessionsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SessionsCount = styled.div`
  font-family: "Cooper Hewitt", Manrope, sans-serif;
  font-style: italic;
  font-weight: 714;
  font-size: 32px;
  letter-spacing: -1px;
  text-transform: uppercase;
  color: #fa403f;
`;

const SessionsWord = styled.div`
  font-family: "Cooper Hewitt", Manrope, sans-serif;
  font-style: italic;
  font-weight: 714;
  font-size: 20px;
  letter-spacing: -1px;
  text-transform: uppercase;
  color: #ffffff;
`;

const SessionsLabel = styled.div`
  font-family: Manrope, sans-serif;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  color: #b0b0b0;
`;

const UpcomingWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const UpcomingHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const UpcomingTitle = styled.div`
  font-family: Manrope, sans-serif;
  font-weight: 800;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #b0b0b0;
`;

const ViewAll = styled.button`
  background: none;
  border: 0;
  padding: 0;
  font-family: Manrope, sans-serif;
  font-weight: 800;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #e6f0ff;
  cursor: pointer;
`;

const UpcomingScroller = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
  overflow-x: auto;
  padding-bottom: 4px;
  align-items: flex-start; /* ← key: don't stretch shorter cards */
`;

const UpcomingCard = styled.div`
  flex: 0 0 auto;
  width: 280px;
  border: 1px solid #dedede;
  background: #ffffff;
`;

const UpcomingHead = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  height: 80px;
  padding: 0;
`;

const MonthDay = styled.div`
  width: 80px;
  height: 80px;
  background: #f7f7f7;
  border-right: 1px solid #dedede;
  display: grid;
  grid-template-rows: 1fr 1fr;
  place-items: center;
`;

const MDMonth = styled.div`
  font-family: Manrope, sans-serif;
  font-weight: 800;
  font-size: 12px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #2d2d2d;
`;

const MDDay = styled.div`
  font-family: Manrope, sans-serif;
  font-weight: 700;
  font-size: 24px;
  color: #2d2d2d;
`;

const UpText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const UpTime = styled.div`
  font-family: Manrope, sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #717171;
`;

const UpName = styled.div`
  font-family: Manrope, sans-serif;
  font-weight: 800;
  font-size: 16px;
  color: #2d2d2d;
`;

const CountdownBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #3c8826;
  height: 32px;
  padding: 0 16px;
  color: #f7f7f7;
`;

const CountdownText = styled.div`
  font-family: Manrope, sans-serif;
  font-weight: 500;
  font-size: 12px;
`;

const CountdownTime = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: Manrope, sans-serif;
  font-weight: 700;
  font-size: 12px;
`;

/* ─────────────────────────────
   Content section
────────────────────────────── */

const SectionTitle = styled.div`
  font-family: Manrope, sans-serif;
  font-weight: 800;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #b0b0b0;
  margin-bottom: 20px;
`;

const CalendarStrip = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
  overflow-x: auto;
  padding-bottom: 12px;
`;

const CalendarDayCard = styled.div<{ isSelected: boolean }>`
  flex: 0 0 auto;
  width: 80px;
  background: #f7f7f7;
  border: 1px solid ${(p) => (p.isSelected ? "#d62422" : "#dedede")};
`;

const CalTop = styled.div`
  height: 28px;
  display: grid;
  place-items: center;
  border-bottom: 1px solid #dedede;
`;

const CalMonth = styled.div`
  font-family: Manrope, sans-serif;
  font-weight: 800;
  font-size: 12px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #717171;
`;

const CalBody = styled.div`
  height: 72px;
  display: grid;
  place-items: center;
  gap: 2px;
`;

const CalDay = styled.div<{ isSelected: boolean }>`
  font-family: Manrope, sans-serif;
  font-weight: 700;
  font-size: 24px;
  color: ${(p) => (p.isSelected ? "#d62422" : "#2d2d2d")};
`;

const CalDayName = styled.div<{ isSelected: boolean }>`
  font-family: Manrope, sans-serif;
  font-weight: 800;
  font-size: 12px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: ${(p) => (p.isSelected ? "#d62422" : "#2d2d2d")};
`;

const TimeSlots = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 20px;
`;

const TimeSlotCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  background: #ffffff;
  border: 1px solid #dedede;
  padding: 0 12px 0 16px;
`;

const TimeSlotInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Dot = styled.div<{ status: "available" | "unavailable" }>`
  width: 8px;
  height: 8px;
  transform: rotate(-45deg);
  background: ${(p) => (p.status === "available" ? "#3c8826" : "#b24025")};
`;

const TimeSlotTime = styled.div`
  font-family: Manrope, sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #2d2d2d;
`;

const ActionButton = styled.button`
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  background: #d62422;
  border: none;
  cursor: pointer;

  &:hover {
    background: #c02120;
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 32px 0;
  color: #717171;
  font-family: Manrope, sans-serif;
  font-weight: 600;
`;

/* ─────────────────────────────
   Component
────────────────────────────── */
const TrainerDashboard: React.FC = () => {
  const navigate = useNavigate();

  const [pendingSessions, setPendingSessions] = useState<SessionCard[]>([
    {
      id: 1,
      date: "Jul 24",
      day: "Thursday",
      time: "10:00 AM - 12:00 PM",
      duration: "120 mins Session",
      location: { type: "HOME", address: "Block 105, Lew Lian Vale Serangoon 537016" },
      student: {
        name: "Arun P",
        age: "22",
        gender: "Female",
        level: "BEGINNER",
        preferences: { gloves: "YES", gloveSize: "8", handWraps: "YES" },
      },
      notes: "Hi sir, I am looking to get back in shape...",
    },
    {
      id: 2,
      date: "Jul 26",
      day: "Saturday",
      time: "03:00 PM - 04:30 PM",
      duration: "90 mins Session",
      location: { type: "GYM", address: "48 Kovan Road, Singapore 548127" },
      student: {
        name: "Lazar Amigano",
        age: "22",
        gender: "Male",
        level: "INTERMEDIATE",
        preferences: { gloves: "NO", gloveSize: "-", handWraps: "YES" },
      },
      notes: "Focus on footwork and combos; had knee strain last week.",
    },
    {
      id: 3,
      date: "Jul 28",
      day: "Monday",
      time: "07:00 PM - 08:00 PM",
      duration: "60 mins Session",
      location: { type: "HOME", address: "Blk 210, Serangoon Ave 2, #05-112" },
      student: {
        name: "Singdam Kiatmoo9",
        age: "27",
        gender: "Male",
        level: "ADVANCED",
        preferences: { gloves: "YES", gloveSize: "10", handWraps: "NO" },
      },
      notes: "Southpaw; wants clinch work and elbows.",
    },
  ]);
  

  const [upcomingSessions] = useState<UpcomingSession[]>([
    { id: 1, month: "AUG", day: "12", time: "10:00 AM - 11:00 AM", student: "Arun P", gender: "Female", countdown: "2d 4h 30m" },
    { id: 2, month: "AUG", day: "13", time: "10:00 AM - 11:00 AM", student: "Singdam Kiatmoo9", gender: "Male", countdown: null },
    { id: 3, month: "AUG", day: "15", time: "07:00 PM - 09:00 PM", student: "Lazar Amigano", gender: "Male", countdown: null }, // ok now
  ]);

  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([
    { id: 1, month: "AUG", day: "12", dayName: "WED", isSelected: true },
    { id: 2, month: "AUG", day: "13", dayName: "THU", isSelected: false },
    { id: 3, month: "AUG", day: "14", dayName: "FRI", isSelected: false },
    { id: 4, month: "AUG", day: "15", dayName: "SAT", isSelected: false },
  ]);

  const [dayTimeSlots] = useState<DayTimeSlots>({
    1: [
      { id: 1, time: "9AM - 11AM", status: "available", action: "edit" },
      { id: 2, time: "3PM - 5PM", status: "unavailable", action: "arrow" },
      { id: 3, time: "7PM - 9PM", status: "available", action: "edit" },
      { id: 4, time: "3PM - 5PM", status: "unavailable", action: "arrow" },
    ],
  });

  const [selectedDayId, setSelectedDayId] = useState(1);

  const handleDaySelect = (dayId: number) => {
    setSelectedDayId(dayId);
    setCalendarDays((prev) =>
      prev.map((d) => ({ ...d, isSelected: d.id === dayId }))
    );
  };

  const currentTimeSlots = dayTimeSlots[selectedDayId] || [];
  const nextUpcoming = upcomingSessions[0];
  const [showSessionsModal, setShowSessionsModal] = useState(true); // show on first load
  const [currentSessionIndex, setCurrentSessionIndex] = useState(0);

  const handleAcknowledge = (sessionId: number) => {
    setPendingSessions(prev => {
      const next = prev.filter(s => s.id !== sessionId);
      if (next.length === 0) setShowSessionsModal(false);
      else setCurrentSessionIndex(i => Math.min(i, next.length - 1));
      return next;
    });
  };

  const handleCancel = (sessionId: number) => {
    // TODO: call API, then optimistically remove
    setPendingSessions(prev => {
      const next = prev.filter(s => s.id !== sessionId);
      if (next.length === 0) setShowSessionsModal(false);
      else setCurrentSessionIndex(i => Math.min(i, next.length - 1));
      return next;
    });
  };

  return (
    <PageScroller>
      <DashboardContainer>
        {/* Header */}
        <HeaderSection>
          <HeaderVector />

          <RowBetween>
            <UserLink onClick={() => navigate("/trainer/profile")}>
              <Avatar>
                <User size={21} color="#717171" />
              </Avatar>
              <UserName>Helena Padilla</UserName>
            </UserLink>

            {/* spacer icon placeholder for symmetry */}
            <Avatar style={{ opacity: 0 }} />
          </RowBetween>

          <Stack>
            <SessionsBlock>
              <SessionsRow>
                <SessionsCount>12</SessionsCount>
                <SessionsWord>SESSIONS</SessionsWord>
              </SessionsRow>
              <SessionsLabel>Upcoming</SessionsLabel>
            </SessionsBlock>

            <UpcomingWrap>
              <UpcomingHeader>
                <UpcomingTitle>// Upcoming Sessions</UpcomingTitle>
                <ViewAll onClick={() => navigate("/trainer/sessions")}>
                  View All
                </ViewAll>
              </UpcomingHeader>

              <UpcomingScroller>
                {upcomingSessions.map((s) => (
                  <SessionCardItem
                    key={s.id}
                    month={s.month}
                    day={s.day}
                    time={s.time}
                    participant={`${s.student}${s.gender ? `, ${s.gender}` : ""}`}
                    countdown={s.countdown}      // shows bar if present
                    layout="row"
                    onClick={() => navigate("/trainer/session-details")}
                  />
                ))}
              </UpcomingScroller>
            </UpcomingWrap>
          </Stack>
        </HeaderSection>

        {/* Content */}
        <ContentSection>
          <SectionTitle>// your calendar</SectionTitle>

          <CalendarStrip>
            {calendarDays.map((day) => (
              <CalendarDayCard
                key={day.id}
                isSelected={day.isSelected}
                onClick={() => handleDaySelect(day.id)}
              >
                <CalTop>
                  <CalMonth>{day.month}</CalMonth>
                </CalTop>
                <CalBody>
                  <CalDay isSelected={day.isSelected}>{day.day}</CalDay>
                  <CalDayName isSelected={day.isSelected}>{day.dayName}</CalDayName>
                </CalBody>
              </CalendarDayCard>
            ))}
          </CalendarStrip>

          {currentTimeSlots.length === 0 ? (
            <EmptyState>
              <div>No time slots for this day</div>
              <ActionButton
                onClick={() => navigate("/trainer/edit-availability")}
                aria-label="Add availability"
              >
                <Edit size={20} color="#FFFFFF" />
              </ActionButton>
            </EmptyState>
          ) : (
            <TimeSlots>
              {currentTimeSlots.map((slot) => (
                <TimeSlotCard key={slot.id}>
                  <TimeSlotInfo>
                    <Dot status={slot.status} />
                    <TimeSlotTime>{slot.time}</TimeSlotTime>
                  </TimeSlotInfo>
                  <ActionButton
                    onClick={() => navigate("/trainer/edit-availability")}
                    aria-label={slot.action === "edit" ? "Edit Slot" : "Go To Slot"}
                  >
                    {slot.action === "edit" ? (
                      <Edit size={20} color="#FFFFFF" />
                    ) : (
                      <ArrowRight size={20} color="#FFFFFF" />
                    )}
                  </ActionButton>
                </TimeSlotCard>
              ))}
            </TimeSlots>
          )}
        </ContentSection>
        {showSessionsModal && (
  <SessionPopup
    sessions={pendingSessions}
    startIndex={0}
    onAcknowledge={handleAcknowledge}
    onCancel={(id) => {/* your cancel flow */}}
    onClose={() => setShowSessionsModal(false)}
  />
)}

      </DashboardContainer>
    </PageScroller>
  );
};

export default TrainerDashboard;
