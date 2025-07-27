import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import BackIcon from "../components/BackIcon";

const SetLocation = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState(null);

  const handleMapClick = (event) => {
    setLocation({ lat: event.latLng.lat(), lng: event.latLng.lng() });
  };

  const handleAddAddress = () => {
    if (location) {
      navigate("/add-address", { state: { location } });
    }
  };

  const containerStyle = {
    width: "100%",
    height: "300px", // Adjusted height for better design alignment
    borderRadius: "10px", // Add border-radius if required by design
  };

  const center = {
    lat: 1.3521,
    lng: 103.8198,
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="flex justify-between items-center mb-4">
        <BackIcon />
      </header>

      <section className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Select Location
        </h1>

        <input
          type="text"
          placeholder="Enter Pincode, City or Location"
          className="w-full mb-4 p-3 border rounded-md"
        />

        <LoadScript googleMapsApiKey="AIzaSyAFXJBWYMrdkPAeHtnZ-7ipvHWjk2I_NEg">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
            onClick={handleMapClick}
          >
            {location && (
              <Marker
                position={location}
                icon={{
                  url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png", // Custom marker icon URL
                  scaledSize: new window.google.maps.Size(40, 40), // Adjust the size as needed
                }}
              />
            )}
          </GoogleMap>
        </LoadScript>

        <button
          className="mt-4 text-red-600 flex items-center justify-center"
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
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            ></path>
          </svg>
          SET MY CURRENT LOCATION
        </button>
      </section>

      <footer className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
        <button
          onClick={handleAddAddress}
          className="w-full bg-red-600 text-white font-bold py-3 px-4 rounded-md flex items-center justify-center focus:outline-none"
          disabled={!location}
        >
          ADD ADDRESS
          <svg
            className="w-5 h-5 ml-2 -mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </button>
      </footer>
    </div>
  );
};

export default SetLocation;
