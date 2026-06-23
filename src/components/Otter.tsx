import React from "react"

/** Desktop mascot - faint ASCII otter wallpaper texture. */
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
