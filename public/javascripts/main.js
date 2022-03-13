'use strict';

const videoPlayButton = document.querySelectorAll('.play_button');
const playButtonElem = document.querySelectorAll('.playButtonElem');
const prevVideoElem = document.querySelector('.prev_video');
const progressElm = document.querySelector('.progress');
const playButton = document.querySelector('.playButton');
const soundButton = document.querySelector('.soundButton');
const soundBarInnerELm = document.querySelector('.sound-bar-inner');
const soundBarELm = document.querySelector('.sound_bar');
const progressBarElm = document.querySelector('.progress_bar');
const videoTotalTime = document.querySelector('.total_time');
const videoCurrentTime = document.querySelector('.current_time');
const selectOption = document.querySelector('.Select_Option');
const fullScreenVideo = document.querySelector('.fullScreen');

let playAndPause = false;
let sound = 20;

if (soundBarInnerELm) {
    soundBarInnerELm.style.width = `${sound}%`;
}

let targetVolumen;

// play and pause function
const playYtVideo = function () {
    if (!playAndPause) {
        playAndPause = true;

        prevVideoElem.play();
        playButton.classList.replace('fa-play', 'fa-pause');
    } else {
        playAndPause = false;

        prevVideoElem.pause();
        playButton.classList.replace('fa-pause', 'fa-play');
    }
};

// change the sound using the progress bar
const setSoundBarVaule = function (e) {
    const targetValue = e.offsetX;
    const totalValue = e.srcElement.offsetWidth;
    const volume = targetValue / totalValue;
    const valumeValue = (targetValue / totalValue) * 100;

    soundBarInnerELm.style.width = `${valumeValue}%`;
    prevVideoElem.volume = volume;
    targetVolumen = soundBarInnerELm;
};

let changeSound = false;

// changin sound
const changeVideoSound = function () {
    if (changeSound === false) {
        changeSound = true;
        prevVideoElem.volume = 0;
        soundButton.classList.replace('fa-volume-up', 'fa-volume-mute');
    } else {
        changeSound = false;

        prevVideoElem.volume = 1;

        soundButton.classList.replace('fa-volume-mute', 'fa-volume-up');
    }
};

// changin video duration using progress bar
const changeVideoDuration = function (e) {
    const targetValue = e.offsetX;
    const totalValue = e.target.offsetWidth;

    const clickValue = targetValue / totalValue;

    progressElm.style.width = `${(targetValue / totalValue) * 100}%`;

    const time = (targetValue / totalValue) * prevVideoElem.duration;
    prevVideoElem.currentTime = time;
};

const timer = function (time) {
    const minute = Math.floor(time / 60);
    const second = Math.floor(time % 60);

    if (second < 10) {
        return `${minute}:0${second}`;
    } else {
        return `${minute}:${second}`;
    }
};

if (prevVideoElem) {
    prevVideoElem.addEventListener('timeupdate', function (e) {
        const duration = e.target.duration;
        const currentTime = e.target.currentTime;

        const durationValue = Math.floor(duration);
        const currentTimeValue = Math.floor(currentTime);

        const progressBarValue = `${(currentTimeValue / durationValue) * 100}`;

        progressElm.style.width = `${progressBarValue}%`;

        videoTotalTime.textContent = timer(durationValue);
        videoCurrentTime.textContent = `${timer(currentTimeValue)} / `;
    });
}

// change the video speed
const changeSpeed = function () {
    const value = this.value;

    prevVideoElem.playbackRate = value;
};

// change video to full screen
const changeVideoToFullScreen = function () {
    if (prevVideoElem.requestFullscreen) {
        prevVideoElem.requestFullscreen();
    } else if (prevVideoElem.webkitRequestFullscreen) {
        /* Safari */
        prevVideoElem.webkitRequestFullscreen();
    } else if (prevVideoElem.msRequestFullscreen) {
        /* IE11 */
        prevVideoElem.msRequestFullscreen();
    }
};

// play and pause function
if (playButton) {
    playButton.addEventListener('click', playYtVideo);
}
if (soundBarELm) {
    soundBarELm.addEventListener('click', setSoundBarVaule);
}

if (soundButton) {
    soundButton.addEventListener('click', changeVideoSound);
}

if (progressBarElm) {
    progressBarElm.addEventListener('click', changeVideoDuration);
}

if (selectOption) {
    selectOption.addEventListener('click', changeSpeed);
}

if (fullScreenVideo) {
    fullScreenVideo.addEventListener('click', changeVideoToFullScreen);
}
