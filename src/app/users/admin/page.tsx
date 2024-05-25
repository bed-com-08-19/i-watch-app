"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import Header from './_components/Header';
import Footer from '../../../components/Footer';

export default function useProfile({ params }: any) {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("/api/videos/getallvideos/videos");
        setVideos(response.data.data);
      } catch (error) {
        toast.error("Failed to fetch videos");
        console.error("Failed to fetch videos:", error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div>
      <div>
        <Header />
      </div>

      <main className="flex flex-col items-center justify-between p-4">
        {/* User Videos */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-5xl p-4">
          {videos.map((video: any) => (
            <div key={video._id} className="relative h-48 sm:h-64">
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
  );
}
