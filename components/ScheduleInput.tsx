"use client"

import type React from "react"
import { useState } from "react"

interface ScheduleInputProps {
  onAdd: (text: string, time: string) => void
  selectedDate: string
}

export default function ScheduleInput({ onAdd, selectedDate }: ScheduleInputProps) {
  const [taskName, setTaskName] = useState("")
  const [taskTime, setTaskTime] = useState("09:00")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!taskName.trim()) {
      setError("Task name cannot be empty")
      return
    }

    onAdd(taskName, taskTime)
    setTaskName("")
    setTaskTime("09:00")
    setError("")
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900 mb-4">Add Task to Schedule</h2>
      <div className="flex gap-3 mb-3">
        <input
          type="text"
          value={taskName}
          onChange={(e) => {
            setError("")
            setTaskName(e.target.value)
          }}
          placeholder="Enter task name…"
          className="flex-1 px-4 py-3 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
        />
        <input
          type="time"
          value={taskTime}
          onChange={(e) => setTaskTime(e.target.value)}
          className="px-4 py-3 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm hover:shadow-md active:scale-95"
        >
          Add to Schedule
        </button>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <p className="text-xs text-slate-500">
        Date: {new Date(selectedDate).toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
      </p>
    </form>
  )
}
