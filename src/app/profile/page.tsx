import React from 'react'
import Image from "next/image";
import { FaRegEye } from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa";
import { SlLike } from "react-icons/sl";
import "../globals.css"



const Profile = () => {
  
    const videos = [
        { id: 1, src: "/video1.jpg", alt: "Video 1" },
        { id: 2, src: "/video2.jpg", alt: "Video 2" },
        { id: 3, src: "/video3.jpeg", alt: "Video 3" },
        { id: 4, src: "/video4.jpeg", alt: "Video 4" },
        { id: 5, src: "/video4.jpeg", alt: "Video 5" },
        { id: 6, src: "/video4.jpeg", alt: "Video 6" },
        { id: 7, src: "/video4.jpeg", alt: "Video 7" },
        { id: 8, src: "/video4.jpeg", alt: "Video 8" },
        { id: 9, src: "/video4.jpeg", alt: "Video 9" },
        { id: 10, src: "/video4.jpeg", alt: "Video 10" },
        { id: 11, src: "/video4.jpeg", alt: "Video 11" },
      ];
      return (
        <main className="flex flex-col items-center justify-between p-4">
          <section className="w-full sticky top-0 z-10 section1">
          {/* Profile Header */}
          <div className="flex items-center justify-center w-full max-w-5xl p-4">
            <div className="flex items-center">
              <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-full overflow-hidden">
                <Image
                  src="/Profile.jpg"
                  alt="Profile Picture"
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                />
              </div>
              <div className="ml-4 text-white">
                <h1 className="text-xl font-semibold">Chrisprog</h1>
                <p className="text-sm text-gray-500">Fontend developer</p>
              </div>
            </div>
    
          </div>
    
          {/* Money and Views */}
          <div className="flex w-full items-center justify-center max-w-5xl p-2 text-center text-white">
            <div className="mr-4 flex"><FaDollarSign className="items-center mt-1 mr-2" /><p> 100</p></div>
            <div className="ml-4 mr-4 flex"><FaRegEye className="items-center mt-1 mr-2" /><p> 1000</p></div>
            <div className="ml-4 flex"><SlLike className="items-center mt-1 mr-2 " /><p> 2000</p></div>
          </div>
    
           {/* Divider */}
           <hr className="w-full max-w-5xl border-t-0.5 border-gray-300 my-2" />
    
          </section>

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
  )
}

export default Profile