"use client"

import type React from "react"

import { useState } from "react"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      if (isSignUp) {
        if (password !== confirmPassword) {
          setError("Passwords do not match")
          setLoading(false)
          return
        }

        // Check if user already exists
        const existingUsers = JSON.parse(localStorage.getItem("users") || "[]")
        if (existingUsers.some((u: any) => u.email === email)) {
          setError("Email already registered")
          setLoading(false)
          return
        }

        // Create new user
        const newUser = {
          id: Date.now(),
          email,
          password,
          createdAt: new Date().toISOString(),
        }

        existingUsers.push(newUser)
        localStorage.setItem("users", JSON.stringify(existingUsers))
        localStorage.setItem(
          "userProfile",
          JSON.stringify({
            name: email.split("@")[0],
            email,
            image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
            bio: "",
          }),
        )
        setError("")
        setEmail("")
        setPassword("")
        setConfirmPassword("")
        setIsSignUp(false)
      } else {
        // Sign in
        const existingUsers = JSON.parse(localStorage.getItem("users") || "[]")
        const user = existingUsers.find((u: any) => u.email === email && u.password === password)

        if (!user) {
          setError("Invalid email or password")
          setLoading(false)
          return
        }

        localStorage.setItem(
          "userProfile",
          JSON.stringify({
            name: email.split("@")[0],
            email,
            image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
            bio: "",
          }),
        )
        setError("")
        setEmail("")
        setPassword("")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header
        userProfile={{
          name: "Guest",
          email: "guest@example.com",
          image: "https://api.dicebear.com/7.x/avataaars/svg?seed=guest",
          bio: "",
        }}
        onProfileClick={() => {}}
      />

      <main className="flex-1 flex items-center justify-center py-8 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">{isSignUp ? "Create Account" : "Welcome Back"}</h1>
              <p className="text-slate-600">{isSignUp ? "Join us today" : "Sign in to your account"}</p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="••••••••"
                />
              </div>

              {isSignUp && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Confirm Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="••••••••"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition-colors disabled:opacity-50"
              >
                {loading ? "Please wait..." : isSignUp ? "Sign Up" : "Sign In"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-slate-600 text-sm">
                {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                <button
                  onClick={() => {
                    setIsSignUp(!isSignUp)
                    setError("")
                    setPassword("")
                    setConfirmPassword("")
                  }}
                  className="text-indigo-600 font-semibold hover:underline"
                >
                  {isSignUp ? "Sign In" : "Sign Up"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
