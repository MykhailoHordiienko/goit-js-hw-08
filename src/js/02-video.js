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

// player.setCurrentTime(currentTime);

player.setCurrentTime(currentTime).catch(function (error) {
  switch (error.name) {
    case 'RangeError':
      // the time was less than 0 or greater than the video’s duration
      break;
  }
});
