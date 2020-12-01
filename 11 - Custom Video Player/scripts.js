const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled')
const toggle = player.querySelector('.toggle');
const ranges = player.querySelectorAll('.player__slider');
const skipButtons = player.querySelectorAll('[data-skip]');


function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

function skip() {
  console.log(this.dataset);
  video.currentTime += parseFloat(this.dataset.skip);
}

function rangeUpdateHandler() {
  video[this.name] = this.value;
}

function progressHandler() {
  const percent = ( video.currentTime / video.duration ) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = ( e.offsetX / progress.offsetWidth ) * video.duration;
  video.currentTime = scrubTime;
}


video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', progressHandler);

ranges.forEach(range => range.addEventListener('change', rangeUpdateHandler));
ranges.forEach(range => range.addEventListener('mouseover', rangeUpdateHandler));
skipButtons.forEach(skipButton => skipButton.addEventListener('click', skip));

toggle.addEventListener('click', togglePlay);
progress.addEventListener('click', scrub);

let mousedown = false;
progress.addEventListener('mousedown', () => mousedown = true );
progress.addEventListener('mouseup', () => mousedown = false);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
