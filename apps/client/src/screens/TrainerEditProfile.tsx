import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackIcon from "../components/BackIcon";
import { PrimaryButton } from "../components/Button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Upload, Play } from "lucide-react";
import trainerHeader from "../assets/image-trainer.png";
import trainerHero from "../assets/image1.png";

type Gender = "M" | "F";
type MediaKind = "video" | "image";
type VideoItem = { id: number; kind: "video"; title: string; url?: string };
type ImageItem = { id: number; kind: "image"; title: string };

const TrainerEditProfile: React.FC = () => {
  const navigate = useNavigate();

  const [gender, setGender] = useState<Gender>("M");
  const [profile, setProfile] = useState({
    loginId: "kjadbkbadfjaedbk13rbr",
    creditsPerHour: "4",
    name: "Helena Padilla",
    about:
      "A countdown timer picker in iOS style. This picker shows a countdown duration with hour, minute and second spinners. The duration is bound between 0 and 23",
    age: "20",
  });

  const [videos, setVideos] = useState<VideoItem[]>([
    { id: 1, kind: "video", title: "HELENA PADILLA vs CHRISTA ARROYO", url: "https://www.youtube.com/watch?v=6OHYeV7iQSo" },
    { id: 4, kind: "video", title: "Pad Training" },
  ]);
  const [images, setImages] = useState<ImageItem[]>([
    { id: 2, kind: "image", title: "Biceps Flex" },
    { id: 3, kind: "image", title: "High Kick Pose" },
    { id: 5, kind: "image", title: "Combat Stance" },
  ]);

  const media = useMemo<(VideoItem | ImageItem)[]>(
    () => [videos[0], images[0], images[1], videos[1], images[2]].filter(Boolean) as any,
    [videos, images]
  );

  const setField = (k: keyof typeof profile, v: string) => setProfile((p) => ({ ...p, [k]: v }));
  const deleteMedia = (m: VideoItem | ImageItem) => {
    if (m.kind === "video") setVideos((prev) => prev.filter((v) => v.id !== m.id));
    else setImages((prev) => prev.filter((i) => i.id !== m.id));
  };

  const save = () => navigate("/trainer/profile");

  return (
    // SINGLE SCROLLER: 100dvh + overflow-y-auto (no nested scroll areas)
    <div className="h-[100dvh] w-full bg-[#F7F7F7] overflow-y-auto overscroll-contain">
      <div className="mx-auto max-w-[400px] min-h-full">
        {/* Header */}
        {/* Header – same look as Trainer Profile */}
        <div className="relative overflow-hidden bg-[linear-gradient(157.07deg,#3a3a3a_0%,#252525_81.65%)]">
          {/* content */}
          <div className="mx-auto max-w-[400px] px-5 pt-5 pb-10 text-white relative z-10">
            <div className="mb-6">
              <BackIcon />
            </div>

            {/* Title + action */}
            <div>
              <h1 className="text-[#EB2726] text-[28px] leading-[28px] font-extrabold italic">
                HELENA
                <br />
                PADILLA
              </h1>
              <button
                type="button"
                className="mt-3 text-xs text-[#EB2726] underline underline-offset-2"
              >
                CHANGE PROFILE PIC
              </button>
            </div>
          </div>

          {/* hero image (same asset as profile) */}
          <img
            src={trainerHero}
            alt=""
            className="absolute right-0 bottom-0 h-[200px] max-w-none select-none pointer-events-none"
          />
        </div>

        {/* Content */}
        <div className="bg-white px-5 py-6 space-y-6">
          <p className="text-[#B0B0B0] text-xs font-extrabold tracking-[0.05em] uppercase">// Edit Profile</p>

          <div>
            <label className="block font-extrabold text-[12px] tracking-[0.05em] uppercase mb-2">Your Login ID</label>
            <Input value={profile.loginId} onChange={(e) => setField("loginId", e.target.value)} className="rounded-none border-[#B1B1B1] bg-white" />
          </div>

          <div>
            <label className="block font-extrabold text-[12px] tracking-[0.05em] uppercase mb-2">Credits per hour</label>
            <Input value={profile.creditsPerHour} onChange={(e) => setField("creditsPerHour", e.target.value)} className="rounded-none border-[#B1B1B1] bg-white" />
            <p className="text-xs text-[#717171] mt-1">
              Credits per hour can be <span className="font-bold">changed by admin only</span>
            </p>
          </div>

          <div>
            <label className="block font-extrabold text-[12px] tracking-[0.05em] uppercase mb-2">Your Name</label>
            <Input value={profile.name} onChange={(e) => setField("name", e.target.value)} className="rounded-none border-[#B1B1B1] bg-white" />
          </div>

          <div>
            <label className="block font-extrabold text-[12px] tracking-[0.05em] uppercase mb-2">About You</label>
            <Textarea value={profile.about} onChange={(e) => setField("about", e.target.value)} className="rounded-none border-[#B1B1B1] bg-white min-h-[100px]" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-extrabold text-[12px] tracking-[0.05em] uppercase mb-2">How old are you?</label>
              <Input value={profile.age} onChange={(e) => setField("age", e.target.value)} className="rounded-none border-[#B1B1B1] bg-white" />
            </div>
            <div>
              <label className="block font-extrabold text-[12px] tracking-[0.05em] uppercase mb-2">Your gender</label>
              <div className="flex gap-2">
                {(["M", "F"] as Gender[]).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGender(g)}
                    className={[
                      "flex-1 h-[48px] border text-sm font-medium rounded-none",
                      gender === g ? "border-[#D62422] bg-white text-black" : "border-[#B1B1B1] bg-white text-[#717171]",
                    ].join(" ")}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block font-extrabold text-[12px] tracking-[0.05em] uppercase mb-2">Upload your training videos</label>
            <div className="relative">
              <Input className="rounded-none border-[#B1B1B1] bg-white pr-12" placeholder="Upload File" readOnly />
              <Upload className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9a9a9a]" />
            </div>
          </div>

          <div>
            <label className="block font-extrabold text-[12px] tracking-[0.05em] uppercase mb-2">Upload your training images</label>
            <div className="relative">
              <Input className="rounded-none border-[#B1B1B1] bg-white pr-12" placeholder="Upload File" readOnly />
              <Upload className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9a9a9a]" />
            </div>
          </div>

          {/* Media tiles */}
          <div className="space-y-4">
            {media.map((m) => (
              <div key={`${m.kind}-${m.id}`} className="relative">
                <div className="h-[180px] w-full bg-[#e9e9e9] border border-[#DEDEDE]" />
                {m.kind === "video" && (
                  <div className="absolute inset-0 grid place-items-center pointer-events-none">
                    <div className="w-12 h-12 rounded-full bg-[#EB2726] grid place-items-center">
                      <Play className="w-6 h-6 text-white" />
                    </div>
                  </div>
                )}
                <button
                  onClick={() => deleteMedia(m as any)}
                  className="absolute bottom-3 right-3 bg-[#EB2726] text-white text-xs font-bold px-3 py-1"
                >
                  DELETE
                </button>
              </div>
            ))}
          </div>

          <div className="pt-4 pb-6">
            <PrimaryButton label="SAVE CHANGES" onClick={save} className="!w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerEditProfile;
