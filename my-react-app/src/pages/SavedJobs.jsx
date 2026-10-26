// src/pages/SavedJobs.jsx
import { Link } from "react-router-dom";
import JobCard from "../components/JobCard";

export default function SavedJobs({ savedJobs, onToggleSave }) {
  if (savedJobs.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-20 px-4">
        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-lg">
          ★
        </div>
        <h2 className="text-xl font-bold text-gray-900">Koi Saved Job Nahi Hai</h2>
        <p className="text-gray-500 text-sm mt-1">
          Aap jobs browse karte waqt bookmark icon click karke yahan save kar sakte hain.
        </p>
        <Link
          to="/"
          className="inline-block mt-5 bg-blue-600 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Explore Jobs
        </Link>
      </div>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Saved Jobs ({savedJobs.length})</h1>
        <Link to="/" className="text-blue-600 text-xs font-semibold hover:underline">
          &larr; Back to all jobs
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {savedJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            isSaved={true}
            onToggleSave={onToggleSave}
          />
        ))}
      </div>
    </main>
  );
}