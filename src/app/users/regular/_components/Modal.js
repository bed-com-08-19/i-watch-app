import Image from "next/image";
import React from "react";

export default function Modal({ video, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-4 max-w-lg">
        <Image src={video.src} alt={video.alt} className="w-full" />
        <button onClick={onClose} className="absolute top-0 right-0 m-2">
          Close
        </button>
      </div>
    </div>
  );
}
