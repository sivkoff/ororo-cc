// ==UserScript==
// @name           Ororo CC toggler
// @namespace      https://github.com/sivkoff
// @description    Makes possible to show subtitles only when a video is paused
// @match          https://ororo.tv/*/*
// @version        0.1
// @updateURL      https://github.com/sivkoff/ororo-cc/raw/master/main.user.js
// @downloadURL    https://github.com/sivkoff/ororo-cc/raw/master/main.user.js
// @grant          none
// ==/UserScript==


function getVideo() {
  return document.querySelector('video.vjs-tech');
}

function initScript() {
  const cc = document.querySelector('.vjs-text-track-display');
  const playButton = document.querySelector('.vjs-control-bar .vjs-play-control');
  const video = getVideo();

  const isPlaying = () => Array.from(playButton.classList).includes('vjs-paused');

  let play = isPlaying();
  const toggleCC = () => {
    play = !play;
    cc.style.display = play ? 'none' : 'inherit';
  };
  const keyboardHandler = (event) => {
    if (event.keyCode !== 32) return;

    toggleCC();
  };


  document.body.addEventListener('keydown', keyboardHandler);
  video.addEventListener('click', toggleCC);
  playButton.addEventListener('click', toggleCC);
  toggleCC();
}

window.addEventListener('load', () => {
  let isOpen = false;

  setInterval(() => {
    const video = getVideo();

    if (!video && isOpen) {
      isOpen = false;
    } else if (video && !isOpen) {
      isOpen = true;
      initScript();
    }
  });
});
