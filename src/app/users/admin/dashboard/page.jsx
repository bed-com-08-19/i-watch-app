import Sidebar from '../_components/Sidebar';
import Navbar from '../_components/Navbar';
import RecentVideos from '../_components/RecentVideos';
import ManageUsers from '../_components/AdminTools/ManageUsers';
import ManageSubscriptions from '../_components/AdminTools/ManageSubscriptions';
import ManageAppSettings from '../_components/AdminTools/ManageAppSettings';
import EarningsReport from '../_components/AdminTools/EarningsReport';
import ManageDocuments from '../_components/EarningsOverview/ManageDocuments';
import UploadedVideos from '../_components/EarningsOverview/UploadedVideos';
import WatchedVideos from '../_components/EarningsOverview/WatchedVideos';
import Header from '../_components/Header';

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-900">
        <Header />
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <WatchedVideos />
            <UploadedVideos />
            <ManageSubscriptions />
            <ManageDocuments />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <ManageUsers />
            <ManageAppSettings />
            <EarningsReport />
          </div>
          <RecentVideos />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

