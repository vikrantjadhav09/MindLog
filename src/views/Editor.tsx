import React, { useCallback, useEffect, useState } from 'react'
import MoodSelector from '../components/MoodSelector'
import { MoodLevel } from '../types'

const Editor: React.FC = () => {
  const [content, setContent] = useState('')
  const [mood, setMood] = useState<MoodLevel | undefined>(undefined)
  const [isSaving, setIsSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const canSave = content.trim().length > 0

  const handleSave = useCallback(() => {
    if (!canSave || isSaving) return

    setIsSaving(true)
    setSaved(false)

    // simulate local save
    setTimeout(() => {
      setIsSaving(false)
      setSaved(true)

      // reset editor
      setContent('')
      setMood(undefined)

      setTimeout(() => setSaved(false), 2000)
    }, 600)
  }, [canSave, isSaving])

  // Ctrl / Cmd + S support
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
        handleSave()
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [handleSave])

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-10">
      {/* Mood */}
      <section className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700">
        <MoodSelector value={mood} onChange={setMood} />
      </section>

      {/* Editor */}
      <section className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700">
        <textarea
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write freely. No pressure, no judgement."
          className="w-full resize-none bg-transparent outline-none text-slate-800 dark:text-slate-100 placeholder:text-slate-400"
        />
      </section>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={!canSave || isSaving}
          className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium disabled:opacity-40 hover:bg-indigo-700 transition"
        >
          {isSaving ? 'Saving…' : 'Save Entry'}
        </button>

        {saved && (
          <span className="text-sm text-emerald-600 animate-fade-in">
            ✓ Saved
          </span>
        )}
      </div>
    </div>
  )
}

export default Editor

