"use client"

import { useState } from "react"
import type { UserProfile } from "@/app/page"

interface ProfilePageProps {
  userProfile: UserProfile
  onUpdateProfile: (profile: UserProfile) => void
}

export default function ProfilePage({ userProfile, onUpdateProfile }: ProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState<UserProfile>(userProfile)

  const handleSave = () => {
    onUpdateProfile(editedProfile)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedProfile(userProfile)
    setIsEditing(false)
  }

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-2 text-balance">Profile</h1>
        <p className="text-lg text-slate-600 text-pretty">Manage your account information</p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
          {!isEditing ? (
            <>
              <div className="flex flex-col items-center mb-8">
                <img
                  src={userProfile.image || "/placeholder.svg"}
                  alt={userProfile.name}
                  className="w-24 h-24 rounded-full border-4 border-indigo-600 mb-4"
                />
                <h2 className="text-3xl font-bold text-slate-900">{userProfile.name}</h2>
                <p className="text-slate-600 mt-1">{userProfile.email}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-semibold text-slate-500 uppercase mb-2">Bio</h3>
                <p className="text-slate-700">{userProfile.bio}</p>
              </div>

              <button
                onClick={() => setIsEditing(true)}
                className="w-full px-4 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Edit Profile
              </button>
            </>
          ) : (
            <>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Name</label>
                  <input
                    type="text"
                    value={editedProfile.name}
                    onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Email</label>
                  <input
                    type="email"
                    value={editedProfile.email}
                    onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Bio</label>
                  <textarea
                    value={editedProfile.bio}
                    onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleSave}
                    className="flex-1 px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex-1 px-4 py-2 bg-slate-200 text-slate-900 font-medium rounded-lg hover:bg-slate-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
