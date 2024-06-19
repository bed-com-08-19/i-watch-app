// File path: /pages/users/regular/subscribe.js
"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';

const SubscribePage = () => {
  const [subscription, setSubscription] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSubscription();
  }, []);

  const fetchSubscription = async () => {
    try {
      const res = await axios.get('/api/subscription/me');
      setSubscription(res.data.subscription);
    } catch (error) {
      toast.error('Failed to fetch subscription details');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubscribe = async (planId) => {
    try {
      const { data } = await axios.post('/api/paypal/subscribe', { planId });
      // Redirect to PayPal for subscription
      window.location.href = data.redirectUrl;
    } catch (error) {
      toast.error('Subscription failed');
    }
  };

  const handleCancelSubscription = async () => {
    try {
      await axios.post('/api/subscription/cancel');
      toast.success('Subscription cancelled');
      fetchSubscription();
    } catch (error) {
      toast.error('Failed to cancel subscription');
    }
  };

  const handleUpdateSubscription = async (planId) => {
    try {
      await axios.post('/api/subscription/update', { planId });
      toast.success('Subscription updated');
      fetchSubscription();
    } catch (error) {
      toast.error('Failed to update subscription');
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl mb-8">Manage Subscription</h1>
      <div className="mb-4">
        {subscription ? (
          <div>
            <p>Current Plan: {subscription.planName}</p>
            <p>Next Billing Date: {new Date(subscription.nextBillingDate).toLocaleDateString()}</p>
          </div>
        ) : (
          <p>You are not subscribed to any plan.</p>
        )}
      </div>
      <div className="mb-4">
        <h2 className="text-2xl mb-4">Subscription Options</h2>
        <PayPalScriptProvider options={{ 'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}>
          <PayPalButtons
            createSubscription={(data, actions) => {
              return actions.subscription.create({
                plan_id: 'P-1WJ68935LL406420PUTENA2I' // Replace with your PayPal plan ID
              });
            }}
            onApprove={(data, actions) => {
              handleSubscribe(data.subscriptionID);
            }}
            style={{ layout: 'vertical' }}
          />
        </PayPalScriptProvider>
      </div>
      {subscription && (
        <div className="mb-4">
          <button
            onClick={handleCancelSubscription}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
          >
            Cancel Subscription
          </button>
        </div>
      )}
      <div className="mb-4">
        <h2 className="text-2xl mb-4">Update Subscription</h2>
        <button
          onClick={() => handleUpdateSubscription('P-2VY85228D7412973NTEGGYLI')}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          Upgrade to Pro
        </button>
        <button
          onClick={() => handleUpdateSubscription('P-7AR45310V7783424WLNEBYVI')}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded ml-4"
        >
          Upgrade to Enterprise
        </button>
      </div>
    </div>
  );
};

export default SubscribePage;
