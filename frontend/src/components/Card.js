
import React from "react";
import ExportButton from "./ExportButton";
import { deleteContent } from "../utils/api";

function Card({ item }) {
  const handleDelete = async () => {
    try {
      await deleteContent(item._id);
      alert("Deleted!");
    
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete item.");
    }
  };

  return React.createElement(
    "div",
    { className: "p-4 border rounded shadow bg-white dark:bg-gray-800" },
    [
      React.createElement(
        "p",
        { key: "text", className: "mb-2" },
        item.text
      ),
      React.createElement(
        "div",
        { key: "actions", className: "flex gap-2" },
        [
          React.createElement(ExportButton, { id: item._id, key: "export" }),
          React.createElement(
            "button",
            {
              key: "delete",
              onClick: handleDelete,
              className: "px-3 py-1 bg-red-500 text-white rounded",
            },
            "Delete"
          ),
        ]
      ),
    ]
  );
}

export default Card;
