"use client";

import { useState, useRef } from "react";

export default function VideoPlayer({ src, poster, isEnlarged, onEnlarge }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleEnlarge = (e) => {
    e.stopPropagation(); // Prevent triggering play/pause
    onEnlarge(src);
  };

  return (
    <div className="relative cursor-pointer" onClick={togglePlay}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full rounded-lg"
        style={{
          aspectRatio: "400/300",
          objectFit: "cover",
        }}
      />
      <button className="absolute top-1 left-1 rounded-full transition-all duration-200 group">
        {!isPlaying && (
          <svg
            className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-all duration-200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M8 5v14l11-7z" fill="white" />
          </svg>
        )}
      </button>
      <button
        onClick={handleEnlarge}
        className="absolute top-1 right-1 rounded-full hover:bg-black transition-all duration-200 group"
        aria-label="Toggle size"
      >
        {isEnlarged ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            className="w-5 h-5 fill-white opacity-50 group-hover:opacity-100 transition-all duration-200"
          >
            <path d="M200-200v-400h80v264l464-464 56 56-464 464h264v80H200Z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            className="w-5 h-5 fill-white opacity-50 group-hover:opacity-100 transition-all duration-200"
          >
            <path d="m216-160-56-56 464-464H360v-80h400v400h-80v-264L216-160Z" />
          </svg>
        )}
      </button>
    </div>
  );
}
