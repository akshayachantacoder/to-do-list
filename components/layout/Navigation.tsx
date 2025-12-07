"use client"

type PageType = "dashboard" | "tasks-manager" | "calendar" | "timetable" | "notifications" | "important" | "profile"

interface NavigationProps {
  currentPage: PageType
  onPageChange: (page: PageType) => void
}

export default function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const navItems: Array<{
    id: PageType
    label: string
    icon: string
  }> = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "tasks-manager", label: "Tasks Manager", icon: "✓" },
    { id: "calendar", label: "Calendar", icon: "📅" },
    { id: "timetable", label: "Schedule", icon: "⏰" },
    { id: "notifications", label: "Alerts", icon: "🔔" },
    { id: "important", label: "Important", icon: "⭐" },
  ]

  return (
    <nav className="bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex overflow-x-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                currentPage === item.id
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
