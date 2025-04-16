"use client";

import { useState, useRef } from "react";
import VideoPlayer from "@/components/VideoPlayer";

export default function VideoGrid({ videos }) {
  const [enlargedVideo, setEnlargedVideo] = useState(null);
  const [playingVideos, setPlayingVideos] = useState(new Set());
  // Store video time positions and playing states
  const videoTimeRefs = useRef({});
  const videoPlayingStateRefs = useRef({});

  const handleEnlarge = (src) => {
    // When closing the enlarged view
    if (enlargedVideo === src) {
      // Store the current time of the enlarged video
      const enlargedVideoElement = document.querySelector(
        ".enlarged-video-element video"
      );
      if (enlargedVideoElement) {
        videoTimeRefs.current[src] = enlargedVideoElement.currentTime;

        // Store the playing state of the enlarged video before closing
        const wasPlaying = playingVideos.has(src);

        // Close the enlarged view
        setEnlargedVideo(null);

        // If video was playing in enlarged view, ensure it continues playing in grid
        if (wasPlaying) {
          // Maintain the playing state in the grid view
          setPlayingVideos((prev) => {
            const newSet = new Set(prev);
            newSet.add(src);
            return newSet;
          });
        }
      } else {
        setEnlargedVideo(null);
      }
    }
    // When opening the enlarged view
    else if (src) {
      // When opening, store the current time of the grid video
      const gridVideoElement = document.querySelector(
        `[data-video-src="${src}"]`
      );
      if (gridVideoElement) {
        videoTimeRefs.current[src] = gridVideoElement.currentTime;
      }

      // We want to retain the playing state when enlarging
      // No need to modify playingVideos here as it's already correct

      setEnlargedVideo(src);
    }
  };

  const handlePlayStateChange = (src, isPlaying) => {
    // If we're starting to play a video, pause all others
    if (isPlaying) {
      // Pause all other videos
      playingVideos.forEach((playingSrc) => {
        if (playingSrc !== src) {
          const videoElement = document.querySelector(
            `[data-video-src="${playingSrc}"]`
          );
          if (videoElement) {
            videoElement.pause();
          }
        }
      });

      setPlayingVideos(new Set([src]));
    } else {
      // Just remove this video from playing set
      setPlayingVideos((prev) => {
        const newSet = new Set(prev);
        newSet.delete(src);
        return newSet;
      });
    }
  };

  return (
    <div className="relative">
      {enlargedVideo && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4 sm:p-8">
          <div className="relative w-full max-w-6xl">
            <VideoPlayer
              src={enlargedVideo}
              isEnlarged={true}
              onEnlarge={() => handleEnlarge(enlargedVideo)}
              isPlaying={playingVideos.has(enlargedVideo)}
              onPlayStateChange={(isPlaying) =>
                handlePlayStateChange(enlargedVideo, isPlaying)
              }
              initialTime={videoTimeRefs.current[enlargedVideo] || 0}
              className="enlarged-video-element"
            />
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
        {videos.map((video, index) => (
          <div
            key={video._id || index}
            className="h-max relative overflow-hidden rounded-lg shadow-lg mb-6 sm:mb-0"
          >
            {/* Only render the grid video if it's not the enlarged one */}
            {video.url !== enlargedVideo && (
              <VideoPlayer
                src={video.url}
                poster={video.poster}
                onEnlarge={() => handleEnlarge(video.url)}
                isPlaying={playingVideos.has(video.url)}
                onPlayStateChange={(isPlaying) =>
                  handlePlayStateChange(video.url, isPlaying)
                }
                initialTime={videoTimeRefs.current[video.url] || 0}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
