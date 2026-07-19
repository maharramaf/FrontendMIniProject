"use strict";

const promoSlides = document.querySelectorAll(".promo-slide");

let currentSlide = 0;
const SLIDE_DURATION_SECONDS = 4;

function showNextSlide() {

    const current = promoSlides[currentSlide];
    const nextIndex = (currentSlide + 1) % promoSlides.length;
    const next = promoSlides[nextIndex];

    current.classList.remove("active");
    current.classList.add("exit");

    next.classList.remove("exit");
    next.classList.add("active");

    setTimeout(() => {
        current.classList.remove("exit");
    }, 600);

    currentSlide = nextIndex;
}

if (promoSlides.length > 0) {

    promoSlides[0].classList.add("active");

    setInterval(showNextSlide, SLIDE_DURATION_SECONDS * 1000);

}

/* Dropdown */
const dropdown = document.querySelector(".dropdown");
const aboutText = document.querySelector(".about-text");

if (dropdown && aboutText) {

    aboutText.addEventListener("mouseenter", () => {
        dropdown.classList.add("open");
    });

    dropdown.addEventListener("mouseleave", () => {
        dropdown.classList.remove("open");
    });

}

/* Cart panel */
const cartIcon = document.querySelector(".pot-icon");
const cartPanel = document.querySelector(".cart-panel");
const cartOverlay = document.querySelector(".cart-overlay");
const cartClose = document.querySelector(".cart-close");

function openCart(event) {
    event.preventDefault();
    cartPanel.classList.add("open");
    cartOverlay.classList.add("open");
    document.documentElement.classList.add("no-scroll");
    document.body.classList.add("no-scroll");
}

function closeCart(event) {
    event.preventDefault();
    cartPanel.classList.remove("open");
    cartOverlay.classList.remove("open");
    document.documentElement.classList.remove("no-scroll");
    document.body.classList.remove("no-scroll");
}

if (cartIcon && cartPanel && cartOverlay) {

    cartIcon.addEventListener("click", openCart);
    cartClose.addEventListener("click", closeCart);
    cartOverlay.addEventListener("click", closeCart);

}

/* Search panel */
const searchBox = document.querySelector(".search-box");
const searchInput = document.querySelector("#search-input");
const searchClear = document.querySelector(".search-clear");
const searchPanel = document.querySelector(".search-panel");

if (searchBox && searchInput && searchPanel) {

    searchInput.addEventListener("focus", () => {
        searchBox.classList.add("open");
        searchPanel.classList.add("open");
    });

    searchClear.addEventListener("click", (event) => {
        event.preventDefault();
        searchInput.value = "";
        searchBox.classList.remove("open");
        searchPanel.classList.remove("open");
    });

    document.addEventListener("click", (event) => {
        if (!searchBox.contains(event.target) && !searchPanel.contains(event.target)) {
            searchBox.classList.remove("open");
            searchPanel.classList.remove("open");
        }
    });

}

/* Sub-nav mega menus */
const subDropdowns = document.querySelectorAll(".sub-dropdown");

subDropdowns.forEach((subDropdown) => {

    const menu = subDropdown.querySelector(".mega-menu");
    const chevron = subDropdown.querySelector(".nav-chevron");
    const text = subDropdown.querySelector(".sub-nav-text");

    if (!menu || !chevron || !text) {
        return;
    }

    let closeTimer = null;

    function openMenu() {
        clearTimeout(closeTimer);
        menu.classList.add("open");
        chevron.classList.add("open");
    }

    function scheduleClose() {
        clearTimeout(closeTimer);
        closeTimer = setTimeout(() => {
            menu.classList.remove("open");
            chevron.classList.remove("open");
        }, 80);
    }

    text.addEventListener("mouseenter", openMenu);
    menu.addEventListener("mouseenter", openMenu);

    text.addEventListener("mouseleave", scheduleClose);
    menu.addEventListener("mouseleave", scheduleClose);

});
