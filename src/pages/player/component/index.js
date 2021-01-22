import { useCallback, useEffect, useState } from 'react';
import videojs from 'video.js';
import 'videojs-youtube/dist/Youtube.min';

export const PlayerCom = (props) => {
  const [videoEl, setVideoEl] = useState(null);
  const onVideo = useCallback((el) => {
    setVideoEl(el);
  }, []);

  useEffect(() => {
    if (videoEl == null) return;
    const player = videojs(videoEl, props);
    return () => {
      player.dispose();
    };
  }, [props, videoEl]);

  return (
    <>
      <h1>The implementation below is using react functions</h1>
      <div data-vjs-player>
        <video ref={onVideo} className="video-js" playsInline />
      </div>
    </>
  );
};
export const PlayerComCSS = () => (
  <>
    <h1>The implementation below is without react functions</h1>
    <div data-vjs-player>
      <video
        id="my-video"
        className="video-js vjs-theme-city"
        playsInline
        controls
        preload="auto"
        data-setup='{ "techOrder": ["youtube"], "sources": [{ "type": "video/youtube", "src": "https://www.aparat.com/v/cC4UJ"}] }'
      />
    </div>
  </>
);
