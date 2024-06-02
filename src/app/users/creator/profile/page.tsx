import React from 'react'
import Image from "next/image";
import { FaRegEye } from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa";
import { SlLike } from "react-icons/sl";
import { FiUpload } from "react-icons/fi";
import { BiMoneyWithdraw } from "react-icons/bi";
import { CiSettings } from "react-icons/ci";
import { FiLogOut } from "react-icons/fi";
import { user, videos} from "../../../../lib/data";
import "./globals.css"



const Profile = () => {
  // const user = 
  //   {
  //     id:1,
  //     name: "Chrisprog",
  //     bio: "Frontend developer",
  //     balance: 100,
  //     views: "20k",
  //     likes: "5k",
  //     image: "/profile.jpg"
  //   }
  
  
  return (
    <main className="flex items-center justify-between">
      <section className="">
        <section className="w-full sticky top-0 z-10 section1">
          {/* Profile Header */}
          <div className="flex items-center justify-center w-full  p-4">
            <div className="flex items-center">
              <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-full overflow-hidden">
                <Image
                  src={user.image || "/noavatar.png"}
                  alt="Profile Picture"
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                />
              </div>
              <div className="ml-4 text-white">
                <h1 className="text-xl font-semibold">{user.name}</h1>
                <p className="text-sm text-gray-500">{user.bio}</p>
              </div>
            </div>

          </div>

          {/* Money and Views */}
          <div className="flex w-full items-center justify-center font-bold  p-2 text-center text-white">
            <div className="m-4 flex flex-col"><p>MK{user.balance}</p><p className="text-sm text-gray-500 font-thin">Balance</p></div>
            <div className="m-4 flex flex-col"><p>{user.views}</p><p className="text-sm text-gray-500 font-thin">Views</p></div>
            <div className="m-4 flex flex-col"><p>{user.likes}</p><p className="text-sm text-gray-500 font-thin">Likes</p></div>
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