// pages/withdraw.js

"use client";

import router from 'next/router';
import React, { useState } from 'react';

import { toast } from 'react-hot-toast';
import { BiArrowBack } from 'react-icons/bi';
import { FiHome } from 'react-icons/fi';

function WithdrawPage() {
  
  const [mobileNumber, setMobileNumber] = useState('');
  const [amount, setAmount] = useState('');

  const handleWithdraw = async () => {
    try {
      if (!mobileNumber.trim() || !amount.trim()) {
        toast.error('Please enter both mobile number and amount');
        return;
      }

      const requestBody = {
        phoneNumber: mobileNumber.trim(),
        amount: parseFloat(amount.trim()),
      };

      const response = await fetch('/api/withdraw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const data = await response.json();
        toast.error(data.message || 'Failed to withdraw');
        return;
      }

      toast.success('Withdrawal successful');
      router.push('/users/creator/transaction/withdraw-success');
    } catch (error) {
      console.error('Error during withdrawal:', error);
      toast.error('Failed to withdraw');
    }
  };

  return (
    <div className='bg-black text-white min-h-screen flex justify-center items-center'>
      <div className="absolute top-4 left-4 flex space-x-4">
       <a href="/users/creator"><FiHome /></a>
       <a href="/users/creator/transaction"><BiArrowBack /></a>
      </div>
      <div className="bg-black bg-opacity-70 px-10 py-16 rounded-md w-full max-w-md">
        <h1 className="text-4xl mb-8 font-semibold text-center">Enter Withdrawal Details</h1>
        <input
          type="text"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          placeholder="Enter your mobile number"
          className="mt-4 px-4 py-2 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-red-500 w-full"
        />
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="mt-4 px-4 py-2 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-red-500 w-full"
        />
        <button
          className="mt-4 px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg w-full"
          onClick={handleWithdraw}
        >
          Proceed to Withdraw
        </button>
      </div>
    </div>
  );
}

export default WithdrawPage;
