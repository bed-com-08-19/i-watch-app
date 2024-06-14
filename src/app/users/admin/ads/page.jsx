"use client";
import Sidebar from '../_components/Sidebar';
import Header from '../_components/Header';
import Ads from '../_components/AdminTools/Ads';

const Transactions = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-black-900">
        <Header />
        <div className="p-6 bg-">
          <Ads />
        </div>
      </div>
    </div>
  );
};

export default Transactions;
