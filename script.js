const songs = [
    {
        title: "Kesariya",
        artist: "Arijit Singh",
        src: "music/Kesariya.mp3",
        cover: "images/kesariya.jpg"
    },
    {
        title: "Tum Hi Ho",
        artist: "Arijit Singh",
        src: "music/TumHiHo.mp3",
        cover: "images/tumhiho.jpg"
    },
    {
        title: "Heeriye",
        artist: "Arijit Singh & Jasleen Royal",
        src: "music/Heeriye.mp3",
        cover: "images/heeriye.jpg"
    }

    
];

let songIndex = 0;
let isPlaying = false;

const audio = new Audio();

const title = document.querySelector(".song-info h2");
const artist = document.querySelector(".song-info p");
const cover = document.querySelector(".cover img");

const playBtn = document.querySelector(".play");
const playIcon = playBtn.querySelector("i");

const prevBtn = document.querySelector(".fa-backward-step");
const nextBtn = document.querySelector(".fa-forward-step");

const progressArea = document.querySelector(".progress-area");
const progressBar = document.querySelector(".progress-bar");

const time = document.querySelectorAll(".time span");
const currentTime = time[0];
const durationTime = time[1];

function loadSong(index) {
    title.textContent = songs[index].title;
    artist.textContent = songs[index].artist;
    cover.src = songs[index].cover;
    audio.src = songs[index].src;
}

loadSong(songIndex);

function playSong() {
    audio.play();
    isPlaying = true;
    playIcon.classList.remove("fa-play");
    playIcon.classList.add("fa-pause");
}

function pauseSong() {
    audio.pause();
    isPlaying = false;
    playIcon.classList.remove("fa-pause");
    playIcon.classList.add("fa-play");
}

playBtn.addEventListener("click", () => {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

nextBtn.addEventListener("click", () => {
    songIndex++;

    if (songIndex >= songs.length) {
        songIndex = 0;
    }

    loadSong(songIndex);

    if (isPlaying) {
        playSong();
    }
});

prevBtn.addEventListener("click", () => {
    songIndex--;

    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songIndex);

    if (isPlaying) {
        playSong();
    }
});

audio.addEventListener("timeupdate", () => {

    if (audio.duration) {

        const progress =
            (audio.currentTime / audio.duration) * 100;

        progressBar.style.width = progress + "%";

        let currentMin = Math.floor(audio.currentTime / 60);
        let currentSec = Math.floor(audio.currentTime % 60);

        if (currentSec < 10)
            currentSec = "0" + currentSec;

        currentTime.textContent =
            `${currentMin}:${currentSec}`;

        let totalMin = Math.floor(audio.duration / 60);
        let totalSec = Math.floor(audio.duration % 60);

        if (totalSec < 10)
            totalSec = "0" + totalSec;

        durationTime.textContent =
            `${totalMin}:${totalSec}`;
    }

});

progressArea.addEventListener("click", (e) => {

    const width = progressArea.clientWidth;
    const clickX = e.offsetX;

    audio.currentTime =
        (clickX / width) * audio.duration;

});

audio.addEventListener("ended", () => {

    songIndex++;

    if (songIndex >= songs.length)
        songIndex = 0;

    loadSong(songIndex);
    playSong();

});
