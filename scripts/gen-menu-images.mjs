import sharp from "sharp"
import { writeFileSync } from "fs"

const W = 600, H = 400

// Cognition Coffee Co. — warm coffee brown gradient with cup icon
async function makeCoffeeImage() {
  const bg = Buffer.from(
    `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#6B4E3D"/>
          <stop offset="100%" stop-color="#3D2B1F"/>
        </linearGradient>
      </defs>
      <rect width="${W}" height="${H}" fill="url(#g)"/>
      <g transform="translate(${W/2 - 40}, ${H/2 - 50})" fill="none" stroke="#E8D5C4" stroke-width="3" stroke-linecap="round">
        <path d="M5 10 L5 60 Q5 75 20 75 L55 75 Q70 75 70 60 L70 10 Z"/>
        <path d="M70 25 Q90 25 90 45 Q90 60 70 60"/>
        <path d="M15 0 Q20 -8 25 0 M30 -5 Q35 -13 40 -5" stroke-width="2.5"/>
      </g>
      <text x="${W/2}" y="${H - 50}" font-family="Geist Sans, -apple-system, sans-serif" font-size="22" font-weight="500" fill="#E8D5C4" text-anchor="middle">Cognition Coffee Co.</text>
    </svg>`
  )
  await sharp(bg).jpeg({ quality: 85 }).toFile("static/menu/cognition-coffee-co.jpg")
}

// Cogs in the Machine — dark with gear icon
async function makeCogsImage() {
  const bg = Buffer.from(
    `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#1A1D21"/>
          <stop offset="100%" stop-color="#0D0F12"/>
        </linearGradient>
      </defs>
      <rect width="${W}" height="${H}" fill="url(#g)"/>
      <g transform="translate(${W/2}, ${H/2 - 20})" fill="none" stroke="#317CFF" stroke-width="3">
        <circle r="35"/>
        <circle r="14" fill="#317CFF" fill-opacity="0.15"/>
        ${Array.from({ length: 8 }, (_, i) => {
          const a = (i * Math.PI) / 4
          const x1 = Math.cos(a) * 35, y1 = Math.sin(a) * 35
          const x2 = Math.cos(a) * 48, y2 = Math.sin(a) * 48
          return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke-width="8" stroke-linecap="round"/>`
        }).join("")}
      </g>
      <text x="${W/2}" y="${H - 50}" font-family="Geist Mono, monospace" font-size="18" font-weight="500" fill="#317CFF" text-anchor="middle" letter-spacing="1">COGS IN THE MACHINE</text>
    </svg>`
  )
  await sharp(bg).jpeg({ quality: 85 }).toFile("static/menu/cogs-in-the-machine.jpg")
}

await makeCoffeeImage()
await makeCogsImage()
console.log("Generated 2 menu images")
