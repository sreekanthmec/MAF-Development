import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { ArrowLeft, Upload, Play, X } from "lucide-react";

const TrainerEditProfile = () => {
  const navigate = useNavigate();
  const [gender, setGender] = useState<'M' | 'F'>('M');
  const [profileData, setProfileData] = useState({
    loginId: "kjadbkbadfjaedbk13rbr",
    creditsPerHour: "4",
    name: "Helena Padilla",
    about: "Countdown timer picker in iOS style with duration bounds. This component allows users to select a duration with minimum and maximum bounds, similar to iOS native time picker.",
    age: "20"
  });

  const [trainingVideos, setTrainingVideos] = useState([
    {
      id: 1,
      type: 'video',
      thumbnail: '',
      title: 'HELENA PADILLA vs CHRISTA ARROYO',
      stats: { age: '25', height: '5\'6"', weight: '135lbs' }
    }
  ]);

  const [trainingImages, setTrainingImages] = useState([
    {
      id: 1,
      type: 'image',
      thumbnail: '',
      title: 'Biceps Flex'
    },
    {
      id: 2,
      type: 'image',
      thumbnail: '',
      title: 'High Kick Pose'
    },
    {
      id: 3,
      type: 'video',
      thumbnail: '',
      title: 'Pad Training'
    },
    {
      id: 4,
      type: 'image',
      thumbnail: '',
      title: 'Martial Arts Stance'
    }
  ]);

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDeleteMedia = (type: 'video' | 'image', id: number) => {
    if (type === 'video') {
      setTrainingVideos(prev => prev.filter(item => item.id !== id));
    } else {
      setTrainingImages(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleSave = () => {
    // Save profile data
    console.log('Saving profile:', profileData);
    navigate("/trainer/profile");
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

            {/* Profile Header */}
            <div className="text-center mb-4">
              <h1 className="text-red-400 text-2xl font-bold mb-2">{profileData.name}</h1>
              <p className="text-gray-400 text-sm">CHANGE PROFILE PIC</p>
            </div>

            {/* Profile Image */}
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 bg-gray-600 rounded-full flex items-center justify-center relative">
                <div className="w-20 h-20 bg-gray-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl font-bold">
                    {profileData.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* White Content Section */}
          <div className="bg-white flex-1 px-5 py-6">
            <div className="space-y-6">
              {/* Section Header */}
              <p className="text-gray-500 text-xs uppercase tracking-wide">// EDIT PROFILE</p>

              {/* Login ID */}
              <div>
                <label className="block text-black font-bold text-sm mb-2">YOUR LOGIN ID</label>
                <Input
                  value={profileData.loginId}
                  onChange={(e) => handleInputChange('loginId', e.target.value)}
                  className="bg-white border border-gray-300 rounded-none p-3 text-black"
                  placeholder="kjadbkbadfjaedbk13rbr"
                />
              </div>

              {/* Credits Per Hour */}
              <div>
                <label className="block text-black font-bold text-sm mb-2">CREDITS PER HOUR</label>
                <Input
                  value={profileData.creditsPerHour}
                  onChange={(e) => handleInputChange('creditsPerHour', e.target.value)}
                  className="bg-white border border-gray-300 rounded-none p-3 text-black"
                  placeholder="4"
                />
                <p className="text-gray-500 text-xs mt-1">Credits per hour can be changed by admin only</p>
              </div>

              {/* Name */}
              <div>
                <label className="block text-black font-bold text-sm mb-2">YOUR NAME</label>
                <Input
                  value={profileData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="bg-white border border-gray-300 rounded-none p-3 text-black"
                  placeholder="Helena Padilla"
                />
              </div>

              {/* About */}
              <div>
                <label className="block text-black font-bold text-sm mb-2">ABOUT YOU</label>
                <Textarea
                  value={profileData.about}
                  onChange={(e) => handleInputChange('about', e.target.value)}
                  className="bg-white border border-gray-300 rounded-none p-3 text-black min-h-[100px]"
                  placeholder="Tell us about yourself..."
                />
              </div>

              {/* Age and Gender */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-black font-bold text-sm mb-2">HOW OLD ARE YOU?</label>
                  <Input
                    value={profileData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    className="bg-white border border-gray-300 rounded-none p-3 text-black"
                    placeholder="20"
                  />
                </div>
                <div>
                  <label className="block text-black font-bold text-sm mb-2">YOUR GENDER</label>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant={gender === 'M' ? 'default' : 'outline'}
                      className={`flex-1 border-2 rounded-none ${
                        gender === 'M' 
                          ? 'bg-red-500 border-red-500 text-white' 
                          : 'bg-white border-gray-300 text-black'
                      }`}
                      onClick={() => setGender('M')}
                    >
                      M
                    </Button>
                    <Button
                      type="button"
                      variant={gender === 'F' ? 'default' : 'outline'}
                      className={`flex-1 border-2 rounded-none ${
                        gender === 'F' 
                          ? 'bg-red-500 border-red-500 text-white' 
                          : 'bg-white border-gray-300 text-black'
                      }`}
                      onClick={() => setGender('F')}
                    >
                      F
                    </Button>
                  </div>
                </div>
              </div>

              {/* Training Videos */}
              <div>
                <label className="block text-black font-bold text-sm mb-2">UPLOAD YOUR TRAINING VIDEOS</label>
                <div className="relative">
                  <Input
                    className="bg-white border border-gray-300 rounded-none p-3 text-black pr-12"
                    placeholder="Upload File"
                  />
                  <Upload className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
                {/* Video Thumbnails */}
                <div className="mt-4 space-y-3">
                  {trainingVideos.map((video) => (
                    <div key={video.id} className="relative bg-gray-100 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-black text-sm">{video.title}</h4>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-red-500 hover:text-red-600 p-1"
                          onClick={() => handleDeleteMedia('video', video.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="bg-gray-200 h-24 rounded flex items-center justify-center relative">
                        <Play className="w-8 h-8 text-red-500" />
                        <div className="absolute bottom-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs">
                          DELETE
                        </div>
                      </div>
                      <div className="mt-2 text-center">
                        <div className="text-black font-bold text-sm">FIGHT STATS</div>
                        <div className="text-gray-600 text-xs">
                          Age: {video.stats.age} | Height: {video.stats.height} | Weight: {video.stats.weight}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Training Images */}
              <div>
                <label className="block text-black font-bold text-sm mb-2">UPLOAD YOUR TRAINING IMAGES</label>
                <div className="relative">
                  <Input
                    className="bg-white border border-gray-300 rounded-none p-3 text-black pr-12"
                    placeholder="Upload File"
                  />
                  <Upload className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
                {/* Image Thumbnails */}
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {trainingImages.map((image) => (
                    <div key={image.id} className="relative bg-gray-100 rounded-lg p-2">
                      <div className="bg-gray-200 h-20 rounded flex items-center justify-center relative">
                        {image.type === 'video' && (
                          <Play className="w-6 h-6 text-red-500 absolute" />
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          className="absolute top-1 right-1 text-red-500 hover:text-red-600 p-1 bg-white rounded-full"
                          onClick={() => handleDeleteMedia('image', image.id)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-red-500 text-white px-1 py-0.5 rounded text-xs">
                        DELETE
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Save Button */}
              <div className="pt-6">
                <Button className="w-full bg-red-500 hover:bg-red-600 text-white p-4 rounded-lg font-medium" onClick={handleSave}>
                  SAVE CHANGES
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerEditProfile; 