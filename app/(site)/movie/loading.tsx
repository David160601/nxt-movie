import LoadingSpinner from "@/app/components/global/LoadingSpinner";
import React from "react";

function Loading() {
  return (
    <div className="min-h-[92vh] flex justify-center items-center">
      <LoadingSpinner />
    </div>
  );
}

export default Loading;
