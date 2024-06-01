"use client";

import React, { useState } from 'react';
import { FiHome } from "react-icons/fi";
import { BiArrowBack } from "react-icons/bi";
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string);

const CheckoutForm = ({ amount }: { amount: number }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.post('/api/stripe', { amount });

      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: {
            name: 'Cardholder Name',
          },
        },
      });

      if (result.error) {
        setError(result.error.message || 'Payment failed');
      } else {
        if (result.paymentIntent?.status === 'succeeded') {
          alert('Withdrawal successful');
        }
      }
    } catch (error: any) {
      setError(error.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <CardElement className="p-4 bg-gray-800 rounded-md" />
      <button
        type="submit"
        className="mt-4 px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg w-full"
        disabled={!stripe || loading}
      >
        {loading ? 'Processing...' : 'Withdraw'}
      </button>
      {error && <div className="text-red-500 mt-4">{error}</div>}
    </form>
  );
};

function Page() {
  const [balance, setBalance] = useState(1000); // Initial balance

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
        <Elements stripe={stripePromise}>
          <CheckoutForm amount={balance} />
        </Elements>
      </div>
    </div>
  );
}

export default Page;
