"use client";

import React from 'react';
import { useRouter } from 'next/navigation'; // Correct import
import { BiArrowBack } from 'react-icons/bi';
import { FiHome } from 'react-icons/fi';

function Page() {
  const router = useRouter();

  const handleMethodSelect = (method: string) => {
    router.push(`/users/admin/transaction/withdraw-details?method=${method}`);
  };

  return (
    <div className='bg-black text-white min-h-screen flex justify-center items-center'>
      <div className="absolute top-4 left-4 flex space-x-4">
       <a href="/users/admin"><FiHome /></a>
       <a href="/users/admin/profile"><BiArrowBack /></a>
      </div>
      <div className="bg-black bg-opacity-70 px-10 py-16 rounded-md w-full max-w-md">
        <h1 className="text-4xl mb-8 font-semibold text-center">Select Withdrawal Method</h1>
        <button
          className="mt-4 px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg w-full"
          onClick={() => handleMethodSelect('mobile')}
        >
          Mobile
        </button>
        <button
          className="mt-4 px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg w-full"
          onClick={() => handleMethodSelect('bank')}
        >
          Bank
        </button>
      </div>
    </div>
  );
}

export default Page;
