"use client";
import Sidebar from '../_components/Sidebar';
import Navbar from '../_components/Navbar';
import EarningsReport from '../_components/AdminTools/EarningsReport';

const Transactions = () => {
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

export default Transactions;
