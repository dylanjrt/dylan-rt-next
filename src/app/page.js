import { getHomePageContent } from "@/sanity/queries";
import { PortableText } from "next-sanity";
import { components } from "@/sanity/portableTextComponents";
// import dynamic from "next/dynamic";
import { formatDateTime } from "./utils/dateFormat";
import Image from "next/image";
// const Blender3DComponent = dynamic(() => import("./components/Blender3D"), {
//   loading: () => <div className="h-[400px] w-full bg-gray-100" />,
// });

export const revalidate = 300;

export default async function Home() {
  const homeData = await getHomePageContent();

  return (
    <div className="flex flex-col md:flex-row p-4 sm:p-6 w-full max-w-6xl gap-8 md:gap-16">
      <div className="w-full md:w-1/2">
        {homeData.image && (
          <>
            <div className="relative w-full">
              <Image
                src={homeData.image.asset.url}
                alt="Home page image"
                width={1136}
                height={1136}
                className="w-full h-auto"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="text-sm italic text-gray-500 mt-2">
              {homeData.image.caption}
            </div>
          </>
        )}
      </div>
      <div className="mt-4 md:mt-8 w-full md:w-1/2">
        <h2 className="text-2xl md:text-4xl mb-8 text-[#c17fb5]">
          {homeData.title}
        </h2>
        <PortableText value={homeData.mainParagraph} components={components} />
        <div className="text-xs text-gray-500 mt-8">
          last updated: {formatDateTime(homeData.lastUpdated)}
        </div>
      </div>
    </div>
  );
}
