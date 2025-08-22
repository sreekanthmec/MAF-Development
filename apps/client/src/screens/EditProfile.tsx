// src/screens/EditProfile.tsx
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { PrimaryButton } from "../components/Button";
import LabeledInput from "../components/LabeledInput";
import SegmentedGroup from "../components/SegmentedGroup";
import ExperienceGrid from "../components/ExperienceGrid";
import SizeGrid from "../components/SizeGrid";

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
    <div className="w-full bg-[#F7F7F7] min-h-[100dvh] pt-[max(12px,env(safe-area-inset-top))]">
      <div className="mx-auto max-w-[400px] min-h-[100dvh] flex flex-col">
        <Navbar />

        <div className="px-5 pt-4 pb-28">
          <h1 className="font-manrope font-bold text-[20px] leading-[26px] mb-6">Edit Profile</h1>

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
        </div>

        {/* bottom button, centered and inside the shell */}
        <div className="mt-auto w-full bg-white">
          <div className="mx-auto max-w-[400px] px-5 py-4 pb-[max(16px,env(safe-area-inset-bottom))]">
            <PrimaryButton label="SAVE CHANGES" onClick={save} className="!w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
