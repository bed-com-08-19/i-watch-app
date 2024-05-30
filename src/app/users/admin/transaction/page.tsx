"use client"
import React, { useState } from 'react';

function Page() {
  const [balance, setBalance] = useState(1000); // Initial balance
  const [withdrawAmount, setWithdrawAmount] = useState('');

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount');
    } else if (balance >= amount) {
      setBalance(balance - amount);
      setWithdrawAmount('');
    } else {
      alert('Insufficient balance');
    }
  };

  return (
    <div className='bg-black text-white min-h-screen flex justify-center items-center'>
      <div className="w-full max-w-md px-4 py-2 flex items-center justify-between">
        <i className="fas fa-home text-white text-2xl cursor-pointer"></i>
        <i className="fas fa-arrow-left text-white text-2xl cursor-pointer"></i>
      </div>
      <div className="bg-black bg-opacity-70 px-10 py-16 rounded-md w-full max-w-md">
        <h1 className="text-4xl mb-8 font-semibold text-center">Your Balance</h1>
        <p className="font-bold text-3xl text-center px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:border-red-500">
          K{balance.toFixed(2)}
        </p>
       
        <button
          className="mt-4 px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg w-full"
          onClick={handleWithdraw}
        >
          Withdraw
        </button>
      </div>
    </div>
  );
}

export default Page;
