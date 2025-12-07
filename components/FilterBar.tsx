"use client"

interface FilterBarProps {
  filter: "all" | "completed" | "pending"
  onFilterChange: (filter: "all" | "completed" | "pending") => void
  searchQuery: string
  onSearchChange: (query: string) => void
}

export default function FilterBar({ filter, onFilterChange, searchQuery, onSearchChange }: FilterBarProps) {
  const filters: Array<"all" | "completed" | "pending"> = ["all", "completed", "pending"]

  return (
    <div className="my-6 space-y-4">
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm transition-all"
        />
      </div>

      <div className="flex gap-2 justify-center flex-wrap">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => onFilterChange(f)}
            className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${
              filter === f
                ? "bg-indigo-600 text-white shadow-md"
                : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
    </div>
  )
}
