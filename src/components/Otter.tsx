import React from "react"

/**
 * Desktop mascot — an otter floating on its back, coding on a laptop resting on
 * its chest (a nod to the Devin otter). Rendered as faint monospace ASCII so it
 * reads as wallpaper texture, never competing with the app icons.
 */
const OTTER = String.raw`
               .-"""-.
             .'  ^   ^ '.             ~  ~  ~  ~
            /    (o)(o)   \         ~   the cloud is
           |      <  >     |       ~   just someone
           |      '..'     |      ~   else's otter
         __ \           / __
        /   '.________.'    \
        |  .------------.    |
        |  | > devin     |   |
        |  | brewing...  |   |
         \ '------------'   /
          '._   ~  ~  ~  _.'
       ~~~~~ '-.______.-' ~~~~~
      ~  ~  ~  ~  ~  ~  ~  ~  ~  ~
`

export const Otter: React.FC = () => (
  <pre
    aria-hidden="true"
    className="pointer-events-none select-none font-mono text-[11px] leading-[1.15] text-ink/20 sm:text-[13px]"
  >
    {OTTER}
  </pre>
)
