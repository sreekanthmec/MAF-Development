import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Calendar, Clock, ArrowLeft } from "lucide-react";

const TrainerSessions = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>('upcoming');
  const [selectedDate, setSelectedDate] = useState('12');

  const sessionsData = {
    upcomingSessions: [
      { 
        id: 1, 
        date: "AUG 12", 
        time: "10:00 AM - 11:00AM", 
        participant: "Arun P, 22, F",
        countdown: "2d 4h 30m",
        isHighlighted: true
      },
      { 
        id: 2, 
        date: "AUG 12", 
        time: "10:00 AM - 11:00AM", 
        participant: "Lazar Amigano, 22, M",
        countdown: null,
        isHighlighted: false
      },
      { 
        id: 3, 
        date: "AUG 12", 
        time: "10:00 AM - 11:00AM", 
        participant: "Lazar Amigano, 22, M",
        countdown: null,
        isHighlighted: false
      },
      { 
        id: 4, 
        date: "AUG 12", 
        time: "10:00 AM - 11:00AM", 
        participant: "Lazar Amigano, 22, M",
        countdown: null,
        isHighlighted: false
      },
      { 
        id: 5, 
        date: "AUG 12", 
        time: "10:00 AM - 11:00AM", 
        participant: "Lazar Amigano, 22, M",
        countdown: null,
        isHighlighted: false
      }
    ],
    completedSessions: [
      { 
        id: 6, 
        date: "AUG 11", 
        time: "9:00 AM - 10:00AM", 
        participant: "Emma Davis, 25, F",
        earnings: "$50"
      },
      { 
        id: 7, 
        date: "AUG 10", 
        time: "1:00 PM - 2:30PM", 
        participant: "Ryan Lee, 28, M",
        earnings: "$75"
      },
      { 
        id: 8, 
        date: "AUG 9", 
        time: "5:00 PM - 7:00PM", 
        participant: "Lisa Chen, 23, F",
        earnings: "$100"
      }
    ]
  };

  const calendarDates = [
    { day: "12", month: "AUG", weekday: "WED", isSelected: true },
    { day: "13", month: "AUG", weekday: "THU", isSelected: false },
    { day: "14", month: "AUG", weekday: "FRI", isSelected: false },
    { day: "15", month: "AUG", weekday: "SAT", isSelected: false }
  ];

  return (
    <div className="bg-[#f7f7f7] flex flex-row justify-center w-full">
      <div className="bg-white overflow-hidden w-[360px] min-h-screen">
        <div className="relative w-[360px] min-h-screen">
          {/* Header */}
          <div className="bg-white px-5 py-6">
            <div className="flex items-center mb-4">
              <Button variant="ghost" size="sm" className="p-0 mr-3" onClick={() => navigate(-1)}>
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </Button>
            </div>
            <p className="text-gray-500 text-xs uppercase tracking-wide">// ALL SESSIONS</p>
          </div>

          {/* Session Categories Tabs */}
          <div className="bg-white px-5 pb-4">
            <div className="flex">
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`flex-1 text-center py-2 font-medium text-sm ${
                  activeTab === 'upcoming' 
                    ? 'text-black border-b-2 border-black' 
                    : 'text-gray-500'
                }`}
              >
                UPCOMING
              </button>
              <button
                onClick={() => setActiveTab('completed')}
                className={`flex-1 text-center py-2 font-medium text-sm ${
                  activeTab === 'completed' 
                    ? 'text-black border-b-2 border-black' 
                    : 'text-gray-500'
                }`}
              >
                COMPLETED
              </button>
            </div>
          </div>

          {/* Date Picker */}
          <div className="bg-white px-5 pb-6">
            <div className="flex gap-3 overflow-x-auto">
              {calendarDates.map((date, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedDate(date.day)}
                  className={`flex-shrink-0 p-3 rounded text-center ${
                    date.isSelected 
                      ? 'border-2 border-red-500' 
                      : 'border border-gray-200'
                  }`}
                >
                  <div className={`text-xs font-medium mb-1 ${
                    date.isSelected ? 'text-red-500' : 'text-gray-600'
                  }`}>
                    {date.month}
                  </div>
                  <div className={`text-xl font-bold mb-1 ${
                    date.isSelected ? 'text-red-500' : 'text-black'
                  }`}>
                    {date.day}
                  </div>
                  <div className={`text-xs font-medium ${
                    date.isSelected ? 'text-red-500' : 'text-gray-600'
                  }`}>
                    {date.weekday}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Session List */}
          <div className="bg-gray-100 flex-1 px-5 py-6">
            <div className="space-y-3">
              {activeTab === 'upcoming' && sessionsData.upcomingSessions.map((session) => (
                <div key={session.id} className="bg-white rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate('/trainer/session-details')}>
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="bg-gray-200 px-3 py-2 rounded">
                        <span className="text-gray-600 text-sm font-medium">{session.date}</span>
                      </div>
                      <div className="text-right flex-1 ml-4">
                        <div className="text-gray-600 text-sm">{session.time}</div>
                        <div className="text-black font-medium text-sm">{session.participant}</div>
                      </div>
                    </div>
                    
                    {session.isHighlighted && session.countdown && (
                      <div className="bg-green-600 text-white px-3 py-2 mt-3 rounded flex items-center justify-between">
                        <span className="text-sm">Session starts in</span>
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-2">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                          <span className="text-sm font-medium">{session.countdown}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {activeTab === 'completed' && sessionsData.completedSessions.map((session) => (
                <div key={session.id} className="bg-white rounded-lg overflow-hidden opacity-75">
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="bg-gray-200 px-3 py-2 rounded">
                        <span className="text-gray-600 text-sm font-medium">{session.date}</span>
                      </div>
                      <div className="text-right flex-1 ml-4">
                        <div className="text-gray-600 text-sm">{session.time}</div>
                        <div className="text-black font-medium text-sm">{session.participant}</div>
                        <div className="text-green-600 font-bold text-sm mt-1">
                          Earned: {session.earnings}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {activeTab === 'upcoming' && sessionsData.upcomingSessions.length === 0 && (
              <div className="text-center py-12">
                <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <h3 className="font-medium text-gray-900 text-base mb-2">No upcoming sessions</h3>
                <p className="text-gray-500 text-sm">You don't have any upcoming sessions scheduled.</p>
              </div>
            )}

            {activeTab === 'completed' && sessionsData.completedSessions.length === 0 && (
              <div className="text-center py-12">
                <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <h3 className="font-medium text-gray-900 text-base mb-2">No completed sessions</h3>
                <p className="text-gray-500 text-sm">You haven't completed any sessions yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerSessions;