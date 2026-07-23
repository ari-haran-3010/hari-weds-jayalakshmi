/* ==========================================================
   Hari ❤️ Jayalakshmi
   Premium Scratch Card V2
========================================================== */

const canvas = document.getElementById("scratchCanvas");

if(canvas){

const ctx = canvas.getContext("2d");

const container = document.getElementById("scratchContainer");

function resizeCanvas(){

canvas.width = container.offsetWidth;

canvas.height = container.offsetHeight;

drawCover();

}

window.addEventListener("resize",resizeCanvas);

resizeCanvas();

/* ======================================
   GOLD COVER
====================================== */

function drawCover(){

const gradient = ctx.createLinearGradient(
0,
0,
canvas.width,
canvas.height
);

gradient.addColorStop(0,"#d8b35c");

gradient.addColorStop(.5,"#f3d57d");

gradient.addColorStop(1,"#c79b3b");

ctx.globalCompositeOperation="source-over";

ctx.fillStyle=gradient;

ctx.fillRect(0,0,canvas.width,canvas.height);

ctx.font="bold 42px Cinzel";

ctx.fillStyle="#ffffff";

ctx.textAlign="center";

ctx.fillText(

"Scratch Here",

canvas.width/2,

canvas.height/2-20

);

ctx.font="22px Poppins";

ctx.fillText(

"Reveal Your Invitation",

canvas.width/2,

canvas.height/2+30

);

}

/* ======================================
   SCRATCH
====================================== */

let scratching=false;

function scratch(x,y){

ctx.globalCompositeOperation="destination-out";

ctx.beginPath();

ctx.arc(x,y,35,0,Math.PI*2);

ctx.fill();

}

canvas.addEventListener("mousedown",()=>{

scratching=true;

});

window.addEventListener("mouseup",()=>{

scratching=false;

checkReveal();

});

canvas.addEventListener("mousemove",(e)=>{

if(!scratching) return;

const rect=canvas.getBoundingClientRect();

scratch(

e.clientX-rect.left,

e.clientY-rect.top

);

});

/* ======================================
   TOUCH SUPPORT
====================================== */

canvas.addEventListener("touchstart",()=>{

scratching=true;

});

window.addEventListener("touchend",()=>{

scratching=false;

checkReveal();

});

canvas.addEventListener("touchmove",(e)=>{

e.preventDefault();

if(!scratching) return;

const rect=canvas.getBoundingClientRect();

const touch=e.touches[0];

scratch(

touch.clientX-rect.left,

touch.clientY-rect.top

);

});

/* ======================================
   AUTO REVEAL
====================================== */

function checkReveal(){

const pixels=ctx.getImageData(

0,

0,

canvas.width,

canvas.height

).data;

let transparent=0;

for(let i=3;i<pixels.length;i+=4){

if(pixels[i]===0){

transparent++;

}

}

const percent=

transparent/

(canvas.width*canvas.height);

if(percent>.55){

canvas.style.transition="1s";

canvas.style.opacity=0;

setTimeout(()=>{

canvas.style.display="none";

showCelebration();

},1000);

}

}

/* ======================================
   CELEBRATION
====================================== */

function showCelebration(){

for(let i=0;i<30;i++){

const flower=document.createElement("div");

flower.innerHTML="🌸";

flower.style.position="fixed";

flower.style.left=Math.random()*100+"vw";

flower.style.top="-30px";

flower.style.fontSize="30px";

flower.style.pointerEvents="none";

flower.style.transition="4s linear";

flower.style.zIndex="99999";

document.body.appendChild(flower);

setTimeout(()=>{

flower.style.transform=

`translateY(${window.innerHeight+100}px)
rotate(720deg)`;

flower.style.opacity=0;

},20);

setTimeout(()=>{

flower.remove();

},4500);

}

}

}