"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { PayPalButtons, PayPalScriptProvider, ReactPayPalScriptOptions } from '@paypal/react-paypal-js';
import { BiArrowBack } from 'react-icons/bi';
import { FiHome } from 'react-icons/fi';

const TopUpIcoinsForm: React.FC = () => {
  const [icoinsAmount, setIcoinsAmount] = useState<number>(0);
  const [depositAmount, setDepositAmount] = useState<number | null>(null);

  const initialOptions: ReactPayPalScriptOptions = {
    "client-id": "Afpa-QQFIDP9sfkCURYtRGXCYGTFTkt9Pg2A9N5yugo2FYf-RTqOOp_beQ8FsT5iuSAslm0DNy_jU-7t",
    currency: "USD"
  };

  const handleIcoinsAmountChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const amount = parseInt(event.target.value, 10);
    if (!isNaN(amount) && amount >= 0) {
      setIcoinsAmount(amount);
      try {
        const response = await axios.post('/api/icoins/topup', { icoinsAmount: amount });
        setDepositAmount(response.data.depositAmount);
      } catch (error) {
        toast.error('Failed to calculate deposit amount');
      }
    } else {
      setIcoinsAmount(0);
      setDepositAmount(null);
    }
  };

  const handlePaymentSuccess = async (details: any, data: any) => {
    toast.success(`Transaction completed by ${details.payer.name.given_name}`);
    try {
      await fetch("/api/paypal/transaction-complete", {
        method: "post",
        body: JSON.stringify({
          orderID: data.orderID,
          icoinsAmount,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error saving transaction:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <div className="absolute top-4 left-4 flex space-x-4">
        <a href="/users/regular" aria-label="Home"><FiHome className="text-white text-2xl" /></a>
        <a href="/users/regular/profile" aria-label="Back"><BiArrowBack className="text-white text-2xl" /></a>
      </div>
      <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Top-Up Icoins</h2>
        <div className="mb-4">
          <label htmlFor="icoinsAmount" className="block text-sm font-medium text-gray-300">
            Enter Number of Icoins:
          </label>
          <input
            id="icoinsAmount"
            type="number"
            value={icoinsAmount}
            onChange={handleIcoinsAmountChange}
            className="mt-1 p-2 block w-full rounded-md bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:border-red-500 focus:ring-red-500"
            min="0"
          />
        </div>
        {depositAmount !== null && (
          <p className="mt-4 text-lg">
            Deposit Amount: <span className="font-semibold">{depositAmount} Kwacha</span>
          </p>
        )}
      </div>
      {depositAmount !== null && (
        <PayPalScriptProvider options={initialOptions}>
          <div className="mt-4 w-full max-w-md">
            <PayPalButtons
              style={{ layout: 'vertical' }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [{
                    amount: {
                      value: depositAmount.toString(),
                    },
                  }],
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then((details) => handlePaymentSuccess(details, data));
              }}
            />
          </div>
        </PayPalScriptProvider>
      )}
    </div>
  );
};

export default TopUpIcoinsForm;
