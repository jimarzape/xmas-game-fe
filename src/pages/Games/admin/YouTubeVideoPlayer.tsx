import { Box } from "@mui/material";
import YouTube, { YouTubeProps } from "react-youtube";

interface videoInt {
  videoId: string;
}

function YouTubeVideoPlayer({ videoId }: videoInt) {
  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1,
    },
  };

  return <YouTube videoId={videoId} opts={opts} onReady={onPlayerReady} />;
}
export default YouTubeVideoPlayer;
