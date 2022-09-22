'use strict';
import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const LOCAL_STORAGE_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Vimeo(iframe);

function playedTime(data) {
  const { seconds } = data;
  localStorage.setItem(LOCAL_STORAGE_KEY, seconds);
}

const throttledPlayedTime = throttle(playedTime, 1000);

player.on('timeupdate', throttledPlayedTime);

const currentTime = localStorage.getItem(LOCAL_STORAGE_KEY);

player.setCurrentTime(currentTime);

// player.getVideoTitle().then(function (title) {
//   console.log('title:', title);
// });
