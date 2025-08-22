// src/screens/EditProfile.tsx
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { PrimaryButton } from "../components/Button";
import LabeledInput from "../components/LabeledInput";
import SegmentedGroup from "../components/SegmentedGroup";
import ExperienceGrid from "../components/ExperienceGrid";
import SizeGrid from "../components/SizeGrid";
import PageTitle from "../components/PageTitle";

export default function EditProfile() {
  const [name, setName] = useState("Ryuki");
  const [experience, setExperience] = useState<"Beginner"|"Intermediate"|"Professional">("Beginner");
  const [age, setAge] = useState<string>("20");
  const [gender, setGender] = useState<"Male"|"Female">("Male");
  const [hasGloves, setHasGloves] = useState<boolean>(true);
  const [gloveSize, setGloveSize] = useState<number>(8);
  const [hasHandwraps, setHasHandwraps] = useState<boolean>(true);

  const save = () => {/* call API */};

  return (
    <div className="h-[100dvh] w-full bg-[#F7F7F7] overflow-y-auto" style={{ WebkitOverflowScrolling: "touch" }}>
      <div className="mx-auto max-w-[400px] min-h-full flex flex-col">
        {/* NAVBAR */}
        <Navbar
          onBack={() => window.history.back()}
          background="transparent"
          spacerHeight={40}
        />

        {/* CONTENT */}
        <main className="flex-1 px-5">
          <div className="pt-4">
            {/* TITLE */}
            <PageTitle>Edit Profile</PageTitle>

          <LabeledInput
            label="YOUR NAME"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-7"
          />

          <ExperienceGrid
            label="YOUR MAUY THAI EXPERIENCE"
            value={experience}
            onChange={setExperience}
            className="mb-7"
          />

          <div className="grid grid-cols-2 gap-4 mb-7">
            <LabeledInput
              label="HOW OLD ARE YOU?"
              placeholder="Your Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              type="number"
              inputMode="numeric"
            />
            <SegmentedGroup
              label="YOUR GENDER"
              options={[{label: "M", value: "Male"}, {label: "F", value: "Female"}]}
              value={gender}
              onChange={(v) => setGender(v as "Male"|"Female")}
              size="sm"
            />
          </div>

          <SegmentedGroup
            label="DO YOU HAVE A GLOVES"
            options={[{label: "Yes", value: "true"}, {label: "No", value: "false"}]}
            value={String(hasGloves)}
            onChange={(v) => setHasGloves(v === "true")}
            size="md"
            className="mb-7"
          />

          <SizeGrid
            label="YOUR GLOVE SIZE (IN OZ)"
            options={[8, 10, 12, 14, 16, 18]}
            value={gloveSize}
            onChange={setGloveSize}
            className="mb-7"
          />

          <SegmentedGroup
            label="DO YOU HAVE HANDWRAPS"
            options={[{label: "Yes", value: "true"}, {label: "No", value: "false"}]}
            value={String(hasHandwraps)}
            onChange={(v) => setHasHandwraps(v === "true")}
            size="md"
          />

          {/* SAVE BUTTON AT BOTTOM OF SCROLLVIEW */}
          <div className="pt-8 pb-[max(16px,env(safe-area-inset-bottom))]">
            <PrimaryButton label="SAVE CHANGES" onClick={save} className="!w-full" />
          </div>
        </div>
      </main>
    </div>
  </div>
  );
}
