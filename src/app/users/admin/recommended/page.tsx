"use client"
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import Header from '../_components/Header';
import Footer from '../../../../components/Footer';
import Loader from '../../../../components/Loader';

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
    { id: 9, src: "/video1.jpg", alt: "Video 9" },
    { id: 10, src: "/video2.jpg", alt: "Video 10" },
    { id: 11, src: "/video3.jpeg", alt: "Video 11" },
    { id: 12, src: "/video4.jpeg", alt: "Video 12" },
    { id: 13, src: "/video1.jpg", alt: "Video 13" },
    { id: 14, src: "/video2.jpg", alt: "Video 14" },
    { id: 15, src: "/video3.jpeg", alt: "Video 15" },
    { id: 16, src: "/video4.jpeg", alt: "Video 16" },
  ];

  const categories = [
    { name: "Newly Added", videos: videos.slice(0, 8) },
    { name: "Mostly Liked", videos: videos.slice(8, 16) },
    // Add more categories as needed
  ];

  return (
    <div>
      <Header />
      <main className="p-4">
        {categories.map((category) => (
          <div key={category.name} className="mb-8">
            <h2 className="text-2xl font-bold text-red-800 mb-4">{category.name}</h2>
            <div className="grid grid-cols-2 sm:flex overflow-x-auto space-x-4">
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
