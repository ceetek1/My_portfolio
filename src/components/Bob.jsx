import React, { useId } from "react";

// Bob's colours and expression for each stop of the tour.
const MOODS = {
  hero: { main: "#F26B1D", hl: "#FFC857", shadow: "#B8380B", strand: "#1C8C93", mouth: "M86,122 Q101,140 116,122", fill: "none" },
  about: { main: "#1C8C93", hl: "#7FE0D6", shadow: "#0B4F57", strand: "#F26B1D", mouth: "M90,124 Q101,133 112,124", fill: "none" },
  skills: { main: "#F2A516", hl: "#FFE08A", shadow: "#B86F08", strand: "#D6336C", mouth: "M84,120 Q101,142 118,120", fill: "none" },
  projects: { main: "#D6336C", hl: "#FF9DBC", shadow: "#86183F", strand: "#F7B32B", mouth: "M95,127 C95,118 107,118 107,127 C107,136 95,136 95,127 Z", fill: "#161513" },
  education: { main: "#2D4BB0", hl: "#8FA4F5", shadow: "#18276B", strand: "#2BB3B1", mouth: "M92,126 Q101,131 110,126", fill: "none" },
  contact: { main: "#E8501A", hl: "#FFB45C", shadow: "#9C2E08", strand: "#2D4BB0", mouth: "M84,120 Q101,144 118,120", fill: "none" },
};

const BLOB = "M100,18 C146,16 184,52 182,100 C180,148 146,184 100,182 C52,180 18,146 20,98 C22,52 56,20 100,18 Z";
const BLOB_FRAMES = [
  BLOB,
  "M100,22 C150,12 188,58 178,104 C170,152 140,186 96,178 C50,172 14,140 24,94 C32,48 54,30 100,22 Z",
  "M104,16 C142,24 180,48 184,96 C188,146 150,180 104,184 C56,188 22,152 16,104 C12,56 62,10 104,16 Z",
  BLOB,
].join(";");

export default function Bob({ mood = "hero", size = 240, motion = true }) {
  const uid = `bob${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const c = MOODS[mood] || MOODS.hero;
  const dur = motion ? "7s" : "indefinite";
  const morph = <animate attributeName="d" dur={dur} repeatCount="indefinite" values={BLOB_FRAMES} />;

  return (
    <div className={motion ? "bob" : "bob bob-still"} style={{ width: size, height: size }}>
      <svg className="bob-svg" viewBox="0 0 200 220" width="100%" height="100%" aria-hidden="true">
        <defs>
          <radialGradient id={`${uid}-body`} cx="36%" cy="30%" r="78%">
            <stop offset="0%" style={{ stopColor: c.hl }} />
            <stop offset="52%" style={{ stopColor: c.main }} />
            <stop offset="100%" style={{ stopColor: c.shadow }} />
          </radialGradient>
          <filter id={`${uid}-paint`} x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.03 0.06" numOctaves="2" seed="4" />
            <feDisplacementMap in="SourceGraphic" scale="7" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <clipPath id={`${uid}-clip`}>
            <path d={BLOB}>{morph}</path>
          </clipPath>
        </defs>

        <ellipse className="bob-shadow" cx="100" cy="206" rx="58" ry="7" fill="#161513" opacity=".14" />
        <g className="bob-float">
          <g filter={`url(#${uid}-paint)`}>
            <path d="M122,168 C124,184 121,196 128,202 C135,208 142,198 139,184 C137,172 132,164 122,168 Z" style={{ fill: c.main }} />
            <path fill={`url(#${uid}-body)`} d={BLOB}>{morph}</path>
          </g>
          <g clipPath={`url(#${uid}-clip)`}>
            <g filter={`url(#${uid}-paint)`}>
              <path className="bob-strand" d="M10,64 C58,30 112,58 196,26" fill="none" strokeWidth="13" strokeLinecap="round" opacity=".6" style={{ stroke: c.strand }} />
              <path className="bob-strand" d="M4,92 C40,78 70,96 112,74" fill="none" strokeWidth="5" strokeLinecap="round" opacity=".45" style={{ stroke: c.strand }} />
              <path d="M18,150 C70,128 116,160 196,134" fill="none" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" opacity=".18" />
              <path d="M30,168 C80,150 120,176 190,156" fill="none" stroke="#161513" strokeWidth="10" strokeLinecap="round" opacity=".08" />
            </g>
          </g>
          <ellipse cx="68" cy="56" rx="25" ry="12" fill="#ffffff" opacity=".55" transform="rotate(-30 68 56)" />
          <circle cx="99" cy="40" r="5" fill="#ffffff" opacity=".75" />
          <path d="M30,120 C34,146 52,166 76,176" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity=".35" />
          <ellipse cx="62" cy="122" rx="10" ry="6" fill="#ffffff" opacity=".22" />
          <ellipse cx="142" cy="122" rx="10" ry="6" fill="#ffffff" opacity=".22" />
          <g className="bob-eyes">
            <g className="bob-blink">
              <ellipse cx="80" cy="98" rx="10" ry="13" fill="#161513" />
              <ellipse cx="122" cy="98" rx="10" ry="13" fill="#161513" />
              <circle cx="83.5" cy="92" r="3.6" fill="#ffffff" />
              <circle cx="125.5" cy="92" r="3.6" fill="#ffffff" />
            </g>
          </g>
          <path d={c.mouth} stroke="#161513" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" style={{ fill: c.fill }} />
        </g>
      </svg>
    </div>
  );
}
