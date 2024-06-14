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
    <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Earnings Report</h2>
      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {recentTransactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="border px-4 py-2">{transaction.id}</td>
                <td className="border px-4 py-2">${transaction.amount.toFixed(2)}</td>
                <td className="border px-4 py-2">{new Date(transaction.date).toLocaleDateString()}</td>
                <td className={`border px-4 py-2 ${transaction.status === 'succeeded' ? 'text-green-500' : 'text-red-500'}`}>
                  {transaction.status}
                </td>
                <td className="border px-4 py-2">{transaction.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EarningsReport;
