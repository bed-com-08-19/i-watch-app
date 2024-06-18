// src/app/users/creator/profile/VideoCard.tsx
import { Video } from 'lucide-react';
import React from 'react';
import { FaTrashAlt, FaEye } from 'react-icons/fa';

interface VideoCardProps {
  video: Video;
  handleDelete: (id: string) => void;
  handleViewStatistics: (video: Video) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, handleDelete, handleViewStatistics }) => {
  return (
    <div className="bg-gray-800 p-4 rounded shadow-md">
      <video className="object-cover w-full h-32 mb-2" src={video.url} controls />
      <h3 className="text-lg font-semibold text-white">{video.title}</h3>
      <p className="text-gray-400">{video.description}</p>
      <div className="flex justify-between items-center mt-2">
        <button onClick={() => handleViewStatistics(video)} className="text-sm text-gray-400 flex items-center">
          <FaEye className="mr-1" /> View Stats
        </button>
        <button onClick={() => handleDelete(video._id)} className="text-sm text-red-600 flex items-center">
          <FaTrashAlt className="mr-1" /> Delete
        </button>
      </div>
    </div>
  );
};

export default VideoCard;
