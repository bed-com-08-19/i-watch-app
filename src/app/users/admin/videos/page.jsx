"use client";

import React, { useEffect, useState } from 'react';
import Sidebar from '../_components/Sidebar';
import Navbar from '../_components/Navbar';
import axios from 'axios';

const UploadedVideos = () => {
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
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-900">
        <Navbar />
        <div className="p-6 bg-gray-800 text-white rounded-lg shadow-md">
          <h2 className="text-lg font-bold mb-4">Uploaded Videos</h2>
          <input
            type="text"
            placeholder="Search videos..."
            value={searchTerm}
            onChange={handleSearch}
            className="mb-4 p-2 bg-gray-700 rounded"
          />
          <table className="w-full text-left table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('title')}>Title</th>
                <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('description')}>Description</th>
                <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('creator')}>Creator</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVideos.map((video) => (
                <tr key={video._id}>
                  <td className="border px-4 py-2">{video.title}</td>
                  <td className="border px-4 py-2">{video.description}</td>
                  <td className="border px-4 py-2">{video.creator}</td>
                  <td className="border px-4 py-2">
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
  );
};

export default UploadedVideos;

