import React from "react";
import FeatureLayout from "../components/FeatureLayout.js";

function Blog() {
  return (
    <FeatureLayout
      icon="✍️"
      title="Blog Writer"
      description="Generate full blog articles from a topic or keyword. Coming soon!"
    >
      <p className="text-gray-500 dark:text-gray-400">🚧 Under construction...</p>
    </FeatureLayout>
  );
}

export default Blog;
