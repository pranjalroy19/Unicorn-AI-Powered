import React from "react";
import { exportContent } from "../utils/api";

function ExportButton({ id }) {
  const handleExport = async (type) => {
    await exportContent(id, type);
    alert(`Exported as ${type}`);
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => handleExport("txt")}
        className="px-3 py-1 bg-blue-500 text-white rounded"
      >
        TXT
      </button>
      <button
        onClick={() => handleExport("docx")}
        className="px-3 py-1 bg-purple-500 text-white rounded"
      >
        DOCX
      </button>
      <button
        onClick={() => handleExport("pdf")}
        className="px-3 py-1 bg-green-500 text-white rounded"
      >
        PDF
      </button>
    </div>
  );
}

export default ExportButton;
