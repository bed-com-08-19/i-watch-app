import React, { useState } from 'react';
import Image from "next/image";

const ProfileHeader = ({ user, onViewImage, onChangeImage, onDeleteImage }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <div className="flex items-center justify-center w-full p-4 relative">
      <div className="flex items-center">
        <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-full overflow-hidden">
          <Image
            src={user.image || "/noavatar.png"}
            alt="Profile Picture"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            onClick={toggleDropdown}
            className="cursor-pointer"
          />
          {dropdownOpen && (
            <div className="absolute top-full mt-2 w-48 bg-white shadow-lg rounded-md">
              <ul>
                <li className="p-2 hover:bg-gray-200 cursor-pointer" onClick={onViewImage}>View Image</li>
                <li className="p-2 hover:bg-gray-200 cursor-pointer" onClick={onChangeImage}>Change Image</li>
                <li className="p-2 hover:bg-gray-200 cursor-pointer" onClick={onDeleteImage}>Delete Image</li>
              </ul>
            </div>
          )}
        </div>
        <div className="ml-4 text-white">
          <h1 className="text-xl font-semibold">{user.name}</h1>
          <p className="text-sm text-gray-500">{user.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
