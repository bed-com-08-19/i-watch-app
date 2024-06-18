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
        <div className="flex min-h-screen bg-black text-white">
            <Sidebar />
            <div className="flex-1 p-6">
                <Header />
                <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4 text-red-500">Manage Users</h2>
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="mb-4 p-2 w-full rounded bg-gray-700 text-white placeholder-gray-400"
                    />
                    <table className="w-full text-left bg-gray-900">
                        <thead>
                            <tr className="bg-gray-800">
                                <th onClick={() => handleSort('username')} className="cursor-pointer py-2 px-4">Username</th>
                                <th onClick={() => handleSort('email')} className="cursor-pointer py-2 px-4">Email</th>
                                <th onClick={() => handleSort('role')} className="cursor-pointer py-2 px-4">Role</th>
                                <th onClick={() => handleSort('isVerified')} className="cursor-pointer py-2 px-4">Verified</th>
                                <th onClick={() => handleSort('balance')} className="cursor-pointer py-2 px-4">Balance</th>
                                <th onClick={() => handleSort('createdAt')} className="cursor-pointer py-2 px-4">Created At</th>
                                <th className="py-2 px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user) => (
                                <tr key={user._id} className="border-t border-gray-700">
                                    <td className="py-2 px-4">{user.username}</td>
                                    <td className="py-2 px-4">{user.email}</td>
                                    <td className="py-2 px-4">{user.role}</td>
                                    <td className="py-2 px-4">{user.isVerified ? 'Yes' : 'No'}</td>
                                    <td className="py-2 px-4">{user.balance}</td>
                                    <td className="py-2 px-4">{new Date(user.createdAt).toLocaleDateString()}</td>
                                    <td className="py-2 px-4">
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
