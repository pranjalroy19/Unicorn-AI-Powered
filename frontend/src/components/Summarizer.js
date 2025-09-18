import React, { useState } from "react";
import axios from "axios";

function Summarizer() {
  const [text, setText] = useState("");
  const [length, setLength] = useState("short");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSummarize = async () => {
    if (!text.trim()) {
      setError("Please enter some text");
      return;
    }
    if (text.split(" ").length > 3000) {
      setError("Text exceeds 3000 words limit");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/summarize", {
        text,
        length,
      });
      setSummary(res.data.summary);
    } catch (err) {
      console.error(err);
      setError("Failed to summarize. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-3">📝 Text Summarizer</h2>

      <textarea
        placeholder="Paste your text and instantly get a concise summary.."
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={8}
        className="w-full p-2 border rounded mb-3 text-black"
      />

      <div className="mb-3">
        <label className="mr-2 font-semibold">Summary length:</label>
        <select
          value={length}
          onChange={(e) => setLength(e.target.value)}
          className="p-1 border rounded text-black"
        >
          <option value="short">Short</option>
          <option value="medium">Medium</option>
          <option value="detailed">Detailed</option>
        </select>
      </div>

      <button
        onClick={handleSummarize}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {loading ? "Summarizing..." : "Summarize"}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {summary && (
        <div className="mt-5 p-3 border rounded bg-gray-100 dark:bg-gray-800">
          <h3 className="text-xl font-semibold mb-2">📌 Summary</h3>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}

export default Summarizer;
