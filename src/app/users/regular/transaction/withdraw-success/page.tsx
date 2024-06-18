"use client";

import React from 'react';
import { useRouter } from 'next/navigation'; // Correct import
import { BiArrowBack } from 'react-icons/bi';
import { FiHome } from 'react-icons/fi';

function Page() {
  const router = useRouter();

  const handleBackToHome = () => {
    router.push('/users/regular/profile');
  };

  const handleMakeTransaction = () => {
    router.push('/users/regular/transaction');
  };

  return (
    <div className='bg-black text-white min-h-screen flex justify-center items-center'>
      <div className="absolute top-4 left-4 flex space-x-4">
       <a href="/users/regular"><FiHome /></a>
       <a href="/users/regular/transaction"><BiArrowBack /></a>
      </div>
      <div className="bg-black bg-opacity-70 px-10 py-16 rounded-md w-full max-w-md text-center">
        <h1 className="text-4xl mb-8 font-semibold text-center">Withdrawal Successful</h1>
        <p className="text-xl mb-8">Your withdrawal has been processed successfully.</p>
        <button
          className="mt-4 px-4 py-2 text-black bg-white hover:bg-gray-400 rounded-lg w-full"
          onClick={handleBackToHome}
        >
          Back to Home
        </button>
        <button
          className="mt-4 px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg w-full"
          onClick={handleMakeTransaction}
        >
          Make another Transaction
        </button>
      </div>
    </div>
  );
}

export default Page;