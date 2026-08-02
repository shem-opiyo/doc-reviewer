import {
  Search,
  Filter,
  Calendar,
  User,
  ChevronDown,
} from "lucide-react";

export default function DocumentToolbar() {
  return (
    <div className="mb-8 space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

        <input
          type="text"
          placeholder="Search documents..."
          className="w-full rounded-xl border border-zinc-700 bg-zinc-900 py-3 pl-12 pr-4 text-white placeholder:text-gray-500 focus:border-violet-500 focus:outline-none"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Status */}
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

          <select className="appearance-none rounded-xl border border-zinc-700 bg-zinc-900 py-3 pl-10 pr-10 text-sm text-white focus:border-violet-500 focus:outline-none">
            <option>All Status</option>
            <option>Pending</option>
            <option>Reviewed</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>

          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        </div>

        {/* Owner */}
        <div className="relative">
          <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

          <select className="appearance-none rounded-xl border border-zinc-700 bg-zinc-900 py-3 pl-10 pr-10 text-sm text-white focus:border-violet-500 focus:outline-none">
            <option>All Owners</option>
          </select>

          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        </div>

        {/* Date */}
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

          <select className="appearance-none rounded-xl border border-zinc-700 bg-zinc-900 py-3 pl-10 pr-10 text-sm text-white focus:border-violet-500 focus:outline-none">
            <option>All Dates</option>
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
            <option>This Year</option>
          </select>

          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        </div>

        {/* Reset Button */}
        <button className="rounded-xl border border-violet-600 px-5 py-3 text-sm font-medium text-violet-400 transition hover:bg-violet-600 hover:text-white">
          Reset Filters
        </button>
      </div>
    </div>
  );
}