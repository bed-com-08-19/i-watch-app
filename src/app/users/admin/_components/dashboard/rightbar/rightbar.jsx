import Image from "next/image";
// import styles from "./rightbar.module.css";
import { MdPlayCircleFilled, MdReadMore } from "react-icons/md";

const Rightbar = () => {
  return (
    <div className="fixed">
      <div className="bg-gradient-to-t from-gray-800 to-gray-900 p-5 rounded-lg mb-5 relative">
        <div className="absolute right-0 bottom-0 w-1/2 h-1/2">
          <Image className="object-contain opacity-20" src="/astronaut.png" alt="" fill />
        </div>
        <div className="flex flex-col gap-6">
          <span className="font-bold">🔥 Available Now</span>
          <h3 className="">
            How to use the new version of the admin dashboard?
          </h3>
          <span className="text-textSoft font-medium text-xs">Takes 4 minutes to learn</span>
          <p className="text-textSoft text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit eius libero perspiciatis recusandae possimus.
          </p>
          <button className="px-4 py-2 flex items-center gap-2 bg-indigo-600 text-white rounded-md cursor-pointer">
            <MdPlayCircleFilled />
            Watch
          </button>
        </div>
      </div>
      {/* <div className="bg-gradient-to-t from-gray-800 to-gray-900 p-5 rounded-lg mb-5 relative">
        <div className="flex flex-col gap-6">
          <span className="font-bold">🚀 Coming Soon</span>
          <h3 className="">
            New server actions are available, partial pre-rendering is coming
            up!
          </h3>
          <span className="text-textSoft font-medium text-xs">Boost your productivity</span>
          <p className="text-textSoft text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit eius libero perspiciatis recusandae possimus.
          </p>
          <button className="px-4 py-2 flex items-center gap-2 bg-indigo-600 text-white rounded-md cursor-pointer">
            <MdReadMore />
            Learn
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default Rightbar;
