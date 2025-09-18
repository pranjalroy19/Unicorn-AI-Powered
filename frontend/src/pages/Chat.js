import React from "react";
import FeatureLayout from "../components/FeatureLayout.js";

function Chat() {
  return (
    <FeatureLayout
      icon="🤖"
      title="Chat Assistant"
      description="Ask questions and get instant AI-powered answers. Coming soon!"
    >
      <p className="text-gray-500 dark:text-gray-400">💬 Feature under development...</p>
    </FeatureLayout>
  );
}

export default Chat;
