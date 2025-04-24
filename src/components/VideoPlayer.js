"use client";

import { useState, useRef, useEffect } from "react";

export default function VideoPlayer({
  src,
  poster,
  title,
  isEnlarged,
  onEnlarge,
  isPlaying,
  onPlayStateChange,
  description,
  initialTime = 0,
  className = "",
}) {
  const videoRef = useRef(null);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const previousPlayingRef = useRef(isPlaying);

  useEffect(() => {
    if (!videoRef.current) return;

    // Set initial time when the component mounts, but only once
    if (!hasInitialized && videoRef.current) {
      videoRef.current.currentTime = initialTime;
      setHasInitialized(true);
    }

    // Handle play/pause state changes
    if (isPlaying && !previousPlayingRef.current) {
      // Starting to play
      videoRef.current.play().catch((error) => {
        console.error("Error playing video:", error);
        // Notify parent that playing failed
        onPlayStateChange(false);
      });
    } else if (!isPlaying && previousPlayingRef.current) {
      // Stopping playback
      videoRef.current.pause();
    }

    // Update previous playing state reference
    previousPlayingRef.current = isPlaying;
  }, [isPlaying, initialTime, hasInitialized, onPlayStateChange]);

  // When component unmounts and remounts (like when closing enlarged view),
  // we need to restore the playback state
  useEffect(() => {
    // This runs when the component mounts
    const video = videoRef.current;
    if (!video) return;

    // Set the current time from initialTime
    video.currentTime = initialTime;

    // If it should be playing, start playing
    if (isPlaying) {
      video.play().catch((error) => {
        console.error("Error playing video on mount:", error);
        onPlayStateChange(false);
      });
    }

    // Cleanup function runs when component unmounts
    return () => {
      // We don't need to do anything special on unmount
      // The playing state is maintained by the parent component
    };
  }, []); // Empty deps array means this runs only on mount/unmount

  const togglePlay = () => {
    if (!videoRef.current) return;
    onPlayStateChange(!isPlaying);
  };

  const handleVideoLoaded = () => {
    setIsLoading(false);
  };

  return (
    <div
      className={`relative cursor-pointer ${className}`}
      onClick={togglePlay}
    >
      {title && (
        <div className="absolute top-0 left-0 right-0 text-center">
          <span className="text-red-600 font-bold text-lg tracking-wider uppercase">
            {title}
          </span>
        </div>
      )}
      <div className="rounded overflow-hidden relative">
        {isLoading && (
          <div
            className="absolute inset-0 bg-gray-100 animate-pulse"
            style={{ aspectRatio: "400/300" }}
          ></div>
        )}
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          className="w-full"
          style={{
            aspectRatio: "400/300",
            objectFit: "cover",
            position: "relative",
            zIndex: "10",
          }}
          data-video-src={src}
          onLoadedData={handleVideoLoaded}
        />
      </div>
      <button
        className="absolute top-0 left-0 w-10 h-10 flex items-center justify-center transition-all duration-200 group"
        aria-label="Play video"
        onClick={(e) => {
          e.stopPropagation();
          togglePlay();
        }}
      >
        {!isPlaying && (
          <svg
            className="w-6 h-6 opacity-50 group-hover:opacity-100 transition-all duration-200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M8 5v14l11-7z" fill="white" />
          </svg>
        )}
        {isPlaying && (
          <svg
            className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-all duration-200"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
          >
            <rect x="6" y="4" width="4" height="16" fill="white" />
            <rect x="14" y="4" width="4" height="16" fill="white" />
          </svg>
        )}
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onEnlarge(src);
        }}
        className="absolute top-2 right-2 flex items-center justify-center transition-all duration-200 group"
        aria-label="Toggle size"
      >
        <div className="w-6 h-6 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            className={`w-5 h-5 fill-white opacity-50 group-hover:opacity-100 transition-all duration-200`}
          >
            {isEnlarged ? (
              <path d="M200-200v-400h80v264l464-464 56 56-464 464h264v80H200Z" />
            ) : (
              <path d="m216-160-56-56 464-464H360v-80h400v400h-80v-264L216-160Z" />
            )}
          </svg>
        </div>
      </button>
      {description && (
        <div className="absolute bottom-0 left-0 right-0 text-white text-xs sm:text-sm p-2 bg-black/50">
          {description}
        </div>
      )}
    </div>
  );
}
