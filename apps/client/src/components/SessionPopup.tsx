import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { Clock, MapPin, User as UserIcon, Edit } from "lucide-react";
import { PrimaryButton, SecondaryButton } from "./Button";
import iconClose from "../assets/icon-close.svg";

type Session = {
  id: number;
  date: string;
  day: string;
  time: string;
  duration: string;
  location: { type: string; address: string };
  student: {
    name: string;
    age: string;
    gender: string;
    level: string;
    preferences: { gloves: string; gloveSize: string; handWraps: string };
  };
  notes: string;
};

type Props = {
  sessions: Session[];
  startIndex?: number;
  onAcknowledge: (sessionId: number) => void;
  onCancel: (sessionId: number) => void;
  onClose: () => void;
};

// near the top
const SHELL_WIDTH = 340;        // was 400
const DIALOG_VW   = 86;         // was 92

// Dialog
const Dialog = styled.div`
  width: min(${DIALOG_VW}vw, ${SHELL_WIDTH}px);
  max-height: 86vh;
  background: #fff;
  border-radius: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 60px rgba(0,0,0,.35);
`;
/* Overlay with blur; clicking it will close the popup */
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 5000;
  background: rgba(0,0,0,0.5);
  backdrop-filter: blur(6px);
  display: grid;
  place-items: center;
`;


const TrackWrap = styled.div`
  position: relative;
  flex: 1 1 auto;
`;

const Track = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  height: 100%;
`;

/* Gutters so each slide feels like a card in a carousel */
const Slide = styled.div`
  width: 100%;
  flex: 0 0 100%;
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  min-height: 0;
  padding: 0;
  box-sizing: border-box;
`;

// optional, but helps balance the thinner card
const H_PADDING = 14; // px

const SlideHeader = styled.div`
  background: #2d2d2d;
  color: #fff;
  padding: 16px ${H_PADDING}px 14px;   /* was 16px 16px 14px */
`;

const StudentCard = styled.div`
  margin: 12px ${H_PADDING}px 0;       /* was 12px 16px 0 */
  border: 1px solid #e6e6e6;
  background: #fff;
`;


const HDate = styled.div`
  color: #D62422;
  font-weight: 800;
  font-size: 18px;
  margin-bottom: 6px;
`;

const HTime = styled.div`
  font-weight: 800;
  font-size: 14px;
  margin-bottom: 6px;
`;

const HDur = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #bfbfbf;
  font-size: 12px;
  margin-bottom: 12px;
`;

const HLoc = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 8px;
  align-items: start;

  .label { color: #bfbfbf; text-transform: uppercase; font-size: 10px; letter-spacing: .08em; margin-bottom: 4px; }
  .type  { font-weight: 800; font-size: 12px; margin-bottom: 2px; }
  .addr  { color: #ddd; font-size: 12px; line-height: 1.3; }
  .map   { width: 56px; height: 42px; background: #3a3a3a; display: grid; place-items: center; }
`;


const StuTop = styled.div`
  display: flex; align-items: flex-start; justify-content: space-between; padding: 12px;
`;

const StuLeft = styled.div`
  display: flex; align-items: center; gap: 12px;

  .avatar { width: 40px; height: 40px; background: #000; border-radius: 4px; display: grid; place-items: center; }
  .name   { font-weight: 800; font-size: 14px; color: #1a1a1a; }
  .meta   { color: #666; font-size: 12px; }
`;

const StuLevel = styled.div`
  font-weight: 800; font-size: 12px; color: #1a1a1a;
`;

const StuSplit = styled.div`
  height: 1px; background: #f0f0f0;
`;

const Prefs = styled.div`
  padding: 10px 12px; display: grid; row-gap: 8px;
  .row { display: flex; justify-content: space-between; align-items: center; font-size: 14px; color: #1a1a1a; }
  .val { font-weight: 700; }
`;

const Notes = styled.div`
  margin: 12px 0 0;
  background: #f7f7f7;
  padding: 12px;
  .hdr { display: flex; align-items: center; gap: 6px; font-size: 10px; letter-spacing: .08em; color: #666; text-transform: uppercase; margin-bottom: 6px; }
  .body { color: #444; font-size: 14px; line-height: 1.5; }
`;

const Actions = styled.div`
  padding: 12px 16px 16px; display: grid; row-gap: 10px;
`;

export default function SessionPopup({
  sessions,
  startIndex = 0,
  onAcknowledge,
  onCancel,
  onClose,
}: Props) {
  const [index, setIndex] = useState(startIndex);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: el.clientWidth * index, behavior: "auto" });
  }, [index]);

  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const i = Math.round(el.scrollLeft / el.clientWidth);
    if (i !== index) setIndex(i);
  };

  return (
    <Overlay onClick={onClose}>
      {/* prevent overlay click from closing when tapping inside the card */}
      <Dialog onClick={(e) => e.stopPropagation()}>
        <TrackWrap>
          <Track ref={trackRef} onScroll={onScroll}>
            {sessions.map((s) => (
              <Slide key={s.id}>
                <SlideHeader>
                  <HDate>{s.date}, {s.day}</HDate>
                  <HTime>{s.time}</HTime>
                  <HDur><Clock size={16} /><span>{s.duration}</span></HDur>
                  <HLoc>
                    <div>
                      <div className="label">LOCATION</div>
                      <div className="type">{s.location.type}</div>
                      <div className="addr">{s.location.address}</div>
                    </div>
                    <div className="map"><MapPin size={16} color="#bfbfbf" /></div>
                  </HLoc>
                </SlideHeader>

                <StudentCard>
                  <StuTop>
                    <StuLeft>
                      <div className="avatar"><UserIcon size={18} color="#fff" /></div>
                      <div>
                        <div className="name">{s.student.name}</div>
                        <div className="meta">{s.student.age}, {s.student.gender}</div>
                      </div>
                    </StuLeft>
                    <StuLevel>{s.student.level}</StuLevel>
                  </StuTop>
                  <StuSplit />
                  <Prefs>
                    <div className="row"><span>Gloves</span><span className="val">{s.student.preferences.gloves}</span></div>
                    <div className="row"><span>Glove Size</span><span className="val">{s.student.preferences.gloveSize}</span></div>
                    <div className="row"><span>Hand Wraps</span><span className="val">{s.student.preferences.handWraps}</span></div>
                  </Prefs>
                </StudentCard>

                <Notes>
                  <div className="hdr"><Edit size={14} /> NOTES</div>
                  <div className="body">{s.notes}</div>
                </Notes>

                <Actions>
                  <PrimaryButton
                    onClick={() => onAcknowledge(s.id)}
                    label="ACKNOWLEDGE"
                    className="!w-full !bg-green-600 hover:!bg-green-700"
                  />
                  <SecondaryButton
                    onClick={() => onCancel(s.id)}
                    label="CANCEL SESSION"
                    icon={iconClose}
                    className="!w-full"
                  />
                </Actions>
              </Slide>
            ))}
          </Track>
        </TrackWrap>
      </Dialog>
    </Overlay>
  );
}
