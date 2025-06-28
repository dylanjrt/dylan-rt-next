import { getVideos } from "@/sanity/queries";
import VideoGrid from "./VideoGrid";

export const revalidate = 300;

export default async function VisualsPage() {
  const videos = await getVideos();

  return (
    <div className="p-4 sm:p-6">
      <VideoGrid videos={videos} />
    </div>
  );
}
