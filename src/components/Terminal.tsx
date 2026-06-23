import React, { useCallback, useEffect, useRef, useState } from "react"
import { useApp } from "@/context/App"

type FsNode = { name: string; type: "file" | "dir"; path?: string; children?: FsNode[] }

const FS: FsNode = {
  name: "/",
  type: "dir",
  children: [
    { name: "about.tsx", type: "file", path: "/about" },
    { name: "blog.tsx", type: "file", path: "/blog" },
    { name: "community.tsx", type: "file", path: "/community" },
    { name: "menu.tsx", type: "file", path: "/menu" },
    { name: "scott.png", type: "file", path: "/scott" },
  ],
}

const COMMANDS: Record<string, string> = {
  help: "list available commands",
  ls: "list files in current directory",
  cd: "change directory (usage: cd <dir>)",
  cat: "view file info (usage: cat <file>)",
  open: "open page in OS (usage: open <file>)",
  clear: "clear the terminal",
  pwd: "print working directory",
}

const BANNER = `   ____                  _ _   _              ____       __  __
  / ___|___   __ _ _ __ (_) |_(_) ___  _ __  / ___|___  / _|/ _| ___  ___
 | |   / _ \\ / _\` | '_ \\| | __| |/ _ \\| '_ \\| |   / _ \\| |_| |_ / _ \\/ _ \\
 | |__| (_) | (_| | | | | | |_| | (_) | | | | |__| (_) |  _|  _|  __/  __/
  \\____\\___/ \\__, |_| |_|_|\\__|_|\\___/|_| |_|\\____\\___/|_| |_|  \\___|\\___|
             |___/`

type Line = { id: number; content: string; type: "output" | "prompt" | "banner" }

function resolve(cwd: string, target: string): string {
  if (target === "/") return "/"
  if (target === "..") return "/"
  if (target === "." || target === "") return cwd
  if (target.startsWith("/")) return target
  return cwd === "/" ? `/${target}` : `${cwd}/${target}`
}

function findNode(path: string): FsNode | null {
  if (path === "/" || path === "") return FS
  const parts = path.split("/").filter(Boolean)
  let node: FsNode = FS
  for (const part of parts) {
    const child = node.children?.find((c) => c.name === part)
    if (!child) return null
    node = child
  }
  return node
}

export const Terminal: React.FC = () => {
  const { open } = useApp()
  const [lines, setLines] = useState<Line[]>([])
  const [input, setInput] = useState("")
  const [cwd, setCwd] = useState("/")
  const [history, setHistory] = useState<string[]>([])
  const [histIdx, setHistIdx] = useState(-1)
  const seq = useRef(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const addLine = useCallback((content: string, type: Line["type"] = "output") => {
    const id = ++seq.current
    setLines((prev) => [...prev, { id, content, type }])
  }, [])

  useEffect(() => {
    addLine(BANNER, "banner")
    addLine("Type help to list commands.", "output")
    addLine("", "output")
  }, [addLine])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [lines])

  const exec = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim()
      addLine(`ali@cognition ${cwd === "/" ? "~" : cwd} $ ${trimmed}`, "prompt")

      if (!trimmed) return

      const [command, ...args] = trimmed.split(/\s+/)
      const arg = args.join(" ")

      switch (command) {
        case "help": {
          Object.entries(COMMANDS).forEach(([k, v]) => {
            addLine(`  ${k.padEnd(8)} ${v}`)
          })
          break
        }
        case "ls": {
          const target = arg ? resolve(cwd, arg) : cwd
          const node = findNode(target)
          if (!node || node.type !== "dir") {
            addLine(`ls: cannot access '${arg || target}': No such directory`)
            break
          }
          const items = node.children ?? []
          const listing = items.map((c) => (c.type === "dir" ? `${c.name}/` : c.name)).join("  ")
          addLine(listing || "(empty)")
          break
        }
        case "cd": {
          if (!arg || arg === "~" || arg === "/") {
            setCwd("/")
            break
          }
          const target = resolve(cwd, arg)
          const node = findNode(target)
          if (!node) {
            addLine(`cd: no such file or directory: ${arg}`)
            break
          }
          if (node.type !== "dir") {
            addLine(`cd: not a directory: ${arg}`)
            break
          }
          setCwd(target)
          break
        }
        case "cat": {
          if (!arg) {
            addLine("usage: cat <file>")
            break
          }
          const target = resolve(cwd, arg)
          const node = findNode(target)
          if (!node) {
            addLine(`cat: ${arg}: No such file or directory`)
            break
          }
          if (node.type === "dir") {
            addLine(`cat: ${arg}: Is a directory`)
            break
          }
          const descriptions: Record<string, string> = {
            "about.tsx": "About - Who is Ali Khani? DevRel strategist, builder, community architect.",
            "blog.tsx": "Blog - Field notes on AI-native community building and DevRel.",
            "community.tsx": "Community - Events, chapters, and feedback loops.",
            "menu.tsx": "Menu - Browse the catalog, pick a program, customize the execution.",
            "scott.png": "[binary: image/png - 480x400 - it's just Scott.]",
          }
          addLine(descriptions[node.name] ?? `${node.name}: (no preview available)`)
          break
        }
        case "open": {
          if (!arg) {
            addLine("usage: open <file>")
            break
          }
          const target = resolve(cwd, arg)
          const node = findNode(target)
          if (!node) {
            addLine(`open: ${arg}: No such file or directory`)
            break
          }
          if (!node.path) {
            addLine(`open: ${arg}: cannot open (no associated page)`)
            break
          }
          addLine(`Opening ${node.name}...`)
          setTimeout(() => open(node.path!), 150)
          break
        }
        case "pwd": {
          addLine(cwd === "/" ? "/" : cwd)
          break
        }
        case "clear": {
          setLines([])
          break
        }
        default: {
          addLine(`command not found: ${command}`)
          addLine("Type 'help' for available commands.")
        }
      }
    },
    [cwd, addLine, open],
  )

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      const cmd = input
      setInput("")
      setHistory((prev) => (cmd.trim() ? [...prev, cmd] : prev))
      setHistIdx(-1)
      exec(cmd)
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      if (!history.length) return
      const idx = histIdx < 0 ? history.length - 1 : Math.max(0, histIdx - 1)
      setHistIdx(idx)
      setInput(history[idx])
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (histIdx < 0) return
      const idx = histIdx + 1
      if (idx >= history.length) {
        setHistIdx(-1)
        setInput("")
      } else {
        setHistIdx(idx)
        setInput(history[idx])
      }
    } else if (e.key === "Tab") {
      e.preventDefault()
      if (!input.trim()) return
      const parts = input.trim().split(/\s+/)
      const partial = parts.length > 1 ? parts[parts.length - 1] : parts[0]
      const isCmd = parts.length === 1
      if (isCmd) {
        const match = Object.keys(COMMANDS).find((c) => c.startsWith(partial))
        if (match) setInput(match + " ")
      } else {
        const node = findNode(cwd)
        const files = node?.children ?? []
        const match = files.find((f) => f.name.startsWith(partial))
        if (match) {
          parts[parts.length - 1] = match.name
          setInput(parts.join(" "))
        }
      }
    }
  }

  return (
    <div
      className="flex h-full flex-col bg-[#1a1a1a] font-mono text-[13px] leading-relaxed text-[#e0e0e0]"
      onClick={() => inputRef.current?.focus()}
    >
      <div ref={scrollRef} className="win-scroll min-h-0 flex-1 overflow-y-auto overflow-x-auto p-3">
        {lines.map((line) => (
          <div
            key={line.id}
            className={
              line.type === "banner"
                ? "whitespace-pre text-accent-ink text-[11px] leading-none"
                : line.type === "prompt"
                  ? "whitespace-pre-wrap text-[#8ec07c] mt-1.5"
                  : "whitespace-pre-wrap text-[#e0e0e0]"
            }
          >
            {line.content}
          </div>
        ))}
        <div className="mt-1.5 flex items-center gap-1.5">
          <span className="text-[#8ec07c]">ali@cognition {cwd === "/" ? "~" : cwd} $</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            className="flex-1 border-none bg-transparent text-[#e0e0e0] outline-none caret-accent-ink [&:focus-visible]:shadow-none"
            autoFocus
            spellCheck={false}
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  )
}
