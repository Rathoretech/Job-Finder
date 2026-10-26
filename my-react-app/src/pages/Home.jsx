// src/pages/Home.jsx
import { useState } from "react";
import JobCard from "../components/JobCard";

export default function Home({ jobs, loading, error, savedJobs, onToggleSave }) {
  const [search, setSearch] = useState("");
  const [filterRemote, setFilterRemote] = useState(false);

  // Filter Logic: Search text + Remote toggle
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

    const matchesRemote = filterRemote ? job.remote === true : true;

    return matchesSearch && matchesRemote;
  });

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      {/* Hero Headline */}
      <div className="text-center max-w-xl mx-auto mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
          Live Tech Jobs & Opportunities
        </h1>
        <p className="text-gray-500 mt-2 text-sm">
          Real-time global developer roles fetched directly via public API.
        </p>
      </div>

      {/* Search Input Box & Filter */}
      <div className="max-w-xl mx-auto mb-6 flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Search role (e.g. React, Engineer), company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Remote Filter Button */}
        <button
          onClick={() => setFilterRemote(!filterRemote)}
          className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition ${
            filterRemote
              ? "bg-blue-600 text-white border-blue-600 shadow-sm"
              : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
          }`}
        >
          {filterRemote ? "✓ Remote Only" : "Filter Remote"}
        </button>
      </div>

      {/* 1. LOADING STATE */}
      {loading && (
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent mb-3"></div>
          <p className="text-gray-500 text-sm font-medium">Fetching real jobs from server...</p>
        </div>
      )}

      {/* 2. ERROR STATE */}
      {error && (
        <div className="text-center py-12 bg-red-50 rounded-xl border border-red-200 max-w-md mx-auto">
          <p className="text-red-600 text-sm font-medium">Data load karne mein dikkat aayi: {error}</p>
        </div>
      )}

      {/* 3. SUCCESS / JOBS LIST */}
      {!loading && !error && (
        <>
          {filteredJobs.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
              <p className="text-gray-500 text-sm">Koi match nahi mila.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredJobs.map((job) => {
                const isSaved = savedJobs.some((item) => item.id === job.id);
                return (
                  <JobCard
                    key={job.id}
                    job={job}
                    isSaved={isSaved}
                    onToggleSave={onToggleSave}
                  />
                );
              })}
            </div>
          )}
        </>
      )}
    </main>
  );
}