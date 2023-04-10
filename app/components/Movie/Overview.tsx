import React from "react";

function Overview({ title, overview }: { title: string; overview: string }) {
  return (
    <div className="my-2">
      <div className="flex items-center">
        <div className="h-8 w-2 bg-red-600 mr-2"></div>
        <p className="font-bold">{title}</p>
      </div>
      <div className="my-2 text-sm md:text-lg">{overview}</div>
    </div>
  );
}

export default Overview;
