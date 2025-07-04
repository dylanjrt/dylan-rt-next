import { getMusic } from "@/sanity/queries";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { formatDateTime } from "../utils/dateFormat";
import { components } from "@/sanity/portableTextComponents";
export const revalidate = 300;

export default async function Music() {
  const musicEntries = await getMusic();

  // Array of bright colors for both titles and stars
  const brightColors = [
    {
      text: "text-lime-500",
      fill: "fill-lime-500",
      selectionBg: "[&_*::selection]:bg-lime-200",
    },
    {
      text: "text-pink-500",
      fill: "fill-pink-500",
      selectionBg: "[&_*::selection]:bg-pink-200",
    },
    {
      text: "text-orange-500",
      fill: "fill-orange-500",
      selectionBg: "[&_*::selection]:bg-orange-200",
    },
    {
      text: "text-purple-500",
      fill: "fill-purple-500",
      selectionBg: "[&_*::selection]:bg-purple-200",
    },
    {
      text: "text-indigo-500",
      fill: "fill-indigo-500",
      selectionBg: "[&_*::selection]:bg-indigo-200",
    },
    {
      text: "text-cyan-500",
      fill: "fill-cyan-500",
      selectionBg: "[&_*::selection]:bg-cyan-200",
    },
    {
      text: "text-blue-500",
      fill: "fill-blue-500",
      selectionBg: "[&_*::selection]:bg-blue-200",
    },
    {
      text: "text-amber-500",
      fill: "fill-amber-500",
      selectionBg: "[&_*::selection]:bg-amber-200",
    },
    {
      text: "text-fuchsia-500",
      fill: "fill-fuchsia-500",
      selectionBg: "[&_*::selection]:bg-fuchsia-200",
    },
    {
      text: "text-rose-500",
      fill: "fill-rose-500",
      selectionBg: "[&_*::selection]:bg-rose-200",
    },
    {
      text: "text-violet-500",
      fill: "fill-violet-500",
      selectionBg: "[&_*::selection]:bg-violet-200",
    },
    {
      text: "text-sky-500",
      fill: "fill-sky-500",
      selectionBg: "[&_*::selection]:bg-sky-200",
    },
  ];

  if (!musicEntries || musicEntries.length === 0) {
    return (
      <div className="container">
        <p>No music releases found.</p>
      </div>
    );
  }

  return (
    <div className="w-full p-4 sm:p-6">
      {musicEntries.map((music, index) => {
        // First album gets lime, others get random colors
        const colorObj = brightColors[index % brightColors.length];

        return (
          <div
            key={music._id}
            className={`${index > 0 ? "mt-24" : ""} max-w-full`}
          >
            <div
              className={`grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-12 ${colorObj.selectionBg}`}
            >
              {/* Left column - Album artwork */}
              <div className="relative">
                {/* Album cover with background */}
                <div className="bg-cream relative pb-8 md:pb-12">
                  <div className="relative aspect-square w-full">
                    {music.albumCover ? (
                      <>
                        <div className="absolute inset-0 animate-pulse bg-gray-200" />
                        <Image
                          src={music.albumCover.asset.url}
                          alt={`${music.title} album cover`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 40vw"
                          priority
                        />
                      </>
                    ) : (
                      <div className="absolute inset-0 animate-pulse bg-gray-200" />
                    )}
                  </div>
                </div>
              </div>

              {/* Right column - Album info and player */}
              <div className="relative mt-6 md:mt-0">
                {/* Album title with hover functionality for supplementary photos */}
                <div className="group relative inline-block">
                  <h2 className={`text-2xl md:text-4xl ${colorObj.text} mb-2`}>
                    {music.title}
                  </h2>

                  {/* Supplementary photos overlay on hover */}
                  {music.supplementaryPhotos &&
                    music.supplementaryPhotos.length > 0 && (
                      <>
                        {/* Background blur overlay */}
                        <div className="pointer-events-none invisible fixed inset-0 z-40 bg-white/10 opacity-0 backdrop-blur-xs transition-all duration-300 ease-in-out group-hover:visible group-hover:opacity-100" />

                        <div
                          className={`invisible fixed top-1/2 left-1/2 z-50 max-h-[90vh] -translate-x-1/2 -translate-y-1/2 transform overflow-y-auto p-4 opacity-0 transition-all duration-300 ease-in-out group-hover:visible group-hover:opacity-100 ${
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
                            className={`grid items-center justify-center gap-4 md:gap-16 ${
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
                                className="relative overflow-hidden rounded-lg shadow-2xl"
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
                                  className="h-auto w-full"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                </div>

                <p className="mb-4 text-lg md:text-xl">
                  {music.artist}
                  <span className="ml-2 text-xs md:text-sm">
                    {formatDateTime(music.releaseDate, "season")}
                  </span>
                </p>

                {/* Music player in a clean frame */}
                <div className="relative mb-4 w-full overflow-hidden rounded-l">
                  <div className="absolute inset-0 animate-pulse border-2 border-gray-200 bg-gray-100"></div>
                  <iframe
                    style={{
                      border: "1",
                      width: "100%",
                      height: "42px",
                      position: "relative",
                      zIndex: "10",
                    }}
                    src={music.bandcampEmbed}
                    seamless
                    title={`${music.title} by ${music.artist}`}
                    allow="autoplay"
                  />
                </div>

                {/* Description with elegant typography */}
                {music.description && (
                  <div className="prose prose-sm md:prose-lg mb-8 max-w-none text-gray-800">
                    <PortableText
                      value={music.description}
                      components={components}
                    />
                  </div>
                )}

                {music.credits && (
                  <div className="prose prose-sm md:prose-lg mb-8 max-w-none text-sm text-gray-600">
                    <PortableText value={music.credits} />
                  </div>
                )}
              </div>
            </div>

            {index < musicEntries.length - 1 && (
              <hr className="mt-12 border-gray-200" />
            )}
          </div>
        );
      })}
    </div>
  );
}
