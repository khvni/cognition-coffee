import * as React from "react"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/Dialog"

type Props = { open: boolean; onOpenChange: (v: boolean) => void }

const ROWS: { keys: string[]; desc: string }[] = [
  { keys: ["W"], desc: "Close focused window" },
  { keys: ["M"], desc: "Minimize focused window" },
  { keys: ["F"], desc: "Toggle maximize / restore" },
  { keys: ["T"], desc: "Open Terminal" },
  { keys: ["H"], desc: "Go Home" },
  { keys: ["Esc"], desc: "Close focused window" },
  { keys: ["?"], desc: "Show this help" },
]

const Kbd: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <kbd className="inline-flex min-w-[24px] items-center justify-center rounded-md border border-line bg-panel px-1.5 py-0.5 font-mono text-[12px] text-ink">
    {children}
  </kbd>
)

/** Keyboard shortcuts help dialog, summoned with `?` in OS mode. */
export const ShortcutsHelp: React.FC<Props> = ({ open, onOpenChange }) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent>
      <DialogTitle>Keyboard shortcuts</DialogTitle>
      <DialogDescription className="mt-1">
        Single-letter shortcuts work anywhere outside a text field.
      </DialogDescription>
      <ul className="mt-4 flex flex-col gap-2.5">
        {ROWS.map((r) => (
          <li key={r.desc} className="flex items-center justify-between gap-4">
            <span className="text-[13px] text-ink">{r.desc}</span>
            <span className="flex shrink-0 items-center gap-1">
              {r.keys.map((key) => (
                <Kbd key={key}>{key}</Kbd>
              ))}
            </span>
          </li>
        ))}
      </ul>
    </DialogContent>
  </Dialog>
)
