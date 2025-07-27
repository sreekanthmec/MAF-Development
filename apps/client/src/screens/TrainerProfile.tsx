import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { ArrowLeft, ArrowRight, Zap, Edit, Play } from "lucide-react";

const TrainerProfile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'about' | 'settings'>('about');

  const profileData = {
    name: "HELENA PADILLA",
    totalSessions: 22,
    creditsPerHour: 2,
    profileImage: "",
    age: 20,
    gender: "Male",
  };

  const settingsOptions = [
    { id: 'earnings', label: 'EARNINGS', icon: <ArrowRight className="w-4 h-4 text-gray-400" /> },
    { id: 'payment', label: 'PAYMENT METHOD INFO', icon: <ArrowRight className="w-4 h-4 text-gray-400" /> },
    { id: 'availability', label: 'AVAILABILITY', icon: <ArrowRight className="w-4 h-4 text-gray-400" /> },
    { id: 'logout', label: 'LOGOUT', icon: <ArrowRight className="w-4 h-4 text-gray-400" /> }
  ];

  const handleSettingClick = (settingId: string) => {
    switch (settingId) {
      case 'logout':
        localStorage.clear();
        navigate("/");
        break;
      case 'earnings':
        navigate('/trainer/earnings');
        break;
      case 'payment':
        navigate('/trainer/payment-info');
        break;
      case 'availability':
        navigate('/trainer/availability');
        break;
      default:
        break;
    }
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
            </div>

            {/* Profile Information */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h1 className="text-red-400 text-2xl font-bold mb-3">{profileData.name}</h1>
                <div className="text-white text-sm mb-2">
                  {profileData.totalSessions} total sessions
                </div>
                <div className="flex items-center text-white text-sm">
                  <Zap className="w-4 h-4 text-yellow-400 mr-2" />
                  {profileData.creditsPerHour} credits per hour
                </div>
              </div>
              {/* Profile Image/Initials */}
              <div className="w-20 h-20 bg-gray-600 rounded-full flex items-center justify-center ml-4">
                <div className="w-16 h-16 bg-gray-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-lg font-bold">
                    {profileData.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              </div>
            </div>

            {/* Edit Profile Button */}
            <Button className="w-full bg-red-500 hover:bg-red-600 text-white p-4 rounded-lg flex items-center justify-between" onClick={() => navigate("/trainer/edit-profile") }>
              <div className="flex items-center">
                <Edit className="w-4 h-4 mr-2" />
                <span className="font-medium">EDIT PROFILE</span>
              </div>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Light Content Section */}
          <div className="bg-gray-100 flex-1 px-5 py-6">
            {/* Tabs */}
            <div className="flex mb-6">
              <button
                onClick={() => setActiveTab('about')}
                className={`flex-1 text-center py-2 font-medium text-sm ${
                  activeTab === 'about' 
                    ? 'text-black border-b-2 border-black' 
                    : 'text-gray-500'
                }`}
              >
                ABOUT
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`flex-1 text-center py-2 font-medium text-sm ${
                  activeTab === 'settings' 
                    ? 'text-black border-b-2 border-black' 
                    : 'text-gray-500'
                }`}
              >
                SETTINGS
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'settings' && (
              <div className="space-y-3">
                {settingsOptions.map((option) => (
                  <Button
                    key={option.id}
                    variant="outline"
                    className="w-full bg-white border border-gray-300 text-black p-4 rounded-lg flex items-center justify-between hover:bg-gray-50"
                    onClick={() => handleSettingClick(option.id)}
                  >
                    <span className="font-medium text-sm">{option.label}</span>
                    {option.icon}
                  </Button>
                ))}
              </div>
            )}

            {activeTab === 'about' && (
              <div className="space-y-6">
                {/* About Text */}
                <div className="bg-black text-gray-300 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    A countdown timer picker in iOS style. This picker shows a countdown duration with hour, minute and second spinners. The duration is bound between 0 and 23.
                  </p>
                </div>

                {/* Age and Gender Cards */}
                <div className="grid grid-cols-2 gap-3">
                  <Card className="bg-white border border-gray-200">
                    <CardContent className="p-4 text-center">
                      <p className="text-gray-500 text-sm mb-1">Age</p>
                      <p className="text-black font-bold text-base">{profileData.age} years</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-white border border-gray-200">
                    <CardContent className="p-4 text-center">
                      <p className="text-gray-500 text-sm mb-1">Gender</p>
                      <p className="text-black font-bold text-base">{profileData.gender}</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Media Content */}
                <div className="space-y-4">
                  {/* Fight Stats Video */}
                  <Card className="bg-white border border-gray-200 overflow-hidden">
                    <div className="relative">
                      <div className="bg-gradient-to-br from-red-600 to-red-800 p-4">
                        <div className="text-center text-white mb-3">
                          <h3 className="font-bold text-lg">FIGHT STATS</h3>
                        </div>
                        <div className="flex justify-between items-center text-white text-sm">
                          <div className="text-center">
                            <p className="font-bold">HELENA PADILLA</p>
                            <p>30 AGE 23</p>
                            <p>5'4" HEIGHT 5'4"</p>
                            <p>115LB 117LB</p>
                          </div>
                          <div className="text-center">
                            <p className="font-bold">CHRISTA ARROYO</p>
                          </div>
                        </div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                          <Play className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-3">
                      <div className="text-center text-xs text-gray-600">
                        <p>LAS VEGAS FROM GILROY</p>
                        <p>@HELENAPADILLA @CHRISTA_MARIE</p>
                        <p>SANTA MONICA, CA</p>
                        <div className="flex justify-center space-x-2 mt-1">
                          <span className="bg-gray-200 px-2 py-1 rounded">RF2</span>
                          <span className="bg-gray-200 px-2 py-1 rounded">FIT</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Woman Flexing Image */}
                  <Card className="bg-white border border-gray-200 overflow-hidden">
                    <div className="bg-pink-400 h-48 flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full mx-auto mb-2 flex items-center justify-center">
                          <span className="text-2xl">💪</span>
                        </div>
                        <p className="text-sm">Woman Flexing</p>
                        <p className="text-xs opacity-75">Reebok & Nike Pro</p>
                      </div>
                    </div>
                  </Card>

                  {/* High Kick Image */}
                  <Card className="bg-white border border-gray-200 overflow-hidden">
                    <div className="bg-gray-400 h-48 flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full mx-auto mb-2 flex items-center justify-center">
                          <span className="text-2xl">🥋</span>
                        </div>
                        <p className="text-sm">High Kick Training</p>
                        <p className="text-xs opacity-75">Combat Stance</p>
                      </div>
                    </div>
                  </Card>

                  {/* Training Session Video */}
                  <Card className="bg-white border border-gray-200 overflow-hidden">
                    <div className="relative">
                      <div className="bg-gray-600 h-48 flex items-center justify-center">
                        <div className="text-center text-white">
                          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full mx-auto mb-2 flex items-center justify-center">
                            <span className="text-2xl">🏋️</span>
                          </div>
                          <p className="text-sm">Training Session</p>
                          <p className="text-xs opacity-75">Pad Work</p>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                            <Play className="w-6 h-6 text-white" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Combat Stance Image */}
                  <Card className="bg-white border border-gray-200 overflow-hidden">
                    <div className="bg-gray-400 h-48 flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full mx-auto mb-2 flex items-center justify-center">
                          <span className="text-2xl">🥊</span>
                        </div>
                        <p className="text-sm">Combat Stance</p>
                        <p className="text-xs opacity-75">Ready Position</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerProfile; 