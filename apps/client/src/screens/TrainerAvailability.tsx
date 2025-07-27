import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { ArrowLeft, ChevronLeft, ChevronRight, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TrainerAvailability = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState('15');
  const [currentMonth, setCurrentMonth] = useState('August 2024');
  const timeSlots = [
    "9:00 am",
    "10:30 am", 
    "12:00 pm"
  ];
  const calendarDays = [
    { date: 1, day: 'T', isSelected: false },
    { date: 2, day: 'F', isSelected: false },
    { date: 3, day: 'S', isSelected: false },
    { date: 4, day: 'S', isSelected: false },
    { date: 5, day: 'M', isSelected: false },
    { date: 6, day: 'T', isSelected: false },
    { date: 7, day: 'W', isSelected: false },
    { date: 8, day: 'T', isSelected: false },
    { date: 9, day: 'F', isSelected: false },
    { date: 10, day: 'S', isSelected: false },
    { date: 11, day: 'S', isSelected: false },
    { date: 12, day: 'M', isSelected: true },
    { date: 13, day: 'T', isSelected: false },
    { date: 14, day: 'W', isSelected: false },
    { date: 15, day: 'T', isSelected: false },
    { date: 16, day: 'F', isSelected: false },
    { date: 17, day: 'S', isSelected: false },
    { date: 18, day: 'S', isSelected: false },
    { date: 19, day: 'M', isSelected: false },
    { date: 20, day: 'T', isSelected: false },
    { date: 21, day: 'W', isSelected: false },
    { date: 22, day: 'T', isSelected: false },
    { date: 23, day: 'F', isSelected: false },
    { date: 24, day: 'S', isSelected: false },
    { date: 25, day: 'S', isSelected: false },
    { date: 26, day: 'M', isSelected: false },
    { date: 27, day: 'T', isSelected: false },
    { date: 28, day: 'W', isSelected: false },
    { date: 29, day: 'T', isSelected: false },
    { date: 30, day: 'F', isSelected: false },
    { date: 31, day: 'S', isSelected: false },
  ];
  const handleDateClick = (date: number) => {
    setSelectedDate(date.toString());
  };
  const handleMonthNavigation = (direction: 'prev' | 'next') => {
    // This would update the month and calendar data
    console.log('Navigate month:', direction);
  };
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
            <h1 className="text-black text-2xl font-bold mb-6">Availability</h1>
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-4">
              <Button variant="ghost" size="sm" className="p-2" onClick={() => handleMonthNavigation('prev')}>
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <h2 className="text-black font-bold text-lg">{currentMonth}</h2>
              <Button variant="ghost" size="sm" className="p-2" onClick={() => handleMonthNavigation('next')}>
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
            {/* Days of Week */}
            <div className="grid grid-cols-7 gap-1 mb-4">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                <div key={index} className="text-center text-gray-500 text-sm font-medium py-2">
                  {day}
                </div>
              ))}
            </div>
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 mb-6">
              {calendarDays.map((day, index) => (
                <button
                  key={index}
                  onClick={() => handleDateClick(day.date)}
                  className={`p-2 text-center rounded ${
                    day.isSelected 
                      ? 'border-2 border-red-500 text-red-500 font-medium' 
                      : 'text-black hover:bg-gray-100'
                  }`}
                >
                  {day.date}
                </button>
              ))}
            </div>
            {/* Duration */}
            <div className="text-center mb-6">
              <p className="text-gray-500 text-sm">Duration: 90 Minutes</p>
            </div>
            {/* Time Slots */}
            <div className="space-y-3 mb-8">
              {timeSlots.map((time, index) => (
                <Card key={index} className="bg-white border border-gray-200">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <span className="text-black font-bold text-base">{time}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          {/* Bottom Action Button */}
          <div className="bg-white px-5 py-6 border-t border-gray-200">
            <Button className="w-full bg-red-500 hover:bg-red-600 text-white p-4 rounded-lg flex items-center justify-center" onClick={() => navigate('/trainer/edit-availability')}>
              <Edit className="w-5 h-5 mr-2" />
              <span className="font-medium">EDIT AVAILABILITY</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerAvailability; 