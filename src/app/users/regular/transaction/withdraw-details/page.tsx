// WithdrawPage Component
"use client";

import router from 'next/router';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { BiArrowBack } from 'react-icons/bi';
import { FiHome } from 'react-icons/fi';

function WithdrawPage() {
  const [mobileNumber, setMobileNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [icoins, setIcoins] = useState('');
  const [userBalance, setUserBalance] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [balance, setBalance] = useState(0); // New state for money balance

  useEffect(() => {
    // Fetch user balance on component mount
    const fetchUserBalance = async () => {
      try {
        const response = await fetch('/api/users/me');
        const data = await response.json();
        if (response.ok) {
          setUserBalance(data.data.icoins);
          setBalance(data.data.balance); // Set initial balance
        } else {
          toast.error('Failed to fetch user balance');
        }
      } catch (error) {
        console.error('Error fetching user balance:', error);
        toast.error('Failed to fetch user balance');
      }
    };

    fetchUserBalance();
  }, []);

  const handleIcoinsChange = (e) => {
    const enteredIcoins = parseFloat(e.target.value);
    if (enteredIcoins <= userBalance) {
      setIcoins(enteredIcoins);
      const amountInMoney = enteredIcoins * 45; // Assuming 1 icoin = 45 dollars
      setConvertedAmount(amountInMoney);
    } else {
      toast.error('Entered iCoins exceed your balance');
    }
  };

  const handleConvert = async () => {
    try {
      if (!icoins) {
        toast.error('Please enter iCoins to convert');
        return;
      }

      const requestBody = {
        icoins: parseFloat(icoins),
      };

      const response = await fetch('/api/users/convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || 'Failed to convert iCoins');
        return;
      }

      toast.success('iCoins converted successfully');
      setUserBalance(userBalance - parseFloat(icoins));
      setBalance(balance + convertedAmount);
    } catch (error) {
      console.error('Error during conversion:', error);
      toast.error('Failed to convert iCoins');
    }
  };

  const handleWithdraw = async () => {
    try {
      if (!mobileNumber.trim() || !amount.trim()) {
        toast.error('Please enter both mobile number and amount');
        return;
      }

      if (parseFloat(amount) > balance) {
        toast.error('Insufficient balance');
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

      const data = await response.json();

      console.log('Withdraw response:', data); // Add this line to log the response

      if (!response.ok) {
        if (data.message === 'Insufficient balance') {
          toast.error('Insufficient balance');
        } else if (data.message === 'Invalid phone number format') {
          toast.error('Invalid phone number format');
        } else if (data.message === 'Failed to send SMS') {
          toast.error('Failed to send SMS');
        } else {
          toast.error(data.message || 'Failed to withdraw');
        }
        return;
      }

      toast.success('Withdrawal successful');
      setBalance(balance - parseFloat(amount));
      router.push('/users/regular/transaction/withdraw-success');
    } catch (error) {
      console.error('Error during withdrawal:', error);
      toast.error('Failed to withdraw');
    }
  };

  return (
    <div className='bg-black text-white min-h-screen flex justify-center items-center'>
      <div className="absolute top-4 left-4 flex space-x-4">
        <a href="/users/regular"><FiHome /></a>
        <a href="/users/regular/transaction"><BiArrowBack /></a>
      </div>
      <div className="bg-black bg-opacity-70 px-10 py-16 rounded-md w-full max-w-md">
        <h1 className="text-4xl mb-8 font-semibold text-center">Enter Withdrawal Details</h1>
        <p className="text-center mb-4">Your iCoins Balance: {userBalance}</p>
        <input
          type="number"
          value={icoins}
          onChange={handleIcoinsChange}
          placeholder="Enter iCoins to convert"
          className="mt-4 px-4 py-2 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-red-500 w-full"
          min="0"
          max={userBalance}
        />
        <p className="text-center mt-2 mb-4">Converted Amount:K {convertedAmount}</p>
        <button
          className="mt-4 px-4 py-2 text-black bg-white hover:bg-gray-400 rounded-lg w-full"
          onClick={handleConvert}
        >
          Convert iCoins
        </button>
        <p className="text-center mt-2 mb-4">Your Balance:K {balance}</p>

        <input
          type="text"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          placeholder="Enter your mobile number(+265)"
          className="mt-4 px-4 py-2 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-red-500 w-full"
        />
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount to withdraw"
          className="mt-4 px-4 py-2 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-red-500 w-full"
        />
        <button
          className="mt-4 px-4 py-2 text-black bg-white hover:bg-gray-400 rounded-lg w-full"
          onClick={handleWithdraw}
        >
          Proceed to Withdraw
        </button>
      </div>
    </div>
  );
}

export default WithdrawPage;
