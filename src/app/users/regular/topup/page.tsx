// /users/regular/topup/page.tsx

import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const TopUpIcoinsForm: React.FC = () => {
  const [icoinsAmount, setIcoinsAmount] = useState<number>(0);
  const [depositAmount, setDepositAmount] = useState<number | null>(null);

  const handleIcoinsAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const amount = parseInt(event.target.value, 10);
    setIcoinsAmount(amount);
  };

  const handleCalculateDeposit = async () => {
    try {
      const response = await axios.post('/api/icoins/topup', { icoinsAmount });
      setDepositAmount(response.data.depositAmount);
    } catch (error) {
      toast.error('Failed to calculate deposit amount');
    }
  };

  return (
    <div className="top-up-icoins-form">
      <h2>Top-Up Icoins</h2>
      <label>
        Enter Number of Icoins:
        <input type="number" value={icoinsAmount} onChange={handleIcoinsAmountChange} />
      </label>
      <button onClick={handleCalculateDeposit}>Calculate Deposit Amount</button>
      {depositAmount !== null && (
        <p>Deposit Amount: MKW {depositAmount} </p>
      )}
    </div>
  );
};

export default TopUpIcoinsForm;
