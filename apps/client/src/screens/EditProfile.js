import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackIcon from "../components/BackIcon";
import { TextInput, SingleInput } from "../components/InputComponents";

const EditProfileScreen = () => {
  const [experience, setExperience] = useState("Beginner");
  const [age, setAge] = useState(20);
  const [gender, setGender] = useState("M");
  const [hasGloves, setHasGloves] = useState(true);
  const [gloveSize, setGloveSize] = useState(8);
  const [hasHandwraps, setHasHandwraps] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="flex justify-between items-center mb-4">
        <BackIcon />
      </header>

      <section>
        <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>

        <TextInput
          label="YOUR NAME"
          placeholder="Enter your name"
          value="Ryuki"
          onChange={(e) => console.log(e.target.value)}
        />

        <SingleInput
          label="YOUR MAUY THAI EXPERIENCE"
          options={["Beginner", "Intermediate", "Professional"]}
          selected={experience}
          onSelect={(level) => setExperience(level)}
        />

        <div className="flex space-x-4 mb-4">
          <TextInput
            label="HOW OLD ARE YOU?"
            placeholder="Enter your age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />

          <SingleInput
            label="YOUR GENDER"
            options={["M", "F"]}
            selected={gender}
            onSelect={(g) => setGender(g)}
          />
        </div>

        <SingleInput
          label="DO YOU HAVE GLOVES"
          options={["Yes", "No"]}
          selected={hasGloves ? "Yes" : "No"}
          onSelect={(option) => setHasGloves(option === "Yes")}
        />

        <SingleInput
          label="YOUR GLOVE SIZE (IN OZ)"
          options={[8, 10, 12, 14, 16, 18].map(String)}
          selected={gloveSize.toString()}
          onSelect={(size) => setGloveSize(Number(size))}
        />

        <SingleInput
          label="DO YOU HAVE HANDWRAPS"
          options={["Yes", "No"]}
          selected={hasHandwraps ? "Yes" : "No"}
          onSelect={(option) => setHasHandwraps(option === "Yes")}
        />

        <button
          onClick={() => alert("Profile Updated")}
          className="w-full py-3 text-white font-bold rounded-md"
          style={{ backgroundColor: "#EB2726" }}
        >
          SAVE CHANGES
        </button>
      </section>
    </div>
  );
};

export default EditProfileScreen;
