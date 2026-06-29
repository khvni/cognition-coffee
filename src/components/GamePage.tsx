import React, { useRef } from "react"
import { useApp } from "@/context/App"

/**
 * Shells a vendored, open-source game (loaded as-is from `static/vendor/games/`)
 * inside an OS window or site page, with a thin footer crediting the upstream repo.
 * The frame is served same-origin, so we hand keyboard focus straight to the game
 * on load and on pointer interaction - otherwise arrow/space keys hit the parent.
 */
type Props = { title: string; src: string; credit: string }

const Frame: React.FC<Props> = ({ title, src, credit }) => {
  const ref = useRef<HTMLIFrameElement>(null)
  const focusGame = () => ref.current?.contentWindow?.focus()
  return (
    <div className="flex h-full w-full flex-col bg-panel" onPointerDown={focusGame} onMouseEnter={focusGame}>
      <iframe
        ref={ref}
        src={src}
        title={`${title} game`}
        onLoad={focusGame}
        className="min-h-0 w-full flex-1 border-0"
      />
      <div className="shrink-0 truncate border-t border-line bg-chrome px-3 py-1.5 font-mono text-[11px] leading-none text-ink/55">
        OSS Credit: {credit}
      </div>
    </div>
  )
}

export const GamePage: React.FC<Props> = (props) => {
  const { experience } = useApp()
  if (experience === "os") return <Frame {...props} />
  return (
    <div className="mx-auto w-full max-w-page px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="sr-only">{props.title}</h1>
      <div className="h-[calc(100vh-220px)] min-h-[420px] overflow-hidden rounded-win border border-line shadow-window">
        <Frame {...props} />
      </div>
    </div>
  )
}
