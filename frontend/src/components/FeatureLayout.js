import React from "react";

function FeatureLayout({ icon, title, description, children }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-6">
      <h1 className="text-3xl font-bold mb-4">
        {icon} {title}
      </h1>
      <p className="text-gray-600 dark:text-gray-300 max-w-lg mb-6">
        {description}
      </p>
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6">
        {children}
      </div>
    </div>
  );
}

export default FeatureLayout;
