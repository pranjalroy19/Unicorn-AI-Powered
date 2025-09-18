// SummarizerPage.js
import React from "react";
import "./SummarizerPage.css"; // <- make sure path is correct
import Summarizer from "../components/Summarizer.js";
import FeatureLayout from "../components/FeatureLayout.js";

function SummarizerPage() {
  return (
    <div className="summarizer-page">
      <FeatureLayout>
        <div className="summarizer-page__content">
          <Summarizer />
        </div>
      </FeatureLayout>
    </div>
  );
}

export default SummarizerPage;
