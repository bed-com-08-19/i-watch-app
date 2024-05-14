"use client"
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import Header from './_components/Header';
import Footer from '../../../components/Footer';


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

  return (
    <div>
    
    <div>
      <Header />
    </div>
  
    <div>
   
    <main className="flex flex-col items-center justify-between p-4">
            {/* User Videos */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-5xl p-4">
  
              {videos.map((video) => (
                <div key={video.id} className="relative h-48 sm:h-64">
                  <video
                    className="object-cover w-full h-full"
                    src={video.src}
                    controls
  
                  />
                </div>
  
              ))}
            </div>   
    </main>
      <Footer />
      </div>
    </div>
  );
}
