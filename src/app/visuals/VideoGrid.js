"use client";

import { useState } from "react";
import VideoPlayer from "@/components/VideoPlayer";

export default function VideoGrid({ videos }) {
  const [enlargedVideo, setEnlargedVideo] = useState(null);

  const handleEnlarge = (src) => {
    setEnlargedVideo(enlargedVideo === src ? null : src);
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
            />
          </div>
        ))}
      </div>
    </div>
  );
}
