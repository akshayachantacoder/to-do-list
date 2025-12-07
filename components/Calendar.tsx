"use client"

import { useState } from "react"

interface CalendarProps {
  selectedDate: string
  onDateChange: (date: string) => void
  todosForDate: (date: string) => any[]
}

export default function Calendar({ selectedDate, onDateChange, todosForDate }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const daysInMonth = getDaysInMonth(currentMonth)
  const firstDay = getFirstDayOfMonth(currentMonth)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const blanks = Array.from({ length: firstDay }, (_, i) => i)

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const getDateString = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    return date.toISOString().split("T")[0]
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <button onClick={handlePrevMonth} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
          <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="text-lg font-semibold text-slate-900">
          {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </h2>
        <button onClick={handleNextMonth} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
          <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center text-sm font-semibold text-slate-600 py-2">
            {day}
          </div>
        ))}

        {blanks.map((_, i) => (
          <div key={`blank-${i}`} className="aspect-square" />
        ))}

        {days.map((day) => {
          const dateString = getDateString(day)
          const hasTask = todosForDate(dateString).length > 0
          const isSelected = dateString === selectedDate

          return (
            <button
              key={day}
              onClick={() => onDateChange(dateString)}
              className={`aspect-square p-1 rounded-lg font-medium text-sm transition-colors flex flex-col items-center justify-center ${
                isSelected
                  ? "bg-indigo-600 text-white"
                  : hasTask
                    ? "bg-indigo-100 text-indigo-900 hover:bg-indigo-200"
                    : "bg-slate-50 text-slate-900 hover:bg-slate-100"
              }`}
            >
              <div>{day}</div>
              {hasTask && <div className="text-xs">•</div>}
            </button>
          )
        })}
      </div>
    </div>
  )
}
