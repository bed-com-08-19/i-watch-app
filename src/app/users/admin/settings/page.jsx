"use client";
import Sidebar from '../_components/Sidebar';
import Navbar from '../_components/Navbar';
import ManageAppSettings from '../_components/AdminTools/ManageAppSettings';

const Settings = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-900">
        <Navbar />
        <div className="p-6">
          <ManageAppSettings />
        </div>
      </div>
    </div>
  );
};

export default Settings;
