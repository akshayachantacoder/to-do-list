"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import type { Todo } from "@/app/page"

interface DashboardSummaryProps {
  todos: Todo[]
  selectedDate: string
  onDateChange: (date: string) => void
  completedCount: number
  totalCount: number
  getStatsForDate: (date: string) => { total: number; completed: number; remaining: number; progress: number }
}

export default function DashboardSummary({
  todos,
  selectedDate,
  onDateChange,
  completedCount,
  totalCount,
  getStatsForDate,
}: DashboardSummaryProps) {
  const priorityCounts = {
    high: todos.filter((t) => t.priority === "high").length,
    medium: todos.filter((t) => t.priority === "medium").length,
    low: todos.filter((t) => t.priority === "low").length,
  }

  const pieData = [
    { name: "High Priority", value: priorityCounts.high, color: "#dc2626" },
    { name: "Medium Priority", value: priorityCounts.medium, color: "#f59e0b" },
    { name: "Low Priority", value: priorityCounts.low, color: "#10b981" },
  ].filter((item) => item.value > 0)

  const pendingCount = totalCount - completedCount
  const completionPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0

  const dayStats = getStatsForDate(selectedDate)

  const allDates = Array.from(new Set(todos.map((t) => t.dueDate || new Date().toISOString().split("T")[0]))).sort()

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <div className="text-sm text-slate-600 mb-2">Total Tasks</div>
          <div className="text-3xl font-bold text-slate-900">{totalCount}</div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <div className="text-sm text-slate-600 mb-2">Completed</div>
          <div className="text-3xl font-bold text-green-600">{completedCount}</div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <div className="text-sm text-slate-600 mb-2">Remaining</div>
          <div className="text-3xl font-bold text-orange-600">{pendingCount}</div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <div className="text-sm text-slate-600 mb-2">Progress</div>
          <div className="text-3xl font-bold text-indigo-600">{Math.round(completionPercentage)}%</div>
        </div>
      </div>

      {/* Date Selector and Pie Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <label className="block text-sm font-semibold text-slate-900 mb-3">Select Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => onDateChange(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
          />
          <p className="text-xs text-slate-500 mt-2">
            Viewing tasks for:{" "}
            {new Date(selectedDate).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </p>
        </div>

        {pieData.length > 0 && (
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Tasks by Priority</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value} tasks`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Day-wise Statistics Table */}
      {allDates.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Day-wise Statistics</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-3 font-semibold text-slate-900">Date</th>
                  <th className="text-center py-3 px-3 font-semibold text-slate-900">Total</th>
                  <th className="text-center py-3 px-3 font-semibold text-slate-900">Completed</th>
                  <th className="text-center py-3 px-3 font-semibold text-slate-900">Remaining</th>
                  <th className="text-center py-3 px-3 font-semibold text-slate-900">Progress</th>
                </tr>
              </thead>
              <tbody>
                {allDates.map((date) => {
                  const stats = getStatsForDate(date)
                  const isSelected = date === selectedDate
                  return (
                    <tr
                      key={date}
                      className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${
                        isSelected ? "bg-indigo-50" : ""
                      }`}
                    >
                      <td className="py-3 px-3">
                        <span className={isSelected ? "font-semibold text-indigo-600" : "text-slate-700"}>
                          {new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </span>
                      </td>
                      <td className="text-center py-3 px-3 text-slate-900 font-medium">{stats.total}</td>
                      <td className="text-center py-3 px-3 text-green-600 font-medium">{stats.completed}</td>
                      <td className="text-center py-3 px-3 text-orange-600 font-medium">{stats.remaining}</td>
                      <td className="text-center py-3 px-3 text-indigo-600 font-medium">{stats.progress}%</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-900 mb-4">Daily Stats</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-900">{dayStats.total}</div>
            <div className="text-xs text-slate-600 mt-1">Total Tasks</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{dayStats.completed}</div>
            <div className="text-xs text-slate-600 mt-1">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{dayStats.remaining}</div>
            <div className="text-xs text-slate-600 mt-1">Remaining</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600">{dayStats.progress}%</div>
            <div className="text-xs text-slate-600 mt-1">Progress</div>
          </div>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2 mt-4">
          <div
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${dayStats.progress}%` }}
          />
        </div>
      </div>

      {/* Empty State */}
      {totalCount === 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center shadow-sm">
          <p className="text-slate-400 text-lg">No tasks yet. Go to Tasks Manager to create your first task!</p>
        </div>
      )}
    </div>
  )
}
