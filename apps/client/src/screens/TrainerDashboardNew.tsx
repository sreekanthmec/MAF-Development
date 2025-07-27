import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { MapPin, User, Edit, Check, X, ArrowRight, ChevronLeft, ChevronRight, Clock, LogOut } from "lucide-react";

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
    <div className="bg-[#f7f7f7] flex flex-row justify-center w-full">
      <div className="bg-[#2d3748] overflow-hidden w-[360px] min-h-screen relative">
        <div className="relative w-[360px] min-h-screen">
          {/* Header */}
          <div className="bg-[#2d3748] text-white px-5 py-6 relative">
            <div className="flex items-center mb-8">
              <div className="flex items-center cursor-pointer hover:opacity-80 transition-opacity" onClick={() => navigate("/trainer/profile") }>
                <div className="w-8 h-8 bg-white rounded flex items-center justify-center mr-3">
                  <User className="w-4 h-4 text-gray-800" />
                </div>
                <div>
                  <h1 className="text-white font-medium text-base">Helena Padilla</h1>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => { localStorage.clear(); navigate("/"); }}
                className="text-white hover:text-gray-300 hover:bg-gray-600 ml-auto"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
            <div className="mb-6">
              <div className="flex items-baseline mb-2">
                <span className="text-red-400 text-4xl font-bold">12</span>
                <span className="text-white text-xl font-medium ml-2">SESSIONS</span>
              </div>
              <p className="text-gray-400 text-sm">Upcoming</p>
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-8 h-px bg-gray-400 mr-3"></div>
                <p className="text-gray-400 text-xs uppercase tracking-wide">UPCOMING SESSIONS</p>
              </div>
              <Button variant="ghost" size="sm" className="text-white hover:text-gray-300 text-xs underline p-0 h-auto" onClick={() => navigate("/trainer/sessions") }>
                VIEW ALL
              </Button>
            </div>
            <div className="overflow-x-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <div className="flex space-x-3 pb-4" style={{ width: `${upcomingSessions.length * 280}px` }}>
                {upcomingSessions.map((session, index) => (
                  <div key={session.id} className="flex-shrink-0 w-[260px]">
                    <div className="bg-white rounded-lg p-4">
                      <div className="flex justify-between mb-3">
                        <div>
                          <div className="text-gray-600 text-xs font-medium mb-1">{session.month}</div>
                          <div className="text-gray-900 text-2xl font-bold">{session.day}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-gray-600 text-xs font-medium mb-1">{session.month}</div>
                          <div className="text-gray-900 text-2xl font-bold">{session.day}</div>
                        </div>
                      </div>
                      <div className="border-t border-gray-100 pt-3 mb-3">
                        <p className="text-gray-600 text-sm">{session.time}</p>
                        <p className="text-gray-900 font-medium">{session.student}, {session.gender}</p>
                      </div>
                      {index === 0 && (
                        <div className="bg-green-600 text-white px-3 py-2 rounded flex items-center justify-between">
                          <span className="text-sm">Session starts in</span>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2" />
                            <span className="text-sm font-medium">{session.countdown}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
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
        </div>
        {/* Sessions Modal Popup */}
        {showSessionsModal && pendingSessions.length > 0 && currentSession && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div 
              className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
              onClick={closeModal}
            ></div>
            <div className="relative w-[320px] max-h-[80vh] bg-white rounded-lg shadow-2xl overflow-hidden">
              <div className="bg-[#2d3748] text-white p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <h2 className="text-lg font-bold">Pending Sessions</h2>
                  <span className="ml-2 text-sm text-gray-400">
                    {currentSessionIndex + 1} of {pendingSessions.length}
                  </span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={closeModal}
                  className="text-white hover:text-gray-300 hover:bg-gray-600 p-1"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <div className="bg-white overflow-hidden">
                <div className="bg-[#2d3748] text-white p-4">
                  <div className="mb-3">
                    <h2 className="text-red-400 text-xl font-bold mb-1">
                      {currentSession.date}, {currentSession.day}
                    </h2>
                    <p className="text-white font-bold text-base mb-2">{currentSession.time}</p>
                    <div className="flex items-center text-gray-400">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="text-sm">{currentSession.duration}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">LOCATION</p>
                    <p className="text-white font-bold text-sm mb-1">{currentSession.location.type}</p>
                    <div className="flex items-start">
                      <p className="text-gray-400 text-xs flex-1">{currentSession.location.address}</p>
                      <div className="w-12 h-8 bg-gray-600 rounded ml-2 flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-black rounded flex items-center justify-center mr-3">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-black font-bold text-base">{currentSession.student.name}</h3>
                        <p className="text-gray-500 text-sm">{currentSession.student.age}, {currentSession.student.gender}</p>
                      </div>
                    </div>
                    <span className="text-black font-bold text-sm">{currentSession.student.level}</span>
                  </div>
                  <div className="space-y-2 pt-3 border-t border-gray-100">
                    <div className="flex justify-between items-center">
                      <span className="text-black text-sm">Gloves</span>
                      <span className="text-black text-sm font-medium">{currentSession.student.preferences.gloves}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-black text-sm">Glove Size</span>
                      <span className="text-black text-sm font-medium">{currentSession.student.preferences.gloveSize}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-black text-sm">Hand Wraps</span>
                      <span className="text-black text-sm font-medium">{currentSession.student.preferences.handWraps}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3">
                  <div className="flex items-center mb-2">
                    <Edit className="w-4 h-4 text-gray-500 mr-2" />
                    <span className="text-gray-500 text-xs uppercase tracking-wide">NOTES</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {currentSession.notes}
                  </p>
                </div>
                <div className="p-4 space-y-3">
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg flex items-center justify-between"
                    onClick={() => handleAcknowledge(currentSession.id)}
                  >
                    <span className="font-medium uppercase text-sm">ACKNOWLEDGE</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full text-red-500 hover:text-red-600 hover:bg-red-50 p-3 flex items-center justify-center"
                    onClick={() => handleCancelClick(currentSession.id)}
                  >
                    <div className="w-4 h-4 border-2 border-red-500 rounded flex items-center justify-center mr-2">
                      <span className="text-red-500 text-xs font-bold">×</span>
                    </div>
                    <span className="font-medium uppercase text-sm">CANCEL SESSION</span>
                  </Button>
                </div>
              </div>
              <div className="bg-gray-50 p-4 flex items-center justify-between">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={previousSession}
                  disabled={currentSessionIndex === 0}
                  className="text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <div className="flex space-x-2">
                  {pendingSessions.map((_, index) => (
                    <div 
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentSessionIndex ? 'bg-red-500' : 'bg-gray-300'
                      }`}
                    ></div>
                  ))}
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={nextSession}
                  disabled={currentSessionIndex === pendingSessions.length - 1}
                  className="text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
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
      </div>
    </div>
  );
};

export default TrainerDashboardNew;