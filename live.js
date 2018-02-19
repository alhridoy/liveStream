window.onload = function(){

	var constraints = {
		audio:true,
		video:true
	};

	//callgetMediaUser

	navigator.mediaDevices.getUserMedia(constraints).then(function(mediaStream){

   var video = document.querySelector('video');
   video.srcObject =mediaStream;
   video.play();
	}).catch(function(err){
		console.log('yes Error' +err.message);
	})


	//custom

	/*jshint esversion: 6*/

const video = document.querySelector('.player__video');
const progressBarContainer = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');
const playPauseBtn = document.querySelector('.player__button');
const volumeSld = document.querySelector("input[name='volume']");
const speedSld = document.querySelector("input[name='playbackRate']");
const skipBackBtn = document.querySelector("button[data-skip='-10']");
const skipFwdBtn = document.querySelector("button[data-skip='25']");

console.groupCollapsed("All elements list");
console.log(video);
console.log(progressBar);
console.log(playPauseBtn);
console.log(volumeSld);
console.log(speedSld);
console.log(skipBackBtn);
console.log(skipFwdBtn);
console.groupEnd("All elements list");

window.addEventListener('load', function load() {
  window.removeEventListener('load', load, false);
  videoController();
});

function videoController() {

  let progressUpdate;
  playPauseBtn.addEventListener('click', playPause);
  video.addEventListener('click', playPause);
  progressBarContainer.addEventListener('click', progress);
  skipBackBtn.addEventListener('keypress', skipBack);
  skipBackBtn.addEventListener('click', skipBack);
  skipFwdBtn.addEventListener('keypress', skipFwd);
  skipFwdBtn.addEventListener('click', skipFwd);
  volumeSld.addEventListener('input', volume);
  speedSld.addEventListener('input', speed);

  function round(num, precision) {
    let numWithPrecision = num * 10 * precision;
    // console.log(num, precision, numWithPrecision, Math.round(numWithPrecision) );
    return Math.round(numWithPrecision) / (10 * precision);
  }

  function playPause() {
    if (video.paused) {
      video.play();
      progressUpdate = setInterval(() => {
        const duration = video.duration;
        const currentPosition = video.currentTime;
        // console.log(progressBar.style);
        // console.log('Duration=', duration, 'currentPosition=', currentPosition, 'Progress position=', round((currentPosition / duration) * 100, 2));
        progressBar.style.flexBasis = round((currentPosition / duration) * 100, 2) + '%';
      }, 500);
      // console.log('Start playing and set iterval id=', progressUpdate);
    } else {
      video.pause();
      // console.log('Pause video and interval id=', progressUpdate);
      clearInterval(progressUpdate);
    }
  }

  function progress(e) {
    const duration = video.duration;
    const seekPosition = (e.pageX - this.offsetLeft) / this.clientWidth * duration;
    // console.dir(this);
    // console.dir(e);
    // console.log(e.pageX - this.offsetLeft, this.clientWidth);
    video.currentTime = seekPosition;
    progressBar.style.flexBasis = round((seekPosition / duration) * 100, 2) + '%';
  }

  function skip(timeShift) {
    const currentPosition = video.currentTime;
    console.log('duration=', video.duration, 'currentPosition=', currentPosition, 'desired position=', currentPosition + timeShift);
    video.currentTime = currentPosition + timeShift;
  }

  function skipBack() {
    skip(-10);
    // const currentPosition = video.currentTime;
    // video.fastseek(currentPosition - 10 * 1000);
  }

  function skipFwd() {
    skip(25);
    // const currentPosition = video.currentTime;
    // video.fastseek(currentPosition + 25 * 1000);
  }

  function volume() {
    video.volume = this.value;
  }

  function speed() {
    video.playbackRate = this.value;
  }
}

}