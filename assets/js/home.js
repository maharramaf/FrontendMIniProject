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

/* Mobile hamburger nav */
const hamburgerBtn = document.querySelector(".hamburger-btn");
const mobileNavDrawer = document.querySelector(".mobile-nav-drawer");
const mobileNavOverlay = document.querySelector(".mobile-nav-overlay");
const mobileNavClose = document.querySelector(".mobile-nav-close");

function openMobileNav() {
    mobileNavDrawer.classList.add("open");
    mobileNavOverlay.classList.add("open");
    document.documentElement.classList.add("no-scroll");
    document.body.classList.add("no-scroll");
}

function closeMobileNav() {
    mobileNavDrawer.classList.remove("open");
    mobileNavOverlay.classList.remove("open");
    document.documentElement.classList.remove("no-scroll");
    document.body.classList.remove("no-scroll");
}

if (hamburgerBtn && mobileNavDrawer && mobileNavOverlay && mobileNavClose) {
    hamburgerBtn.addEventListener("click", openMobileNav);
    mobileNavClose.addEventListener("click", closeMobileNav);
    mobileNavOverlay.addEventListener("click", closeMobileNav);
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

    /* Mega menu category preview swap */
    const previewImg = menu.querySelector(".mega-preview-img");
    const previewName = menu.querySelector(".mega-preview-name");
    const previewDesc = menu.querySelector(".mega-preview-desc");
    const previewLinks = menu.querySelectorAll(".mega-collection-link[data-preview-img]");

    if (previewImg && previewName && previewDesc && previewLinks.length > 0) {

        const defaultImg = previewImg.getAttribute("src");
        const defaultName = previewName.textContent;
        const defaultDesc = previewDesc.textContent;

        function resetPreview() {
            previewImg.setAttribute("src", defaultImg);
            previewName.textContent = defaultName;
            previewDesc.textContent = defaultDesc;
        }

        previewLinks.forEach((link) => {

            link.addEventListener("mouseenter", () => {
                previewImg.setAttribute("src", link.dataset.previewImg);
                previewName.textContent = link.dataset.previewName;
                previewDesc.textContent = link.dataset.previewDesc;
            });

            link.addEventListener("mouseleave", resetPreview);

        });

        menu.addEventListener("mouseleave", resetPreview);

    }

});

/* Social proof carousel (Swiper) */
const socialTrack = document.querySelector(".social-track");
const socialPrev = document.querySelector(".social-arrows .prev");
const socialNext = document.querySelector(".social-arrows .next");

if (socialTrack && socialPrev && socialNext && window.Swiper) {

    new Swiper(socialTrack, {
        slidesPerView: "auto",
        slidesPerGroup: 1,
        spaceBetween: 18,
        speed: 700,
        a11y: false,
        loop: true,
        navigation: {
            nextEl: socialNext,
            prevEl: socialPrev,
        },
    });

}

/* Sweepstakes video toggle */
const sweepstakesVideo = document.querySelector(".sweepstakes-video");
const sweepstakesVideoToggle = document.querySelector(".sweepstakes-video-toggle");

if (sweepstakesVideo && sweepstakesVideoToggle) {

    sweepstakesVideoToggle.addEventListener("click", () => {

        const icon = sweepstakesVideoToggle.querySelector("i");

        if (sweepstakesVideo.paused) {
            sweepstakesVideo.play();
            icon.className = "fa-solid fa-pause";
        } else {
            sweepstakesVideo.pause();
            icon.className = "fa-solid fa-play";
        }

    });

}

/* Product carousel (Swiper) with tabs */
const productCarouselSection = document.querySelector("#product-carousel");

if (productCarouselSection && window.Swiper) {

    const tabButtons = productCarouselSection.querySelectorAll(".carousel-tab");
    const panels = productCarouselSection.querySelectorAll("[data-tab-panel]");
    const prevBtn = productCarouselSection.querySelector(".carousel-arrow.prev");
    const nextBtn = productCarouselSection.querySelector(".carousel-arrow.next");

    const swiperConfig = {
        slidesPerView: 1.15,
        slidesPerGroup: 1,
        spaceBetween: 14,
        speed: 700,
        a11y: false,
        loop: true,
        breakpoints: {
            481: {
                slidesPerView: 2.15,
                slidesPerGroup: 2,
                spaceBetween: 18,
            },
            769: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 20,
            },
            1025: {
                slidesPerView: 4,
                slidesPerGroup: 4,
                spaceBetween: 24,
            },
        },
    };

    const swiperInstances = {
        clean: new Swiper(productCarouselSection.querySelector('[data-tab-panel="clean"]'), swiperConfig),
    };

    let activeTab = "clean";

    prevBtn.addEventListener("click", () => swiperInstances[activeTab] && swiperInstances[activeTab].slidePrev());
    nextBtn.addEventListener("click", () => swiperInstances[activeTab] && swiperInstances[activeTab].slideNext());

    tabButtons.forEach((tab) => {

        tab.addEventListener("click", () => {

            const target = tab.dataset.tab;

            if (target === activeTab) {
                return;
            }

            tabButtons.forEach((t) => t.classList.remove("active"));
            tab.classList.add("active");

            if (swiperInstances[activeTab]) {
                swiperInstances[activeTab].slideToLoop(0, 0);
            }

            panels.forEach((panel) => {
                panel.style.display = panel.dataset.tabPanel === target ? "" : "none";
            });

            if (!swiperInstances[target]) {
                swiperInstances[target] = new Swiper(productCarouselSection.querySelector(`[data-tab-panel="${target}"]`), swiperConfig);
            } else {
                swiperInstances[target].update();
                swiperInstances[target].slideToLoop(0, 0);
            }

            activeTab = target;

        });

    });

}

/* Category circles carousel (Swiper) */
const categoryCirclesSection = document.querySelector("#category-circles");

if (categoryCirclesSection && window.Swiper) {

    new Swiper(categoryCirclesSection.querySelector(".category-track"), {
        slidesPerView: "auto",
        slidesPerGroup: 1,
        spaceBetween: 32,
        speed: 700,
        a11y: false,
        loop: true,
        navigation: {
            nextEl: categoryCirclesSection.querySelector(".carousel-arrow.next"),
            prevEl: categoryCirclesSection.querySelector(".carousel-arrow.prev"),
        },
    });

}
