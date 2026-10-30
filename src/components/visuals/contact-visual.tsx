import { MapPin, MessageCircle, Phone } from "@/components/ui/icons";
import { GlassChip, VisualFrame } from "./visual-frame";

/** A wireframe globe turning slowly, signals arcing out from Kuala Lumpur. Pure SVG + CSS. */
export function ContactVisual({ city, phone }: { city: string; phone: string }) {
  const meridians = [0, 1, 2, 3];
  return (
    <VisualFrame>
      <svg viewBox="0 0 400 320" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="cv-stroke" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="var(--accent-from)" />
            <stop offset="1" stopColor="var(--accent-to)" />
          </linearGradient>
          <radialGradient id="cv-sphere" cx="0.35" cy="0.3" r="0.8">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.55" />
            <stop offset="1" stopColor="var(--accent-from)" stopOpacity="0.08" />
          </radialGradient>
        </defs>

        <g transform="translate(200 165)">
          <circle r="112" fill="url(#cv-sphere)" stroke="url(#cv-stroke)" strokeOpacity="0.55" />
          {/* Parallels */}
          {[-70, -35, 0, 35, 70].map((y) => (
            <ellipse
              key={y}
              cy={y}
              rx={Math.sqrt(112 * 112 - y * y)}
              ry={Math.max(4, 16 - Math.abs(y) / 6)}
              fill="none"
              stroke="url(#cv-stroke)"
              strokeOpacity="0.28"
            />
          ))}
          {/* Meridians: each squeezes and widens to suggest rotation */}
          {meridians.map((i) => (
            <ellipse
              key={i}
              rx="112"
              ry="112"
              fill="none"
              stroke="url(#cv-stroke)"
              strokeOpacity="0.3"
              style={{
                transformOrigin: "0 0",
                animation: `vis-meridian 12s linear ${(-12 / meridians.length) * i}s infinite`,
              }}
            />
          ))}

          {/* Signal arcs from KL */}
          {[
            "M18 26 C 70 -60, 150 -40, 170 -110",
            "M18 26 C -60 -40, -120 -80, -150 -130",
            "M18 26 C 90 70, 140 110, 175 125",
          ].map((d, i) => (
            <path
              key={d}
              d={d}
              fill="none"
              stroke="url(#cv-stroke)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="6 10"
              style={{ animation: `vis-dash ${5 + i}s linear infinite` }}
            />
          ))}

          {/* KL pin */}
          <circle cx="18" cy="26" r="7" fill="var(--accent-from)" />
          <circle
            cx="18"
            cy="26"
            r="7"
            fill="var(--accent-to)"
            style={{ transformOrigin: "18px 26px", animation: "vis-ping 2.4s ease-out infinite" }}
          />
        </g>
      </svg>

      <GlassChip className="top-[10%] left-[6%]" style={{ animation: "vis-float 7s ease-in-out infinite" }}>
        <MapPin className="size-4 text-brand-ink" /> {city}
      </GlassChip>
      <GlassChip className="right-[6%] bottom-[22%]" style={{ animation: "vis-float 8s ease-in-out -3s infinite" }}>
        <Phone className="size-4 text-brand-ink" /> {phone}
      </GlassChip>
      <GlassChip className="bottom-[6%] left-[10%]" style={{ animation: "vis-float 6s ease-in-out -1.5s infinite" }}>
        <MessageCircle className="size-4 text-brand-ink" /> We reply on WhatsApp
      </GlassChip>
    </VisualFrame>
  );
}
