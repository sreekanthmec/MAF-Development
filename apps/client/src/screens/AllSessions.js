import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  min-height: 100vh;
  background: #f5f5f5;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  margin-right: 15px;
  color: #333;
`;

const Title = styled.h1`
  font-family: "Manrope", sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: #666;
  margin: 0;
`;

const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 25px;
`;

const Tab = styled.button`
  background: none;
  border: none;
  font-family: "Manrope", sans-serif;
  font-weight: ${props => props.active ? '700' : '400'};
  font-size: 16px;
  color: #333;
  padding: 10px 20px;
  cursor: pointer;
  position: relative;
  
  ${props => props.active && `
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 20px;
      right: 20px;
      height: 2px;
      background: #000;
    }
  `}
`;

const DateSelector = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 25px;
  overflow-x: auto;
  padding-bottom: 10px;
`;

const DateCard = styled.div`
  background: ${props => props.selected ? 'transparent' : 'white'};
  border: 2px solid ${props => props.selected ? '#FA403F' : 'transparent'};
  color: ${props => props.selected ? '#FA403F' : '#333'};
  padding: 12px 16px;
  border-radius: 8px;
  text-align: center;
  min-width: 80px;
  cursor: pointer;
  font-family: "Manrope", sans-serif;
  white-space: nowrap;
`;

const MonthText = styled.div`
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 4px;
`;

const DayText = styled.div`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 2px;
`;

const DayNameText = styled.div`
  font-size: 12px;
  font-weight: 400;
`;

const SessionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const SessionCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const SessionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${props => props.hasCountdown ? '15px' : '0'};
`;

const DateBox = styled.div`
  background: white;
  border: 1px solid #e0e0e0;
  color: #333;
  padding: 8px 12px;
  border-radius: 6px;
  text-align: center;
  min-width: 60px;
`;

const SessionInfo = styled.div`
  flex: 1;
  margin-left: 15px;
`;

const SessionTime = styled.div`
  font-family: "Manrope", sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: #333;
  margin-bottom: 4px;
`;

const ParticipantInfo = styled.div`
  font-family: "Manrope", sans-serif;
  font-size: 14px;
  color: #666;
`;

const CountdownBar = styled.div`
  background: #28a745;
  color: white;
  padding: 12px 16px;
  border-radius: 8px;
  font-family: "Manrope", sans-serif;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CountdownText = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const AllSessions = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("upcoming");
  const [selectedDate, setSelectedDate] = useState("AUG 12 WED");

  // Mock data for dates
  const dates = [
    { id: 1, month: "AUG", day: "12", dayName: "WED", selected: true },
    { id: 2, month: "AUG", day: "13", dayName: "THU", selected: false },
    { id: 3, month: "AUG", day: "14", dayName: "FRI", selected: false },
    { id: 4, month: "AUG", day: "15", dayName: "SAT", selected: false },
    { id: 5, month: "AUG", day: "16", dayName: "SUN", selected: false },
    { id: 6, month: "AUG", day: "17", dayName: "MON", selected: false }
  ];

  // Mock data for sessions
  const upcomingSessions = [
    {
      id: 1,
      month: "AUG",
      day: "12",
      time: "10:00 AM - 11:00 AM",
      participant: "Arun P, 22, F",
      hasCountdown: true,
      countdown: "2d 4h 30m"
    },
    {
      id: 2,
      month: "AUG",
      day: "12",
      time: "2:00 PM - 3:30 PM",
      participant: "Lazar Amigano, 22, M",
      hasCountdown: false
    },
    {
      id: 3,
      month: "AUG",
      day: "12",
      time: "5:00 PM - 6:30 PM",
      participant: "Lazar Amigano, 22, M",
      hasCountdown: false
    },
    {
      id: 4,
      month: "AUG",
      day: "12",
      time: "7:00 PM - 8:30 PM",
      participant: "Lazar Amigano, 22, M",
      hasCountdown: false
    },
    {
      id: 5,
      month: "AUG",
      day: "12",
      time: "9:00 PM - 10:30 PM",
      participant: "Lazar Amigano, 22, M",
      hasCountdown: false
    }
  ];

  const completedSessions = [
    {
      id: 6,
      month: "AUG",
      day: "11",
      time: "10:00 AM - 11:00 AM",
      participant: "Sarah Lim, 25, F",
      hasCountdown: false
    },
    {
      id: 7,
      month: "AUG",
      day: "11",
      time: "2:00 PM - 3:30 PM",
      participant: "Mike Chen, 28, M",
      hasCountdown: false
    }
  ];

  const handleBack = () => {
    navigate("/trainer-dashboard");
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleSessionClick = (sessionId) => {
    navigate(`/session-details/${sessionId}`);
  };

  const sessions = activeTab === "upcoming" ? upcomingSessions : completedSessions;

  return (
    <Container>
      <Header>
        <BackButton onClick={handleBack}>←</BackButton>
        <Title>// ALL SESSIONS</Title>
      </Header>

      <TabsContainer>
        <Tab 
          active={activeTab === "upcoming"} 
          onClick={() => setActiveTab("upcoming")}
        >
          UPCOMING
        </Tab>
        <Tab 
          active={activeTab === "completed"} 
          onClick={() => setActiveTab("completed")}
        >
          COMPLETED
        </Tab>
      </TabsContainer>

      <DateSelector>
        {dates.map((date) => (
          <DateCard
            key={date.id}
            selected={selectedDate === `${date.month} ${date.day} ${date.dayName}`}
            onClick={() => handleDateSelect(`${date.month} ${date.day} ${date.dayName}`)}
          >
            <MonthText>{date.month}</MonthText>
            <DayText>{date.day}</DayText>
            <DayNameText>{date.dayName}</DayNameText>
          </DateCard>
        ))}
      </DateSelector>

      <SessionsList>
        {sessions.map((session) => (
          <SessionCard key={session.id} onClick={() => handleSessionClick(session.id)}>
            <SessionHeader hasCountdown={session.hasCountdown}>
              <DateBox>
                <MonthText>{session.month}</MonthText>
                <DayText>{session.day}</DayText>
              </DateBox>
              <SessionInfo>
                <SessionTime>{session.time}</SessionTime>
                <ParticipantInfo>{session.participant}</ParticipantInfo>
              </SessionInfo>
            </SessionHeader>
            {session.hasCountdown && (
              <CountdownBar>
                <span>Session starts in</span>
                <CountdownText>
                  <span>🕐</span>
                  <span>{session.countdown}</span>
                </CountdownText>
              </CountdownBar>
            )}
          </SessionCard>
        ))}
      </SessionsList>
    </Container>
  );
};

export default AllSessions; 