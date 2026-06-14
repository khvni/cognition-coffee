import sharp from "sharp";
import { fileURLToPath } from "node:url";

const out = fileURLToPath(new URL("../public/og.png", import.meta.url));

const cream = "#EDECEB";
const ink = "#1B1A18";
const slate = "#6B6862";
const blue = "#317CFF";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${cream}"/>
  <rect x="0" y="0" width="14" height="630" fill="${blue}"/>
  <g font-family="Georgia, 'Times New Roman', serif">
    <text x="86" y="118" font-family="'Courier New', monospace" font-size="22" letter-spacing="6" fill="${slate}">COMMUNITY STRATEGY &#183; BUILT WITH DEVIN</text>
    <text x="82" y="280" font-size="104" font-weight="700" fill="${ink}">The Cognition</text>
    <text x="82" y="396" font-size="104" font-weight="700" fill="${ink}">Coffee Company</text>
    <rect x="86" y="436" width="180" height="6" fill="${blue}"/>
    <text x="86" y="506" font-size="34" fill="${slate}">Freshly brewed community for the first AI software engineer.</text>
    <text x="86" y="582" font-family="'Courier New', monospace" font-size="24" fill="${ink}">cognitioncoffee.co</text>
    <text x="1114" y="582" font-family="'Courier New', monospace" font-size="24" fill="${slate}" text-anchor="end">Ali Khani</text>
  </g>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(out);
console.log("wrote", out);
