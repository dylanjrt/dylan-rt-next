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
              {/* Album title with hover functionality for supplementary photos */}
              <div className="group relative inline-block">
                <h2 className="text-4xl font-light text-lime-500 mb-2">
                  {music.title}
                </h2>
                {/* Supplementary photos overlay on hover */}
                {music.supplementaryPhotos &&
                  music.supplementaryPhotos.length > 0 && (
                    <div
                      className="invisible group-hover:visible absolute left-0 top-full mt-2 z-50 
                                 rounded-lg p-4 
                                w-[800px] md:w-[1200px]"
                    >
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {music.supplementaryPhotos.map((photo, index) => (
                          <div key={index} className="relative">
                            <Image
                              src={photo.asset.url}
                              alt={
                                photo.alt || `${music.title} photo ${index + 1}`
                              }
                              width={photo.asset.metadata.dimensions.width * 3}
                              height={
                                photo.asset.metadata.dimensions.height * 3
                              }
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </div>

              {/* Artist credits in italic */}
              <p className="text-xl mb-6">
                {music.artist}
                <span className="text-sm ml-2">
                  {formatDateTime(music.releaseDate, "season")}
                </span>
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
              <div className="rounded mb-8 mt-12">
                <iframe
                  style={{ border: "0", width: "100%", height: "250px" }}
                  src={music.bandcampEmbed}
                  seamless
                  title={`${music.title} by ${music.artist}`}
                  allow="autoplay"
                />
              </div>
            </div>
          </div>

          {/* No longer showing gallery since images are in hover overlay */}

          {index < musicEntries.length - 1 && (
            <hr className="mt-24 border-gray-200" />
          )}
        </div>
      ))}
    </div>
  );
}
