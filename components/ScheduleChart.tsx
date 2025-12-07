"use client"

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Todo } from "@/app/page"

interface ScheduleChartProps {
  tasks: Todo[]
}

export default function ScheduleChart({ tasks }: ScheduleChartProps) {
  // Calculate time distribution by priority
  const priorityData = tasks.reduce(
    (acc, task) => {
      const existing = acc.find((item) => item.name === task.priority)
      if (existing) {
        existing.value += 1
      } else {
        acc.push({ name: task.priority.charAt(0).toUpperCase() + task.priority.slice(1), value: 1 })
      }
      return acc
    },
    [] as { name: string; value: number }[],
  )

  const COLORS = {
    Low: "#10b981",
    Medium: "#f59e0b",
    High: "#ef4444",
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Task Distribution by Priority</CardTitle>
        <CardDescription>Breakdown of scheduled tasks</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center h-80">
        {priorityData.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-400">No tasks scheduled yet</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={priorityData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {priorityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}
