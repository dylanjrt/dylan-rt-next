import { getMusic } from "@/sanity/queries";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { formatDateTime } from "../utils/dateFormat";

export default async function Music() {
  const musicEntries = await getMusic();

  if (!musicEntries || musicEntries.length === 0) {
    return (
      <div className="container">
        <p>No music releases found.</p>
      </div>
    );
  }

  return (
    <div className="container max-w-5xl mx-auto px-4 py-12">
      {musicEntries.map((music, index) => (
        <div key={music._id} className={`my-24 ${index > 0 ? "mt-32" : ""}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left column - Album artwork with decorative element */}
            <div className="relative">
              {/* Decorative star element */}
              <div className="absolute -top-12 -left-12 w-16 h-16 z-10">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-black">
                  <path d="M50,0 L63,38 L100,50 L63,62 L50,100 L37,62 L0,50 L37,38 Z" />
                </svg>
              </div>

              {/* Album cover with background */}
              <div className="relative bg-cream pb-12">
                <div className="relative w-full aspect-square">
                  {music.albumCover && (
                    <Image
                      src={music.albumCover.asset.url}
                      alt={`${music.title} album cover`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 40vw"
                      priority
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Right column - Album info and player */}
            <div className="relative">
              {/* Album title in accent color */}
              <h2 className="text-4xl font-light text-lime-500 mb-2">
                {music.title}
              </h2>

              {/* Artist credits in italic */}
              <p className="text-lg italic mb-6">{music.artist}</p>

              {/* Released by text with links */}
              <p className="mb-6">
                {formatDateTime(music.releaseDate, "season")}
              </p>

              {/* Description with elegant typography */}
              {music.description && (
                <div className="prose prose-lg max-w-none mb-8 text-gray-800">
                  <PortableText value={music.description} />
                </div>
              )}

              {/* Decorative star element */}
              <div className="absolute right-0 top-32 w-16 h-16">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-black">
                  <path d="M50,0 L63,38 L100,50 L63,62 L50,100 L37,62 L0,50 L37,38 Z" />
                </svg>
              </div>

              {/* Music player in a clean frame */}
              <div className="border border-gray-300 rounded p-4 mb-8 bg-white mt-12">
                <iframe
                  style={{ border: "0", width: "100%", height: "120px" }}
                  src={music.bandcampEmbed}
                  seamless
                  title={`${music.title} by Dylan RT`}
                  allow="autoplay"
                />
              </div>

              {/* Streaming links */}
              <div className="flex gap-4 mb-8">
                <a href="#" className="text-gray-800 hover:underline">
                  Spotify
                </a>
                <span>-</span>
                <a href="#" className="text-gray-800 hover:underline">
                  Apple
                </a>
              </div>
            </div>
          </div>

          {/* Gallery - using a similar style to the reference */}
          {music.supplementaryPhotos &&
            music.supplementaryPhotos.length > 0 && (
              <div className="mt-24">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {music.supplementaryPhotos.map((photo, index) => (
                    <div key={index} className="relative">
                      <div className="relative w-full aspect-square">
                        <Image
                          src={photo.asset.url}
                          alt={photo.alt || `${music.title} photo ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                        />
                      </div>
                      {photo.caption && (
                        <p className="text-sm text-gray-600 mt-2">
                          {photo.caption}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

          {index < musicEntries.length - 1 && (
            <hr className="mt-24 border-gray-200" />
          )}
        </div>
      ))}
    </div>
  );
}
