import Sidebar from './_components/Sidebar';
import Header from './_components/Header';
import RecentVideos from './_components/RecentVideos';
import ManageUsers from './_components/AdminTools/ManageUsers';
import ManageSubscriptions from './_components/AdminTools/ManageSubscriptions';
import ManageAppSettings from './_components/AdminTools/ManageAppSettings';
import EarningsReport from './_components/AdminTools/EarningsReport';
import ManageDocuments from './_components/EarningsOverview/ManageDocuments';
import UploadedVideos from './_components/EarningsOverview/UploadedVideos';
import WatchedVideos from './_components/EarningsOverview/WatchedVideos';

const Dashboard = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="fixed inset-y-0 left-0 w-64 bg-gray-800">
        <Sidebar />
      </div>
      <div className="flex-1 ml-64 bg-black-900">
        <div className="fixed inset-x-0 top-0 left-64 h-16 bg-gray-800">
          <Header />
        </div>
        <div className="pt-16 p-6 overflow-auto h-full">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <a href=""><WatchedVideos /></a>
            <a href="/users/admin/videos"><UploadedVideos /></a>
            <a href=""><ManageSubscriptions /></a>
            <a href=""><ManageDocuments /></a>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <a href="/users/admin/users"><ManageUsers /></a>
            <a href=""><ManageAppSettings /></a>
            <a href=""><EarningsReport /></a>
          </div>
          <a href=""><RecentVideos /></a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
