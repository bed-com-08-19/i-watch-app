"use client";
import React from 'react';
import Sidebar from './_components/Sidebar';
import Header from './_components/Header';
import DashboardChart from './_components/AdminTools/DashboardChart';
import RecentVideos from './_components/RecentVideos';
import ManageUsers from './_components/AdminTools/ManageUsers';
import ManageSubscriptions from './_components/AdminTools/ManageSubscriptions';
import ManageAppSettings from './_components/AdminTools/ManageAppSettings';
import EarningsReport from './_components/AdminTools/EarningsReport';
import ManageDocuments from './_components/EarningsOverview/ManageDocuments';
import UploadedVideos from './_components/EarningsOverview/UploadedVideos';
import ManageAds from './_components/EarningsOverview/ManageAds';
import ManageAccount from './_components/EarningsOverview/ManageAccount';

const Dashboard = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="fixed inset-y-0 left-0 w-64 bg-black-800">
        <Sidebar />
      </div>
      <div className="flex-1 ml-64 bg-black-900">
        <div className="fixed inset-x-0 top-0 left-64 h-16 bg-gray-800 z-10">
          <Header />
        </div>
        <div className="pt-20 p-6 overflow-auto h-full">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-700 rounded-lg p-4 flex flex-col">
              <DashboardChart className="h-full w-full" />
            </div>
            <a href="/users/admin/ads" className="bg-gray-700 rounded-lg p-4 flex flex-col">
              <ManageAds className="h-full w-full" />
            </a>
            <a href="/users/admin/funds" className="bg-gray-700 rounded-lg p-4 flex flex-col">
              <ManageAccount className="h-full w-full" />
            </a>
            <a href="/users/admin/videos" className="bg-gray-700 rounded-lg p-4 flex flex-col">
              <UploadedVideos className="h-full w-full" />
            </a>
            <a href="/users/admin/subscriptions" className="bg-gray-700 rounded-lg p-4 flex flex-col">
              <ManageSubscriptions className="h-full w-full" />
            </a>
            <a href="/users/admin/documents" className="bg-gray-700 rounded-lg p-4 flex flex-col">
              <ManageDocuments className="h-full w-full" />
            </a>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <a href="/users/admin/users" className="bg-gray-700 rounded-lg p-4 flex flex-col">
              <ManageUsers className="h-full w-full" />
            </a>
            <a href="/users/admin/settings" className="bg-gray-700 rounded-lg p-4 flex flex-col">
              <ManageAppSettings className="h-full w-full" />
            </a>
            <a href="/users/admin/transactions" className="bg-gray-700 rounded-lg p-4 flex flex-col">
              <EarningsReport className="h-full w-full" />
            </a>
          </div>
          <a href="/users/admin/videos" className="bg-gray-700 rounded-lg p-4 flex flex-col">
            <RecentVideos className="h-full w-full" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
