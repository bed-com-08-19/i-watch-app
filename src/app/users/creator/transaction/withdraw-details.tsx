"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';

function WithdrawDetails() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const method = searchParams.get('method') || 'mobile';

  const [details, setDetails] = useState('');
  const [amount, setAmount] = useState('');

  const handleWithdraw = () => {
    // You can add your backend call here
    console.log(`Method: ${method}, Details: ${details}, Amount: ${amount}`);
    router.push('/users/creator/transaction/withdraw-success');
  };

  return (
    <div className='bg-black text-white min-h-screen flex justify-center items-center'>
      <div className="bg-black bg-opacity-70 px-10 py-16 rounded-md w-full max-w-md">
        <h1 className="text-4xl mb-8 font-semibold text-center">Enter Withdrawal Details</h1>
        <input
          type="text"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder={`Enter your ${method === 'mobile' ? 'mobile number' : 'bank account'}`}
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
          className="mt-4 px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg w-full"
          onClick={handleWithdraw}
        >
          Proceed to Withdraw
        </button>
      </div>
    </div>
  );
}

export default WithdrawDetails;