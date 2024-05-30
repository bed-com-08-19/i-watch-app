// components/Loader.js
import React from "react";

const Loader = () => (
  <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
    <svg
      className="w-16 h-16 animate-pulse"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="red"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
      <polyline points="17 2 12 7 7 2" />
      <path d="M12 13v3m0 0h-3m3 0h3" />
    </svg>
  </div>
);

export default Loader;
