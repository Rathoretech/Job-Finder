// src/components/JobCard.jsx
export default function JobCard({ job, isSaved, onToggleSave }) {
  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200 hover:border-blue-400 hover:shadow-md transition flex flex-col justify-between">
      <div>
        {/* Top: Company Name & Bookmark */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {job.company}
            </span>
            <h3 className="text-lg font-bold text-gray-900 mt-0.5 line-clamp-1">{job.title}</h3>
          </div>

          <button
            onClick={() => onToggleSave(job)}
            className={`p-2 rounded-lg border transition ${
              isSaved
                ? "bg-blue-50 text-blue-600 border-blue-200"
                : "text-gray-400 hover:text-gray-600 border-gray-200 hover:bg-gray-50"
            }`}
            title={isSaved ? "Saved" : "Save Job"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill={isSaved ? "currentColor" : "none"}
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
          </button>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mt-3 text-xs font-medium">
          <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md">
            📍 {job.location}
          </span>
          {job.remote && (
            <span className="bg-green-50 text-green-700 px-2.5 py-1 rounded-md font-semibold">
              🌐 Remote
            </span>
          )}
        </div>

        {/* Short Job Description */}
        <p className="text-gray-600 text-sm mt-3 line-clamp-2 leading-relaxed">
          {job.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {job.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-xs bg-gray-50 text-gray-600 px-2 py-0.5 rounded border border-gray-100">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer: Official Apply Link */}
      <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
        <span className="text-xs text-gray-400 font-medium">Verified Posting</span>
        <a
          href={job.url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition"
        >
          Apply Official &rarr;
        </a>
      </div>
    </div>
  );
}