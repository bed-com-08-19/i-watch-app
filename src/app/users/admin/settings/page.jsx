"use client";
import Sidebar from '../_components/Sidebar';
import Header from '../_components/Header';
import ManageAppSettings from '../_components/AdminTools/ManageAppSettings';

const Settings = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-black-900">
        <Header />
        <div className="p-6">
          <ManageAppSettings />
        </div>
      </div>
    </div>
  );
};

export default Settings;
