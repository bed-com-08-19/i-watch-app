"use client";

import React from 'react';
import { useRouter } from 'next/navigation'; // Correct import for app directory

function Page() {
  const router = useRouter();

  const handleMethodSelect = (method: string) => {
    router.push(`/users/regular/transaction/withdraw-details`);
  };

  return (
    <div className='bg-black text-white min-h-screen flex justify-center items-center'>
      <div className="absolute top-4 left-4 flex space-x-4">
       <a href="/users/regular"><FiHome /></a>
       <a href="/users/regular/transaction"><BiArrowBack /></a>
      </div>
      <div className="bg-black bg-opacity-70 px-10 py-16 rounded-md w-full max-w-md">
        <h1 className="text-4xl mb-8 font-semibold text-center">Select Withdrawal Method</h1>
        <button
          className="mt-4 px-4 py-2 text-black bg-white hover:bg-gray-400 rounded-lg w-full"
          onClick={() => handleMethodSelect('mobile')}
        >
          Mobile
        </button>
        <button
          className="mt-4 px-4 py-2 text-black bg-white hover:bg-gray-400 rounded-lg w-full"
          onClick={() => handleMethodSelect('bank')}
        >
          Bank
        </button>
      </div>
    </div>
  );
}

export default Page;
