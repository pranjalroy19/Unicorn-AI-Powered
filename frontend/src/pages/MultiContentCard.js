import React, { useState } from "react";

const contentTypes = [
  "Email",
  "LinkedIn Post",
  "Tweet",
  "Product Description",
  "YouTube Script",
];

export default function MultiContentCard({ backendUrl }) {
  const [selectedType, setSelectedType] = useState(contentTypes[0]);
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    setOutput("");

    try {
      const res = await fetch(`${backendUrl}/api/generate-content`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, type: selectedType }),
      });
      const data = await res.json();
      setOutput(data.result);
    } catch (err) {
      console.error(err);
      setOutput("Error generating content.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    alert("Copied to clipboard!");
  };

  return (
    <div className="feature-card">
      <h3>{selectedType}</h3>
      <select
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
        className="feature-dropdown"
      >
        {contentTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      <textarea
        className="feature-textarea"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your topic or idea..."
        rows={4}
      />

      <button className="feature-btn" onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate"}
      </button>

      {output && (
        <div className="feature-output">
          <h4>Output:</h4>
          <p>{output}</p>
          <button className="feature-btn small-btn" onClick={handleCopy}>
            Copy
          </button>
        </div>
      )}
    </div>
  );
}
