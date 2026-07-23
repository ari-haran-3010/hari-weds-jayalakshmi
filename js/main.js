/* ==========================================================
   Hari ❤️ Jayalakshmi Wedding Invitation
   Version 2.0
   main.js - Part 1
========================================================== */

"use strict";

/* ==========================================================
   DOM ELEMENTS
========================================================== */

const loader = document.getElementById("loader");
const openButton = document.getElementById("openInvite");
const musicButton = document.getElementById("musicToggle");

const hero = document.getElementById("hero");

const sections = document.querySelectorAll("section");

const cards = document.querySelectorAll(
".person-card,.event-card,.gallery-item,.thankyou-card"
);

/* ==========================================================
   INITIALIZE
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    hideLoader();

    setupRevealAnimations();

    setupOpenInvitation();

    setupHeroEffects();

    setupCardHover();

    setupScrollProgress();

});

/* ==========================================================
   LOADER
========================================================== */

function hideLoader(){

    window.addEventListener("load",()=>{

        setTimeout(()=>{

            loader.classList.add("loader-hide");

        },1800);

    });

}

/* ==========================================================
   OPEN INVITATION
========================================================== */

function setupOpenInvitation(){

    if(!openButton) return;

    openButton.addEventListener("click",()=>{

        const target=document.getElementById("story");

        if(target){

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

}

/* ==========================================================
   SCROLL REVEAL
========================================================== */

function setupRevealAnimations(){

    const observer = new IntersectionObserver(

        (entries)=>{

            entries.forEach(entry=>{

                if(entry.isIntersecting){

                    entry.target.classList.add("fade-up");

                }

            });

        },

        {

            threshold:0.15

        }

    );

    cards.forEach(card=>{

        observer.observe(card);

    });

}

/* ==========================================================
   HERO PARALLAX
========================================================== */

function setupHeroEffects(){

    if(!hero) return;

    hero.addEventListener("mousemove",(e)=>{

        const x=(window.innerWidth/2-e.clientX)/45;

        const y=(window.innerHeight/2-e.clientY)/45;

        const image=document.querySelector(".hero-image img");

        if(image){

            image.style.transform=

            `rotateY(${x}deg)
             rotateX(${-y}deg)
             scale(1.02)`;

        }

    });

    hero.addEventListener("mouseleave",()=>{

        const image=document.querySelector(".hero-image img");

        if(image){

            image.style.transform="rotateX(0) rotateY(0) scale(1)";

        }

    });

}

/* ==========================================================
   CARD HOVER
========================================================== */

function setupCardHover(){

    cards.forEach(card=>{

        card.addEventListener("mouseenter",()=>{

            card.style.transform="translateY(-10px)";

        });

        card.addEventListener("mouseleave",()=>{

            card.style.transform="translateY(0)";

        });

    });

}

/* ==========================================================
   SCROLL PROGRESS BAR
========================================================== */

function setupScrollProgress(){

    const progress=document.createElement("div");

    progress.id="scrollProgress";

    progress.style.position="fixed";

    progress.style.top="0";

    progress.style.left="0";

    progress.style.height="4px";

    progress.style.width="0";

    progress.style.background="#c8a14d";

    progress.style.zIndex="999999";

    document.body.appendChild(progress);

    window.addEventListener("scroll",()=>{

        const total=

        document.documentElement.scrollHeight-

        document.documentElement.clientHeight;

        const percent=

        (window.scrollY/total)*100;

        progress.style.width=percent+"%";

    });

}

/* ==========================================================
   HERO TITLE ANIMATION
========================================================== */

const heroTitle=document.querySelector(".hero-content h1");

if(heroTitle){

    setInterval(()=>{

        heroTitle.animate(

        [

            {

                transform:"translateY(0px)"

            },

            {

                transform:"translateY(-8px)"

            },

            {

                transform:"translateY(0px)"

            }

        ],

        {

            duration:2500

        });

    },3000);

}

/* ==========================================================
   SECTION FADE
========================================================== */

sections.forEach(section=>{

    section.style.opacity=0;

    section.style.transition="1s";

});

window.addEventListener("scroll",()=>{

    sections.forEach(section=>{

        const top=section.getBoundingClientRect().top;

        if(top<window.innerHeight-120){

            section.style.opacity=1;

        }

    });

});

/* ==========================================================
   PETAL SPEED RANDOMIZER
========================================================== */

document.querySelectorAll(".petals span").forEach(petal=>{

    petal.style.animationDuration=

    (10+Math.random()*8)+"s";

});

/* ==========================================================
   CONSOLE MESSAGE
========================================================== */

console.log("❤️ Hari ❤️ Jayalakshmi ❤️");

console.log("Wedding Invitation V2 Loaded");
/* ==========================================================
   GALLERY LIGHTBOX
========================================================== */

const galleryImages = document.querySelectorAll(".gallery-item img");

const lightbox = document.createElement("div");

lightbox.id = "lightbox";

lightbox.innerHTML = `
    <span id="closeLightbox">&times;</span>
    <img id="lightboxImage">
`;

document.body.appendChild(lightbox);

const lightboxImage = document.getElementById("lightboxImage");

galleryImages.forEach(image => {

    image.addEventListener("click", () => {

        lightbox.style.display = "flex";

        lightboxImage.src = image.src;

    });

});

document.getElementById("closeLightbox")
.addEventListener("click", () => {

    lightbox.style.display = "none";

});

lightbox.addEventListener("click", e => {

    if (e.target === lightbox) {

        lightbox.style.display = "none";

    }

});

/* ==========================================================
   HERO IMAGE SLIDESHOW
========================================================== */

const heroImage = document.querySelector(".hero-image img");

const heroImages = [

    "images/couple1.jpg",

    "images/couple2.jpg",

    "images/couple3.JPG",

    "images/couple4.jpg"

];

let heroIndex = 0;

setInterval(() => {

    if (!heroImage) return;

    heroIndex++;

    if (heroIndex >= heroImages.length) {

        heroIndex = 0;

    }

    heroImage.style.opacity = 0;

    setTimeout(() => {

        heroImage.src = heroImages[heroIndex];

        heroImage.style.opacity = 1;

    }, 400);

}, 5000);

/* ==========================================================
   BUTTON RIPPLE EFFECT
========================================================== */

document.querySelectorAll("button,.map-btn").forEach(button => {

    button.addEventListener("click", function (e) {

        const ripple = document.createElement("span");

        ripple.className = "ripple";

        this.appendChild(ripple);

        const rect = this.getBoundingClientRect();

        ripple.style.left =

            e.clientX - rect.left + "px";

        ripple.style.top =

            e.clientY - rect.top + "px";

        setTimeout(() => {

            ripple.remove();

        }, 700);

    });

});

/* ==========================================================
   GALLERY AUTO FADE
========================================================== */

galleryImages.forEach((img, index) => {

    img.style.opacity = 0;

    img.style.transform = "translateY(40px)";

    setTimeout(() => {

        img.style.transition = "1s";

        img.style.opacity = 1;

        img.style.transform = "translateY(0)";

    }, index * 300);

});

/* ==========================================================
   SMOOTH SCROLL FOR MAP BUTTONS
========================================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(

            this.getAttribute("href")

        );

        if (target) {

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});

/* ==========================================================
   SCROLL TO TOP BUTTON
========================================================== */

const topButton = document.createElement("button");

topButton.id = "scrollTop";

topButton.innerHTML = "↑";

document.body.appendChild(topButton);

window.addEventListener("scroll", () => {

    if (window.scrollY > 600) {

        topButton.style.opacity = 1;

    } else {

        topButton.style.opacity = 0;

    }

});

topButton.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});

/* ==========================================================
   FLOATING HEARTS
========================================================== */

setInterval(() => {

    const heart = document.createElement("div");

    heart.innerHTML = "❤️";

    heart.style.position = "fixed";

    heart.style.left =

        Math.random() * window.innerWidth + "px";

    heart.style.bottom = "-40px";

    heart.style.fontSize = "24px";

    heart.style.pointerEvents = "none";

    heart.style.zIndex = "100";

    heart.style.transition = "5s linear";

    document.body.appendChild(heart);

    setTimeout(() => {

        heart.style.transform =

            "translateY(-120vh) rotate(360deg)";

        heart.style.opacity = 0;

    }, 50);

    setTimeout(() => {

        heart.remove();

    }, 5500);

}, 2500);

/* ==========================================================
   CONSOLE
========================================================== */

console.log("Gallery Loaded");

console.log("Hero Slideshow Started");
/* ==========================================================
   Hari ❤️ Jayalakshmi Wedding Invitation
   main.js - Part 3
========================================================== */

"use strict";

/* ==========================================================
   MOUSE SPARKLE EFFECT
========================================================== */

const sparkleContainer = document.createElement("div");
sparkleContainer.id = "sparkleContainer";
document.body.appendChild(sparkleContainer);

document.addEventListener("mousemove", (e) => {

    if(window.innerWidth < 768) return;

    const sparkle = document.createElement("span");

    sparkle.className = "sparkle";

    sparkle.style.left = e.clientX + "px";
    sparkle.style.top = e.clientY + "px";

    sparkle.innerHTML = "✨";

    sparkleContainer.appendChild(sparkle);

    setTimeout(() => {

        sparkle.remove();

    }, 1200);

});

/* ==========================================================
   HERO FLOATING EFFECT
========================================================== */

const heroImage2 = document.querySelector(".hero-image img");

if(heroImage2){

    setInterval(()=>{

        heroImage2.animate(

        [

            { transform:"translateY(0px)" },

            { transform:"translateY(-10px)" },

            { transform:"translateY(0px)" }

        ],

        {

            duration:3500,

            iterations:1

        });

    },4000);

}

/* ==========================================================
   BUTTON GLOW EFFECT
========================================================== */

document.querySelectorAll("button,.map-btn").forEach(btn=>{

    setInterval(()=>{

        btn.animate([

            {

                boxShadow:"0 0 0 rgba(0,0,0,0)"

            },

            {

                boxShadow:"0 0 25px rgba(200,161,77,.7)"

            },

            {

                boxShadow:"0 0 0 rgba(0,0,0,0)"

            }

        ],{

            duration:2500

        });

    },4500);

});

/* ==========================================================
   SECTION TITLE ANIMATION
========================================================== */

const titles=document.querySelectorAll(".section-title");

const titleObserver=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.animate([

{

opacity:0,

transform:"translateY(40px)"

},

{

opacity:1,

transform:"translateY(0)"

}

],{

duration:900,

fill:"forwards"

});

}

});

});

titles.forEach(title=>{

titleObserver.observe(title);

});

/* ==========================================================
   IMAGE PARALLAX
========================================================== */

window.addEventListener("scroll",()=>{

const scroll=window.scrollY;

document.querySelectorAll(".gallery-item img").forEach(img=>{

img.style.transform=`translateY(${scroll*0.02}px) scale(1.02)`;

});

});

/* ==========================================================
   SCRATCH COMPLETION EFFECT
========================================================== */

const scratchCanvas=document.getElementById("scratchCanvas");

if(scratchCanvas){

const observer=new MutationObserver(()=>{

if(scratchCanvas.style.display==="none"){

launchConfetti();

}

});

observer.observe(scratchCanvas,{

attributes:true,

attributeFilter:["style"]

});

}

/* ==========================================================
   CONFETTI
========================================================== */

function launchConfetti(){

for(let i=0;i<80;i++){

const piece=document.createElement("div");

piece.style.position="fixed";

piece.style.width="10px";

piece.style.height="16px";

piece.style.left=Math.random()*100+"vw";

piece.style.top="-30px";

piece.style.background=

`hsl(${Math.random()*360},80%,65%)`;

piece.style.pointerEvents="none";

piece.style.zIndex="999999";

piece.style.borderRadius="4px";

piece.style.transition="4s linear";

document.body.appendChild(piece);

setTimeout(()=>{

piece.style.transform=

`translateY(${window.innerHeight+80}px)
rotate(${Math.random()*720}deg)`;

piece.style.opacity=0;

},30);

setTimeout(()=>{

piece.remove();

},4500);

}

}

/* ==========================================================
   AUTO SCROLL HIGHLIGHT
========================================================== */

window.addEventListener("scroll",()=>{

document.querySelectorAll("section").forEach(section=>{

const rect=section.getBoundingClientRect();

if(rect.top<250 && rect.bottom>250){

section.style.transition=".5s";

section.style.boxShadow="0 0 60px rgba(200,161,77,.12)";

}else{

section.style.boxShadow="none";

}

});

});

/* ==========================================================
   HEART BEAT TITLE
========================================================== */

const names=document.querySelector(".hero-content h1");

if(names){

setInterval(()=>{

names.style.transition=".5s";

names.style.transform="scale(1.03)";

setTimeout(()=>{

names.style.transform="scale(1)";

},500);

},5000);

}

/* ==========================================================
   WELCOME MESSAGE
========================================================== */

setTimeout(()=>{

console.log("");

console.log("💖 Welcome to Hari ❤️ Jayalakshmi Wedding");

console.log("May Love Bloom Forever 🌸");

console.log("");

},2500);

/* ==========================================================
   END
========================================================== */

console.log("main.js Part 3 Loaded Successfully");