"use client";

import { useState } from "react";
import VideoPlayer from "@/components/VideoPlayer";

export default function Visual() {
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
        <div className="h-max relative overflow-hidden rounded-lg shadow-lg">
          <VideoPlayer
            src="https://res.cloudinary.com/dpnfpeimc/video/upload/v1744145983/cj3nrse8s3vbcwv927nb.mp4"
            onEnlarge={handleEnlarge}
          />
        </div>
        <div className="h-max relative overflow-hidden rounded-lg shadow-lg">
          <VideoPlayer
            src="https://res.cloudinary.com/dpnfpeimc/video/upload/v1744148462/spin-light_11-17-23_phqtro.mp4"
            onEnlarge={handleEnlarge}
          />
        </div>
        <div className="h-max relative overflow-hidden rounded-lg shadow-lg">
          <VideoPlayer
            src="https://res.cloudinary.com/dpnfpeimc/video/upload/v1744148461/react_11-4-23_hqofso.mp4"
            onEnlarge={handleEnlarge}
          />
        </div>
        <div className="h-max relative overflow-hidden rounded-lg shadow-lg">
          <VideoPlayer
            src="https://res.cloudinary.com/dpnfpeimc/video/upload/v1744148461/organic_10-29-23_isfex8.mp4"
            poster="https://res.cloudinary.com/dpnfpeimc/image/upload/v1744148565/organic_10-29-23_bwssh8.png"
            onEnlarge={handleEnlarge}
          />
        </div>
        <div className="h-max relative overflow-hidden rounded-lg shadow-lg">
          <VideoPlayer
            src="https://res.cloudinary.com/dpnfpeimc/video/upload/v1744148462/expression_s4ksmc.mp4"
            onEnlarge={handleEnlarge}
          />
        </div>
        <div className="h-max relative overflow-hidden rounded-lg shadow-lg">
          <VideoPlayer
            src="https://res.cloudinary.com/dpnfpeimc/video/upload/v1744148467/spectrum.3_wupw6t.mp4"
            onEnlarge={handleEnlarge}
          />
        </div>
      </div>
    </div>
  );
}
