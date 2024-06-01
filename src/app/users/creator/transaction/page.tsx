"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Correct import
import { FiHome } from "react-icons/fi";
import { BiArrowBack } from "react-icons/bi";

function Page() {
  const [balance, setBalance] = useState(1000); // Initial balance
  const router = useRouter();

  const handleWithdraw = () => {
    router.push('/users/creator/transaction/withdraw-method');
  };

  return (
    <div className='bg-black text-white min-h-screen flex justify-center items-center relative'>
      <div className="absolute top-4 left-4 flex space-x-4">
        <FiHome />
        <BiArrowBack />
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
