"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RecentVideos = () => {
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  const [sortField, setSortField] = useState('uploadedOn');
  const [error, setError] = useState(null);


  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await axios.get('/api/videos');
      const sortedVideos = response.data.data.sort((a, b) => new Date(b.uploadedOn) - new Date(a.uploadedOn));
      setVideos(sortedVideos);
    } catch (error) {
      setError("Error fetching videos");
    }
  };

  const handleSort = (field) => {
    const sortedVideos = [...videos].sort((a, b) => {
      if (field === 'uploadedOn') {
        return sortOrder === 'asc' 
          ? new Date(a.uploadedOn) - new Date(b.uploadedOn)
          : new Date(b.uploadedOn) - new Date(a.uploadedOn);
      }
      if (a[field] < b[field]) return sortOrder === 'asc' ? -1 : 1;
      if (a[field] > b[field]) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    setVideos(sortedVideos);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    setSortField(field);
  };

  const filteredVideos = videos.filter((video) =>
    video.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    video.description?.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 5); // Limit to 5 most recent videos


  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="p-4 bg-gray-800 text-white rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Recent Videos</h2>
      <table className="w-full">
        <thead>
          <tr className="text-left border-b border-gray-700">
            <th className="pb-2 cursor-pointer" onClick={() => handleSort('title')}>Title</th>
            <th className="pb-2 cursor-pointer" onClick={() => handleSort('earned')}>Views</th>
          </tr>
        </thead>
        <tbody>
          {filteredVideos.map((video, index) => (
            <tr key={index} className="border-b border-gray-700">
              <td className="py-2">{video.title}</td>
              <td className="py-2">{video.size}</td>
              <td className="py-2">{new Date(video.uploadedOn).toLocaleDateString()}</td>
              <td className="py-2">{video.earned}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentVideos;
