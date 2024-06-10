// _components/ChangeUsernameForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const ChangeUsernameForm = ({ userId }) => {
    const [username, setUsername] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/settings/username', { userId, username });
            toast.success('Username updated successfully');
        } catch (error) {
            console.error('There was an error updating the username!', error);
            toast.error('Failed to update username');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-red-700">
                    New Username
                </label>
                <input
                    type="text"
                    className="border border-white rounded w-full py-2 px-3 text-black placeholder-black"
                    value={username}
                    onChange={handleUsernameChange}
                    required
                    placeholder="Enter your new username"
                />
            </div>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                Change Username
            </button>
        </form>
    );
};

export default ChangeUsernameForm;
