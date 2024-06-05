"use client"
import React, { useState } from 'react';
import { FiHome } from "react-icons/fi";
import { BiArrowBack } from "react-icons/bi";

function Page() {
  const [balance, setBalance] = useState(1000); // Initial balance
  const [withdrawAmount, setWithdrawAmount] = useState('');

  {/*const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount');
    } else if (balance >= amount) {
      setBalance(balance - amount);
      setWithdrawAmount('');
    } else {
      alert('Insufficient balance');
    }
  };*/}

  return (
    <div className='bg-black text-white min-h-screen flex justify-center items-center relative'>
      <div className="absolute top-4 left-4 flex space-x-4">
      <a href="/users/regular"><FiHome /></a>
       <a href="/users/regular/profile"><BiArrowBack /></a>
      </div>
      <div className="bg-black bg-opacity-70 px-10 py-16 rounded-md w-full max-w-md">
        <h1 className="text-4xl mb-8 font-semibold text-center">Your Balance</h1>
        <p className="font-bold text-3xl text-center px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:border-red-500">
          K{balance.toFixed(2)}
        </p>
        {/*<input
          type="text"
          value={withdrawAmount}
          onChange={(e) => setWithdrawAmount(e.target.value)}
          placeholder="Enter amount to withdraw"
          className="mt-4 px-4 py-2 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-red-500"
  />*/}
        <button
          className="mt-4 px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg w-full"
        >
          Withdraw
        </button>
      </div>
    </div>
  );
}

export default Page;
