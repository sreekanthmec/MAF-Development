import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { ArrowLeft, ArrowRight, X, Plus, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TrainerEditAvailability = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'session' | 'preview'>('session');
  const [selectedDate, setSelectedDate] = useState('15');
  const [currentMonth, setCurrentMonth] = useState('August 2022');
  const [availability, setAvailability] = useState([
    { day: "Sunday", isAvailable: true, timeSlots: [{ start: "9:00am", end: "5:00pm" }] },
    { day: "Monday", isAvailable: false, timeSlots: [] },
    { day: "Tuesday", isAvailable: false, timeSlots: [] },
    { day: "Wednesday", isAvailable: false, timeSlots: [] },
    { day: "Thursday", isAvailable: false, timeSlots: [] },
    { day: "Friday", isAvailable: false, timeSlots: [] },
    { day: "Saturday", isAvailable: false, timeSlots: [] },
  ]);
  const sessionLimits = {
    advanceBooking: "Book before 3 hrs",
    coolOffTime: "3 hrs Rest",
    dailyLimit: "6 per day"
  };
  const calendarDays = [
    { date: 1, day: 'M', isSelected: false },
    { date: 2, day: 'T', isSelected: false },
    { date: 3, day: 'W', isSelected: false },
    { date: 4, day: 'T', isSelected: false },
    { date: 5, day: 'F', isSelected: false },
    { date: 6, day: 'S', isSelected: false },
    { date: 7, day: 'S', isSelected: false },
    { date: 8, day: 'M', isSelected: false },
    { date: 9, day: 'T', isSelected: false },
    { date: 10, day: 'W', isSelected: false },
    { date: 11, day: 'T', isSelected: false },
    { date: 12, day: 'F', isSelected: true },
    { date: 13, day: 'S', isSelected: false },
    { date: 14, day: 'S', isSelected: false },
    { date: 15, day: 'M', isSelected: true },
    { date: 16, day: 'T', isSelected: true },
    { date: 17, day: 'W', isSelected: true },
    { date: 18, day: 'T', isSelected: true },
    { date: 19, day: 'F', isSelected: true },
    { date: 20, day: 'S', isSelected: false },
    { date: 21, day: 'S', isSelected: false },
    { date: 22, day: 'M', isSelected: true },
    { date: 23, day: 'T', isSelected: true },
    { date: 24, day: 'W', isSelected: true },
    { date: 25, day: 'T', isSelected: true },
    { date: 26, day: 'F', isSelected: true },
    { date: 27, day: 'S', isSelected: false },
    { date: 28, day: 'S', isSelected: false },
    { date: 29, day: 'M', isSelected: false },
    { date: 30, day: 'T', isSelected: false },
    { date: 31, day: 'W', isSelected: false },
  ];
  const timeSlots = [
    "9:00 am",
    "10:30 am", 
    "12:00 pm"
  ];
  const handleDayToggle = (dayIndex: number) => {
    const updatedAvailability = [...availability];
    updatedAvailability[dayIndex].isAvailable = !updatedAvailability[dayIndex].isAvailable;
    if (updatedAvailability[dayIndex].isAvailable && updatedAvailability[dayIndex].timeSlots.length === 0) {
      updatedAvailability[dayIndex].timeSlots = [{ start: "9:00am", end: "5:00pm" }];
    }
    setAvailability(updatedAvailability);
  };
  const handleTimeChange = (dayIndex: number, slotIndex: number, field: 'start' | 'end', value: string) => {
    const updatedAvailability = [...availability];
    updatedAvailability[dayIndex].timeSlots[slotIndex][field] = value;
    setAvailability(updatedAvailability);
  };
  const addTimeSlot = (dayIndex: number) => {
    const updatedAvailability = [...availability];
    updatedAvailability[dayIndex].timeSlots.push({ start: "9:00am", end: "5:00pm" });
    setAvailability(updatedAvailability);
  };
  const removeTimeSlot = (dayIndex: number, slotIndex: number) => {
    const updatedAvailability = [...availability];
    updatedAvailability[dayIndex].timeSlots.splice(slotIndex, 1);
    setAvailability(updatedAvailability);
  };
  const toggleDateSelection = (date: number) => {
    // This would update the calendar selection
    console.log('Toggle date:', date);
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
            <h1 className="text-black text-2xl font-bold mb-4">Edit Availability</h1>
            {/* Navigation Tabs */}
            <div className="flex mb-6">
              <button
                onClick={() => setActiveTab('session')}
                className={`flex-1 text-center py-2 font-medium text-sm ${
                  activeTab === 'session' 
                    ? 'text-black border-b-2 border-black' 
                    : 'text-gray-500'
                }`}
              >
                SESSION & AVAILABILITY
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className={`flex-1 text-center py-2 font-medium text-sm ${
                  activeTab === 'preview' 
                    ? 'text-black border-b-2 border-black' 
                    : 'text-gray-500'
                }`}
              >
                PREVIEW
              </button>
            </div>
            {/* Understanding Statement */}
            <div className="flex items-start mb-6">
              <div className="w-5 h-5 border-2 border-gray-300 rounded mr-3 mt-0.5"></div>
              <p className="text-black text-sm leading-relaxed">
                By setting my availability, I understand that the system will automatically accept bookings for any available timeslots.
              </p>
            </div>
          </div>
          {/* Content */}
          <div className="bg-gray-100 flex-1 px-5 py-6">
            {activeTab === 'session' ? (
              <div className="space-y-6">
                {/* Session Limits */}
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wide mb-4">// SESSION LIMITS</p>
                  <div className="space-y-4">
                    <Card className="bg-white border border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <span className="text-black font-medium">Advance Booking</span>
                          <span className="text-red-500 font-medium">{sessionLimits.advanceBooking}</span>
                        </div>
                        <p className="text-gray-500 text-sm mt-2">
                          Set the minimum hours required before a session can be booked.
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="bg-white border border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <span className="text-black font-medium">Session Cool-off Time</span>
                          <span className="text-red-500 font-medium">{sessionLimits.coolOffTime}</span>
                        </div>
                        <p className="text-gray-500 text-sm mt-2">
                          Set the required break time between consecutive sessions.
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="bg-white border border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <span className="text-black font-medium">Daily Session Limit</span>
                          <span className="text-red-500 font-medium">{sessionLimits.dailyLimit}</span>
                        </div>
                        <p className="text-gray-500 text-sm mt-2">
                          Limit the total number of sessions you can take in a day.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                {/* Availability */}
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wide mb-4">// AVAILABILITY</p>
                  <div className="space-y-3">
                    {availability.map((day, dayIndex) => (
                      <Card key={day.day} className="bg-white border border-gray-200">
                        <CardContent className="p-4">
                          <div className="flex items-center mb-3">
                            <button
                              onClick={() => handleDayToggle(dayIndex)}
                              className={`w-5 h-5 rounded mr-3 flex items-center justify-center ${
                                day.isAvailable ? 'bg-red-500' : 'border-2 border-gray-300'
                              }`}
                            >
                              {day.isAvailable && <Check className="w-3 h-3 text-white" />}
                            </button>
                            <span className="text-black font-bold text-base">{day.day}</span>
                          </div>
                          {day.isAvailable ? (
                            <div className="space-y-3">
                              {day.timeSlots.map((slot, slotIndex) => (
                                <div key={slotIndex} className="flex items-center space-x-2">
                                  <Input
                                    type="text"
                                    value={slot.start}
                                    onChange={(e) => handleTimeChange(dayIndex, slotIndex, 'start', e.target.value)}
                                    className="flex-1 text-center"
                                  />
                                  <span className="text-gray-500">to</span>
                                  <Input
                                    type="text"
                                    value={slot.end}
                                    onChange={(e) => handleTimeChange(dayIndex, slotIndex, 'end', e.target.value)}
                                    className="flex-1 text-center"
                                  />
                                  {day.timeSlots.length > 1 && (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => removeTimeSlot(dayIndex, slotIndex)}
                                      className="p-1 text-gray-500 hover:text-red-500"
                                    >
                                      <X className="w-4 h-4" />
                                    </Button>
                                  )}
                                </div>
                              ))}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => addTimeSlot(dayIndex)}
                                className="p-2 text-gray-500 hover:text-red-500"
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>
                          ) : (
                            <p className="text-gray-500 text-sm ml-8">Unavailable</p>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  {/* Date Specific Hours */}
                  <div className="mt-4">
                    <Button variant="ghost" className="p-0 text-red-500 hover:text-red-600">
                      <Plus className="w-4 h-4 mr-2" />
                      <span className="font-medium uppercase text-sm">DATE SPECIFIC HOURS</span>
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              /* PREVIEW TAB - Calendar View */
              <div className="space-y-6">
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wide mb-4">// AVAILABILITY</p>
                  {/* Month Navigation */}
                  <div className="flex items-center justify-between mb-4">
                    <Button variant="ghost" size="sm" className="p-2">
                      <ChevronLeft className="w-5 h-5" />
                    </Button>
                    <h2 className="text-black font-bold text-lg">{currentMonth}</h2>
                    <Button variant="ghost" size="sm" className="p-2">
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  </div>
                  {/* Days of Week */}
                  <div className="grid grid-cols-7 gap-1 mb-4">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                      <div key={index} className="text-center text-gray-600 text-sm font-medium py-2">
                        {day}
                      </div>
                    ))}
                  </div>
                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-1">
                    {calendarDays.map((day, index) => (
                      <button
                        key={index}
                        onClick={() => toggleDateSelection(day.date)}
                        className={`p-2 text-center rounded ${
                          day.isSelected 
                            ? 'border-2 border-red-500 text-red-500 font-medium' 
                            : 'text-black'
                        }`}
                      >
                        {day.date}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Date Specific View */}
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wide mb-4">// DATE SPECIFIC</p>
                  {/* Date Navigator */}
                  <div className="flex items-center justify-between mb-4">
                    <Button variant="ghost" size="sm" className="p-2">
                      <ChevronLeft className="w-5 h-5" />
                    </Button>
                    <h3 className="text-black font-bold text-base">{selectedDate} August 2022</h3>
                    <Button variant="ghost" size="sm" className="p-2">
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  </div>
                  {/* Duration */}
                  <p className="text-gray-500 text-sm mb-4">Duration: 90 Minutes</p>
                  {/* Time Slots */}
                  <div className="space-y-3">
                    {timeSlots.map((time, index) => (
                      <Card key={index} className="bg-white border border-gray-200">
                        <CardContent className="p-4">
                          <div className="text-center">
                            <span className="text-black font-medium">{time}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Bottom Action Buttons */}
          <div className="bg-white px-5 py-6 border-t border-gray-200">
            <div className="flex space-x-3">
              <Button variant="outline" className="flex-1 border border-gray-300 text-gray-600 p-4">
                <X className="w-5 h-5" />
              </Button>
              <Button className="flex-1 bg-red-500 hover:bg-red-600 text-white p-4 flex items-center justify-between">
                <span className="font-medium uppercase text-sm">SAVE AND EXIT</span>
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerEditAvailability; 