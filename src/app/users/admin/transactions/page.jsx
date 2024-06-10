"use client";
import Sidebar from '../_components/Sidebar';
import Header from '../_components/Header';
import EarningsReport from '../_components/AdminTools/EarningsReport';

const Transactions = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-black-900">
        <Header />
        <div className="p-6">
          <EarningsReport />
        </div>
      </div>
    </div>
  );
};

export default Transactions;
