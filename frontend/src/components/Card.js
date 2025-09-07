import React from "react";
import ExportButton from "./ExportButton";
import { deleteContent } from "../utils/api";

function Card({ item }) {
  const handleDelete = async () => {
    await deleteContent(item._id);
    alert("Deleted!");
  };

  return (
    <div className="p-4 border rounded shadow bg-white dark:bg-gray-800">
      <p className="mb-2">{item.text}</p>
      <div className="flex gap-2">
        <ExportButton id={item._id} />
        <button
          onClick={handleDelete}
          className="px-3 py-1 bg-red-500 text-white rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default Card;
