// components/Loader.js
import React from "react";

const Loader = () => (
  <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
    <div className="w-16 h-16 border-4 border-t-red-500 border-red-200 rounded-full animate-spin"></div>
  </div>
);

export default Loader;
