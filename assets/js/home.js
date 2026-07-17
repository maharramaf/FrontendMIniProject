"use strict"
const promoSlides = document.querySelectorAll('.promo-slide');
let currentSlide = 0;

const SLIDE_DURATION_SECONDS = 4;

function showNextSlide() {
    const current = promoSlides[currentSlide];
    const nextIndex = (currentSlide + 1) % promoSlides.length;
    const next = promoSlides[nextIndex];

    current.classList.remove('active');
    current.classList.add('exit');

    next.classList.remove('exit');
    next.classList.add('active');

    setTimeout(() => {
        current.classList.remove('exit');
    }, 600);

    currentSlide = nextIndex;
}

promoSlides[currentSlide].classList.add('active');

setInterval(showNextSlide, SLIDE_DURATION_SECONDS * 1000);