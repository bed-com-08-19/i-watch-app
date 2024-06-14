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
        <DashboardChart className="mb-6" />
            <a href="/users/admin/ads"><a><ManageAds /></a></a>
            <a href="/users/admin/videos"><a><UploadedVideos /></a></a>
            <a href=""><a><ManageSubscriptions /></a></a>
            <a href=""><a><ManageDocuments /></a></a>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <a href="/users/admin/users"><a><ManageUsers /></a></a>
            <a href=""><a><ManageAppSettings /></a></a>
            <a href="/users/admin/transactions"><a><EarningsReport /></a></a>
          </div>
          <a href="/users/admin/videos"><a><RecentVideos /></a></a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
