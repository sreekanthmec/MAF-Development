import React from "react";
import { Button } from "./ui/button";
import { PrimaryButton, SecondaryButton } from "./Button";
import { MapPin, User, Edit, X, Clock } from "lucide-react";

const SessionPopup = ({ 
  currentSession, 
  currentSessionIndex, 
  pendingSessions, 
  onAcknowledge, 
  onCancel, 
  onClose, 
  onNext, 
  onPrevious 
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="relative w-[320px] max-h-[80vh] bg-white rounded-lg shadow-2xl overflow-hidden">
        {/* Header */}
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
            onClick={onClose}
            className="text-white hover:text-gray-300 hover:bg-gray-600 p-1"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Scrollable Content */}
        <div className="max-h-96 overflow-y-auto">
          {/* Date and Time Section */}
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

          {/* Student Details Section */}
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

          {/* Notes Section */}
          <div className="bg-gray-50 px-4 py-3">
            <div className="flex items-center mb-2">
              <Edit className="w-4 h-4 text-gray-500 mr-2" />
              <span className="text-gray-500 text-xs uppercase tracking-wide">NOTES</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              {currentSession.notes}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 space-y-3">
          <PrimaryButton
            onClick={() => onAcknowledge(currentSession.id)}
            label="ACKNOWLEDGE"
            className="w-full bg-green-600 hover:bg-green-700"
          />
          <SecondaryButton
            onClick={() => onCancel(currentSession.id)}
            label="CANCEL SESSION"
            icon={X}
            className="w-full"
          />
        </div>

        {/* Navigation Footer */}
        <div className="bg-gray-50 p-4 flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onPrevious}
            disabled={currentSessionIndex === 0}
            className="text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
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
            onClick={onNext}
            disabled={currentSessionIndex === pendingSessions.length - 1}
            className="text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SessionPopup;
