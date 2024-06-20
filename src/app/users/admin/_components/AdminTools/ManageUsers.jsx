import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users/all');
      setUsers(response.data.data);
    } catch (error) {
      console.error('Failed to fetch users:', error.message);
    }
  };

  return (
    <div className="p-4 bg-gray-800 text-white rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Manage Users</h2>
      <table className="w-full">
        <thead>
          <tr className="text-left border-b border-gray-700">
            <th className="pb-2 cursor-pointer" >Name</th>
            <th className="pb-2 cursor-pointer" >Role</th>
            <th className="pb-2 cursor-pointer" >Subscribed</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id} className="border-b border-gray-700">
              <td className="py-2">{user.username}</td>
              <td className="py-2">{user.role}</td>
              <td className="py-2">{user.isSubscribed ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
  );
};

export default ManageUsers;
