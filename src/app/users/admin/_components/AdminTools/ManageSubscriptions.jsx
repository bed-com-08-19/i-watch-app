"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        console.log('Fetching subscriptions...');
        const response = await axios.get('/api/subscriptions');
        console.log('Subscriptions fetched:', response.data.data);
        setSubscriptions(response.data.data);
       
      } catch (err) {
        console.error('Error fetching subscriptions:', err);
        setError('Failed to fetch subscriptions');
        
      }
    };

    fetchSubscriptions();
  }, []);

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  const recentSubscriptions = subscriptions.slice(0, 5); // Limit to 5 most recent subscriptions

  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Manage Subscriptions</h2>
      {subscriptions.length === 0 ? (
        <p>No subscriptions found.</p>
      ) : (
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">User</th>
              <th className="px-4 py-2">Plan</th>
              <th className="px-4 py-2">Start Date</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {recentSubscriptions.map((subscription) => (
              <tr key={subscription.subscription_id}>
                <td className="border px-4 py-2">{subscription.subscription_id}</td>
                <td className="border px-4 py-2">{subscription.user_id}</td>
                <td className="border px-4 py-2">{subscription.plan_id}</td>
                <td className="border px-4 py-2">{new Date(subscription.start_date).toLocaleDateString()}</td>
                <td className={`border px-4 py-2 ${subscription.status === 'active' ? 'text-green-500' : 'text-red-500'}`}>
                  {subscription.status}
                </td>
                <td className="border px-4 py-2">{subscription.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageSubscriptions;
