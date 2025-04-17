import { getVideos } from "@/sanity/queries";
import VideoGrid from "./VideoGrid";

export const revalidate = 300;

export default async function VisualsPage() {
  const videos = await getVideos();

  return (
    <div>
      <VideoGrid videos={videos} />
    </div>
  );
}
