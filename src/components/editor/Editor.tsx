import React, { useEffect, useCallback } from "react"
import { useEditor, EditorContent, type AnyExtension } from "@tiptap/react"
import { Extension } from "@tiptap/core"
import { Plugin, PluginKey } from "@tiptap/pm/state"
import StarterKit from "@tiptap/starter-kit"
import Link from "@tiptap/extension-link"
import Image from "@tiptap/extension-image"

const LinkShortcut = Extension.create({
  addKeyboardShortcuts() {
    return {
      "Mod-k": () => {
        const { editor } = this
        if (editor.isActive("link")) return editor.chain().focus().unsetLink().run()
        const url = window.prompt("URL")
        if (!url) return true
        if (editor.state.selection.empty) {
          return editor.chain().focus().insertContent(`<a href="${url}">${url}</a>`).run()
        }
        return editor.chain().focus().setLink({ href: url }).run()
      },
    }
  },
})

async function uploadImage(file: File): Promise<string | null> {
  const form = new FormData()
  form.append("file", file)
  const res = await fetch("/api/upload", { method: "POST", body: form })
  if (!res.ok) {
    const data = await res.json().catch(() => ({ error: "Upload failed" }))
    window.alert(data.error || "Upload failed")
    return null
  }
  const { url } = await res.json() as { url: string }
  return url
}

const ImagePaste = Extension.create({
  addProseMirrorPlugins() {
    const editor = this.editor
    return [
      new Plugin({
        key: new PluginKey("imagePaste"),
        props: {
          handlePaste: (view, event) => {
            const files = Array.from(event.clipboardData?.files ?? []).filter((f) =>
              f.type.startsWith("image/")
            )
            if (!files.length) return false
            event.preventDefault()
            files.forEach(async (file) => {
              const url = await uploadImage(file)
              if (url) editor.chain().focus().setImage({ src: url, alt: file.name }).run()
            })
            return true
          },
          handleDrop: (view, event) => {
            const files = Array.from(event.dataTransfer?.files ?? []).filter((f) =>
              f.type.startsWith("image/")
            )
            if (!files.length) return false
            event.preventDefault()
            const dropPos = view.posAtCoords({ left: event.clientX, top: event.clientY })?.pos
            files.forEach(async (file) => {
              const url = await uploadImage(file)
              if (url) {
                const chain = editor.chain().focus()
                if (dropPos != null) chain.insertContentAt(dropPos, { type: "image", attrs: { src: url, alt: file.name } })
                else chain.setImage({ src: url, alt: file.name })
                chain.run()
              }
            })
            return true
          },
        },
      }),
    ]
  },
})

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
      Image.configure({ inline: false, allowBase64: false }),
      LinkShortcut,
      ImagePaste,
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

  const handleImagePick = useCallback(() => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.onchange = async () => {
      const file = input.files?.[0]
      if (!file) return
      const url = await uploadImage(file)
      if (url) editor.chain().focus().setImage({ src: url, alt: file.name }).run()
    }
    input.click()
  }, [editor])

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
        <MenuButton onClick={handleImagePick}>Img</MenuButton>
      </div>
      <EditorContent
        editor={editor}
        className="prose prose-sm max-w-none p-4 text-ink focus:outline-none [&_.tiptap]:min-h-[200px] [&_.tiptap]:outline-none"
      />
    </div>
  )
}
