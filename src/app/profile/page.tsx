import React from 'react'
import Image from "next/image";
import { FaRegEye } from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa";
import { SlLike } from "react-icons/sl";
import { FiUpload } from "react-icons/fi";
import { BiMoneyWithdraw } from "react-icons/bi";
import { CiSettings } from "react-icons/ci";
import "../globals.css"



const Profile = () => {

  const videos = [
    { id: 1, src: "/video1.mp4", alt: "Video 1" },
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
    <main className="flex items-center justify-between pt-4 pr-4">

      {/* side bar navigation */}
      <section className=" sticky flex-1 flex flex-col -mt-80 top-1/2 transform -translate-y-1/2">
        <div className="p-2 flex items-center gap-2 rounded-lg hover:bg-gray-700 active:bg-gray-700">
          <FiUpload />
        </div>
        <div className="p-2 flex items-center gap-2 rounded-lg hover:bg-gray-700 active:bg-gray-700">
          <BiMoneyWithdraw />
        </div>
        <div className="p-2 flex items-center gap-2 rounded-lg hover:bg-gray-700 active:bg-gray-700">
          <CiSettings />
        </div>
      </section>
      
      <section className="">
        <section className="w-full sticky top-0 z-10 section1">
          {/* Profile Header */}
          <div className="flex items-center justify-center w-full  p-4">
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
          <div className="flex w-full items-center justify-center font-bold  p-2 text-center text-white">
            <div className="m-4 flex flex-col"><p> 100</p><p className="text-sm text-gray-500 font-thin">Balance</p></div>
            <div className="m-4 flex flex-col"><p> 5k</p><p className="text-sm text-gray-500 font-thin">Views</p></div>
            <div className="m-4 flex flex-col"><p> 2k</p><p className="text-sm text-gray-500 font-thin">Likes</p></div>
          </div>

          {/* Divider */}
          <hr className="w-full  border-t-0.5 border-gray-300 my-2" />

        </section>

        {/* User Videos */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full  p-4">

          {videos.map((video) => (
            <div key={video.id} className="relative h-48 sm:h-64">
              <video
                className="object-cover w-full h-full"
                src={video.src}
                controls
                autoPlay

              />
            </div>
          ))}

        </div>
      </section>

    </main>
  )
}

export default Profile