"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BiArrowBack } from 'react-icons/bi';
import { FiHome } from 'react-icons/fi';

const AdminFundsPage = () => {
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [showWithdrawFunds, setShowWithdrawFunds] = useState(false);
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState('');

  useEffect(() => {
    fetchAdminBalance();
  }, []);

  const fetchAdminBalance = async () => {
    try {
      const response = await axios.get("/api/users/me");
      setBalance(response.data.data.balance);
    } catch (error) {
      console.error('Failed to fetch admin balance:', error.message);
    }
  };

  const handleAddFunds = () => {
    setShowAddFunds(true);
  };

  const handleWithdrawFunds = () => {
    setShowWithdrawFunds(true);
  };

  const handleConfirmAddFunds = async () => {
    try {
      await axios.post('/api/funds/add', { amount: parseFloat(amount) });
      fetchAdminBalance();
      setShowAddFunds(false);
      setAmount('');
    } catch (error) {
      console.error('Failed to add funds:', error.message);
    }
  };

  const handleConfirmWithdrawFunds = async () => {
    try {
      await axios.post('/api/funds/withdraw', { amount: parseFloat(amount) });
      fetchAdminBalance();
      setShowWithdrawFunds(false);
      setAmount('');
    } catch (error) {
      console.error('Failed to withdraw funds:', error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <div className="absolute top-4 left-4 flex space-x-4 text-2xl text-white">
        <a href="/users/admin" aria-label="Home" className="hover:text-red-500">
          <BiArrowBack />
        </a>
      </div>
      <h1 className="text-3xl font-bold mb-8 text-center text-white">Admin Funds Management</h1>
      <div className="bg-black p-8 rounded-lg shadow-lg w-full max-w-xl border border-line">
        <h2 className="text-2xl font-semibold mb-6 text-center text-white">Current Balance: K {balance}</h2>
        <div className="flex justify-center gap-4">
          <button
            className="bg-white hover:bg-gray-400 text-black py-3 px-6 rounded transition duration-300 ease-in-out transform hover:scale-105"
            onClick={handleAddFunds}
          >
            Add Funds
          </button>
          <button
            className="bg-red-600 text-white hover:bg-red-700 py-3 px-6 rounded transition duration-300 ease-in-out transform hover:scale-105"
            onClick={handleWithdrawFunds}
          >
            Withdraw Funds
          </button>
        </div>
      </div>

      {/* Add Funds Modal */}
      {showAddFunds && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black">
          <div className="bg-black p-6 rounded-lg w-full max-w-md border border-line">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-white">Add Funds</h2>
              <button
                className="text-white hover:text-gray-300"
                onClick={() => setShowAddFunds(false)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-lg mb-2 text-white">Enter Amount:</label>
              <input
                type="number"
                className="text-black w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-red-500"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <button
                className="bg-white hover:bg-gray-400 text-black py-3 px-6 rounded mr-2 transition duration-300 ease-in-out transform hover:scale-105"
                onClick={handleConfirmAddFunds}
              >
                Confirm
              </button>
              <button
                className="bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded transition duration-300 ease-in-out transform hover:scale-105"
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
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black ">
          <div className="bg-black p-6 rounded-lg w-full max-w-md border border-line">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-white">Withdraw Funds</h2>
              <button
                className="text-gray-500 hover:text-gray-300"
                onClick={() => setShowWithdrawFunds(false)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-lg mb-2 text-white">Enter Amount:</label>
              <input
                type="number"
                className="text-black w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-red-500"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <button
                className="bg-white hover:bg-gray-400 text-black py-3 px-6 rounded mr-2 transition duration-300 ease-in-out transform hover:scale-105"
                onClick={handleConfirmWithdrawFunds}
              >
                Confirm
              </button>
              <button
                className="bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded transition duration-300 ease-in-out transform hover:scale-105"
                onClick={() => setShowWithdrawFunds(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFundsPage;
