"use client"

import type React from "react"
import { useState } from "react"

interface TodoInputProps {
  onAdd: (text: string, priority: "low" | "medium" | "high", dueDate?: string, dueTime?: string) => void
}

export default function TodoInput({ onAdd }: TodoInputProps) {
  const [value, setValue] = useState("")
  const [priority, setPriority] = useState<"low" | "medium" | "high">("low")
  const [dueDate, setDueDate] = useState<string>(new Date().toISOString().split("T")[0])
  const [dueTime, setDueTime] = useState<string>("09:00")
  const [error, setError] = useState("")
  const [showAdvanced, setShowAdvanced] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!value.trim()) {
      setError("Task cannot be empty")
      return
    }

    onAdd(value, priority, dueDate, dueTime)
    setValue("")
    setPriority("low")
    setDueDate(new Date().toISOString().split("T")[0])
    setDueTime("09:00")
    setError("")
    setShowAdvanced(false)
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={value}
          onChange={(e) => {
            setError("")
            setValue(e.target.value)
          }}
          placeholder="Enter a new task…"
          className="flex-1 px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm transition-all"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as "low" | "medium" | "high")}
          className="px-3 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm transition-all"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="px-3 py-3 rounded-xl bg-white border border-slate-300 text-slate-600 hover:text-slate-900 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          title="Advanced options"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            />
          </svg>
        </button>
        <button
          type="submit"
          className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors shadow-sm hover:shadow-md active:scale-95 transform"
        >
          Add
        </button>
      </div>

      {showAdvanced && (
        <div className="grid grid-cols-2 gap-3 mb-3 p-3 bg-slate-50 rounded-lg">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Due Time</label>
            <input
              type="time"
              value={dueTime}
              onChange={(e) => setDueTime(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            />
          </div>
        </div>
      )}

      {error && <p className="text-red-500 text-sm ml-0">{error}</p>}
    </form>
  )
}
