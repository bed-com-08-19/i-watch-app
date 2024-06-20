"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { FiHome } from 'react-icons/fi';
import { BiArrowBack } from 'react-icons/bi';

const SubscribePage = () => {
  const [subscription, setSubscription] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [email, setEmail] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    fetchSubscription();
    getUserDetails();
  }, []);

  const fetchSubscription = async () => {
    try {
      const res = await axios.get('/api/subscription');
      setSubscription(res.data.data[0]); // Assuming the first item is the user's subscription
    } catch (error) {
      toast.error('Failed to fetch subscription details');
    } finally {
      setIsLoading(false);
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      setUserId(res.data.data.userId);
      setEmail(res.data.data.email);
    } catch (error) {
      toast.error("Failed to fetch user details");
    }
  };

  const handleCancelSubscription = async () => {
    try {
      await axios.post('/api/subscription/cancel', { subscriptionId: subscription._id });
      toast.success('Subscription cancelled');
      fetchSubscription();
    } catch (error) {
      toast.error('Failed to cancel subscription');
    }
  };

  const handleCheckout = async (planId) => {
    try {
      const { data } = await axios.post('/api/paypal/subscribe', { planId });
      window.location.href = data.redirectUrl;
    } catch (error) {
      toast.error('Subscription failed');
    }
  };


  const plans = [
    {
      id: "P-1WJ68935LL406420PUTENA2I",
      monthlyPrice: 200,
      description: "Basic Plan: Essential features you need to get started",
      features: [
        "Access to standard content library",
        "Standard video quality (up to 720p)",
        "Single device streaming",
        "Limited offline downloads",
        "Basic customer support"
      ],
    },
    {
      id: "P-2VY85228D7412973NTEGGYLI",
      monthlyPrice: 350,
      description: "Pro Plan: Perfect for small & medium businesses",
      features: [
        "Access to extended content library",
        "High-definition video quality (up to 1080p)",
        "Multi-device streaming (up to 3 devices)",
        "Unlimited offline downloads",
        "Ad-free experience",
        "Priority customer support"
      ],
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="absolute top-4 left-4 flex space-x-4">
        <a href="/users/regular" className="text-gray-400 hover:text-gray-200"><FiHome size={24} /></a>
        <a href="/users/regular/profile" className="text-gray-400 hover:text-gray-200"><BiArrowBack size={24} /></a>
      </div>
      <h1 className="text-3xl mb-8 text-center">Manage Subscription</h1>
      <div className="mb-8">
        {subscription ? (
          <div className="bg-gray-800 p-4 rounded shadow-md">
            <p className="text-lg mb-2">Current Plan: {subscription.plan_id}</p>
            <p className="text-lg mb-4">Next Billing Date: {new Date(subscription.end_date).toLocaleDateString()}</p>
            <button
              onClick={handleCancelSubscription}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
            >
              Cancel Subscription
            </button>
          </div>
        ) : (
          <div className="bg-gray-800 p-4 rounded shadow-md">
            <p className="text-lg">You are not subscribed to any plan.</p>
          </div>
        )}
      </div>
      <h2 className="text-2xl mb-4 text-center">IWATCH SUBSCRIPTION PLANS</h2>
      <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-8">
        {plans.map((plan) => (
          <div key={plan.id} className="bg-gray-800 p-6 rounded shadow-md w-full sm:w-80">
            <h3 className="text-xl mb-4">{plan.description}</h3>
            <p className="text-3xl font-bold mb-4">MKW{plan.monthlyPrice} /month</p>
            <ul className="mb-4">
              {plan.features.map((feature, index) => (
                <li key={index} className="mb-2 flex items-center">
                  <CheckCircle2 size={20} className="mr-2 text-green-400" />
                  <span className="text-base">{feature}</span>
                </li>
              ))}
            </ul>
            {selectedPlan === plan.id ? (
              <PayPalScriptProvider options={{ 'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}>
                <PayPalButtons
                  createSubscription={(data, actions) => {
                    return actions.subscription.create({
                      plan_id: plan.id // Using plan.id as the plan_id
                    });
                  }}
                  onApprove={(data, actions) => {
                    handleCheckout(data.subscriptionID);
                  }}
                  style={{ layout: 'vertical' }}
                />
              </PayPalScriptProvider>
            ) : (
              <button
                onClick={() => setSelectedPlan(plan.id)}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
              >
                Subscribe
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscribePage;

const CheckCircle2 = ({ size, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`w-${size} h-${size} ${className}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 11l3 3L22 4" />
    <path d="M21 12.4A9 9 0 1 1 12.6 3" />
  </svg>
);
