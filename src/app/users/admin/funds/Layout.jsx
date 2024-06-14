// Layout.jsx

import React from 'react';
import Sidebar from './../_components/Sidebar';
import Header from './../_components/Header'

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="fixed inset-y-0 left-0 w-64 bg-gray-800">
        <Sidebar />
      </div>
      <div className="flex-1 ml-64 bg-black">
        <div className="fixed inset-x-0 top-0 left-64 h-16 bg-gray-800">
          <Header />
        </div>
        <div className="pt-16 p-6 overflow-auto h-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
