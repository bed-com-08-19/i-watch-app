"use client";

import React, { useEffect, useState } from 'react';
import Sidebar from '../_components/Sidebar';
import Header from '../_components/Header';
import axios from 'axios';

const ManageVideos = () => {
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await axios.get('/api/videos');
      setVideos(response.data.data);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/videos/${id}`);
      fetchVideos();
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (field) => {
    const sortedVideos = [...videos].sort((a, b) => {
      if (a[field] < b[field]) return sortOrder === 'asc' ? -1 : 1;
      if (a[field] > b[field]) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    setVideos(sortedVideos);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const filteredVideos = videos.filter((video) =>
    video.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    video.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar className="fixed inset-y-0 left-0 w-64 bg-gray-900" />
      <div className="flex-1 ml-64">
        <Header className="fixed inset-x-0 top-0 left-64 h-16 bg-gray-900" />
        <div className="pt-16 p-6 overflow-auto h-full">
          <div className="bg-gray-800 text-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 text-red-500">Uploaded Videos</h2>
            <input
              type="text"
              placeholder="Search videos..."
              value={searchTerm}
              onChange={handleSearch}
              className="mb-4 p-2 w-full rounded bg-gray-700 text-white placeholder-gray-400"
            />
            <table className="w-full text-left bg-gray-900 table-auto">
              <thead>
                <tr className="bg-gray-800">
                  <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('title')}>Title</th>
                  <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('description')}>Description</th>
                  <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('creator')}>Creator</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredVideos.map((video) => (
                  <tr key={video._id} className="border-t border-gray-700">
                    <td className="px-4 py-2">{video.title}</td>
                    <td className="px-4 py-2">{video.description}</td>
                    <td className="px-4 py-2">{video.creator}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleDelete(video._id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageVideos;