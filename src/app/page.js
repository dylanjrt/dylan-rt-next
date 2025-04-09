import { getHomePageContent } from "@/sanity/queries";
import { PortableText } from "next-sanity";
import { components } from "@/sanity/portableTextComponents";
import dynamic from "next/dynamic";

const Blender3DComponent = dynamic(() => import("./components/Blender3D"), {
  loading: () => <div className="h-[400px] w-full bg-gray-100" />,
});

function formatDateTime(dateString) {
  const date = new Date(dateString);
  const hour = date.getHours();

  // Determine time of day
  let timeOfDay;
  if (hour < 12) timeOfDay = "morning";
  else if (hour < 17) timeOfDay = "afternoon";
  else timeOfDay = "evening";

  // Format the date and convert to lowercase
  const formattedDate = date
    .toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
    .toLowerCase();

  return `${timeOfDay} of ${formattedDate}`;
}

export default async function Home() {
  const homeData = await getHomePageContent();

  return (
    <div className="flex flex-col items-center w-136 italic">
      <Blender3DComponent />
      <div>
        <PortableText value={homeData.mainParagraph} components={components} />
        <div className="text-sm text-gray-500 mt-8">
          last updated: {formatDateTime(homeData._updatedAt)}
        </div>
      </div>
    </div>
  );
}
