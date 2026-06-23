import { readFileSync, writeFileSync } from "fs"
import { resolve, dirname } from "path"
import { fileURLToPath } from "url"
import sharp from "sharp"
import pngToIco from "png-to-ico"

const __dirname = dirname(fileURLToPath(import.meta.url))
const staticDir = resolve(__dirname, "..", "static")
const src = resolve(staticDir, "cognitioncoffee.png")

const sizes = [
  { name: "favicon-16x16.png", size: 16 },
  { name: "favicon-32x32.png", size: 32 },
  { name: "favicon-48x48.png", size: 48 },
  { name: "apple-touch-icon.png", size: 180 },
]

for (const { name, size } of sizes) {
  await sharp(src)
    .resize(size, size, { fit: "cover", position: "center" })
    .png()
    .toFile(resolve(staticDir, name))
  console.log(`Generated ${name}`)
}

const icoBuffers = await Promise.all(
  [16, 32, 48].map((size) =>
    sharp(src)
      .resize(size, size, { fit: "cover", position: "center" })
      .png()
      .toBuffer()
  )
)

const ico = await pngToIco(icoBuffers)
writeFileSync(resolve(staticDir, "favicon.ico"), ico)
console.log("Generated favicon.ico")

const ogWidth = 1200
const ogHeight = 630
const logoSize = 630

const resizedLogo = await sharp(src)
  .resize(logoSize, logoSize, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 1 } })
  .png()
  .toBuffer()

await sharp({
  create: {
    width: ogWidth,
    height: ogHeight,
    channels: 3,
    background: { r: 255, g: 255, b: 255 },
  },
})
  .composite([{ input: resizedLogo, gravity: "center" }])
  .png()
  .toFile(resolve(staticDir, "og.png"))

console.log("Generated og.png")
