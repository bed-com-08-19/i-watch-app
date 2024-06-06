"use client";
import Sidebar from '../../../../components/Sidebar';
import Navbar from '../../../../components/Navbar';
import EarningsReport from '../../../../components/AdminTools/EarningsReport';

const Reports = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-900">
        <Navbar />
        <div className="p-6">
          <EarningsReport />
        </div>
      </div>
    </div>
  );
};

export default Reports;
