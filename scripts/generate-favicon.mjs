import { resolve, dirname } from "path"
import { fileURLToPath } from "url"
import { writeFileSync } from "fs"
import sharp from "sharp"
import pngToIco from "png-to-ico"

const __dirname = dirname(fileURLToPath(import.meta.url))
const staticDir = resolve(__dirname, "..", "static")
const src = resolve(staticDir, "cognitioncoffee.png")

await sharp(src)
  .resize(180, 180, { fit: "cover", position: "center" })
  .png()
  .toFile(resolve(staticDir, "apple-touch-icon.png"))
console.log("Generated apple-touch-icon.png")

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
