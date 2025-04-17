import { getMusic } from "@/sanity/queries";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { formatDateTime } from "../utils/dateFormat";

export default async function Music() {
  const musicEntries = await getMusic();

  // Array of bright colors for both titles and stars
  const brightColors = [
    { text: "text-emerald-500", fill: "fill-emerald-500" },
    { text: "text-pink-500", fill: "fill-pink-500" },
    { text: "text-orange-500", fill: "fill-orange-500" },
    { text: "text-purple-500", fill: "fill-purple-500" },
    { text: "text-indigo-500", fill: "fill-indigo-500" },
    { text: "text-cyan-500", fill: "fill-cyan-500" },
    { text: "text-blue-500", fill: "fill-blue-500" },
    { text: "text-amber-500", fill: "fill-amber-500" },
    { text: "text-fuchsia-500", fill: "fill-fuchsia-500" },
    { text: "text-rose-500", fill: "fill-rose-500" },
    { text: "text-violet-500", fill: "fill-violet-500" },
    { text: "text-sky-500", fill: "fill-sky-500" },
  ];

  if (!musicEntries || musicEntries.length === 0) {
    return (
      <div className="container">
        <p>No music releases found.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {musicEntries.map((music, index) => {
        // First album gets lime, others get random colors
        const colorObj =
          index === 0
            ? { text: "text-lime-500", fill: "fill-lime-500" }
            : brightColors[index % brightColors.length];

        return (
          <div
            key={music._id}
            className={`my-8 ${index > 0 ? "mt-16 md:mt-32" : ""} max-w-full`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
              {/* Left column - Album artwork with decorative element */}
              <div className="relative">
                {/* Decorative star element - matching album title color */}
                <div className="absolute -top-6 -left-6 md:-top-12 md:-left-12 w-10 h-10 md:w-16 md:h-16 z-10">
                  <svg
                    viewBox="0 0 100 100"
                    className={`w-full h-full ${colorObj.fill}`}
                  >
                    <path d="M50,0 L63,38 L100,50 L63,62 L50,100 L37,62 L0,50 L37,38 Z" />
                  </svg>
                </div>

                {/* Album cover with background */}
                <div className="relative bg-cream pb-8 md:pb-12">
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
              <div className="relative mt-6 md:mt-0">
                {/* Album title with hover functionality for supplementary photos */}
                <div className="group relative inline-block">
                  <h2
                    className={`text-2xl md:text-4xl font-light ${colorObj.text} mb-2`}
                  >
                    {music.title}
                  </h2>

                  {/* Supplementary photos overlay on hover */}
                  {music.supplementaryPhotos &&
                    music.supplementaryPhotos.length > 0 && (
                      <>
                        {/* Background blur overlay */}
                        <div className="fixed inset-0 bg-white/10 backdrop-blur-xs z-40 opacity-0 group-hover:opacity-100 invisible group-hover:visible pointer-events-none transition-all duration-300 ease-in-out" />

                        <div
                          className={`invisible group-hover:visible opacity-0 group-hover:opacity-100 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 transition-all duration-300 ease-in-out max-h-[90vh] overflow-y-auto p-4 ${
                            music.supplementaryPhotos.length === 1
                              ? "w-[90vw] md:w-[500px]"
                              : music.supplementaryPhotos.length === 2
                                ? "w-[90vw] md:w-[800px]"
                                : music.supplementaryPhotos.length === 3
                                  ? "w-[90vw] md:w-[1100px]"
                                  : "w-[90vw] md:w-[1200px]"
                          }`}
                        >
                          <div
                            className={`grid gap-4 md:gap-16 items-center justify-center ${
                              music.supplementaryPhotos.length === 1
                                ? "grid-cols-1"
                                : music.supplementaryPhotos.length === 2
                                  ? "grid-cols-1 md:grid-cols-2"
                                  : music.supplementaryPhotos.length === 3
                                    ? "grid-cols-1 md:grid-cols-3"
                                    : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
                            }`}
                          >
                            {music.supplementaryPhotos.map((photo, index) => (
                              <div
                                key={index}
                                className="relative shadow-2xl rounded-lg overflow-hidden"
                              >
                                <Image
                                  src={photo.asset.url}
                                  alt={
                                    photo.alt ||
                                    `${music.title} photo ${index + 1}`
                                  }
                                  width={
                                    photo.asset.metadata.dimensions.width * 3
                                  }
                                  height={
                                    photo.asset.metadata.dimensions.height * 3
                                  }
                                  className="w-full h-auto"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                </div>

                <p className="text-lg md:text-xl mb-4">
                  {music.artist}
                  <span className="text-xs md:text-sm ml-2">
                    {formatDateTime(music.releaseDate, "season")}
                  </span>
                </p>

                {/* Music player in a clean frame */}
                <div className="rounded mb-4 w-full overflow-hidden">
                  <iframe
                    style={{ border: "0", width: "100%", height: "42px" }}
                    src={music.bandcampEmbed}
                    seamless
                    title={`${music.title} by ${music.artist}`}
                    allow="autoplay"
                  />
                </div>

                {/* Description with elegant typography */}
                {music.description && (
                  <div className="prose prose-sm md:prose-lg max-w-none mb-8 text-gray-800">
                    <PortableText value={music.description} />
                  </div>
                )}

                {music.credits && (
                  <div className="prose prose-sm md:prose-lg max-w-none mb-8 text-gray-800 text-sm font-light">
                    <PortableText value={music.credits} />
                  </div>
                )}

                {/* Decorative star element - matching album title color */}
                <div className="absolute right-0 top-4 md:top-12 w-10 h-10 md:w-16 md:h-16">
                  <svg
                    viewBox="0 0 100 100"
                    className={`w-full h-full ${colorObj.fill}`}
                  >
                    <path d="M50,0 L63,38 L100,50 L63,62 L50,100 L37,62 L0,50 L37,38 Z" />
                  </svg>
                </div>
              </div>
            </div>

            {index < musicEntries.length - 1 && (
              <hr className="mt-12 md:mt-24 border-gray-200" />
            )}
          </div>
        );
      })}
    </div>
  );
}
