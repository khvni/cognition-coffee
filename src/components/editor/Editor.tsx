import React, { useEffect } from "react"
import { useEditor, EditorContent, type AnyExtension } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Link from "@tiptap/extension-link"

interface Props {
  content: string
  onChange: (html: string) => void
}

const MenuButton: React.FC<{
  active?: boolean
  onClick: () => void
  children: React.ReactNode
}> = ({ active, onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    className={`rounded px-2 py-1 font-mono text-xs transition ${
      active ? "bg-ink text-canvas" : "bg-surface text-muted hover:text-ink"
    }`}
  >
    {children}
  </button>
)

/* eslint-disable @typescript-eslint/no-explicit-any */
type Chain = any

export const TiptapEditor: React.FC<Props> = ({ content, onChange }) => {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
    ] as AnyExtension[],
    content,
    onUpdate: ({ editor: e }) => onChange(e.getHTML()),
  })

  useEffect(() => {
    if (editor && content && content !== editor.getHTML()) {
      editor.commands.setContent(content, { emitUpdate: false })
    }
  }, [content, editor])

  if (!editor) return null

  const cmd = (fn: (c: Chain) => Chain) => () => fn(editor.chain().focus()).run()

  return (
    <div className="rounded border border-line">
      <div className="flex flex-wrap gap-1 border-b border-line p-2">
        <MenuButton active={editor.isActive("bold")} onClick={cmd((c) => c.toggleBold())}>
          B
        </MenuButton>
        <MenuButton active={editor.isActive("italic")} onClick={cmd((c) => c.toggleItalic())}>
          I
        </MenuButton>
        <MenuButton active={editor.isActive("heading", { level: 2 })} onClick={cmd((c) => c.toggleHeading({ level: 2 }))}>
          H2
        </MenuButton>
        <MenuButton active={editor.isActive("heading", { level: 3 })} onClick={cmd((c) => c.toggleHeading({ level: 3 }))}>
          H3
        </MenuButton>
        <MenuButton active={editor.isActive("bulletList")} onClick={cmd((c) => c.toggleBulletList())}>
          List
        </MenuButton>
        <MenuButton active={editor.isActive("orderedList")} onClick={cmd((c) => c.toggleOrderedList())}>
          1.
        </MenuButton>
        <MenuButton active={editor.isActive("blockquote")} onClick={cmd((c) => c.toggleBlockquote())}>
          &ldquo;
        </MenuButton>
        <MenuButton
          active={editor.isActive("link")}
          onClick={() => {
            if (editor.isActive("link")) {
              (editor.chain().focus() as Chain).unsetLink().run()
              return
            }
            const url = window.prompt("URL")
            if (url) (editor.chain().focus() as Chain).setLink({ href: url }).run()
          }}
        >
          Link
        </MenuButton>
      </div>
      <EditorContent
        editor={editor}
        className="prose prose-sm max-w-none p-4 text-ink focus:outline-none [&_.tiptap]:min-h-[200px] [&_.tiptap]:outline-none"
      />
    </div>
  )
}
