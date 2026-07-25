/*==========================================================
  DOM READY
==========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*======================================================
      ELEMENTS
    ======================================================*/

    const loader = document.getElementById("loader");

    const welcomeScreen = document.getElementById("welcomeScreen");

    const enterInvitation = document.getElementById("enterInvitation");

    const musicToggle = document.getElementById("musicToggle");

    const bgMusic = document.getElementById("bgMusic");

    const scrollTopBtn = document.getElementById("scrollTop");

    /*======================================================
      LOADER
    ======================================================*/

    window.addEventListener("load", () => {

        setTimeout(() => {

            loader.classList.add("hidden");

            setTimeout(() => {

                welcomeScreen.classList.add("show");

            }, 500);

        }, 1500);

    });

    /*======================================================
      ENTER INVITATION
    ======================================================*/

    enterInvitation.addEventListener("click", () => {

        welcomeScreen.classList.remove("show");

        welcomeScreen.classList.add("hide");

        bgMusic.play().catch(() => {});

    });

    /*======================================================
      MUSIC
    ======================================================*/

    let musicPlaying = true;

    musicToggle.addEventListener("click", () => {

        if (bgMusic.paused) {

            bgMusic.play();

            musicToggle.textContent = "🎵";

            musicPlaying = true;

        } else {

            bgMusic.pause();

            musicToggle.textContent = "🔇";

            musicPlaying = false;

        }

    });

    /*======================================================
      SCROLL TO TOP
    ======================================================*/

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            scrollTopBtn.classList.add("show");

        } else {

            scrollTopBtn.classList.remove("show");

        }

    });

    scrollTopBtn.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });
    /*======================================================
      COUNTDOWN TIMER
    ======================================================*/

    const weddingDate = new Date("August 23, 2026 07:00:00").getTime();

    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");

    function updateCountdown() {

        const now = new Date().getTime();

        const distance = weddingDate - now;

        if (distance <= 0) {

            daysElement.textContent = "00";
            hoursElement.textContent = "00";
            minutesElement.textContent = "00";
            secondsElement.textContent = "00";

            clearInterval(countdownInterval);

            return;

        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));

        const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24))
            / (1000 * 60 * 60)
        );

        const minutes = Math.floor(
            (distance % (1000 * 60 * 60))
            / (1000 * 60)
        );

        const seconds = Math.floor(
            (distance % (1000 * 60))
            / 1000
        );

        daysElement.textContent =
            String(days).padStart(2, "0");

        hoursElement.textContent =
            String(hours).padStart(2, "0");

        minutesElement.textContent =
            String(minutes).padStart(2, "0");

        secondsElement.textContent =
            String(seconds).padStart(2, "0");

    }

    updateCountdown();

    const countdownInterval = setInterval(

        updateCountdown,

        1000

    );
        /*======================================================
      SCRATCH CARD
    ======================================================*/

    const scratchCanvas = document.getElementById("scratchCanvas");
    const scratchContent = document.getElementById("scratchContent");

    if (scratchCanvas && scratchContent) {

        const ctx = scratchCanvas.getContext("2d");

        function resizeCanvas() {

            scratchCanvas.width = scratchContent.offsetWidth;
            scratchCanvas.height = scratchContent.offsetHeight;

            ctx.globalCompositeOperation = "source-over";

            ctx.fillStyle = "#d4af37";
            ctx.fillRect(
                0,
                0,
                scratchCanvas.width,
                scratchCanvas.height
            );

            ctx.fillStyle = "#ffffff";
            ctx.font = "bold 28px Poppins";
            ctx.textAlign = "center";
            ctx.fillText(
                "✨ Scratch Here ✨",
                scratchCanvas.width / 2,
                scratchCanvas.height / 2
            );

        }

        resizeCanvas();

        window.addEventListener("resize", resizeCanvas);

        let scratching = false;

        function getPosition(event) {

            const rect = scratchCanvas.getBoundingClientRect();

            let x, y;

            if (event.touches) {

                x = event.touches[0].clientX - rect.left;
                y = event.touches[0].clientY - rect.top;

            } else {

                x = event.clientX - rect.left;
                y = event.clientY - rect.top;

            }

            return { x, y };

        }

        function scratch(event) {

            if (!scratching) return;

            event.preventDefault();

            const pos = getPosition(event);

            ctx.globalCompositeOperation = "destination-out";

            ctx.beginPath();

            ctx.arc(
                pos.x,
                pos.y,
                28,
                0,
                Math.PI * 2
            );

            ctx.fill();

        }

        scratchCanvas.addEventListener("mousedown", () => {

            scratching = true;

        });

        scratchCanvas.addEventListener("mouseup", () => {

            scratching = false;

        });

        scratchCanvas.addEventListener("mouseleave", () => {

            scratching = false;

        });

        scratchCanvas.addEventListener("mousemove", scratch);

        scratchCanvas.addEventListener(
            "touchstart",
            () => {

                scratching = true;

            },
            { passive: true }
        );

        scratchCanvas.addEventListener(
            "touchend",
            () => {

                scratching = false;

            },
            { passive: true }
        );

        scratchCanvas.addEventListener(
            "touchcancel",
            () => {

                scratching = false;

            },
            { passive: true }
        );

        scratchCanvas.addEventListener(
            "touchmove",
            scratch,
            { passive: false }
        );

    }
        /*======================================================
      PHOTO CAROUSEL
    ======================================================*/

    const sliderTrack = document.querySelector(".slider-track");

    const slides = document.querySelectorAll(".slide");

    const dots = document.querySelectorAll(".dot");

    const nextButton = document.getElementById("nextSlide");

    const prevButton = document.getElementById("prevSlide");

    let currentSlide = 0;

    const totalSlides = slides.length;

    function updateSlider() {

        if (!sliderTrack) return;

        sliderTrack.style.transform =
            `translateX(-${currentSlide * 100}%)`;

        dots.forEach((dot, index) => {

            dot.classList.toggle(
                "active",
                index === currentSlide
            );

        });

    }

    function nextSlide() {

        currentSlide++;

        if (currentSlide >= totalSlides) {

            currentSlide = 0;

        }

        updateSlider();

    }

    function previousSlide() {

        currentSlide--;

        if (currentSlide < 0) {

            currentSlide = totalSlides - 1;

        }

        updateSlider();

    }

    if (nextButton) {

        nextButton.addEventListener("click", nextSlide);

    }

    if (prevButton) {

        prevButton.addEventListener("click", previousSlide);

    }

    dots.forEach((dot, index) => {

        dot.addEventListener("click", () => {

            currentSlide = index;

            updateSlider();

        });

    });

    setInterval(() => {

        nextSlide();

    }, 5000);

    updateSlider();

    /*======================================================
      SMOOTH SCROLL FOR INTERNAL LINKS
    ======================================================*/

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function(e) {

            const target = document.querySelector(
                this.getAttribute("href")
            );

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

        });

    });

    /*======================================================
      INITIAL PAGE STATE
    ======================================================*/

    window.scrollTo({

        top: 0,

        behavior: "instant"

    });

});

/*==========================================================
  END OF FILE
==========================================================*/