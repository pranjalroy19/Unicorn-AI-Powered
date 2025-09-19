import React, { useState } from "react";
import axios from "axios";

function Summarizer() {
  const [text, setText] = useState("");
  const [mode, setMode] = useState("short");
  const [customWords, setCustomWords] = useState(""); 
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
    
    const customLimitNum = parseInt(customWords);
    const payload = {
      text,
      length: mode,
      customWordLimit: customLimitNum > 0 ? customLimitNum : undefined,
    };

    const res = await axios.post("http://localhost:5000/api/summarize", payload);
    setSummary(res.data.summary);
  } catch (err) {
    console.error(err);
    setError("Failed to summarize. Try again.");
  } finally {
    setLoading(false);
  }
};


  const handleReset = () => {
    setText("");
    setSummary("");
    setError("");
    setCustomWords("");
    setMode("short");
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">📝 Text Summarizer</h2>

      <textarea
        placeholder="Paste your text and instantly get a concise summary..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={8}
        className="w-full p-3 border rounded mb-3 text-black"
      />

      <div className="mb-4 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <label className="font-semibold">Summary length:</label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            disabled={!!customWords} 
            className="p-2 border rounded text-black disabled:opacity-50"
          >
            <option value="short">Short (~25 words)</option>
            <option value="medium">Medium (~50 words)</option>
            <option value="detailed">Detailed (~100 words)</option>
          </select>

          {customWords && (
            <span className="text-sm text-blue-600 font-medium">
              Custom mode active
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <label className="font-semibold">Custom word limit:</label>
          <input
            type="number"
            min="10"
            placeholder="e.g. 60"
            value={customWords}
            onChange={(e) => setCustomWords(e.target.value)}
            className="w-28 p-2 border rounded text-black"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleSummarize}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {loading ? "Summarizing..." : "Summarize"}
        </button>

        <button
          onClick={handleReset}
          disabled={loading}
          className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
        >
          Reset
        </button>
      </div>

      {error && <p className="text-red-500 mt-3">{error}</p>}

      {summary && (
        <div className="mt-6 p-4 border rounded bg-gray-100 dark:bg-gray-800">
          <h3 className="text-xl font-semibold mb-3">📌 Summary</h3>
          <div className="space-y-1 text-black dark:text-white">
            {summary.split("\n").map((line, i) => (
              <p key={i}>{line.trim()}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Summarizer;
