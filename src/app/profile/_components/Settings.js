import React from 'react';
import Link from "next/link";
import { toast } from "react-hot-toast";
import { AiOutlineUser, AiOutlineQuestionCircle } from 'react-icons/ai';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { RiShieldKeyholeLine } from 'react-icons/ri';
import { MdSecurity, MdDataUsage } from 'react-icons/md';
import { BiPalette } from 'react-icons/bi';
import { GiWorld } from 'react-icons/gi';
import { FiLogOut } from 'react-icons/fi';

const Settings = ({ icon, text, mdHidden }) => {
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    }
  };
  return (
    <div className="container text-red-400 mx-auto px-4 py-8">
      <h1 className="text-2xl text-red-900 font-bold mb-4">Settings</h1>

      {/* Account Settings */}
      <div className="mb-8">
      <h2 className="text-lg font-bold mb-2 hidden md:block">Account Settings</h2>
        <AiOutlineUser className="text-lg hidden sm:block" />
        {/* Add account settings options here */}
      </div>

      {/* Notification Settings */}
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-2 hidden md:block">Notification Settings</h2>
        <IoMdNotificationsOutline className="text-lg hidden sm:block" />
        {/* Add notification settings options here */}
      </div>

      {/* Privacy Settings */}
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-2 hidden md:block">Privacy Settings</h2>
        <RiShieldKeyholeLine className="text-lg hidden sm:block" />
        {/* Add privacy settings options here */}
      </div>

      {/* Security Settings */}
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-2 hidden md:block">Security Settings</h2>
        <MdSecurity className="text-lg hidden sm:block" />
        {/* Add security settings options here */}
      </div>

      {/* Theme Settings */}
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-2 hidden md:block">Theme Settings</h2>
        <BiPalette className="text-lg hidden sm:block" />
        {/* Add theme settings options here */}
      </div>

      {/* Language Settings */}
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-2 hidden md:block">Language Settings</h2>
        <GiWorld className="text-lg hidden sm:block" />
        {/* Add language settings options here */}
      </div>

      {/* Data Management */}
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-2 hidden md:block">Data Management</h2>
        <MdDataUsage className="text-lg hidden sm:block" />
        {/* Add data management options here */}
      </div>

      {/* Help & Support */}
      <div>
        <h2 className="text-lg font-bold mb-2 hidden md:block">Help & Support</h2>
        <AiOutlineQuestionCircle className="text-lg hidden sm:block" />
        {/* Add help & support options here */}
      </div>
      {/* logout */}
      <div>
      <Link href="/login" onClick={logout}>
      <button className="bg-red-500 mt-4 hover:bg-red-700 text-white font-bold py-2 px-4 rounded hidden md:block">
          Logout
        </button>
        <FiLogOut className="text-lg hidden sm:block" />
      </Link>
      </div>
    </div>
  );
};

export default Settings;