import React from 'react';
import { MuxPlayer } from '@mux/mux-player-react';

export default function VideoPlayer({ playbackId }) {
  return (
    <MuxPlayer
      playbackId={playbackId}
      metadata={{
        video_id: playbackId,
        video_title: 'Test Video',
      }}
      streamType="on-demand"
      controls
      autoPlay
    />
  );
}
