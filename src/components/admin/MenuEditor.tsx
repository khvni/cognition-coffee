import React, { useState } from "react"

interface OrderingOption {
  label: string
  choices: string[]
  multi?: boolean
}

interface MenuItem {
  id: string
  name: string
  image: string
  subcaption: string
  description: string
  breakdown: string[]
  orderingOptions: OrderingOption[]
}

interface MenuSection {
  id: string
  title: string
  subtitle: string
  items: MenuItem[]
}

interface SaveResult {
  ok: boolean
  error?: string
  data?: MenuSection[]
}

interface MenuEditorProps {
  data: MenuSection[]
  onSave: (data: MenuSection[]) => Promise<SaveResult>
  onBack: () => void
}

const inputClass =
  "w-full rounded border border-line bg-canvas px-3 py-2 text-ink placeholder:text-muted focus:border-accent focus:outline-none"

function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
}

function emptyItem(): MenuItem {
  return { id: "", name: "", image: "", subcaption: "", description: "", breakdown: [], orderingOptions: [] }
}

function cloneItem(item: MenuItem): MenuItem {
  return {
    ...item,
    breakdown: [...item.breakdown],
    orderingOptions: item.orderingOptions.map((o) => ({ ...o, choices: [...o.choices] })),
  }
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${checked ? "bg-accent" : "bg-chrome"}`}
    >
      <span
        className={`absolute top-0.5 h-4 w-4 rounded-full bg-canvas shadow-sm transition-all ${
          checked ? "left-[18px]" : "left-0.5"
        }`}
      />
    </button>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="font-mono text-xs text-muted">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  )
}

function RemoveButton({ onClick, label = "Remove" }: { onClick: () => void; label?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="shrink-0 rounded border border-line px-2 py-1 font-mono text-xs text-red-600 hover:bg-red-50"
    >
      {label}
    </button>
  )
}

export function MenuEditor({ data, onSave, onBack }: MenuEditorProps) {
  const [sections, setSections] = useState<MenuSection[]>(data)
  const [editingItem, setEditingItem] = useState<{ sectionId: string; index: number; isNew: boolean } | null>(null)
  const [draft, setDraft] = useState<MenuItem>(emptyItem())
  const [draftSectionId, setDraftSectionId] = useState("")
  const [idEdited, setIdEdited] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [saved, setSaved] = useState(false)
  const [editSectionId, setEditSectionId] = useState<string | null>(null)
  const [sectionDraft, setSectionDraft] = useState({ title: "", subtitle: "" })

  function flashSaved() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  function openEdit(sectionId: string, index: number) {
    const item = sections.find((s) => s.id === sectionId)?.items[index]
    if (!item) return
    setDraft(cloneItem(item))
    setDraftSectionId(sectionId)
    setEditingItem({ sectionId, index, isNew: false })
    setIdEdited(true)
    setError("")
  }

  function openNew(sectionId: string) {
    setDraft(emptyItem())
    setDraftSectionId(sectionId)
    setEditingItem({ sectionId, index: -1, isNew: true })
    setIdEdited(false)
    setError("")
  }

  function handleNameChange(value: string) {
    setDraft((d) => ({ ...d, name: value }))
    if (!idEdited) setDraft((d) => ({ ...d, id: slugify(value) }))
  }

  function updateDraft(patch: Partial<MenuItem>) {
    setDraft((d) => ({ ...d, ...patch }))
  }

  function updateBreakdown(i: number, value: string) {
    setDraft((d) => ({ ...d, breakdown: d.breakdown.map((b, idx) => (idx === i ? value : b)) }))
  }
  function addBreakdown() {
    setDraft((d) => ({ ...d, breakdown: [...d.breakdown, ""] }))
  }
  function removeBreakdown(i: number) {
    setDraft((d) => ({ ...d, breakdown: d.breakdown.filter((_, idx) => idx !== i) }))
  }

  function updateOption(i: number, patch: Partial<OrderingOption>) {
    setDraft((d) => ({
      ...d,
      orderingOptions: d.orderingOptions.map((o, idx) => (idx === i ? { ...o, ...patch } : o)),
    }))
  }
  function addOption() {
    setDraft((d) => ({ ...d, orderingOptions: [...d.orderingOptions, { label: "", choices: [] }] }))
  }
  function removeOption(i: number) {
    setDraft((d) => ({ ...d, orderingOptions: d.orderingOptions.filter((_, idx) => idx !== i) }))
  }

  function updateChoice(optIdx: number, choiceIdx: number, value: string) {
    setDraft((d) => ({
      ...d,
      orderingOptions: d.orderingOptions.map((o, idx) =>
        idx === optIdx ? { ...o, choices: o.choices.map((c, cidx) => (cidx === choiceIdx ? value : c)) } : o
      ),
    }))
  }
  function addChoice(optIdx: number) {
    setDraft((d) => ({
      ...d,
      orderingOptions: d.orderingOptions.map((o, idx) =>
        idx === optIdx ? { ...o, choices: [...o.choices, ""] } : o
      ),
    }))
  }
  function removeChoice(optIdx: number, choiceIdx: number) {
    setDraft((d) => ({
      ...d,
      orderingOptions: d.orderingOptions.map((o, idx) =>
        idx === optIdx ? { ...o, choices: o.choices.filter((_, cidx) => cidx !== choiceIdx) } : o
      ),
    }))
  }

  function cleanItem(item: MenuItem): MenuItem {
    const id = item.id.trim() || slugify(item.name)
    return {
      id,
      name: item.name.trim(),
      image: item.image.trim(),
      subcaption: item.subcaption.trim(),
      description: item.description.trim(),
      breakdown: item.breakdown.map((b) => b.trim()).filter(Boolean),
      orderingOptions: item.orderingOptions
        .filter((o) => o.label.trim())
        .map((o) => ({
          label: o.label.trim(),
          choices: o.choices.map((c) => c.trim()).filter(Boolean),
          ...(o.multi ? { multi: true } : {}),
        })),
    }
  }

  async function persist(newSections: MenuSection[]) {
    setSaving(true)
    setError("")
    const result = await onSave(newSections)
    setSaving(false)
    if (result.ok) {
      setSections(result.data ?? newSections)
      flashSaved()
    } else {
      setError(result.error ?? "Save failed")
    }
    return result
  }

  async function handleSaveItem() {
    if (!draft.name.trim()) { setError("Name required"); return }
    if (!editingItem) return

    const clean = cleanItem(draft)
    if (!clean.id) { setError("ID required"); return }

    const newSections = sections.map((s) => ({ ...s, items: [...s.items] }))

    if (editingItem.isNew) {
      const target = newSections.find((s) => s.id === draftSectionId)
      if (target) target.items.push(clean)
    } else {
      const oldSection = newSections.find((s) => s.id === editingItem.sectionId)
      if (oldSection) oldSection.items.splice(editingItem.index, 1)
      const target = newSections.find((s) => s.id === draftSectionId)
      if (target) {
        const insertIdx = editingItem.sectionId === draftSectionId ? editingItem.index : target.items.length
        target.items.splice(insertIdx, 0, clean)
      }
    }

    const result = await persist(newSections)
    if (result.ok) setEditingItem(null)
  }

  async function handleDeleteItem(sectionId: string, index: number) {
    const item = sections.find((s) => s.id === sectionId)?.items[index]
    if (!item) return
    if (!window.confirm(`Delete "${item.name}"?`)) return

    const newSections = sections.map((s) => ({
      ...s,
      items: s.id === sectionId ? s.items.filter((_, idx) => idx !== index) : [...s.items],
    }))
    await persist(newSections)
  }

  function startEditSection(sectionId: string) {
    const s = sections.find((sec) => sec.id === sectionId)
    if (!s) return
    setSectionDraft({ title: s.title, subtitle: s.subtitle })
    setEditSectionId(sectionId)
  }

  async function saveSection() {
    if (!editSectionId) return
    const newSections = sections.map((s) =>
      s.id === editSectionId ? { ...s, title: sectionDraft.title.trim(), subtitle: sectionDraft.subtitle.trim() } : s
    )
    const result = await persist(newSections)
    if (result.ok) setEditSectionId(null)
  }

  if (editingItem) {
    return (
      <div className="mx-auto max-w-reader px-6 py-8">
        <button onClick={() => setEditingItem(null)} className="font-mono text-xs text-muted hover:text-ink">
          &larr; Back to menu
        </button>
        <h1 className="mt-4 text-2xl font-medium text-ink">
          {editingItem.isNew ? "New menu item" : "Edit menu item"}
        </h1>

        <div className="mt-6 space-y-5">
          <Field label="Category">
            <select
              value={draftSectionId}
              onChange={(e) => setDraftSectionId(e.target.value)}
              className={inputClass}
            >
              {sections.map((s) => (
                <option key={s.id} value={s.id}>{s.title}</option>
              ))}
            </select>
          </Field>

          <Field label="Name">
            <input
              type="text"
              value={draft.name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="e.g. The Roasters' Guild"
              className={inputClass}
            />
          </Field>

          <Field label="ID (URL-safe slug)">
            <input
              type="text"
              value={draft.id}
              onChange={(e) => { setIdEdited(true); setDraft((d) => ({ ...d, id: slugify(e.target.value) })) }}
              placeholder="auto-generated-from-name"
              className={`${inputClass} font-mono text-sm`}
            />
          </Field>

          <Field label="Image path">
            <input
              type="text"
              value={draft.image}
              onChange={(e) => updateDraft({ image: e.target.value })}
              placeholder="/menu/item-name.jpg"
              className={`${inputClass} font-mono text-sm`}
            />
          </Field>

          <Field label="Subcaption">
            <input
              type="text"
              value={draft.subcaption}
              onChange={(e) => updateDraft({ subcaption: e.target.value })}
              placeholder="One-line summary"
              className={inputClass}
            />
          </Field>

          <Field label="Description">
            <textarea
              value={draft.description}
              onChange={(e) => updateDraft({ description: e.target.value })}
              rows={4}
              placeholder="Full description of this menu item"
              className={`${inputClass} resize-y`}
            />
          </Field>

          <div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-muted">Breakdown</span>
              <button type="button" onClick={addBreakdown} className="font-mono text-xs text-muted hover:text-ink">
                + Add row
              </button>
            </div>
            <div className="mt-1 space-y-2">
              {draft.breakdown.map((b, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    type="text"
                    value={b}
                    onChange={(e) => updateBreakdown(i, e.target.value)}
                    placeholder={`Step ${i + 1}`}
                    className={inputClass}
                  />
                  <RemoveButton onClick={() => removeBreakdown(i)} />
                </div>
              ))}
              {draft.breakdown.length === 0 && (
                <p className="text-sm text-muted">No breakdown steps yet.</p>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-muted">Ordering options</span>
              <button type="button" onClick={addOption} className="font-mono text-xs text-muted hover:text-ink">
                + Add option
              </button>
            </div>
            <div className="mt-2 space-y-4">
              {draft.orderingOptions.map((opt, i) => (
                <div key={i} className="rounded border border-line p-4">
                  <div className="flex items-start gap-2">
                    <input
                      type="text"
                      value={opt.label}
                      onChange={(e) => updateOption(i, { label: e.target.value })}
                      placeholder="Option label (e.g. 'Recruitment Radar')"
                      className={inputClass}
                    />
                    <RemoveButton onClick={() => removeOption(i)} />
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <Toggle checked={!!opt.multi} onChange={(v) => updateOption(i, { multi: v })} />
                    <span className="font-mono text-xs text-muted">Multi-select</span>
                  </div>
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-muted">Choices</span>
                      <button type="button" onClick={() => addChoice(i)} className="font-mono text-xs text-muted hover:text-ink">
                        + Add choice
                      </button>
                    </div>
                    {opt.choices.map((c, ci) => (
                      <div key={ci} className="flex gap-2">
                        <input
                          type="text"
                          value={c}
                          onChange={(e) => updateChoice(i, ci, e.target.value)}
                          placeholder={`Choice ${ci + 1}`}
                          className={inputClass}
                        />
                        <RemoveButton onClick={() => removeChoice(i, ci)} />
                      </div>
                    ))}
                    {opt.choices.length === 0 && (
                      <p className="text-sm text-muted">No choices yet.</p>
                    )}
                  </div>
                </div>
              ))}
              {draft.orderingOptions.length === 0 && (
                <p className="text-sm text-muted">No ordering options yet.</p>
              )}
            </div>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleSaveItem}
              disabled={saving}
              className="rounded bg-ink px-4 py-2 font-mono text-sm text-canvas hover:bg-accent-ink disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save item"}
            </button>
            <button type="button" onClick={() => setEditingItem(null)} className="font-mono text-sm text-muted hover:text-ink">
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-wide px-6 py-8">
      <button onClick={onBack} className="font-mono text-xs text-muted hover:text-ink">
        &larr; Back to admin
      </button>
      <div className="mt-4 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-medium text-ink">Menu</h1>
        {saved && <p className="text-sm text-green-600">Saved.</p>}
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

      <div className="mt-6 space-y-10">
        {sections.map((section) => (
          <div key={section.id}>
            {editSectionId === section.id ? (
              <div className="rounded border border-line p-4">
                <input
                  type="text"
                  value={sectionDraft.title}
                  onChange={(e) => setSectionDraft((d) => ({ ...d, title: e.target.value }))}
                  placeholder="Section title"
                  className={inputClass}
                />
                <input
                  type="text"
                  value={sectionDraft.subtitle}
                  onChange={(e) => setSectionDraft((d) => ({ ...d, subtitle: e.target.value }))}
                  placeholder="Section subtitle"
                  className={`${inputClass} mt-2`}
                />
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={saveSection}
                    disabled={saving}
                    className="rounded bg-ink px-3 py-1.5 font-mono text-xs text-canvas hover:bg-accent-ink disabled:opacity-50"
                  >
                    {saving ? "Saving…" : "Save"}
                  </button>
                  <button type="button" onClick={() => setEditSectionId(null)} className="font-mono text-xs text-muted hover:text-ink">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h2 className="text-xl font-medium text-ink">{section.title}</h2>
                  <p className="text-sm text-muted">{section.subtitle}</p>
                </div>
                <button
                  type="button"
                  onClick={() => startEditSection(section.id)}
                  className="shrink-0 rounded border border-line px-2 py-1 font-mono text-xs text-muted hover:text-ink"
                >
                  Edit section
                </button>
              </div>
            )}

            <ul className="mt-4 divide-y divide-line border-y border-line">
              {section.items.map((item, i) => (
                <li key={item.id} className="flex items-center justify-between gap-4 py-4">
                  <div className="min-w-0">
                    <p className="font-medium text-ink">{item.name}</p>
                    <p className="truncate text-sm text-muted">{item.subcaption}</p>
                    <p className="mt-0.5 font-mono text-xs text-muted">
                      {item.orderingOptions.length} options · {item.breakdown.length} steps
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button
                      type="button"
                      onClick={() => openEdit(section.id, i)}
                      className="rounded border border-line px-2 py-1 font-mono text-xs text-muted hover:text-ink"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteItem(section.id, i)}
                      className="rounded border border-line px-2 py-1 font-mono text-xs text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
              {section.items.length === 0 && (
                <li className="py-4 text-sm text-muted">No items in this section.</li>
              )}
            </ul>

            <button
              type="button"
              onClick={() => openNew(section.id)}
              className="mt-3 rounded border border-line px-3 py-1.5 font-mono text-xs text-muted hover:text-ink"
            >
              + Add item to {section.title}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
