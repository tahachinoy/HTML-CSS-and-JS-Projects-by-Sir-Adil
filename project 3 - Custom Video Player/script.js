//Get DOM Elements for JS Code
const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');

//Create Function for clicking on Video
function toggleVideoStatus() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

//Create Function for updating the pause / play icons
function updatePlayIcon() {
    if (video.paused) {
        play.innerHTML = '<i class = "fa fa-play fa-2x"><i/>'
    } else {
        play.innerHTML = '<i class = "fa fa-pause fa-2x"><i/>'
    }

}
//Create Function to update time progress
function updateProgress() {
    progress.value = video.currentTime/video.duration * 100;
    //Set the time for timestamp

    let mins = Math.floor(video.currentTime / 60);
    if(mins < 10) {
        mins = '0'+ String(mins);
    }
    let secs = Math.floor(video.currentTime % 60);
    if(secs < 10) {
        secs = '0'+ String(secs);
    }
    timestamp.innerHTML = `${mins}:${secs}`;

}

//Create Function to stop the video
function stopVideo() {
    video.currentTime = 0;
    video.pause();
}

//Creat Function to update the video progress using the slider
function setVideoProgress() {
    video.currentTime = (+progress.value * video.duration) / 100;
}

//Event Listeners
//1. Event Listener for clicking on the video
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);

//2. Event Listener for Play Button
play.addEventListener('click', toggleVideoStatus);

//3. Event Listener for Stop Button
stop.addEventListener('click', stopVideo);

//4. Event Listener for progress bar
progress.addEventListener('change', setVideoProgress);