import React from "react";
import LoadingSpinner from "../components/global/LoadingSpinner";

function Loading() {
  return (
    <div className="min-h-[92vh] flex justify-center items-center">
      <LoadingSpinner />
    </div>
  );
}

export default Loading;
