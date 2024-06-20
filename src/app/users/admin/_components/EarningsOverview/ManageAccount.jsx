"use client"
import React, { useState, useEffect } from 'react';

const ManageAccount = () => {

  const [balance, setBalance] = useState(0);

  useEffect(() => {
    fetchAdminBalance();
  }, []);

  const fetchAdminBalance = async () => {
    try {
      const response = await axios.get("/api/users/me");
      setBalance(response.data.data.balance);
    } catch (error) {
      console.error('Failed to fetch admin balance:', error.message);
    }
  };


    return (
      <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-4">Manage Account Balance</h2>
        <p>Current Balance: K {balance}</p>
      </div>
    );
  };
  
  export default ManageAccount;
  