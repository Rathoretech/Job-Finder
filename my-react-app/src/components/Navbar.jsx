// src/components/Navbar.jsx
import { Link } from "react-router-dom";

export default function Navbar({ savedCount }) {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Brand Name */}
        <Link to="/" className="text-xl font-black text-blue-600 tracking-tight">
          DevJobs<span className="text-gray-900">Hub</span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-4">
          <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium text-sm">
            Find Jobs
          </Link>

          {/* Saved Jobs Badge Button */}
          <Link
            to="/saved"
            className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3.5 py-1.5 rounded-lg text-sm font-semibold hover:bg-blue-100 transition"
          >
            <span>Saved Jobs</span>
            {savedCount > 0 && (
              <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                {savedCount}
              </span>
            )}
          </Link>
        </div>

      </div>
    </nav>
  );
}