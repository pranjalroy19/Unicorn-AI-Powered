import React from "react";
import MultiContentCard from "./MultiContentCard.js"; // <-- Must include .js
import "./MultiContentPage.css";

export default function MultiContentPage() {
  return (
    <div className="multi-content-page" style={{ padding: "20px" }}>
      
      <p>
        Generate emails, LinkedIn posts, tweets, product descriptions, or YouTube scripts.
      </p>
      <MultiContentCard />
    </div>
  );
}


