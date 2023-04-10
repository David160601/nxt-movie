"use client";
import React from "react";
import { InfinitySpin } from "react-loader-spinner";

function LoadingSpinner() {
  return (
    <div>
      <InfinitySpin width="200" color="red" />
    </div>
  );
}

export default LoadingSpinner;
