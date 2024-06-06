"use client";
import Sidebar from '../../../../components/Sidebar';
import Navbar from '../../../../components/Navbar';
import UploadedVideos from '../../../../components/EarningsOverview/UploadedVideos';

const Videos = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-900">
        <Navbar />
        <div className="p-6">
          <UploadedVideos />
        </div>
      </div>
    </div>
  );
};

export default Videos;
