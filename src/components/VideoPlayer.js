"use client";

import { useState, useRef, useEffect } from "react";

export default function VideoPlayer({
  src,
  poster,
  isEnlarged,
  onEnlarge,
  isPlaying,
  onPlayStateChange,
}) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [isPlaying]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    onPlayStateChange(!isPlaying);
  };

  return (
    <div className="relative cursor-pointer" onClick={togglePlay}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full"
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
        onClick={(e) => {
          e.stopPropagation();
          onEnlarge(src);
        }}
        className="absolute top-2 right-2 rounded-full hover:bg-black transition-all duration-200 group"
        aria-label="Toggle size"
      >
        <div className="w-5 h-5 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            className={`w-4 h-4 fill-white opacity-50 group-hover:opacity-100 transition-all duration-200`}
          >
            {isEnlarged ? (
              <path d="M200-200v-400h80v264l464-464 56 56-464 464h264v80H200Z" />
            ) : (
              <path d="m216-160-56-56 464-464H360v-80h400v400h-80v-264L216-160Z" />
            )}
          </svg>
        </div>
      </button>
    </div>
  );
}
