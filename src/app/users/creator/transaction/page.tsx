"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Correct import
import { FiHome } from "react-icons/fi";
import { BiArrowBack } from "react-icons/bi";
import axios from 'axios';
import toast from 'react-hot-toast';

function Page() {
  const [icoins, setIcoins] = useState(0);
  const router = useRouter(); // Moved inside the component's body

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      setIcoins(res.data.data.icoins);
    } catch (error) {
      toast.error("Failed to fetch user details");
    }
  };

  const handleWithdraw = () => {
    router.push('/users/creator/transaction/withdraw-method');
  };

  return (
    <div className='bg-black text-white min-h-screen flex justify-center items-center relative'>
      <div className="absolute top-4 left-4 flex space-x-4">
        <a href="/users/creator"><FiHome /></a>
        <a href="/users/creator/profile"><BiArrowBack /></a>
      </div>
      <div className="bg-black bg-opacity-70 px-10 py-16 rounded-md w-full max-w-md">
        <h1 className="text-4xl mb-8 font-semibold text-center">Your Balance</h1>
        <p className="font-bold text-3xl text-center px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:border-red-500">
          {icoins} iCoins
        </p>
        <button
          className="mt-4 px-4 py-2 text-black bg-white hover:bg-gray-400 rounded-lg w-full"
          onClick={handleWithdraw}
        >
          Withdraw
        </button>
      </div>
    </div>
  );
}

export default Page;
