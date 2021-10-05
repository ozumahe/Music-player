// Music Content......
const music = [
    {
        id: 1,
        titleS: "COMETHRU", //Music name
        artistS: "Jeremy Zucker", //Music artist
        musicS: "music/comethru.mp3", //Music Source
        imageSrc: "images/comethru.jpeg", //Music Image Source
    },
    {
        id: 2,
        titleS: "END-TIME",
        artistS: "Graham D",
        musicS: "music/endtime.mp3",
        imageSrc: "images/endtime.jpeg",
    },
    {
        id: 3,
        titleS: "MY-LIFE",
        artistS: "NF",
        musicS: "music/mylife.mp3",
        imageSrc: "images/mylife.jpeg",
    },
    {
        id: 4,
        titleS: "RUN-AWAY",
        artistS: "Aurora",
        musicS: "music/runaway.mp3",
        imageSrc: "images/runaway.jpeg",
    },
    //You Can Add More Songs Using The Same Format Of Object Used For The Previous Once
]; 


// Getting Element By ID function......(note: I did it Like This So i wont keep repeating The Code.. So I can use The Functing Any Time I want To Get Element By ID)
function __(el) {
     return document.getElementById(el);
}


// select Element.....
const container = document.querySelector(".container");
const audio = __("audio");
const title = __("title");
const artist = __("artist");
const image = __("img");
const progressContainer = __("progress-container");
const progress = __("progress");
const playBtn = __("play-btn");
const prevBtn = __("prev-btn");
const nextBtn = __("next-btn");

// Initializing Music...... 
let currentsong = 0;

// const currentMusic = music[currentsong];

// Loading Music.........
function loadMusic(song) {
    audio.src = song.musicS;
    title.innerText = song.titleS;
    artist.innerText = song.artistS;
    image.src = song.imageSrc;
    document.body.style.background = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${song.imageSrc})`;
    document.body.style.backgroundPosition = `center`;
    document.body.style.backgroundSize = `cover`;
}

loadMusic(music[currentsong]);



// Play .....
function playMusic() {
    container.classList.add("active");
    playBtn.querySelector("i.fas").classList.remove("fa-play");
    playBtn.querySelector("i.fas").classList.add("fa-pause");
    audio.play();
}


// Pause.....
function pauseMusic() {
    container.classList.remove("active");
    playBtn.querySelector("i.fas").classList.add("fa-play");
    playBtn.querySelector("i.fas").classList.remove("fa-pause");
    audio.pause();
}

// Prev Music.....
function prevMusic() {
    currentsong--;
    if(currentsong < 0) {
        currentsong = music.length -1;
    }

    loadMusic(music[currentsong]);
    playMusic();
}

// Next Music.....
function nextMusic() {
    currentsong++;
    if(currentsong > music.length -1) {
        currentsong = 0;
    }

    loadMusic(music[currentsong]);
    playMusic();
}

// Update Progress
function updateProgress(e) {
    const {duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    console.log(progressPercent);
}
// Set Progress
function setProgress (e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

// Event Listeners.......
playBtn.addEventListener('click', () => {
    // Checking If Music Is Playing.....
    const isPlaying = container.classList.contains("active");
    if(isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
});


// Event Listeners
prevBtn.addEventListener('click' , prevMusic);
nextBtn.addEventListener('click' , nextMusic);
audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);
audio.addEventListener('ended', nextMusic);