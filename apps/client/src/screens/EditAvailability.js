import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  min-height: 100vh;
  background: white;
  padding: 20px;
  color: #333;
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
  font-size: 24px;
  color: #333;
  margin: 0;
`;

const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 30px;
  border-bottom: 1px solid #e0e0e0;
`;

const Tab = styled.button`
  background: none;
  border: none;
  font-family: "Manrope", sans-serif;
  font-weight: ${props => props.active ? '700' : '400'};
  font-size: 16px;
  color: #333;
  padding: 15px 20px;
  cursor: pointer;
  position: relative;
  
  ${props => props.active && `
    &::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 20px;
      right: 20px;
      height: 2px;
      background: #333;
    }
  `}
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 30px;
  padding: 20px;
  background: #f8f8f8;
  border-radius: 8px;
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  accent-color: #FA403F;
  margin-top: 2px;
`;

const CheckboxText = styled.div`
  font-family: "Manrope", sans-serif;
  font-size: 16px;
  color: #333;
  line-height: 1.4;
`;

const SectionTitle = styled.h2`
  font-family: "Manrope", sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: #333;
  margin-bottom: 20px;
`;

const SessionLimitsContainer = styled.div`
  margin-bottom: 40px;
`;

const LimitItem = styled.div`
  margin-bottom: 25px;
`;

const LimitHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: #f8f8f8;
  border-radius: 8px;
  margin-bottom: 8px;
`;

const LimitLabel = styled.div`
  font-family: "Manrope", sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: #333;
`;

const LimitValue = styled.div`
  font-family: "Manrope", sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: #FA403F;
`;

const LimitDescription = styled.div`
  font-family: "Manrope", sans-serif;
  font-size: 14px;
  color: #666;
  padding-left: 16px;
`;

const AvailabilityContainer = styled.div`
  margin-bottom: 40px;
`;

const DayItem = styled.div`
  margin-bottom: 25px;
`;

const DayHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 15px;
`;

const DayCheckbox = styled.input`
  width: 20px;
  height: 20px;
  accent-color: #FA403F;
`;

const DayLabel = styled.div`
  font-family: "Manrope", sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: #333;
`;

const TimeSlotsContainer = styled.div`
  margin-left: 32px;
`;

const TimeSlot = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
`;

const TimeInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-family: "Manrope", sans-serif;
  font-size: 14px;
  width: 100px;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #666;
  font-size: 18px;
  cursor: pointer;
  padding: 4px;
`;

const AddTimeButton = styled.button`
  background: none;
  border: none;
  color: #666;
  font-size: 18px;
  cursor: pointer;
  padding: 4px;
  margin-left: 32px;
`;

const UnavailableText = styled.div`
  font-family: "Manrope", sans-serif;
  font-size: 14px;
  color: #666;
  margin-left: 32px;
  font-style: italic;
`;

const ActionBar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  padding: 20px;
  border-top: 1px solid #e0e0e0;
  display: flex;
  gap: 15px;
`;

const CancelButton = styled.button`
  background: white;
  border: 1px solid #e0e0e0;
  color: #333;
  padding: 16px 24px;
  border-radius: 8px;
  font-family: "Manrope", sans-serif;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SaveButton = styled.button`
  background: #FA403F;
  color: white;
  border: none;
  padding: 16px 24px;
  border-radius: 8px;
  font-family: "Manrope", sans-serif;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-transform: uppercase;
`;

const EditAvailability = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("session");
  const [autoAccept, setAutoAccept] = useState(true);
  const [availability, setAvailability] = useState({
    sunday: { enabled: true, slots: [{ start: "9:00am", end: "5:00pm" }] },
    monday: { enabled: false, slots: [] },
    tuesday: { enabled: true, slots: [{ start: "9:00am", end: "6:00pm" }] },
    wednesday: { enabled: true, slots: [{ start: "9:00am", end: "6:00pm" }] },
    thursday: { enabled: true, slots: [{ start: "9:00am", end: "6:00pm" }] },
    friday: { enabled: true, slots: [{ start: "9:00am", end: "6:00pm" }] },
    saturday: { enabled: false, slots: [] }
  });

  const handleBack = () => {
    navigate("/trainer-dashboard");
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleDayToggle = (day) => {
    setAvailability(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        enabled: !prev[day].enabled,
        slots: !prev[day].enabled ? [{ start: "9:00am", end: "5:00pm" }] : []
      }
    }));
  };

  const handleAddTimeSlot = (day) => {
    setAvailability(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: [...prev[day].slots, { start: "9:00am", end: "5:00pm" }]
      }
    }));
  };

  const handleRemoveTimeSlot = (day, index) => {
    setAvailability(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: prev[day].slots.filter((_, i) => i !== index)
      }
    }));
  };

  const handleTimeChange = (day, index, field, value) => {
    setAvailability(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: prev[day].slots.map((slot, i) => 
          i === index ? { ...slot, [field]: value } : slot
        )
      }
    }));
  };

  const handleSave = () => {
    console.log("Saving availability:", availability);
    alert("Availability saved successfully!");
    navigate("/trainer-dashboard");
  };

  const handleCancel = () => {
    navigate("/trainer-dashboard");
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={handleBack}>←</BackButton>
        <Title>Edit Availability</Title>
      </Header>

      <TabsContainer>
        <Tab 
          active={activeTab === "session"} 
          onClick={() => handleTabChange("session")}
        >
          SESSION & AVAILABILITY
        </Tab>
        <Tab 
          active={activeTab === "preview"} 
          onClick={() => handleTabChange("preview")}
        >
          PREVIEW
        </Tab>
      </TabsContainer>

      <CheckboxContainer>
        <Checkbox 
          type="checkbox" 
          checked={autoAccept}
          onChange={(e) => setAutoAccept(e.target.checked)}
        />
        <CheckboxText>
          By setting my availability, I understand that the system will automatically accept bookings for any available timeslots.
        </CheckboxText>
      </CheckboxContainer>

      <SessionLimitsContainer>
        <SectionTitle>// SESSION LIMITS</SectionTitle>
        
        <LimitItem>
          <LimitHeader>
            <LimitLabel>Advance Booking</LimitLabel>
            <LimitValue>Book before 3 hrs</LimitValue>
          </LimitHeader>
          <LimitDescription>
            Set the minimum hours required before a session can be booked.
          </LimitDescription>
        </LimitItem>

        <LimitItem>
          <LimitHeader>
            <LimitLabel>Session Cool-off Time</LimitLabel>
            <LimitValue>3 hrs Rest</LimitValue>
          </LimitHeader>
          <LimitDescription>
            Set the required break time between consecutive sessions.
          </LimitDescription>
        </LimitItem>

        <LimitItem>
          <LimitHeader>
            <LimitLabel>Daily Session Limit</LimitLabel>
            <LimitValue>6 per day</LimitValue>
          </LimitHeader>
          <LimitDescription>
            Limit the total number of sessions you can take in a day.
          </LimitDescription>
        </LimitItem>
      </SessionLimitsContainer>

      <AvailabilityContainer>
        <SectionTitle>// AVAILABILITY</SectionTitle>
        
        {Object.entries(availability).map(([day, dayData]) => (
          <DayItem key={day}>
            <DayHeader>
              <DayCheckbox 
                type="checkbox"
                checked={dayData.enabled}
                onChange={() => handleDayToggle(day)}
              />
              <DayLabel>{day.charAt(0).toUpperCase() + day.slice(1)}</DayLabel>
            </DayHeader>
            
            {dayData.enabled ? (
              <TimeSlotsContainer>
                {dayData.slots.map((slot, index) => (
                  <TimeSlot key={index}>
                    <TimeInput
                      type="time"
                      value={slot.start}
                      onChange={(e) => handleTimeChange(day, index, 'start', e.target.value)}
                    />
                    <span>to</span>
                    <TimeInput
                      type="time"
                      value={slot.end}
                      onChange={(e) => handleTimeChange(day, index, 'end', e.target.value)}
                    />
                    {dayData.slots.length > 1 && (
                      <RemoveButton onClick={() => handleRemoveTimeSlot(day, index)}>
                        ✕
                      </RemoveButton>
                    )}
                  </TimeSlot>
                ))}
                <AddTimeButton onClick={() => handleAddTimeSlot(day)}>
                  +
                </AddTimeButton>
              </TimeSlotsContainer>
            ) : (
              <UnavailableText>Unavailable</UnavailableText>
            )}
          </DayItem>
        ))}
      </AvailabilityContainer>

      <div style={{ height: "100px" }}></div> {/* Spacer for fixed action bar */}

      <ActionBar>
        <CancelButton onClick={handleCancel}>
          <span>✕</span>
          <span>Cancel</span>
        </CancelButton>
        <SaveButton onClick={handleSave}>
          <span>SAVE AND EXIT</span>
          <span>→</span>
        </SaveButton>
      </ActionBar>
    </Container>
  );
};

export default EditAvailability; 