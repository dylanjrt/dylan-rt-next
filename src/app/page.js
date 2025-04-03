import { getHomePageContent } from "@/sanity/queries";
import { PortableText } from "next-sanity";
import { components } from "@/sanity/portableTextComponents";

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
    <div className="flex items-center w-136 italic">
      <div>
        <PortableText value={homeData.mainParagraph} components={components} />
        <div className="text-sm text-gray-500 mt-8">
          last updated: {formatDateTime(homeData._updatedAt)}
        </div>
      </div>
    </div>
  );
}
