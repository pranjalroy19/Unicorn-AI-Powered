import React, { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard.js";
import api from "../utils/api.js";


function DashboardPage() {
  const [contentList, setContentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await api.get("/content"); 
        setContentList(response.data);
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
