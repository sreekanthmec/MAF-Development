import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { ArrowLeft, Phone, Clock } from "lucide-react";

const TrainerEarnings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'paid' | 'pending' | 'upcoming'>('pending');

  const totalEarnings = 100;

  const paidSessions = [
    {
      id: 1,
      date: "Aug 12, 10:00 AM",
      title: "Session with Arun",
      amount: 50,
      status: "Completed",
      isPaid: true
    },
    {
      id: 2,
      date: "Aug 12, 10:00 AM",
      title: "Session with Arun",
      amount: 50,
      status: "Completed",
      isPaid: true
    },
    {
      id: 3,
      date: "Aug 12, 10:00 AM",
      title: "Session with Arun",
      amount: 50,
      status: "Completed",
      isPaid: true
    }
  ];

  const pendingSessions = [
    {
      id: 4,
      date: "Aug 12, 10:00 AM",
      title: "Session with Arun",
      amount: 50,
      status: "Within 5 days",
      isPaid: false
    },
    {
      id: 5,
      date: "Aug 12, 10:00 AM",
      title: "Session with Arun",
      amount: 50,
      status: "Within 5 days",
      isPaid: false
    },
    {
      id: 6,
      date: "Aug 12, 10:00 AM",
      title: "Session with Arun",
      amount: 50,
      status: "Within 5 days",
      isPaid: false
    }
  ];

  const upcomingSessions = [
    {
      id: 7,
      date: "Aug 12, 10:00 AM",
      title: "Session with Arun starts in",
      amount: 50,
      countdown: "2d 4h 30m",
      isPaid: false,
      status: "Upcoming"
    },
    {
      id: 8,
      date: "Aug 12, 10:00 AM",
      title: "Session with Arun starts in",
      amount: 50,
      countdown: "2d 4h 30m",
      isPaid: false,
      status: "Upcoming"
    },
    {
      id: 9,
      date: "Aug 12, 10:00 AM",
      title: "Session with Arun starts in",
      amount: 50,
      countdown: "2d 4h 30m",
      isPaid: false,
      status: "Upcoming"
    }
  ];

  const getSessionsForTab = () => {
    switch (activeTab) {
      case 'paid':
        return paidSessions;
      case 'pending':
        return pendingSessions;
      case 'upcoming':
        return upcomingSessions;
      default:
        return [];
    }
  };

  const getBarColor = () => {
    switch (activeTab) {
      case 'paid':
        return 'bg-green-500';
      case 'pending':
        return 'bg-orange-500';
      case 'upcoming':
        return 'bg-red-500';
      default:
        return 'bg-orange-500';
    }
  };

  const getAmountColor = () => {
    switch (activeTab) {
      case 'paid':
        return 'text-green-600';
      case 'pending':
        return 'text-orange-500';
      case 'upcoming':
        return 'text-black';
      default:
        return 'text-orange-500';
    }
  };

  type PaidSession = {
    id: number;
    date: string;
    title: string;
    amount: number;
    status: string;
    isPaid: boolean;
  };
  type PendingSession = PaidSession;
  type UpcomingSession = PaidSession & { countdown: string };

  const renderSessionStatus = (session: PaidSession | PendingSession | UpcomingSession) => {
    if (activeTab === 'upcoming' && 'countdown' in session) {
      return (
        <div className="flex items-center text-gray-500 text-sm">
          <Clock className="w-4 h-4 mr-1" />
          <span>{session.countdown}</span>
        </div>
      );
    } else if (activeTab === 'pending') {
      return (
        <div className="flex items-center text-gray-500 text-sm">
          <Clock className="w-4 h-4 mr-1" />
          <span>{session.status}</span>
        </div>
      );
    } else {
      return <p className="text-gray-500 text-sm">{session.status}</p>;
    }
  };

  return (
    <div className="bg-[#f7f7f7] flex flex-row justify-center w-full">
      <div className="bg-[#2d3748] overflow-hidden w-[360px] min-h-screen">
        <div className="relative w-[360px] min-h-screen">
          {/* Dark Header Section */}
          <div className="bg-[#2d3748] text-white px-5 py-6">
            {/* Navigation Header */}
            <div className="flex items-center justify-between mb-8">
              <Button variant="ghost" size="sm" className="p-0 text-white hover:text-gray-300" onClick={() => navigate(-1)}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <Button className="bg-black text-white px-3 py-2 rounded border border-white flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <span className="text-sm">Support</span>
              </Button>
            </div>

            {/* Total Earnings */}
            <div className="text-center mb-6">
              <p className="text-gray-400 text-sm uppercase tracking-wide mb-2">YOUR TOTAL EARNINGS</p>
              <div className="flex items-baseline justify-center">
                <span className="text-orange-400 text-4xl font-bold">$</span>
                <span className="text-white text-4xl font-bold">{totalEarnings}</span>
              </div>
              <p className="text-gray-400 text-sm mt-2">
                Your earnings will be sent to your bank account within 7 days.
              </p>
            </div>
          </div>

          {/* Light Content Section */}
          <div className="bg-gray-100 flex-1 px-5 py-6">
            {/* Section Header */}
            <p className="text-gray-500 text-xs uppercase tracking-wide mb-4">// EARNINGS</p>

            {/* Tabs */}
            <div className="flex mb-6">
              <button
                onClick={() => setActiveTab('paid')}
                className={`flex-1 text-center py-2 font-medium text-sm ${
                  activeTab === 'paid' 
                    ? 'text-black border-b-2 border-black' 
                    : 'text-gray-500'
                }`}
              >
                PAID
              </button>
              <button
                onClick={() => setActiveTab('pending')}
                className={`flex-1 text-center py-2 font-medium text-sm ${
                  activeTab === 'pending' 
                    ? 'text-black border-b-2 border-black' 
                    : 'text-gray-500'
                }`}
              >
                PENDING
              </button>
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
            </div>

            {/* Sessions List */}
            <div className="space-y-3">
              {getSessionsForTab().map((session) => (
                <Card key={session.id} className="bg-white border border-gray-200 overflow-hidden">
                  <div className="flex">
                    {/* Colored Bar */}
                    <div className={`w-1 ${getBarColor()}`}></div>
                    
                    {/* Session Content */}
                    <CardContent className="p-4 flex-1">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="text-gray-500 text-sm mb-1">{session.date}</p>
                          <p className="text-black font-bold text-base mb-1">{session.title}</p>
                          {renderSessionStatus(session)}
                        </div>
                        
                        {/* Amount */}
                        <div className="text-right">
                          {activeTab === 'pending' ? (
                            <span className={`font-bold text-lg ${getAmountColor()}`}>+${session.amount}</span>
                          ) : (
                            <span className={`font-bold text-lg ${getAmountColor()}`}>${session.amount}</span>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {getSessionsForTab().length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">💰</span>
                </div>
                <h3 className="font-medium text-gray-900 text-base mb-2">No {activeTab} earnings</h3>
                <p className="text-gray-500 text-sm">
                  {activeTab === 'paid' && "You haven't received any payments yet."}
                  {activeTab === 'pending' && "You don't have any pending payments."}
                  {activeTab === 'upcoming' && "You don't have any upcoming sessions."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerEarnings; 