// src/App.jsx
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SavedJobs from "./pages/SavedJobs";

export default function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. LocalStorage se saved jobs load karna
  const [savedJobs, setSavedJobs] = useState(() => {
    const saved = localStorage.getItem("saved_jobs_data");
    return saved ? JSON.parse(saved) : [];
  });

  // 2. Saved jobs ko localStorage mein sync rakhna
  useEffect(() => {
    localStorage.setItem("saved_jobs_data", JSON.stringify(savedJobs));
  }, [savedJobs]);

  // 3. REAL API FETCH LOGIC
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://www.arbeitnow.com/api/job-board-api");
        
        if (!response.ok) {
          throw new Error("Jobs load nahi ho payi!");
        }

        const data = await response.json();

        // API se aane wale data ko humare card ke hisaab se clean format mein map kar rahe hain
        const formattedJobs = data.data.map((item) => ({
          id: item.slug, // API har job ko ek unique 'slug' deti hai
          title: item.title,
          company: item.company_name,
          location: item.location || "Remote",
          remote: item.remote,
          tags: item.tags || ["Tech", "Developer"],
          url: item.url, // Original job apply link
          description: item.description.replace(/<[^>]*>?/gm, ""), // HTML tags saaf karke plain text banana
          posted: "Recently"
        }));

        setJobs(formattedJobs);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // 4. Save / Unsave toggle logic (poora job object save karte hain)
  const handleToggleSave = (job) => {
    setSavedJobs((prev) => {
      const exists = prev.some((item) => item.id === job.id);
      if (exists) {
        return prev.filter((item) => item.id !== job.id);
      } else {
        return [...prev, job];
      }
    });
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 flex flex-col text-gray-900">
        <Navbar savedCount={savedJobs.length} />

        <div className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  jobs={jobs}
                  loading={loading}
                  error={error}
                  savedJobs={savedJobs}
                  onToggleSave={handleToggleSave}
                />
              }
            />
            <Route
              path="/saved"
              element={
                <SavedJobs
                  savedJobs={savedJobs}
                  onToggleSave={handleToggleSave}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}