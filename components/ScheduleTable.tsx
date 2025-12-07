"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Todo } from "@/app/page"

interface ScheduleTableProps {
  tasks: Todo[]
}

const priorityColors = {
  low: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-red-100 text-red-800",
}

export default function ScheduleTable({ tasks }: ScheduleTableProps) {
  const sortedTasks = [...tasks].sort((a, b) => {
    const timeA = a.dueTime || "00:00"
    const timeB = b.dueTime || "00:00"
    return timeA.localeCompare(timeB)
  })

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50">
            <TableHead className="text-slate-900 font-semibold">Time</TableHead>
            <TableHead className="text-slate-900 font-semibold">Task</TableHead>
            <TableHead className="text-slate-900 font-semibold">Priority</TableHead>
            <TableHead className="text-slate-900 font-semibold">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedTasks.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-slate-400 py-8">
                No tasks scheduled yet
              </TableCell>
            </TableRow>
          ) : (
            sortedTasks.map((task) => (
              <TableRow key={task.id} className="hover:bg-slate-50 transition-colors border-slate-200">
                <TableCell className="font-mono text-indigo-600 font-semibold">{task.dueTime}</TableCell>
                <TableCell className={task.completed ? "line-through text-slate-400" : "text-slate-900"}>
                  {task.text}
                </TableCell>
                <TableCell>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      task.completed ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {task.completed ? "Completed" : "Pending"}
                  </span>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
