import React from "react";
import {PlayerCom,PlayerComCSS} from './component'
import 'video.js/dist/video-js.css';

const videoJsOptions = {
  // techOrder: ['youtube'],
  autoplay: false,
  controls: true,
  sources: [
    {
      src: 'https://static-video.varzesh3.com/local/99-10-17/juvmil.mp4',
      // type: 'video/youtube',
    },
  ],
};
export default function Page(ctx) {
  return (
    <div>
      <PlayerCom {...videoJsOptions} />
      {/*<PlayerComCSS />*/}
    </div>
  );
}
