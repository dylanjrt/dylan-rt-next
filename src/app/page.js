import { getHomePageContent } from "@/sanity/queries";
import { PortableText } from "next-sanity";
import { components } from "@/sanity/portableTextComponents";
// import dynamic from "next/dynamic";
import { formatDateTime } from "./utils/dateFormat";
import Image from "next/image";
// const Blender3DComponent = dynamic(() => import("./components/Blender3D"), {
//   loading: () => <div className="h-[400px] w-full bg-gray-100" />,
// });

export default async function Home() {
  const homeData = await getHomePageContent();

  return (
    <div className="flex p-6 w-6xl gap-16">
      <div>
        {homeData.image && (
          <>
            <Image
              src={homeData.image.asset.url}
              alt="Home page image"
              width={1136}
              height={1136}
            />
            <div className="text-sm italic text-gray-500 mt-2">
              {homeData.image.caption}
            </div>
          </>
        )}
      </div>
      <div className="mt-8">
        <PortableText value={homeData.mainParagraph} components={components} />
        <div className="text-sm text-gray-500 mt-8">
          last updated: {formatDateTime(homeData.lastUpdated)}
        </div>
      </div>
    </div>
  );
}
