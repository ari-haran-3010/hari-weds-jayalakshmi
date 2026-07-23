/* ==========================================================
   Hari ❤️ Jayalakshmi Wedding
   Music Controller V2
========================================================== */

"use strict";

const bgMusic = document.getElementById("bgMusic");

const musicBtn = document.getElementById("musicToggle");

const openInviteBtn = document.getElementById("openInvite");

let isPlaying = false;

/* ==========================================
   PLAY MUSIC
========================================== */

function playMusic(){

    if(!bgMusic) return;

    bgMusic.volume = 0;

    bgMusic.play().then(()=>{

        fadeIn();

        isPlaying = true;

        musicBtn.classList.add("playing");

        musicBtn.innerHTML =
        '<i class="fa-solid fa-volume-high"></i>';

    }).catch(()=>{

        console.log("Autoplay blocked.");

    });

}

/* ==========================================
   FADE IN
========================================== */

function fadeIn(){

    let volume = 0;

    const timer = setInterval(()=>{

        volume += 0.05;

        if(volume >= 1){

            volume = 1;

            clearInterval(timer);

        }

        bgMusic.volume = volume;

    },200);

}

/* ==========================================
   FADE OUT
========================================== */

function fadeOut(callback){

    let volume = bgMusic.volume;

    const timer = setInterval(()=>{

        volume -= 0.05;

        if(volume <= 0){

            volume = 0;

            clearInterval(timer);

            bgMusic.pause();

            if(callback){

                callback();

            }

        }

        bgMusic.volume = volume;

    },100);

}

/* ==========================================
   OPEN INVITATION
========================================== */

if(openInviteBtn){

    openInviteBtn.addEventListener("click",()=>{

        if(!isPlaying){

            playMusic();

        }

    });

}

/* ==========================================
   TOGGLE BUTTON
========================================== */

if(musicBtn){

    musicBtn.addEventListener("click",()=>{

        if(!isPlaying){

            playMusic();

        }

        else{

            fadeOut(()=>{

                isPlaying = false;

                musicBtn.classList.remove("playing");

                musicBtn.innerHTML =
                '<i class="fa-solid fa-music"></i>';

            });

        }

    });

}

/* ==========================================
   END OF SONG
========================================== */

bgMusic.addEventListener("ended",()=>{

    bgMusic.currentTime = 0;

    bgMusic.play();

});

/* ==========================================
   PAGE VISIBILITY
========================================== */

document.addEventListener("visibilitychange",()=>{

    if(document.hidden){

        bgMusic.volume = 0.25;

    }

    else{

        bgMusic.volume = 1;

    }

});

console.log("Music Controller Ready");