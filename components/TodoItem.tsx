"use client"

import { useState } from "react"
import type { Todo } from "@/app/page"

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => void
  onUpdate: (id: string, text: string, priority: "low" | "medium" | "high", dueDate?: string, dueTime?: string) => void
  onDelete: (id: string) => void
  onImportant: (id: string) => void
}

const priorityColors = {
  low: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-red-100 text-red-800",
}

export default function TodoItem({ todo, onToggle, onUpdate, onDelete, onImportant }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)
  const [editPriority, setEditPriority] = useState(todo.priority)
  const [editDueDate, setEditDueDate] = useState(todo.dueDate || "")
  const [editDueTime, setEditDueTime] = useState(todo.dueTime || "09:00")

  const handleSave = () => {
    if (editText.trim()) {
      onUpdate(todo.id, editText.trim(), editPriority, editDueDate, editDueTime)
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setEditText(todo.text)
    setEditPriority(todo.priority)
    setEditDueDate(todo.dueDate || "")
    setEditDueTime(todo.dueTime || "09:00")
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex gap-2 items-center flex-wrap">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            className="w-5 h-5 rounded border-slate-300 text-indigo-600 cursor-pointer"
          />
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            autoFocus
            className="flex-1 px-3 py-1 rounded border border-indigo-300 bg-indigo-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm min-w-xs"
          />
          <select
            value={editPriority}
            onChange={(e) => setEditPriority(e.target.value as "low" | "medium" | "high")}
            className="px-2 py-1 rounded border border-slate-300 bg-white text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="low">Low</option>
            <option value="medium">Med</option>
            <option value="high">High</option>
          </select>
          <input
            type="date"
            value={editDueDate}
            onChange={(e) => setEditDueDate(e.target.value)}
            className="px-2 py-1 rounded border border-slate-300 bg-white text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="time"
            value={editDueTime}
            onChange={(e) => setEditDueTime(e.target.value)}
            className="px-2 py-1 rounded border border-slate-300 bg-white text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleSave}
            className="px-3 py-1 bg-indigo-600 text-white text-xs rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="px-3 py-1 bg-slate-200 text-slate-900 text-xs rounded-lg hover:bg-slate-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-3 group ${
        todo.completed ? "opacity-75" : ""
      }`}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="w-5 h-5 rounded border-slate-300 text-indigo-600 cursor-pointer flex-shrink-0"
      />

      <button
        onClick={() => onImportant(todo.id)}
        className={`text-lg flex-shrink-0 transition-transform hover:scale-110 ${
          todo.isImportant ? "text-amber-500" : "text-slate-300"
        }`}
        title="Mark as important"
      >
        {todo.isImportant ? "★" : "☆"}
      </button>

      <div className="flex-1">
        <p className={`text-base ${todo.completed ? "line-through text-slate-400" : "text-slate-900"}`}>{todo.text}</p>
        <p className="text-xs text-slate-500 mt-1">
          {todo.dueDate} at {todo.dueTime}
        </p>
      </div>

      <span className={`px-2.5 py-1 rounded-full text-xs font-medium flex-shrink-0 ${priorityColors[todo.priority]}`}>
        {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
      </span>

      <button
        onClick={() => setIsEditing(true)}
        className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
        title="Edit task"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      </button>

      <button
        onClick={() => onDelete(todo.id)}
        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
        title="Delete task"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  )
}
