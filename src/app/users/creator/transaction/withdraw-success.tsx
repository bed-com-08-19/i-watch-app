"use client";

import React from 'react';
import { useRouter } from 'next/router';

function WithdrawSuccess() {
  const router = useRouter();

  const handleBackToHome = () => {
    router.push('/users/creator/transaction');
  };

  return (
    <div className='bg-black text-white min-h-screen flex justify-center items-center'>
      <div className="bg-black bg-opacity-70 px-10 py-16 rounded-md w-full max-w-md text-center">
        <h1 className="text-4xl mb-8 font-semibold text-center">Withdrawal Successful</h1>
        <p className="text-xl mb-8">Your withdrawal has been processed successfully.</p>
        <button
          className="mt-4 px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg w-full"
          onClick={handleBackToHome}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default WithdrawSuccess;