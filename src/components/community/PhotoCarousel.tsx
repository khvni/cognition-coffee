import React, { useMemo, useRef, useState, type FC } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"

export type Photo = {
  src: string
  alt: string
  caption: string
}

const ROTATIONS = [-2.5, 1.5, -1, 2, -1.5, 2.5]
const DURATION = 30

export const PhotoCarousel: FC<{ photos: Photo[] }> = ({ photos }) => {
  const prefersReduced = useReducedMotion()
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-40px" })

  const trackPhotos = useMemo(
    () => (prefersReduced ? photos : [...photos, ...photos]),
    [photos, prefersReduced],
  )

  if (photos.length === 0) return null

  return (
    <div
      ref={containerRef}
      className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden"
      style={{
        maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="region"
      aria-label="Community photos"
    >
      <motion.div
        className="flex w-max gap-5 px-4 py-6"
        initial={{ x: 0 }}
        animate={isInView && !prefersReduced ? { x: "-50%" } : { x: 0 }}
        transition={
          prefersReduced
            ? { duration: 0 }
            : { repeat: Infinity, duration: DURATION, ease: "linear" }
        }
        style={{
          willChange: "transform",
          animationPlayState: isHovered ? "paused" : "running",
        }}
      >
        {trackPhotos.map((photo, i) => (
          <div
            key={`${photo.src}-${i}`}
            className="flex-shrink-0 bg-canvas p-3 rounded-win shadow-card"
            style={{
              transform: `rotate(${ROTATIONS[i % ROTATIONS.length]}deg)`,
              width: "min(72vw, 320px)",
            }}
          >
            <div className="relative overflow-hidden rounded-win" style={{ aspectRatio: "4 / 3" }}>
              <img
                src={photo.src}
                alt={photo.alt}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <p className="px-1 pt-3 pb-1 text-sm font-medium text-center text-ink">
              {photo.caption}
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
