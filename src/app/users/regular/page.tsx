"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

export default function regularUser() {
  const router = useRouter();
  const [data, setData] = useState("nothing");
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data.username);
  };

  const videos = [
    { id: 1, src: "/video1.jpg", alt: "Video 1" },
        { id: 2, src: "/video2.jpg", alt: "Video 2" },
        { id: 3, src: "/video3.jpeg", alt: "Video 3" },
        { id: 3, src: "/video4.jpeg", alt: "Video 4" },
  ];

  return (
    <div>
    
    <div>
      <Header />
    </div>
  
    <div>
   
    <main className="flex flex-col items-center justify-between p-4">
            
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
