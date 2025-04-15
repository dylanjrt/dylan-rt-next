import { getMusic } from "@/sanity/queries";
import Image from "next/image";
import { PortableText } from "@portabletext/react";

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
    <div className="container">
      {musicEntries.map((music) => (
        <div key={music._id} className="mb-12">
          <h2 className="text-2xl font-bold mb-2">{music.title}</h2>
          <p className="text-gray-600 mb-4">
            Released: {new Date(music.releaseDate).toLocaleDateString()}
          </p>

          <div className="flex flex-col md:flex-row gap-8 mb-6">
            {/* Album artwork and player */}
            <div className="flex-shrink-0">
              <div className="relative w-64 h-64 mb-4">
                {music.albumCover && (
                  <Image
                    src={music.albumCover.asset.url}
                    alt={`${music.title} album cover`}
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 768px) 100vw, 256px"
                  />
                )}
              </div>

              <div className="bg-gray-200 rounded-lg p-4 border border-gray-400">
                <iframe
                  style={{ border: "0", width: "100%", height: "241px" }}
                  src={music.bandcampEmbed}
                  seamless
                  title={`${music.title} by Dylan RT`}
                  allow="autoplay"
                />
              </div>
            </div>

            {/* Description */}
            <div className="flex-grow">
              {music.description && (
                <div className="prose">
                  <PortableText value={music.description} />
                </div>
              )}

              {/* Supplementary photos */}
              {music.supplementaryPhotos &&
                music.supplementaryPhotos.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-3">Gallery</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {music.supplementaryPhotos.map((photo, index) => (
                        <div key={index} className="relative">
                          <div className="relative w-full h-48">
                            <Image
                              src={photo.asset.url}
                              alt={
                                photo.alt || `${music.title} photo ${index + 1}`
                              }
                              fill
                              className="object-cover rounded-lg"
                              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                            />
                          </div>
                          {photo.caption && (
                            <p className="text-sm text-gray-600 mt-1">
                              {photo.caption}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          </div>

          <hr className="my-8 border-gray-300" />
        </div>
      ))}
    </div>
  );
}
