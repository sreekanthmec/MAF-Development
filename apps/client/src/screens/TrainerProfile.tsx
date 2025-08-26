import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ArrowLeft, ArrowRight, Zap, Play } from "lucide-react";
import { PrimaryButton } from "../components/Button";
import trainerImg from "../assets/trainer.png";
import trainerPlaceholder from "../assets/image-trainer.png";
import { useAuth } from "../contexts/AuthContext";

/* ——— shared layout like Trainer Dashboard ——— */
const PageScroller = styled.div`
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  background: #ffffff;
`;
const Screen = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;
const Header = styled.header`
  position: relative;
  padding: 28px 20px 20px;
  background: linear-gradient(157.07deg, #3a3a3a 0%, #252525 81.65%);
  color: #fff;
`;
const Body = styled.main`
  flex: 1 0 auto;
  background: #fff;
  padding: 20px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Name = styled.h1`
  color: #eb2726;
  font: 800 28px/1.1 Manrope, sans-serif;
  letter-spacing: -0.02em;
  font-style: italic;
  margin: 0 0 8px;
`;
const Sub = styled.p`
  margin: 0 0 10px;
  color: #e6e6e6;
  font: 600 14px/1.2 Manrope, sans-serif;
`;
const Stat = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font: 600 14px/1.2 Manrope, sans-serif;
`;

const Tabs = styled.div`
  display: flex;
  border-bottom: 1px solid #e6e6e6;
`;
const TabBtn = styled.button<{ active?: boolean }>`
  flex: 1 0 0;
  padding: 12px 0;
  text-transform: uppercase;
  font: 800 12px/1 Manrope, sans-serif;
  letter-spacing: 0.05em;
  color: ${(p) => (p.active ? "#121212" : "#8a8a8a")};
  border-bottom: 2px solid ${(p) => (p.active ? "#121212" : "transparent")};
`;

const Card = styled.div`
  background: #fff;
  border: 1px solid #dedede;
  border-radius: 4px;
`;
const CardPad = styled.div`
  padding: 16px;
`;

const Grid2 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;

// --- tiny styled helpers (same look as your cards) ---
const MediaList = styled.div`
  display: grid;
  gap: 12px;
`;
const MediaTile = styled.button`
  position: relative;
  width: 100%;
  height: 200px;
  background: #eee;
  border: 1px solid #dedede;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
`;
const Thumb = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const PlayOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  background: rgba(0, 0, 0, 0.25);
`;

type Tab = "about" | "settings";
type SettingId = "earnings" | "payment" | "availability" | "logout";

// --- helper to extract a YouTube ID and build a thumb URL ---
const getYouTubeId = (url: string): string => {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) return u.pathname.replace("/", "");
    if (u.searchParams.get("v")) return u.searchParams.get("v") as string;
    const parts = u.pathname.split("/");
    const i = parts.indexOf("embed");
    if (i >= 0 && parts[i + 1]) return parts[i + 1];
  } catch {}
  return "";
};

type MediaItem =
  | { type: "video"; url: string; title?: string }
  | { type: "image"; src: string; title?: string };

// put this near your component body
const media: MediaItem[] = [
  {
    type: "video",
    url: "https://www.youtube.com/watch?v=6OHYeV7iQSo&pp=ygUOdHJhaW5pbmcgdmlkZW8%3D",
    title: "Trainer Highlight",
  },
  { type: "image", src: trainerPlaceholder, title: "Gallery 1" },
  { type: "image", src: trainerPlaceholder, title: "Gallery 2" },
  { type: "image", src: trainerPlaceholder, title: "Gallery 3" },
];

export default function TrainerProfile() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [tab, setTab] = useState<Tab>("about");

  const profile = {
    name: "HELENA PADILLA",
    totalSessions: 22,
    creditsPerHour: 2,
    age: 20,
    gender: "Male",
  };

  const goSetting = (id: SettingId) => {
    if (id === "logout") {
      logout();
      navigate("/");
    } else if (id === "earnings") navigate("/trainer/earnings");
    else if (id === "payment") navigate("/trainer/payment-info");
    else if (id === "availability") navigate("/trainer/availability");
  };

  return (
    <PageScroller>
      <div className="mx-auto max-w-[400px]">
        <Screen>
          {/* header */}
          <Header>
            <Row>
              <button
                onClick={() => navigate(-1)}
                className="p-1 -ml-1 hover:opacity-80"
                aria-label="Back"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="w-5 h-5" />
            </Row>

            <div className="relative mt-6">
              <div className="pr-28">
                <Name>{profile.name}</Name>
                <Sub>{profile.totalSessions} total sessions</Sub>
                <Stat>
                  <Zap className="w-4 h-4 text-[#FFC800]" />
                  {profile.creditsPerHour} credits per hour
                </Stat>
              </div>

              <img
                src={trainerImg}
                alt="Trainer"
                className="absolute right-0 -top-6 w-28 h-auto object-contain pointer-events-none select-none"
              />
            </div>

            <div className="mt-11">
              <PrimaryButton
                label="EDIT PROFILE"
                onClick={() => navigate("/trainer/edit-profile")}
                className="!w-full"
              />
            </div>
          </Header>

          {/* body */}
          <Body>
            <Tabs>
              <TabBtn active={tab === "about"} onClick={() => setTab("about")}>
                About
              </TabBtn>
              <TabBtn
                active={tab === "settings"}
                onClick={() => setTab("settings")}
              >
                Settings
              </TabBtn>
            </Tabs>

            {tab === "settings" ? (
              <div className="space-y-3 pt-5">
                {([
                  { id: "earnings", label: "EARNINGS" },
                  { id: "payment", label: "PAYMENT METHOD INFO" },
                  { id: "availability", label: "AVAILABILITY" },
                  { id: "logout", label: "LOGOUT" },
                ] as { id: SettingId; label: string }[]).map((o) => (
                  <button
                    key={o.id}
                    onClick={() => goSetting(o.id)}
                    className="w-full bg-white border border-[#dedede] rounded px-4 py-4 flex items-center justify-between hover:bg-gray-50"
                  >
                    <span className="text-sm font-semibold">{o.label}</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </button>
                ))}
              </div>
            ) : (
              <div className="pt-5 space-y-6">
                {/* about text */}
                <Card>
                  <CardPad>
                    <p className="text-sm leading-relaxed text-[#2d2d2d]">
                      A countdown timer picker in iOS style. This picker shows a
                      countdown duration with hour, minute and second spinners.
                      The duration is bound between 0 and 23.
                    </p>
                  </CardPad>
                </Card>

                {/* age / gender */}
                <Grid2>
                  <Card>
                    <CardPad>
                      <div className="text-xs text-[#8a8a8a] mb-1">Age</div>
                      <div className="text-base font-extrabold">
                        {profile.age} years
                      </div>
                    </CardPad>
                  </Card>
                  <Card>
                    <CardPad>
                      <div className="text-xs text-[#8a8a8a] mb-1">Gender</div>
                      <div className="text-base font-extrabold">
                        {profile.gender}
                      </div>
                    </CardPad>
                  </Card>
                </Grid2>

                {/* media blocks */}

<div className="pt-5">
  <MediaList>
    {media.map((m, i) => {
      const isVideo = m.type === "video";
      const thumbSrc = isVideo
        ? `https://img.youtube.com/vi/${getYouTubeId(m.url)}/hqdefault.jpg`
        : m.src;

      return (
        <MediaTile
          key={i}
          onClick={() => {
            if (isVideo) window.open(m.url, "_blank", "noopener,noreferrer");
          }}
          aria-label={m.title || (isVideo ? "Trainer video" : "Trainer image")}
        >
          <Thumb src={thumbSrc} alt={m.title || ""} />
          {isVideo && (
            <PlayOverlay>
              <div className="w-12 h-12 rounded-full bg-[#EB2726] grid place-items-center">
                <Play className="w-6 h-6 text-white" />
              </div>
            </PlayOverlay>
          )}
        </MediaTile>
      );
    })}
  </MediaList>
</div>
              </div>
            )}
          </Body>
        </Screen>
      </div>
    </PageScroller>
  );
}
