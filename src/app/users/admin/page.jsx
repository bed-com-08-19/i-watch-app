"use client";
import React from 'react';
import Sidebar from './_components/Sidebar';
import Header from './_components/Header';
import DashboardChart from './_components/AdminTools/DashboardChart';
import RecentVideos from './_components/RecentVideos';
import ManageUsers from './_components/AdminTools/ManageUsers';
import ManageSubscriptions from './_components/AdminTools/ManageSubscriptions';
import EarningsReport from './_components/AdminTools/EarningsReport';
import ManageAds from './_components/EarningsOverview/ManageAds';
import ManageAccount from './_components/EarningsOverview/ManageAccount';

const AdminDashboard = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-black text-white">
      <div className="fixed inset-y-0 left-0 w-64 bg-gray-900 z-10">
        <Sidebar />
      </div>
      <div className="flex-1 ml-64">
        <div className="fixed inset-x-0 top-0 left-64 h-16 bg-gray-800 z-20 shadow-lg">
          <Header />
        </div>
        <div className="pt-20 p-6 overflow-auto h-full bg-black">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-900 rounded-lg p-4 shadow-lg">
              <DashboardChart className="h-full w-full" />
            </div>
            <a href="/users/admin/ads" className="bg-gray-900 rounded-lg p-4 shadow-lg hover:bg-gray-700 transition-colors">
              <ManageAds className="h-full w-full" />
            </a>
            <a href="/users/admin/funds" className="bg-gray-900 rounded-lg p-4 shadow-lg hover:bg-gray-700 transition-colors">
              <ManageAccount className="h-full w-full" />
            </a>
            <a href="/users/admin/subscriptions" className="bg-gray-900 rounded-lg p-4 shadow-lg hover:bg-gray-700 transition-colors">
              <ManageSubscriptions className="h-full w-full" />
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <a href="/users/admin/users" className="bg-gray-900 rounded-lg p-4 shadow-lg hover:bg-gray-700 transition-colors">
              <ManageUsers className="h-full w-full" />
            </a>
            <a href="/users/admin/videos" className="bg-gray-900 rounded-lg p-4 shadow-lg hover:bg-gray-700 transition-colors">
              <RecentVideos className="h-full w-full" />
            </a>
          </div>
          <div className="grid grid-cols-1 gap-4 mb-6">
            <a href="/users/admin/reports" className="bg-gray-900 rounded-lg p-4 shadow-lg hover:bg-gray-700 transition-colors">
              <EarningsReport className="h-full w-full" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
