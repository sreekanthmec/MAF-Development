import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { ArrowLeft, Phone, MessageCircle, MapPin, Clock, User, Edit } from "lucide-react";

const TrainerSessionDetails = () => {
  const navigate = useNavigate();

  const sessionData = {
    date: "Jul 24, Thursday",
    time: "10:00 AM - 12:00 PM",
    duration: "120 mins Session",
    location: {
      type: "HOME",
      address: "Block 105, Lew Lian Vale Serangoon 537016",
      distance: "20 km Away"
    },
    countdown: "2d 4h 30m",
    student: {
      name: "Arun P",
      age: "22",
      gender: "Female",
      level: "BEGINNER",
      requirements: {
        gloves: "YES",
        gloveSize: "8",
        handWraps: "YES"
      }
    },
    notes: "Hi sir, I am looking to get back in shape. Haven't practised in a while. Would like to start slow."
  };

  return (
    <div className="bg-[#f7f7f7] flex flex-row justify-center w-full">
      <div className="bg-[#2d3748] overflow-hidden w-[360px] min-h-screen">
        <div className="relative w-[360px] min-h-screen">
          {/* Dark Header Section */}
          <div className="bg-[#2d3748] text-white px-5 py-6">
            {/* Navigation Header */}
            <div className="flex items-center justify-between mb-6">
              <Button variant="ghost" size="sm" className="p-0 text-white hover:text-gray-300" onClick={() => navigate(-1)}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <Button className="bg-black text-white px-3 py-2 rounded flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <span className="text-sm">Support</span>
              </Button>
            </div>

            {/* Session Date & Time */}
            <div className="mb-6">
              <h1 className="text-red-400 text-2xl font-bold mb-2">{sessionData.date}</h1>
              <p className="text-white text-lg mb-2">{sessionData.time}</p>
              <div className="flex items-center text-gray-400">
                <Clock className="w-4 h-4 mr-2" />
                <span className="text-sm">{sessionData.duration}</span>
              </div>
            </div>

            {/* Location */}
            <div className="mb-6">
              <h2 className="text-white font-medium text-base mb-2">{sessionData.location.type}</h2>
              <div className="flex items-start text-gray-400 mb-1">
                <MapPin className="w-4 h-4 mr-2 mt-0.5" />
                <span className="text-sm">{sessionData.location.address}</span>
              </div>
              <p className="text-gray-400 text-sm">{sessionData.location.distance}</p>
            </div>

            {/* Countdown */}
            <div className="bg-gray-700 border border-red-500 px-4 py-3 rounded flex items-center justify-between">
              <span className="text-white text-sm">Starts in</span>
              <span className="text-white text-sm font-medium">{sessionData.countdown}</span>
            </div>
          </div>

          {/* White Content Section */}
          <div className="bg-white flex-1 px-5 py-6">
            <div className="space-y-6">
              {/* Student Details */}
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wide mb-4">// STUDENT DETAILS</p>
                <Card className="bg-white border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-black rounded flex items-center justify-center mr-3">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-black font-medium text-base">{sessionData.student.name}</h3>
                          <p className="text-gray-500 text-sm">{sessionData.student.age}, {sessionData.student.gender}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-black font-medium text-sm">{sessionData.student.level}</span>
                      </div>
                    </div>

                    {/* Session Requirements */}
                    <div className="space-y-2 pt-3 border-t border-gray-100">
                      <div className="flex justify-between items-center">
                        <span className="text-black text-sm">Gloves</span>
                        <span className="text-black text-sm font-medium">{sessionData.student.requirements.gloves}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-black text-sm">Glove Size</span>
                        <span className="text-black text-sm font-medium">{sessionData.student.requirements.gloveSize}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-black text-sm">Hand Wraps</span>
                        <span className="text-black text-sm font-medium">{sessionData.student.requirements.handWraps}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button className="w-full bg-red-500 hover:bg-red-600 text-white p-4 rounded-lg flex items-center justify-between">
                  <span className="font-medium">MESSAGE STUDENT</span>
                  <MessageCircle className="w-5 h-5" />
                </Button>
                
                <Button variant="outline" className="w-full border border-gray-300 text-black p-4 rounded-lg flex items-center justify-between hover:bg-gray-50">
                  <span className="font-medium">CALL STUDENT</span>
                  <Phone className="w-5 h-5" />
                </Button>
              </div>

              {/* Notes Section */}
              <div>
                <div className="flex items-center mb-3">
                  <Edit className="w-4 h-4 text-gray-500 mr-2" />
                  <h3 className="text-black font-medium text-base">NOTES</h3>
                </div>
                <Card className="bg-white border border-gray-200">
                  <CardContent className="p-4">
                    <p className="text-black text-sm leading-relaxed">
                      {sessionData.notes}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Cancel Session */}
              <div className="pt-4">
                <Button variant="ghost" className="w-full text-red-500 hover:text-red-600 hover:bg-red-50 p-4 flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-red-500 rounded flex items-center justify-center mr-2">
                    <span className="text-red-500 text-xs font-bold">×</span>
                  </div>
                  <span className="font-medium">CANCEL SESSION</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerSessionDetails; 