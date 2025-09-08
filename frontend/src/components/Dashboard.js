import React, { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard.js";
import { fetchSavedContent } from "../utils/api.js"; // ✅ import named function

function DashboardPage() {
  const [contentList, setContentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await fetchSavedContent(); // ✅ call your helper
        setContentList(data);
      } catch (err) {
        setError(err.message || "Failed to fetch content");
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return <Dashboard contentList={contentList} />;
}

export default DashboardPage;
