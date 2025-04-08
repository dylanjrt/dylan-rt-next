import { getVideos } from "@/sanity/queries";
import VideoGrid from "./VideoGrid";

export default async function VisualsPage() {
  const videos = await getVideos();

  return (
    <div>
      <VideoGrid videos={videos} />
    </div>
  );
}
