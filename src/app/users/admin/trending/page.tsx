"use client"
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import Header from '../_components/Header';
import Footer from '../../../../components/Footer';

export default function userProfile({ params }: any) {
  const [data, setData] = useState("nothing");

  const videos = [
    { id: 1, src: "/video1.jpg", alt: "Video 1" },
    { id: 2, src: "/video2.jpg", alt: "Video 2" },
    { id: 3, src: "/video3.jpeg", alt: "Video 3" },
    { id: 4, src: "/video4.jpeg", alt: "Video 4" },
    { id: 5, src: "/video1.jpg", alt: "Video 5" },
    { id: 6, src: "/video2.jpg", alt: "Video 6" },
    { id: 7, src: "/video3.jpeg", alt: "Video 7" },
    { id: 8, src: "/video4.jpeg", alt: "Video 8" },
  ];

  const categories = [
    { name: "Newly Added", videos: videos.slice(0, 4) },
    { name: "Mostly Liked", videos: videos.slice(4, 8) },
    // Add more categories as needed
  ];

  return (
    <div>
      <Header />
      <main className="p-4">
        {categories.map((category) => (
          <div key={category.name} className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{category.name}</h2>
            <div className="flex overflow-x-auto space-x-4">
              {category.videos.map((video) => (
                <div key={video.id} className="relative h-48 sm:h-64">
                  <video
                    className="object-cover w-full h-full"
                    src={video.src}
                    controls
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>
      <Footer />
    </div>
  );
}
