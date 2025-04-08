"use client";

import { useState } from "react";
import VideoPlayer from "@/components/VideoPlayer";

export default function VideoGrid({ videos }) {
  const [enlargedVideo, setEnlargedVideo] = useState(null);
  const [playingVideos, setPlayingVideos] = useState(new Set());

  const handleEnlarge = (src) => {
    setEnlargedVideo(enlargedVideo === src ? null : src);
  };

  const handlePlayStateChange = (src, isPlaying) => {
    setPlayingVideos((prev) => {
      const newSet = new Set(prev);
      if (isPlaying) {
        newSet.add(src);
      } else {
        newSet.delete(src);
      }
      return newSet;
    });
  };

  return (
    <div className="relative">
      {enlargedVideo && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-8">
          <div className="relative w-full max-w-6xl">
            <VideoPlayer
              src={enlargedVideo}
              isEnlarged={true}
              onEnlarge={() => setEnlargedVideo(null)}
              isPlaying={playingVideos.has(enlargedVideo)}
              onPlayStateChange={(isPlaying) =>
                handlePlayStateChange(enlargedVideo, isPlaying)
              }
            />
          </div>
        </div>
      )}
      <div className="grid grid-cols-2 gap-8">
        {videos.map((video, index) => (
          <div
            key={video._id || index}
            className="h-max relative overflow-hidden rounded-lg shadow-lg"
          >
            <VideoPlayer
              src={video.url}
              poster={video.poster}
              onEnlarge={handleEnlarge}
              isPlaying={playingVideos.has(video.url)}
              onPlayStateChange={(isPlaying) =>
                handlePlayStateChange(video.url, isPlaying)
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}
