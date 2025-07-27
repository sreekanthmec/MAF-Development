import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const DashboardContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(180deg, #3a3a3a 0%, #252525 100%);
  padding: 20px;
  color: white;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 30px;
`;

const ProfileAvatar = styled.div`
  width: 50px;
  height: 50px;
  background: #FA403F;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 18px;
`;

const ProfileName = styled.div`
  font-family: "Manrope", sans-serif;
  font-weight: 700;
  font-size: 20px;
  color: white;
`;

const SessionCountSection = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const SessionCount = styled.div`
  font-family: "Manrope", sans-serif;
  font-weight: 700;
  font-size: 48px;
  color: #FA403F;
  line-height: 1;
`;

const SessionCountLabel = styled.div`
  font-family: "Manrope", sans-serif;
  font-size: 16px;
  color: #ccc;
  margin-top: 4px;
`;

const UpcomingSessionsSection = styled.div`
  margin-bottom: 40px;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  font-family: "Manrope", sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: white;
`;

const ViewAllLink = styled.span`
  font-family: "Manrope", sans-serif;
  font-size: 14px;
  color: #FA403F;
  cursor: pointer;
`;

const SessionsCarousel = styled.div`
  position: relative;
  overflow: hidden;
`;

const SessionsTrack = styled.div`
  display: flex;
  gap: 15px;
  transition: transform 0.3s ease;
`;

const SessionCard = styled.div`
  min-width: 280px;
  background: #2a2a2a;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
`;

const SessionCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
`;

const DateBox = styled.div`
  background: white;
  color: #333;
  padding: 8px 12px;
  border-radius: 6px;
  text-align: center;
  min-width: 60px;
`;

const MonthText = styled.div`
  font-family: "Manrope", sans-serif;
  font-weight: 700;
  font-size: 12px;
  text-transform: uppercase;
`;

const DayText = styled.div`
  font-family: "Manrope", sans-serif;
  font-weight: 700;
  font-size: 18px;
`;

const SessionInfo = styled.div`
  flex: 1;
  margin-left: 15px;
`;

const SessionTime = styled.div`
  font-family: "Manrope", sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: white;
  margin-bottom: 4px;
`;

const ParticipantInfo = styled.div`
  font-family: "Manrope", sans-serif;
  font-size: 14px;
  color: #ccc;
`;

const CountdownBar = styled.div`
  background: #28a745;
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  font-family: "Manrope", sans-serif;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const CalendarSection = styled.div`
  margin-bottom: 40px;
`;

const DateSelector = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  overflow-x: auto;
  padding-bottom: 10px;
`;

const DateCard = styled.div`
  background: ${props => props.selected ? 'transparent' : 'white'};
  border: 2px solid ${props => props.selected ? '#FA403F' : 'transparent'};
  color: ${props => props.selected ? 'white' : '#333'};
  padding: 12px 16px;
  border-radius: 8px;
  text-align: center;
  min-width: 80px;
  cursor: pointer;
  font-family: "Manrope", sans-serif;
  font-weight: 600;
  font-size: 14px;
  white-space: nowrap;
`;

const SessionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SessionItem = styled.div`
  background: white;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #333;
`;

const SessionItemLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SessionIcon = styled.div`
  width: 12px;
  height: 12px;
  background: ${props => props.color};
  transform: rotate(45deg);
`;

const SessionTimeText = styled.div`
  font-family: "Manrope", sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: #333;
`;

const ActionButton = styled.button`
  background: #FA403F;
  color: white;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 14px;
`;

const LogoutButton = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  background: none;
  border: 1px solid #FA403F;
  color: #FA403F;
  padding: 8px 16px;
  border-radius: 6px;
  font-family: "Manrope", sans-serif;
  font-weight: 600;
  cursor: pointer;
`;

const TrainerDashboard = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("AUG 12 WED");

  // Mock data for upcoming sessions
  const upcomingSessions = [
    {
      id: 1,
      month: "AUG",
      day: "12",
      time: "10:00 AM - 11:00 AM",
      participant: "Arun P, Female",
      countdown: "2d 4h 30m"
    },
    {
      id: 2,
      month: "AUG",
      day: "13",
      time: "2:00 PM - 3:30 PM",
      participant: "Mike Chen, Male",
      countdown: "3d 6h 15m"
    },
    {
      id: 3,
      month: "AUG",
      day: "14",
      time: "9:00 AM - 10:30 AM",
      participant: "Sarah Lim, Female",
      countdown: "4d 8h 45m"
    }
  ];

  // Mock data for calendar dates
  const calendarDates = [
    { id: 1, date: "AUG 12 WED", selected: true },
    { id: 2, date: "AUG 13 THU", selected: false },
    { id: 3, date: "AUG 14 FRI", selected: false },
    { id: 4, date: "AUG 15 SAT", selected: false }
  ];

  // Mock data for sessions on selected date
  const daySessions = [
    { id: 1, time: "9AM - 11AM", color: "#28a745", action: "edit" },
    { id: 2, time: "3PM - 5PM", color: "#FA403F", action: "arrow" },
    { id: 3, time: "7PM - 9PM", color: "#28a745", action: "edit" },
    { id: 4, time: "3PM - 5PM", color: "#FA403F", action: "arrow" }
  ];

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/trainer-login");
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleViewAll = () => {
    console.log("View all sessions");
    // Navigate to detailed sessions view
    navigate("/all-sessions");
  };

  const handleSessionAction = (sessionId, action) => {
    console.log(`Session ${sessionId} action: ${action}`);
    if (action === "edit") {
      // Handle edit action
      alert("Edit session");
    } else if (action === "arrow") {
      // Handle view action
      alert("View session details");
    }
  };

  return (
    <DashboardContainer>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>

      <Header>
        <ProfileAvatar>H</ProfileAvatar>
        <ProfileName>Helena Padilla</ProfileName>
      </Header>

      <SessionCountSection>
        <SessionCount>12 SESSIONS</SessionCount>
        <SessionCountLabel>Upcoming</SessionCountLabel>
      </SessionCountSection>

      <UpcomingSessionsSection>
        <SectionHeader>
          <SectionTitle>// UPCOMING SESSIONS</SectionTitle>
          <ViewAllLink onClick={handleViewAll}>VIEW ALL</ViewAllLink>
        </SectionHeader>

        <SessionsCarousel>
          <SessionsTrack>
            {upcomingSessions.map((session) => (
              <SessionCard key={session.id}>
                <SessionCardHeader>
                  <DateBox>
                    <MonthText>{session.month}</MonthText>
                    <DayText>{session.day}</DayText>
                  </DateBox>
                  <SessionInfo>
                    <SessionTime>{session.time}</SessionTime>
                    <ParticipantInfo>{session.participant}</ParticipantInfo>
                  </SessionInfo>
                </SessionCardHeader>
                <CountdownBar>
                  <span>🕐</span>
                  <span>Session starts in {session.countdown}</span>
                </CountdownBar>
              </SessionCard>
            ))}
          </SessionsTrack>
        </SessionsCarousel>
      </UpcomingSessionsSection>

      <CalendarSection>
        <SectionHeader>
          <SectionTitle>// YOUR CALENDAR</SectionTitle>
        </SectionHeader>

        <DateSelector>
          {calendarDates.map((date) => (
            <DateCard
              key={date.id}
              selected={selectedDate === date.date}
              onClick={() => handleDateSelect(date.date)}
            >
              {date.date}
            </DateCard>
          ))}
        </DateSelector>

        <SessionsList>
          {daySessions.map((session) => (
            <SessionItem key={session.id}>
              <SessionItemLeft>
                <SessionIcon color={session.color} />
                <SessionTimeText>{session.time}</SessionTimeText>
              </SessionItemLeft>
              <ActionButton
                onClick={() => handleSessionAction(session.id, session.action)}
              >
                {session.action === "edit" ? "✏️" : "→"}
              </ActionButton>
            </SessionItem>
          ))}
        </SessionsList>
      </CalendarSection>
    </DashboardContainer>
  );
};

export default TrainerDashboard; 