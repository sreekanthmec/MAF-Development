import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(180deg, #3a3a3a 0%, #252525 100%);
  padding: 20px;
  color: white;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: white;
`;

const SupportButton = styled.button`
  background: black;
  border: 1px solid white;
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  font-family: "Manrope", sans-serif;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
`;

const SessionOverview = styled.div`
  margin-bottom: 30px;
`;

const DateText = styled.div`
  font-family: "Manrope", sans-serif;
  font-weight: 700;
  font-size: 24px;
  color: #FA403F;
  margin-bottom: 8px;
`;

const TimeText = styled.div`
  font-family: "Manrope", sans-serif;
  font-weight: 600;
  font-size: 18px;
  color: white;
  margin-bottom: 8px;
`;

const DurationText = styled.div`
  font-family: "Manrope", sans-serif;
  font-size: 16px;
  color: #ccc;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const LocationSection = styled.div`
  margin-bottom: 30px;
`;

const LocationType = styled.div`
  font-family: "Manrope", sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: white;
  margin-bottom: 8px;
`;

const AddressText = styled.div`
  font-family: "Manrope", sans-serif;
  font-size: 16px;
  color: #ccc;
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 4px;
`;

const DistanceText = styled.div`
  font-family: "Manrope", sans-serif;
  font-size: 14px;
  color: #ccc;
`;

const CountdownBar = styled.div`
  background: black;
  border: 1px solid #FA403F;
  padding: 12px 16px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  font-family: "Manrope", sans-serif;
  font-size: 16px;
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 30px 0;
  color: #ccc;
  font-family: "Manrope", sans-serif;
  font-size: 14px;
  
  &::before {
    content: '';
    flex: 1;
    height: 1px;
    background: #ccc;
    margin-right: 10px;
  }
  
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #ccc;
    margin-left: 10px;
  }
`;

const StudentCard = styled.div`
  background: #f0f0f0;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
`;

const StudentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
`;

const Avatar = styled.div`
  width: 50px;
  height: 50px;
  background: #333;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
`;

const StudentInfo = styled.div`
  flex: 1;
`;

const StudentName = styled.div`
  font-family: "Manrope", sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: #333;
  margin-bottom: 4px;
`;

const StudentDetails = styled.div`
  font-family: "Manrope", sans-serif;
  font-size: 16px;
  color: #666;
`;

const ExperienceLevel = styled.div`
  font-family: "Manrope", sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: #333;
  background: #e0e0e0;
  padding: 6px 12px;
  border-radius: 6px;
`;

const EquipmentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const EquipmentItem = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: "Manrope", sans-serif;
  font-size: 16px;
  color: #333;
`;

const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
`;

const MessageButton = styled.button`
  background: #FA403F;
  color: white;
  border: none;
  padding: 16px 20px;
  border-radius: 8px;
  font-family: "Manrope", sans-serif;
  font-weight: 700;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  text-transform: uppercase;
`;

const CallButton = styled.button`
  background: white;
  color: #333;
  border: 1px solid #333;
  padding: 16px 20px;
  border-radius: 8px;
  font-family: "Manrope", sans-serif;
  font-weight: 600;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  text-transform: uppercase;
`;

const NotesSection = styled.div`
  margin-top: 30px;
`;

const NotesHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 15px;
  color: #ccc;
  font-family: "Manrope", sans-serif;
  font-size: 14px;
`;

const NotesContent = styled.div`
  font-family: "Manrope", sans-serif;
  font-size: 16px;
  color: #333;
  background: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  line-height: 1.5;
`;

const CancelSessionButton = styled.button`
  background: none;
  border: none;
  color: #FA403F;
  padding: 16px 0;
  font-family: "Manrope", sans-serif;
  font-weight: 600;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  width: 100%;
  margin-top: 30px;
`;

const SessionDetails = () => {
  const navigate = useNavigate();
  const { sessionId } = useParams();

  // Mock session data
  const sessionData = {
    id: sessionId,
    date: "Jul 24, Thursday",
    time: "10:00 AM - 12:00 PM",
    duration: "120 mins Session",
    location: "HOME",
    address: "Block 105, Lew Lian Vale Serangoon 537016",
    distance: "20 km Away",
    countdown: "2d 4h 30m",
    student: {
      name: "Arun P",
      age: 22,
      gender: "Female",
      experience: "BEGINNER"
    },
    equipment: {
      gloves: "YES",
      gloveSize: 8,
      handWraps: "YES"
    },
    notes: "Hi sir, I am looking to get back in shape. Haven't practised in a while. Would like to start slow."
  };

  const handleBack = () => {
    navigate("/all-sessions");
  };

  const handleMessage = () => {
    console.log("Message student");
    alert("Opening chat with student...");
  };

  const handleCall = () => {
    console.log("Call student");
    alert("Calling student...");
  };

  const handleSupport = () => {
    console.log("Contact support");
    alert("Contacting support...");
  };

  const handleCancelSession = () => {
    if (window.confirm("Are you sure you want to cancel this session?")) {
      console.log("Session cancelled:", sessionId);
      alert("Session cancelled successfully!");
      navigate("/all-sessions");
    }
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={handleBack}>←</BackButton>
        <SupportButton onClick={handleSupport}>
          <span>💬</span>
          <span>Support</span>
        </SupportButton>
      </Header>

      <SessionOverview>
        <DateText>{sessionData.date}</DateText>
        <TimeText>{sessionData.time}</TimeText>
        <DurationText>
          <span>🕐</span>
          <span>{sessionData.duration}</span>
        </DurationText>
      </SessionOverview>

      <LocationSection>
        <LocationType>{sessionData.location}</LocationType>
        <AddressText>
          <span>📍</span>
          <span>{sessionData.address}</span>
        </AddressText>
        <DistanceText>{sessionData.distance}</DistanceText>
      </LocationSection>

      <CountdownBar>
        <span>Starts in</span>
        <span>{sessionData.countdown}</span>
      </CountdownBar>

      <Divider>// STUDENT DETAILS</Divider>

      <StudentCard>
        <StudentHeader>
          <Avatar>👤</Avatar>
          <StudentInfo>
            <StudentName>{sessionData.student.name}</StudentName>
            <StudentDetails>
              {sessionData.student.age}, {sessionData.student.gender}
            </StudentDetails>
          </StudentInfo>
          <ExperienceLevel>{sessionData.student.experience}</ExperienceLevel>
        </StudentHeader>

        <EquipmentList>
          <EquipmentItem>
            <span>Gloves</span>
            <span>{sessionData.equipment.gloves}</span>
          </EquipmentItem>
          <EquipmentItem>
            <span>Glove Size</span>
            <span>{sessionData.equipment.gloveSize}</span>
          </EquipmentItem>
          <EquipmentItem>
            <span>Hand Wraps</span>
            <span>{sessionData.equipment.handWraps}</span>
          </EquipmentItem>
        </EquipmentList>
      </StudentCard>

      <ActionButtons>
        <MessageButton onClick={handleMessage}>
          <span>MESSAGE STUDENT</span>
          <span>💬</span>
        </MessageButton>
        <CallButton onClick={handleCall}>
          <span>CALL STUDENT</span>
          <span>📞</span>
        </CallButton>
      </ActionButtons>

      <NotesSection>
        <NotesHeader>
          <span>📝</span>
          <span>NOTES</span>
        </NotesHeader>
        <NotesContent>{sessionData.notes}</NotesContent>
      </NotesSection>

      <CancelSessionButton onClick={handleCancelSession}>
        <span>✕</span>
        <span>CANCEL SESSION</span>
      </CancelSessionButton>
    </Container>
  );
};

export default SessionDetails;
