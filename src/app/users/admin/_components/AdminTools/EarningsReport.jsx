"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EarningsReport = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        console.log('Fetching transactions...');
        const response = await axios.get('/api/transactions');
        console.log('Transactions fetched:', response.data.transactions);
        setTransactions(response.data.transactions);
      } catch (err) {
        console.error('Error fetching transactions:', err);
        setError('Failed to fetch transactions');
      }
    };

    fetchTransactions();
  }, []);

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  const recentTransactions = transactions.slice(0, 5); // Limit to 5 most recent transactions

  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Earnings Report</h2>
      {transactions.length === 0 ? (
        <p className="text-gray-400">No transactions found.</p>
      ) : (
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-800">
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Email</th>
            </tr>
          </thead>
          <tbody>
            {recentTransactions.map((transaction, index) => (
              <tr key={transaction._id} className={index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'}>
                <td className="border-t border-gray-600 px-4 py-2">{transaction._id}</td>
                <td className="border-t border-gray-600 px-4 py-2">${transaction.amount.toFixed(2)}</td>
                <td className="border-t border-gray-600 px-4 py-2">{new Date(transaction.createdAt).toLocaleDateString()}</td>
                <td className="border-t border-gray-600 px-4 py-2">{transaction.type}</td>
                <td className="border-t border-gray-600 px-4 py-2">{transaction.user?.email || 'User not found'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EarningsReport;
