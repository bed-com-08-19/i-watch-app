"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from './Layout';

const AdminFundsPage = () => {
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [showWithdrawFunds, setShowWithdrawFunds] = useState(false);
  const [balance, setBalance] = useState(""); // Initialize with empty string

  useEffect(() => {
    fetchAdminBalance();
  }, []);

  const fetchAdminBalance = async () => {
    try {
      const response = await axios.get("/api/admin/balance");
      setBalance(response.data.data.balance); // Assuming balance is fetched as a number
    } catch (error) {
      console.error('Failed to fetch admin balance:', error.message);
      // Handle error fetching balance
    }
  };

  const handleAddFunds = () => {
    setShowAddFunds(true);
  };

  const handleWithdrawFunds = () => {
    setShowWithdrawFunds(true);
  };

  const handleConfirmAddFunds = () => {
    // Implement logic to add funds
    setShowAddFunds(false);
  };

  const handleConfirmWithdrawFunds = () => {
    // Implement logic to withdraw funds
    setShowWithdrawFunds(false);
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-3xl font-bold mb-8 text-center">Admin Funds Management</h1>
        <div className="bg-gray-100 p-8 rounded-lg shadow-lg w-2/3">
          <h2 className="text-2xl font-semibold mb-6 text-center">Current Balance: K {balance}</h2>
          <div className="flex justify-center gap-4">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded transition duration-300 ease-in-out transform hover:scale-105"
              onClick={handleAddFunds}
            >
              Add Funds
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded transition duration-300 ease-in-out transform hover:scale-105"
              onClick={handleWithdrawFunds}
            >
              Withdraw Funds
            </button>
          </div>
        </div>
      </div>

      {/* Add Funds Modal */}
      {showAddFunds && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-gray-200 p-6 rounded-lg w-1/3">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Add Funds</h2>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowAddFunds(false)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-lg mb-2">Enter Amount:</label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                placeholder="Enter amount"
              />
            </div>
            <div className="flex justify-end">
              <button
                className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded mr-2 transition duration-300 ease-in-out transform hover:scale-105"
                onClick={handleConfirmAddFunds}
              >
                Confirm
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded transition duration-300 ease-in-out transform hover:scale-105"
                onClick={() => setShowAddFunds(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Withdraw Funds Modal */}
      {showWithdrawFunds && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-gray-200 p-6 rounded-lg w-1/3">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Withdraw Funds</h2>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowWithdrawFunds(false)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-lg mb-2">Enter Amount:</label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                placeholder="Enter amount"
              />
            </div>
            <div className="flex justify-end">
              <button
                className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded mr-2 transition duration-300 ease-in-out transform hover:scale-105"
                onClick={handleConfirmWithdrawFunds}
              >
                Confirm
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded transition duration-300 ease-in-out transform hover:scale-105"
                onClick={() => setShowWithdrawFunds(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default AdminFundsPage;
