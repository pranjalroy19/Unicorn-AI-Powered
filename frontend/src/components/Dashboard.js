import React from "react";
import Card from "./Card";
import Forms from "./Forms";

function Dashboard({ contentList }) {
  return (
    <div>
      <Forms />
      <h2 className="text-xl font-semibold mt-6">Saved Content</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {contentList.map((item) => (
          <Card key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
