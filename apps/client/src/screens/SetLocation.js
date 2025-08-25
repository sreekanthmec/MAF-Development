import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import { PrimaryButton } from "../components/Button";

const SetLocation = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState(null);

  const handleMapClick = (event) => {
    setLocation({ lat: event.latLng.lat(), lng: event.latLng.lng() });
  };

  const handleAddAddress = () => {
    if (location) {
      navigate("/student/add-address", { state: { location } });
    }
  };

  const containerStyle = {
    width: "100%",
    height: "400px", // Increased height to match design
    borderRadius: "12px", // Rounded corners to match design
  };

  const center = {
    lat: 1.3521,
    lng: 103.8198,
  };

  return (
    <div className="h-[100dvh] w-full bg-[#F7F7F7] overflow-y-auto" style={{ WebkitOverflowScrolling: "touch" }}>
      
      <div className="mx-auto max-w-[400px] min-h-full flex flex-col">
        {/* NAVBAR */}
        <Navbar
          onBack={() => navigate(-1)}
          background="transparent"
          spacerHeight={40}
        />

        {/* CONTENT */}
        <main className="flex-1 bg-transparent px-5">
          <div className="pt-4">
            {/* TITLE */}
            <PageTitle>Select Location</PageTitle>

            {/* SEARCH INPUT */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="Enter Pincode, City or Location"
                className="w-full p-4 border border-[#E7E7E7] rounded-lg bg-white text-gray-800 placeholder-gray-500"
              />
            </div>

            {/* MAP */}
            <div className="mb-6">
              <LoadScript googleMapsApiKey="AIzaSyAFXJBWYMrdkPAeHtnZ-7ipvHWjk2I_NEg">
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={center}
                  zoom={12}
                  onClick={handleMapClick}
                  options={{
                    styles: [
                      {
                        featureType: "all",
                        elementType: "geometry",
                        stylers: [{ color: "#f5f5f5" }]
                      },
                      {
                        featureType: "road",
                        elementType: "geometry",
                        stylers: [{ color: "#f4d03f" }]
                      },
                      {
                        featureType: "water",
                        elementType: "geometry",
                        stylers: [{ color: "#3498db" }]
                      }
                    ]
                  }}
                >
                  {location && (
                    <Marker
                      position={location}
                      icon={{
                        url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="2" y="2" width="20" height="20" fill="#EB2726" stroke="#EB2726" stroke-width="2"/>
                          </svg>
                        `),
                        scaledSize: new window.google.maps.Size(24, 24),
                        anchor: new window.google.maps.Point(12, 12)
                      }}
                    />
                  )}
                </GoogleMap>
              </LoadScript>
            </div>

            {/* SET CURRENT LOCATION BUTTON */}
            <div className="mb-8">
              <button
                className="w-full flex items-center justify-center text-[#EB2726] font-bold py-3"
                onClick={() => {
                  navigator.geolocation.getCurrentPosition((position) => {
                    setLocation({
                      lat: position.coords.latitude,
                      lng: position.coords.longitude,
                    });
                  });
                }}
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                SET MY CURRENT LOCATION
              </button>
            </div>

            {/* ADD ADDRESS BUTTON */}
            <div className="pb-[max(16px,env(safe-area-inset-bottom))]">
              <PrimaryButton
                label="ADD ADDRESS"
                onClick={handleAddAddress}
                disabled={!location}
                className="!w-full"
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SetLocation;
