// components/VideoPlayer.js

import React, { useRef, useState } from 'react';

const VideoPlayer = ({ url, title, description }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLooping, setIsLooping] = useState(false);

  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleMute = () => {
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleLoop = () => {
    videoRef.current.loop = !isLooping;
    setIsLooping(!isLooping);
  };

  return (
    <div className="relative h-48 sm:h-64">
      <video ref={videoRef} className="object-cover w-full h-full" src={url} controls />
      <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 p-2 rounded">
        <button onClick={handlePlayPause} className="mx-1">
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button onClick={handleMute} className="mx-1">
          {isMuted ? 'Unmute' : 'Mute'}
        </button>
        <button onClick={handleLoop} className="mx-1">
          {isLooping ? 'Unloop' : 'Loop'}
        </button>
      </div>
      <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 p-2 rounded text-white">
        <p>{title}</p>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default VideoPlayer;
