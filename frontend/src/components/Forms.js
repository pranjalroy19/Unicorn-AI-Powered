import React, { useState } from "react";
import { generateBlog } from "../utils/api";

function Forms() {
  const [input, setInput] = useState("");
  const [format, setFormat] = useState("Blog");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await generateBlog(input, format);
    alert("Generated: " + result);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-gray-50 dark:bg-gray-700 rounded shadow-md"
    >
      <textarea
        className="w-full p-2 border rounded mb-3 dark:bg-gray-800"
        placeholder="Enter topic or article..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <select
        className="border p-2 rounded mb-3 dark:bg-gray-800"
        value={format}
        onChange={(e) => setFormat(e.target.value)}
      >
        <option>Blog</option>
        <option>Email</option>
        <option>Tweet</option>
        <option>LinkedIn Post</option>
        <option>YouTube Script</option>
      </select>
      <button
        type="submit"
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        Generate
      </button>
    </form>
  );
}

export default Forms;
