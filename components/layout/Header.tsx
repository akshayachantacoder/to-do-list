"use client"

import { useRouter } from "next/navigation"
import type { UserProfile } from "@/app/page"

interface HeaderProps {
  userProfile: UserProfile
  onProfileClick: () => void
}

export default function Header({ userProfile, onProfileClick }: HeaderProps) {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("userProfile")
    localStorage.removeItem("todos")
    router.push("/auth")
  }

  return (
    <header className="bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <button onClick={onProfileClick} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img
              src={userProfile.image || "/placeholder.svg"}
              alt={userProfile.name}
              className="w-10 h-10 rounded-full border-2 border-indigo-600"
            />
            <div className="text-left">
              <p className="text-sm font-semibold text-slate-900">{userProfile.name}</p>
              <p className="text-xs text-slate-500">View Profile</p>
            </div>
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Task Master</h1>
              <p className="text-xs text-slate-500">Organize your workflow</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-slate-600">
                {new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="px-3 py-1 text-sm text-slate-600 hover:text-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
