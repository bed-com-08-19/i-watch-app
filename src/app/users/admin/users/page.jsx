"use client";
import Sidebar from '../_components/Sidebar';
import Navbar from '../_components/Navbar';
import ManageUsers from '../_components/AdminTools/ManageUsers';

const Users = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-900">
        <Navbar />
        <div className="p-6">
          <ManageUsers />
        </div>
      </div>
    </div>
  );
};

export default Users;
