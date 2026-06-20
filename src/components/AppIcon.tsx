import React, { useId } from "react"
import type { AppId } from "@/lib/apps"

type Props = {
  id: AppId
  size?: number
  className?: string
}

const CREAM = "#F6EEDD"
const INK = "#1B1A17"

/** Rounded-square app tile: brand gradient + top sheen + inset rim, with a glyph on top. */
const Tile: React.FC<{ uid: string; from: string; to: string; children: React.ReactNode }> = ({
  uid,
  from,
  to,
  children,
}) => (
  <>
    <defs>
      <linearGradient id={`${uid}-bg`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={from} />
        <stop offset="1" stopColor={to} />
      </linearGradient>
      <linearGradient id={`${uid}-sheen`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#FFFDF7" stopOpacity="0.45" />
        <stop offset="0.52" stopColor="#FFFDF7" stopOpacity="0.05" />
        <stop offset="1" stopColor="#FFFDF7" stopOpacity="0" />
      </linearGradient>
    </defs>
    <rect x="3" y="3" width="42" height="42" rx="11" fill={`url(#${uid}-bg)`} />
    <rect x="3" y="3" width="42" height="42" rx="11" fill={`url(#${uid}-sheen)`} />
    {children}
    <rect x="3.6" y="3.6" width="40.8" height="40.8" rx="10.4" fill="none" stroke="#15130F" strokeOpacity="0.16" />
  </>
)

const glyphs: Record<AppId, (uid: string) => React.ReactNode> = {
  home: (uid) => (
    <Tile uid={uid} from="#5B9BFF" to="#2E6BE6">
      <g fill={CREAM}>
        <circle cx="16.6" cy="16.2" r="3.4" />
        <circle cx="31.4" cy="16.2" r="3.4" />
        <ellipse cx="24" cy="27" rx="12" ry="11" />
      </g>
      <ellipse cx="24" cy="31" rx="6.6" ry="5" fill="#E7D9BE" />
      <g fill="#2B2A24">
        <circle cx="19.6" cy="24.2" r="1.7" />
        <circle cx="28.4" cy="24.2" r="1.7" />
        <ellipse cx="24" cy="29.6" rx="1.7" ry="1.3" />
      </g>
    </Tile>
  ),
  menu: (uid) => (
    <Tile uid={uid} from="#9A6638" to="#5E3A20">
      <g stroke="#F3E8D6" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.65">
        <path d="M21 18c-1.8-1.5-1.8-3 0-4.5s1.8-3 0-4.5" />
        <path d="M26.5 17c-1.8-1.5-1.8-3 0-4.5s1.8-3 0-4.5" />
      </g>
      <ellipse cx="24" cy="34.6" rx="10.6" ry="2.2" fill="#F3E8D6" />
      <path d="M16 20h16v4.5a8 8 0 0 1-16 0z" fill="#F3E8D6" />
      <path d="M32 21.4c3.6 0 3.6 5.2 0 5.2" stroke="#F3E8D6" strokeWidth="2" fill="none" />
      <ellipse cx="24" cy="20" rx="8" ry="1.6" fill="#5E3A20" />
    </Tile>
  ),
  blog: (uid) => (
    <Tile uid={uid} from="#F4ECDB" to="#E0D2B6">
      <g stroke={INK} strokeOpacity="0.5" strokeWidth="1.1" strokeLinecap="round">
        <line x1="12.5" y1="13.5" x2="35.5" y2="13.5" />
        <line x1="12.5" y1="35" x2="35.5" y2="35" />
      </g>
      <text
        x="24"
        y="30.6"
        textAnchor="middle"
        fill={INK}
        style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontWeight: 700, fontSize: "20px" }}
      >
        D
      </text>
    </Tile>
  ),
  community: (uid) => (
    <Tile uid={uid} from="#4C7BEA" to="#2B4FA8">
      <g fill="#EAF1FF">
        <g opacity="0.78">
          <circle cx="14.4" cy="22" r="3.7" />
          <path d="M8 34.6c0-4.6 2.9-7.4 6.4-7.4s6.4 2.8 6.4 7.4z" />
          <circle cx="33.6" cy="22" r="3.7" />
          <path d="M27.2 34.6c0-4.6 2.9-7.4 6.4-7.4s6.4 2.8 6.4 7.4z" />
        </g>
        <circle cx="24" cy="19.6" r="5" />
        <path d="M15 37c0-6.2 4-10 9-10s9 3.8 9 10z" />
      </g>
    </Tile>
  ),
  about: (uid) => (
    <Tile uid={uid} from="#C89A5A" to="#8A5E30">
      <g fill={CREAM}>
        <circle cx="24" cy="19" r="6" />
        <path d="M11 39c0-8 5.8-13 13-13s13 5 13 13z" />
      </g>
    </Tile>
  ),
  scott: (uid) => (
    <Tile uid={uid} from="#E8E0D0" to="#D4CBBA">
      <rect x="13" y="11" width="22" height="26" rx="1.5" fill={CREAM} stroke={INK} strokeOpacity="0.2" strokeWidth="0.8" />
      <rect x="15" y="13" width="18" height="14" rx="1" fill="#C8D8E8" />
      <path d="M15 27l5-4 4 3 5-6 4 7H15z" fill="#8AAA6A" />
      <circle cx="28" cy="17" r="2.2" fill="#F5D76E" />
    </Tile>
  ),
}

/** Bespoke, real-OS-style app icons. Each app gets its own gradient tile + glyph. */
export const AppIcon: React.FC<Props> = ({ id, size = 22, className }) => {
  const uid = useId()
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      className={className}
      role="img"
      aria-hidden="true"
    >
      {glyphs[id](uid)}
    </svg>
  )
}
