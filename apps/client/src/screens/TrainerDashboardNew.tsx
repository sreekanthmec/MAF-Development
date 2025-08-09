import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import SessionPopup from "../components/SessionPopup";
import { MapPin, User, Edit, Check, X, ArrowRight, ChevronLeft, ChevronRight, Clock, LogOut } from "lucide-react";
import styled from "styled-components";

// Dummy data (from old Dashboard.tsx)
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
  countdown: string;
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
  status: 'available' | 'unavailable';
  action: 'edit' | 'arrow';
}

interface DayTimeSlots {
  [key: number]: TimeSlot[];
}

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  position: relative;
  width: 360px;
  min-height: 100vh;
  background: #F7F7F7;
  box-sizing: border-box;
`;

const GradientHeader = styled.div`
  width: 360px;
  height: 396px;
  background: linear-gradient(157.07deg, #3A3A3A 0%, #252525 81.65%);
  padding: 28px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 48px;
  position: relative;
  isolation: isolate;
  box-sizing: border-box;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 28px 20px;
  gap: 48px;
  isolation: isolate;
  width: 360px;
  height: 396px;
  background: linear-gradient(157.07deg, #3A3A3A 0%, #252525 81.65%);
  border-radius: 0;
  position: relative;
`;

const VectorBg = styled.div`
  position: absolute;
  width: 174px;
  height: 226px;
  left: 205px;
  top: 0;
  background: linear-gradient(180deg, #353535 0%, #363636 50%, #282828 100%);
  z-index: 0;
`;

const UserRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 320px;
  height: 36px;
  z-index: 1;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  width: 144px;
  height: 36px;
`;

const Avatar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  background: linear-gradient(0deg, rgba(0,0,0,0.2), rgba(0,0,0,0.2)), #252525;
  border: 1px solid rgba(114, 114, 114, 0.6);
`;

const UserName = styled.div`
  font-family: 'Manrope', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  color: #F7F7F7;
  text-align: center;
`;

const SessionInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  width: 153px;
  height: 68px;
`;

const SessionsCount = styled.div`
  font-family: 'Cooper Hewitt', 'Manrope', sans-serif;
  font-style: italic;
  font-weight: 714;
  font-size: 40px;
  line-height: 120%;
  letter-spacing: -1px;
  text-transform: uppercase;
  color: #FA403F;
`;

const SessionsLabel = styled.div`
  font-family: 'Manrope', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  color: #B0B0B0;
`;

const TrainerDashboardNew = (): React.ReactElement => {
  const navigate = useNavigate();

  // Dummy data
  const [pendingSessions, setPendingSessions] = useState<SessionCard[]>([
    {
      id: 1,
      date: "Jul 24",
      day: "Thursday",
      time: "10:00 AM - 12:00 PM",
      duration: "120 mins Session",
      location: {
        type: "HOME",
        address: "Block 105, Lew Lian Vale Serangoon 537016"
      },
      student: {
        name: "Arun P",
        age: "22",
        gender: "Female",
        level: "BEGINNER",
        preferences: {
          gloves: "YES",
          gloveSize: "8",
          handWraps: "YES"
        }
      },
      notes: "Hi sir, I am looking to get back in shape. Haven't practised in a while. Would like to start slow."
    },
    {
      id: 2,
      date: "Jul 25",
      day: "Friday",
      time: "2:00 PM - 4:00 PM",
      duration: "120 mins Session",
      location: {
        type: "GYM",
        address: "Fitness First, Orchard Road 238859"
      },
      student: {
        name: "Sarah M",
        age: "28",
        gender: "Female",
        level: "INTERMEDIATE",
        preferences: {
          gloves: "YES",
          gloveSize: "10",
          handWraps: "NO"
        }
      },
      notes: "Ready for an intense workout session. Want to improve my technique."
    },
    {
      id: 3,
      date: "Jul 26",
      day: "Saturday",
      time: "9:00 AM - 11:00 AM",
      duration: "120 mins Session",
      location: {
        type: "HOME",
        address: "Block 203, Tampines Street 21 520203"
      },
      student: {
        name: "Mike R",
        age: "25",
        gender: "Male",
        level: "ADVANCED",
        preferences: {
          gloves: "YES",
          gloveSize: "12",
          handWraps: "YES"
        }
      },
      notes: "Preparing for upcoming competition. Need advanced training techniques."
    }
  ]);

  const [upcomingSessions] = useState<UpcomingSession[]>([
    {
      id: 1,
      month: "AUG",
      day: "12",
      time: "10:00 AM - 11:00AM",
      student: "Arun P",
      gender: "Female",
      countdown: "2d 4h 30m"
    },
    {
      id: 2,
      month: "AUG",
      day: "13",
      time: "2:00 PM - 4:00 PM",
      student: "Sarah M",
      gender: "Female",
      countdown: "3d 6h 15m"
    },
    {
      id: 3,
      month: "AUG",
      day: "14",
      time: "9:00 AM - 11:00 AM",
      student: "Mike R",
      gender: "Male",
      countdown: "4d 8h 45m"
    },
    {
      id: 4,
      month: "AUG",
      day: "15",
      time: "3:00 PM - 5:00 PM",
      student: "Emma L",
      gender: "Female",
      countdown: "5d 2h 20m"
    }
  ]);

  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([
    { id: 1, month: "AUG", day: "12", dayName: "WED", isSelected: true },
    { id: 2, month: "AUG", day: "13", dayName: "THU", isSelected: false },
    { id: 3, month: "AUG", day: "14", dayName: "FRI", isSelected: false },
    { id: 4, month: "AUG", day: "15", dayName: "SAT", isSelected: false },
    { id: 5, month: "AUG", day: "16", dayName: "SUN", isSelected: false }
  ]);

  const [dayTimeSlots] = useState<DayTimeSlots>({
    1: [
      { id: 1, time: "9AM - 11AM", status: 'available', action: 'edit' },
      { id: 2, time: "3PM - 5PM", status: 'unavailable', action: 'arrow' },
      { id: 3, time: "7PM - 9PM", status: 'available', action: 'edit' },
      { id: 4, time: "3PM - 5PM", status: 'unavailable', action: 'arrow' }
    ],
    2: [
      { id: 5, time: "10AM - 12PM", status: 'available', action: 'edit' },
      { id: 6, time: "2PM - 4PM", status: 'available', action: 'edit' },
      { id: 7, time: "6PM - 8PM", status: 'unavailable', action: 'arrow' }
    ],
    3: [
      { id: 8, time: "8AM - 10AM", status: 'unavailable', action: 'arrow' },
      { id: 9, time: "1PM - 3PM", status: 'available', action: 'edit' },
      { id: 10, time: "5PM - 7PM", status: 'available', action: 'edit' },
      { id: 11, time: "8PM - 10PM", status: 'unavailable', action: 'arrow' }
    ],
    4: [
      { id: 12, time: "9AM - 11AM", status: 'available', action: 'edit' },
      { id: 13, time: "4PM - 6PM", status: 'unavailable', action: 'arrow' }
    ],
    5: [
      { id: 14, time: "11AM - 1PM", status: 'available', action: 'edit' },
      { id: 15, time: "3PM - 5PM", status: 'available', action: 'edit' },
      { id: 16, time: "7PM - 9PM", status: 'unavailable', action: 'arrow' }
    ]
  });

  const [selectedDayId, setSelectedDayId] = useState(1);
  const [showSessionsModal, setShowSessionsModal] = useState(true);
  const [currentSessionIndex, setCurrentSessionIndex] = useState(0);
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);
  const [showCancelSuccess, setShowCancelSuccess] = useState(false);
  const [sessionToCancel, setSessionToCancel] = useState<number | null>(null);

  // Handlers (same as old Dashboard)
  const handleDaySelect = (dayId: number) => {
    setSelectedDayId(dayId);
    setCalendarDays(prev => prev.map(day => ({
      ...day,
      isSelected: day.id === dayId
    })));
  };

  const handleAcknowledge = (sessionId: number) => {
    setPendingSessions(prev => prev.filter(session => session.id !== sessionId));
    if (pendingSessions.length === 1) {
      setShowSessionsModal(false);
    } else {
      setCurrentSessionIndex(prev => Math.min(prev, pendingSessions.length - 2));
    }
  };

  const handleCancelClick = (sessionId: number) => {
    setSessionToCancel(sessionId);
    setShowCancelConfirmation(true);
  };

  const handleCancelConfirm = () => {
    if (sessionToCancel) {
      setPendingSessions(prev => prev.filter(session => session.id !== sessionToCancel));
      if (pendingSessions.length === 1) {
        setShowSessionsModal(false);
      } else {
        setCurrentSessionIndex(prev => Math.min(prev, pendingSessions.length - 2));
      }
    }
    setShowCancelConfirmation(false);
    setSessionToCancel(null);
    setShowCancelSuccess(true);
  };

  const handleCancelDismiss = () => {
    setShowCancelConfirmation(false);
    setSessionToCancel(null);
  };

  const handleGoToHome = () => {
    setShowCancelSuccess(false);
  };

  const closeModal = () => {
    setShowSessionsModal(false);
  };

  const nextSession = () => {
    if (currentSessionIndex < pendingSessions.length - 1) {
      setCurrentSessionIndex(prev => prev + 1);
    }
  };

  const previousSession = () => {
    if (currentSessionIndex > 0) {
      setCurrentSessionIndex(prev => prev - 1);
    }
  };

  const currentSession = pendingSessions[currentSessionIndex];
  const currentTimeSlots = dayTimeSlots[selectedDayId] || [];

  return (
    <DashboardContainer>
      <HeaderContainer>
        <VectorBg />
        <UserRow>
          <UserInfo>
            <Avatar>
              {/* Insert user icon SVG here */}
            </Avatar>
            <UserName>Helena Padilla</UserName>
          </UserInfo>
          {/* Add wallet or other icons here if needed */}
        </UserRow>
        <SessionInfo>
          <SessionsCount>12 SESSIONS</SessionsCount>
          <SessionsLabel>Upcoming</SessionsLabel>
        </SessionInfo>
        {/* Add the rest of your header content here, following Figma */}
      </HeaderContainer>
      {/* Scrollable Content */}
      <div className="overflow-y-auto bg-gray-100 px-5 py-6">
        {/* Calendar Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-600 text-xs uppercase tracking-wide">// YOUR CALENDAR</p>
          </div>
          <div className="overflow-x-auto mb-6" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <div className="flex space-x-3" style={{ width: `${calendarDays.length * 100}px` }}>
              {calendarDays.map((day) => (
                <div 
                  key={day.id} 
                  className={`flex-shrink-0 w-[80px] p-3 rounded text-center cursor-pointer transition-all ${
                    day.isSelected 
                      ? 'bg-white border-2 border-red-500' 
                      : 'bg-white hover:bg-gray-50'
                  }`}
                  onClick={() => handleDaySelect(day.id)}
                >
                  <div className={`text-xs font-medium mb-1 ${
                    day.isSelected ? 'text-gray-600' : 'text-gray-600'
                  }`}>
                    {day.month}
                  </div>
                  <div className={`text-xl font-bold mb-1 ${
                    day.isSelected ? 'text-red-500' : 'text-gray-900'
                  }`}>
                    {day.day}
                  </div>
                  <div className={`text-xs font-medium ${
                    day.isSelected ? 'text-red-500' : 'text-gray-600'
                  }`}>
                    {day.dayName}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Time Slots */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-gray-600 text-xs uppercase tracking-wide">// TIME SLOTS</p>
          </div>
          <div className="space-y-3">
            {currentTimeSlots.map((slot) => (
              <div key={slot.id} className="flex items-center justify-between bg-white p-4 rounded-lg">
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-3 ${
                    slot.status === 'available' ? 'bg-green-500' : 'bg-red-500'
                  }`}></div>
                  <span className="text-gray-900 font-medium">{slot.time}</span>
                </div>
                <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white p-2" onClick={() => navigate("/trainer/edit-availability") }>
                  {slot.action === 'edit' ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
                    </svg>
                  )}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Sessions Modal Popup */}
      {showSessionsModal && pendingSessions.length > 0 && currentSession && (
        <SessionPopup
          currentSession={currentSession}
          currentSessionIndex={currentSessionIndex}
          pendingSessions={pendingSessions}
          onAcknowledge={handleAcknowledge}
          onCancel={handleCancelClick}
          onClose={closeModal}
          onNext={nextSession}
          onPrevious={previousSession}
        />
      )}
      {/* Cancel Confirmation Modal */}
      {showCancelConfirmation && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={handleCancelDismiss}
          ></div>
          <div className="relative w-[280px] bg-white rounded-lg shadow-2xl overflow-hidden">
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mt-3 mb-4"></div>
            <div className="px-6 pb-6">
              <h2 className="text-center text-gray-900 font-bold text-lg mb-6 leading-tight">
                Are you sure you want to<br />cancel this session?
              </h2>
              <div className="space-y-3">
                <Button 
                  className="w-full bg-red-500 hover:bg-red-600 text-white p-4 rounded-lg flex items-center justify-between"
                  onClick={handleCancelConfirm}
                >
                  <span className="font-bold uppercase text-sm">YES, CANCEL</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button 
                  variant="outline"
                  className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 p-4 rounded-lg flex items-center justify-between"
                  onClick={handleCancelDismiss}
                >
                  <span className="font-bold uppercase text-sm">NO, I'LL TRAIN</span>
                  <ArrowRight className="w-4 h-4 text-gray-500" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Cancel Success Modal */}
      {showCancelSuccess && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center">
          <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
          <div className="relative w-[280px] bg-white rounded-lg shadow-2xl overflow-hidden">
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mt-3 mb-6"></div>
            <div className="px-6 pb-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-green-500 rounded-lg absolute -bottom-1 -right-1"></div>
                  <div className="w-16 h-16 border-4 border-green-500 rounded-lg absolute -bottom-0.5 -right-0.5"></div>
                  <div className="w-16 h-16 border-4 border-green-500 rounded-lg bg-green-500 flex items-center justify-center relative">
                    <Check className="w-8 h-8 text-white font-bold" />
                  </div>
                </div>
              </div>
              <h2 className="text-green-500 font-bold text-xl mb-2">
                Session Cancelled
              </h2>
              <p className="text-gray-500 text-sm mb-6">
                Now others can book in this slot.
              </p>
              <Button 
                className="w-full bg-red-500 hover:bg-red-600 text-white p-4 rounded-lg flex items-center justify-between"
                onClick={handleGoToHome}
              >
                <span className="font-bold uppercase text-sm">GO TO HOME</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </DashboardContainer>
  );
};

export default TrainerDashboardNew;