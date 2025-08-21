import React from "react";
import styled from "styled-components";
import { Play } from "lucide-react";

const List = styled.div` display: grid; gap: 12px; `;
const Tile = styled.button`
  position: relative; width: 100%; height: 200px;
  background: #eee; border: 1px solid #dedede; border-radius: 4px;
  overflow: hidden; cursor: pointer;
`;
const Thumb = styled.img` width: 100%; height: 100%; object-fit: cover; `;
const Overlay = styled.div`
  position: absolute; inset: 0; display: grid; place-items: center;
  background: rgba(0, 0, 0, 0.25);
`;

// helper
const ytId = (url: string) => {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) return u.pathname.slice(1);
    const id = u.searchParams.get("v");
    if (id) return id;
    const parts = u.pathname.split("/");
    const i = parts.indexOf("embed");
    if (i >= 0) return parts[i + 1];
  } catch {}
  return "";
};

export type MediaItem =
  | { type: "video"; url: string; title?: string }
  | { type: "image"; src: string; title?: string };

export default function MediaGallery({
  items,
}: {
  items: MediaItem[];
}) {
  return (
    <List>
      {items.map((m, i) => {
        const isVideo = m.type === "video";
        const thumb = isVideo
          ? `https://img.youtube.com/vi/${ytId(m.url)}/hqdefault.jpg`
          : m.src;

        return (
          <Tile
            key={i}
            onClick={() => isVideo && window.open(m.url, "_blank", "noopener,noreferrer")}
            aria-label={m.title || (isVideo ? "Video" : "Image")}
          >
            <Thumb src={thumb} alt={m.title || ""} />
            {isVideo && (
              <Overlay>
                <div className="w-12 h-12 rounded-full bg-[#EB2726] grid place-items-center">
                  <Play className="w-6 h-6 text-white" />
                </div>
              </Overlay>
            )}
          </Tile>
        );
      })}
    </List>
  );
}
