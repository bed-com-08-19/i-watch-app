'use client';

import Sidebar from '../_components/Sidebar';
import Header from '../_components/Header';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortField, setSortField] = useState('username');
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('/api/users');
            setUsers(response.data.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/users/${id}`);
            fetchUsers();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const handleVerify = async (id) => {
        try {
            await axios.patch(`/api/users/verify/${id}`);
            fetchUsers();
        } catch (error) {
            console.error("Error verifying user:", error);
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSort = (field) => {
        const sortedUsers = [...users].sort((a, b) => {
            if (a[field] < b[field]) return sortOrder === 'asc' ? -1 : 1;
            if (a[field] > b[field]) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });
        setUsers(sortedUsers);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const sortedUsers = [...users].sort((a, b) => {
        if (a[sortField] < b[sortField]) {
            return sortOrder === 'asc' ? -1 : 1;
        }
        if (a[sortField] > b[sortField]) {
            return sortOrder === 'asc' ? 1 : -1;
        }
        return 0;
    });

    const filteredUsers = users.filter((user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 bg-black-900">
                <Header />
                <div className="bg-black-800 text-white p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-bold mb-4">Manage Users</h2>
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="mb-4 p-2 rounded bg-gray-700 text-white"
                    />
                    <table className="w-full text-left">
                        <thead>
                            <tr>
                                <th onClick={() => handleSort('username')}>Username</th>
                                <th onClick={() => handleSort('email')}>Email</th>
                                <th onClick={() => handleSort('role')}>Role</th>
                                <th onClick={() => handleSort('isVerified')}>Verified</th>
                                <th onClick={() => handleSort('balance')}>Balance</th>
                                <th onClick={() => handleSort('createdAt')}>Created At</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user) => (
                                <tr key={user._id}>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>{user.isVerified ? 'Yes' : 'No'}</td>
                                    <td>{user.balance}</td>
                                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        <button
                                            onClick={() => handleDelete(user._id)}
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mr-2"
                                        >
                                            Delete
                                        </button>
                                        {!user.isVerified && (
                                            <button
                                                onClick={() => handleVerify(user._id)}
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                                            >
                                                Verify
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;
