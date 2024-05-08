import React from 'react';
import Link from "next/link";

const Settings = () => {
  return (
    <div className="container text-red-400 mx-auto px-4 py-8">
      <h1 className="text-2xl text-red-900 font-bold mb-4">Settings</h1>

      {/* Account Settings */}
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-2">Account Settings</h2>
        {/* Add account settings options here */}
      </div>

      {/* Notification Settings */}
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-2">Notification Settings</h2>
        {/* Add notification settings options here */}
      </div>

      {/* Privacy Settings */}
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-2">Privacy Settings</h2>
        {/* Add privacy settings options here */}
      </div>

      {/* Security Settings */}
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-2">Security Settings</h2>
        {/* Add security settings options here */}
      </div>

      {/* Theme Settings */}
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-2">Theme Settings</h2>
        {/* Add theme settings options here */}
      </div>

      {/* Language Settings */}
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-2">Language Settings</h2>
        {/* Add language settings options here */}
      </div>

      {/* Data Management */}
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-2">Data Management</h2>
        {/* Add data management options here */}
      </div>

      {/* Help & Support */}
      <div>
        <h2 className="text-lg font-bold mb-2">Help & Support</h2>
        {/* Add help & support options here */}
      </div>
      {/* logout */}
      <div>
      <Link href="/login" onClick={logout}>
        <h2 className="text-lg font-bold mb-2">logout</h2>
        {/* Add help & support options here */}
      </Link>
      </div>
    </div>
  );
};

export default Settings;