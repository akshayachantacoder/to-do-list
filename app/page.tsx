"use client"

import { useEffect, useState } from "react"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import Navigation from "@/components/layout/Navigation"
import TodoInput from "@/components/TodoInput"
import TodoItem from "@/components/TodoItem"
import FilterBar from "@/components/FilterBar"
import Calendar from "@/components/Calendar"
import ScheduleInput from "@/components/ScheduleInput"
import ScheduleChart from "@/components/ScheduleChart"
import ScheduleTable from "@/components/ScheduleTable"
import DashboardSummary from "@/components/dashboard/DashboardSummary"
import ProfilePage from "@/components/ProfilePage"

export interface Todo {
  id: number | string
  text: string
  completed: boolean
  priority: "low" | "medium" | "high"
  dueDate?: string
  dueTime?: string
  isImportant?: boolean
  createdAt?: number
}

export interface UserProfile {
  name: string
  email: string
  image: string
  bio: string
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [mounted, setMounted] = useState(false)
  const [currentPage, setCurrentPage] = useState<
    "dashboard" | "tasks-manager" | "calendar" | "timetable" | "notifications" | "important" | "profile"
  >("dashboard")
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split("T")[0])
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "User",
    email: "user@example.com",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=user",
    bio: "",
  })

  useEffect(() => {
    loadUserData()
  }, [])

  const loadUserData = () => {
    try {
      const storedTodos = localStorage.getItem("todos")
      if (storedTodos) {
        setTodos(JSON.parse(storedTodos))
      }

      const storedProfile = localStorage.getItem("userProfile")
      if (storedProfile) {
        setUserProfile(JSON.parse(storedProfile))
      }
    } catch (error) {
      console.error("Failed to load data from localStorage:", error)
    } finally {
      setMounted(true)
    }
  }

  const addTodo = (text: string, priority: "low" | "medium" | "high" = "low", dueDate?: string, dueTime?: string) => {
    if (!text.trim()) return

    const newTodo: Todo = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
      priority,
      dueDate: dueDate || new Date().toISOString().split("T")[0],
      dueTime: dueTime || "09:00",
      isImportant: false,
      createdAt: Date.now(),
    }

    const updatedTodos = [newTodo, ...todos]
    setTodos(updatedTodos)
    localStorage.setItem("todos", JSON.stringify(updatedTodos))
  }

  const updateTodo = (
    id: number | string,
    text: string,
    priority: "low" | "medium" | "high",
    dueDate?: string,
    dueTime?: string,
  ) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id
        ? { ...todo, text, priority, dueDate: dueDate || todo.dueDate, dueTime: dueTime || todo.dueTime }
        : todo,
    )
    setTodos(updatedTodos)
    localStorage.setItem("todos", JSON.stringify(updatedTodos))
  }

  const deleteTodo = (id: number | string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id)
    setTodos(updatedTodos)
    localStorage.setItem("todos", JSON.stringify(updatedTodos))
  }

  const toggleTodo = (id: number | string) => {
    const updatedTodos = todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    setTodos(updatedTodos)
    localStorage.setItem("todos", JSON.stringify(updatedTodos))
  }

  const toggleImportant = (id: number | string) => {
    const updatedTodos = todos.map((t) => (t.id === id ? { ...t, isImportant: !t.isImportant } : t))
    setTodos(updatedTodos)
    localStorage.setItem("todos", JSON.stringify(updatedTodos))
  }

  const clearCompleted = () => {
    const updatedTodos = todos.filter((t) => !t.completed)
    setTodos(updatedTodos)
    localStorage.setItem("todos", JSON.stringify(updatedTodos))
  }

  const clearAll = () => {
    if (confirm("Are you sure you want to delete all tasks?")) {
      setTodos([])
      localStorage.setItem("todos", JSON.stringify([]))
    }
  }

  const filteredTodos = todos.filter((todo) => {
    const matchesFilter =
      filter === "all" || (filter === "completed" && todo.completed) || (filter === "pending" && !todo.completed)
    const matchesSearch = todo.text.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDate = !selectedDate || todo.dueDate === selectedDate
    return matchesFilter && matchesSearch && matchesDate
  })

  const todosForDate = (date: string) => {
    return todos.filter((todo) => todo.dueDate === date && !todo.completed)
  }

  const importantTodos = todos.filter((todo) => todo.isImportant)
  const completedCount = todos.filter((todo) => todo.completed).length
  const totalCount = todos.length

  const getStatsForDate = (date: string) => {
    const dayTodos = todos.filter((todo) => todo.dueDate === date)
    const completed = dayTodos.filter((todo) => todo.completed).length
    return {
      total: dayTodos.length,
      completed,
      remaining: dayTodos.length - completed,
      progress: dayTodos.length > 0 ? Math.round((completed / dayTodos.length) * 100) : 0,
    }
  }

  const handleUpdateProfile = (updatedProfile: UserProfile) => {
    setUserProfile(updatedProfile)
    localStorage.setItem("userProfile", JSON.stringify(updatedProfile))
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header userProfile={userProfile} onProfileClick={() => setCurrentPage("profile")} />
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />

      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Dashboard Page */}
          {currentPage === "dashboard" && (
            <div>
              <div className="text-center mb-12">
                <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-2 text-balance">Dashboard</h1>
                <p className="text-lg text-slate-600 text-pretty">Track your progress at a glance.</p>
              </div>

              <DashboardSummary
                todos={todos}
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
                completedCount={completedCount}
                totalCount={totalCount}
                getStatsForDate={getStatsForDate}
              />
            </div>
          )}

          {/* Tasks Manager Page */}
          {currentPage === "tasks-manager" && (
            <div>
              <div className="text-center mb-12">
                <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-2 text-balance">Tasks Manager</h1>
                <p className="text-lg text-slate-600 text-pretty">Organize your day efficiently.</p>
              </div>

              <TodoInput onAdd={addTodo} />

              {totalCount > 0 && (
                <div className="mt-6 px-6 py-3 bg-white rounded-xl border border-slate-200 flex justify-between items-center text-sm">
                  <span className="text-slate-600">
                    {completedCount} of {totalCount} tasks completed
                  </span>
                  <div className="w-full bg-slate-200 rounded-full h-2 ml-4 max-w-xs">
                    <div
                      className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              )}

              <FilterBar
                filter={filter}
                onFilterChange={setFilter}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />

              <div className="space-y-3">
                {filteredTodos.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-slate-400 text-lg">
                      {todos.length === 0 ? "No tasks yet. Add one to get started!" : "No tasks match your filters."}
                    </p>
                  </div>
                ) : (
                  filteredTodos.map((todo) => (
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      onToggle={toggleTodo}
                      onUpdate={updateTodo}
                      onDelete={deleteTodo}
                      onImportant={toggleImportant}
                    />
                  ))
                )}
              </div>

              {totalCount > 0 && (
                <div className="mt-8 flex gap-3 justify-center flex-wrap">
                  {completedCount > 0 && (
                    <button
                      onClick={clearCompleted}
                      className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      Clear Completed
                    </button>
                  )}
                  <button
                    onClick={clearAll}
                    className="px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    Clear All
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Calendar Page */}
          {currentPage === "calendar" && (
            <div>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Calendar View</h1>
                <p className="text-slate-600">View your tasks organized by date</p>
              </div>
              <Calendar selectedDate={selectedDate} onDateChange={setSelectedDate} todosForDate={todosForDate} />
              <div className="mt-8">
                <div className="text-center">
                  <h2 className="text-xl font-semibold text-slate-900 mb-4">
                    Tasks for{" "}
                    {new Date(selectedDate).toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "short",
                      day: "numeric",
                    })}
                  </h2>
                </div>
                <div className="space-y-3">
                  {todosForDate(selectedDate).length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-slate-400">No tasks for this date</p>
                    </div>
                  ) : (
                    todosForDate(selectedDate).map((todo) => (
                      <TodoItem
                        key={todo.id}
                        todo={todo}
                        onToggle={toggleTodo}
                        onUpdate={updateTodo}
                        onDelete={deleteTodo}
                        onImportant={toggleImportant}
                      />
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Timetable Page */}
          {currentPage === "timetable" && (
            <div>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Daily Schedule</h1>
                <p className="text-slate-600">Manage your daily tasks with time scheduling</p>
              </div>

              <ScheduleInput onAdd={addTodo} selectedDate={selectedDate} />

              {(() => {
                const scheduleTasks = todos.filter((todo) => todo.dueDate === selectedDate && !todo.completed)

                return (
                  <>
                    {scheduleTasks.length > 0 && (
                      <div className="mb-8">
                        <ScheduleChart tasks={scheduleTasks} />
                      </div>
                    )}

                    <div className="mb-8">
                      <h2 className="text-xl font-semibold text-slate-900 mb-4">Scheduled Tasks</h2>
                      <ScheduleTable tasks={scheduleTasks} />
                    </div>
                  </>
                )
              })()}
            </div>
          )}

          {/* Notifications Page */}
          {currentPage === "notifications" && (
            <div>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Notification Center</h1>
                <p className="text-slate-600">Important updates about your tasks</p>
              </div>
              <div className="space-y-3">
                {todos
                  .filter((todo) => !todo.completed)
                  .map((todo) => {
                    const isOverdue = new Date(todo.dueDate + "T" + todo.dueTime) < new Date()
                    return (
                      <div
                        key={todo.id}
                        className={`p-4 rounded-xl border-2 ${
                          isOverdue ? "bg-red-50 border-red-200" : "bg-blue-50 border-blue-200"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-3 h-3 rounded-full mt-1.5 flex-shrink-0 ${isOverdue ? "bg-red-500" : "bg-blue-500"}`}
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-slate-900">{todo.text}</h3>
                            <p className="text-sm text-slate-600">
                              {isOverdue ? "Overdue: " : "Due: "}
                              {new Date(todo.dueDate + "T" + todo.dueTime).toLocaleString()}
                            </p>
                            <p className="text-xs text-slate-500 mt-1">Priority: {todo.priority.toUpperCase()}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                {todos.filter((todo) => !todo.completed).length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-slate-400">No active notifications</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Important Tasks Page */}
          {currentPage === "important" && (
            <div>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Important Works</h1>
                <p className="text-slate-600">Your starred and critical tasks</p>
              </div>
              <div className="space-y-3">
                {importantTodos.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-slate-400">No important tasks yet. Star tasks to add them here.</p>
                  </div>
                ) : (
                  importantTodos.map((todo) => (
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      onToggle={toggleTodo}
                      onUpdate={updateTodo}
                      onDelete={deleteTodo}
                      onImportant={toggleImportant}
                    />
                  ))
                )}
              </div>
            </div>
          )}

          {/* Profile Page */}
          {currentPage === "profile" && <ProfilePage userProfile={userProfile} onUpdateProfile={handleUpdateProfile} />}
        </div>
      </main>

      <Footer />
    </div>
  )
}
