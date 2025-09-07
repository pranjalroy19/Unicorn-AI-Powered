import React, { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard.js"; // add .js
import { fetchSavedContent } from "../utils/api.js"; // add .js

function DashboardPage() {
  const [contentList, setContentList] = useState([]);

  useEffect(() => {
    async function loadData() {
      const data = await fetchSavedContent();
      setContentList(data);
    }
    loadData();
  }, []);

  return (
    <div className="p-6">
      <Dashboard contentList={contentList} />
    </div>
  );
}

export default DashboardPage;
