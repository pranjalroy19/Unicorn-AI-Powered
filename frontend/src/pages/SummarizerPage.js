import React from "react";
import Summarizer from "../components/Summarizer.js";
import FeatureLayout from "../components/FeatureLayout.js";

function SummarizerPage() {
  return (
    <FeatureLayout
      icon="📝"
      title="Text Summarizer"
      description="Paste your text and instantly get a concise summary."
    >
      <Summarizer />
    </FeatureLayout>
  );
}

export default SummarizerPage;
