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

/* PDP gallery */
const pdpGalleryImg = document.querySelector(".pdp-gallery-img");
const pdpGalleryPrev = document.querySelector(".pdp-gallery-arrow-prev");
const pdpGalleryNext = document.querySelector(".pdp-gallery-arrow-next");
const pdpGalleryThumbs = document.querySelectorAll(".pdp-gallery-thumb");

if (pdpGalleryImg && pdpGalleryThumbs.length > 0) {

    let activeThumb = 0;

    function showSlide(index) {
        activeThumb = (index + pdpGalleryThumbs.length) % pdpGalleryThumbs.length;
        const thumb = pdpGalleryThumbs[activeThumb];

        pdpGalleryImg.setAttribute("src", thumb.dataset.full);

        pdpGalleryThumbs.forEach((t) => t.classList.remove("pdp-gallery-thumb-active"));
        thumb.classList.add("pdp-gallery-thumb-active");
    }

    pdpGalleryThumbs.forEach((thumb, index) => {
        thumb.addEventListener("click", () => showSlide(index));
    });

    if (pdpGalleryPrev && pdpGalleryNext) {
        pdpGalleryPrev.addEventListener("click", () => showSlide(activeThumb - 1));
        pdpGalleryNext.addEventListener("click", () => showSlide(activeThumb + 1));
    }

}

/* Sticky product bar */
const pdpStickyBar = document.getElementById("pdp-sticky-bar");
const pdpStickyTrigger = document.querySelector(".why-made") || document.querySelector(".pdp-layout");
const siteHeader = document.querySelector("header");

if (pdpStickyBar && pdpStickyTrigger && siteHeader) {

    pdpStickyBar.style.top = siteHeader.offsetHeight + "px";

    window.addEventListener("resize", () => {
        pdpStickyBar.style.top = siteHeader.offsetHeight + "px";
    });

    window.addEventListener("scroll", () => {
        const triggerBottom = pdpStickyTrigger.getBoundingClientRect().bottom;
        pdpStickyBar.classList.toggle("pdp-sticky-visible", triggerBottom < 0);
    });

}

/* Sync color pickers (main select-color + sticky bar) */
const pdpMainColorButtons = document.querySelectorAll(".pdp-main-colors .pdp-color");
const pdpStickyColorButtons = document.querySelectorAll(".pdp-sticky-colors .pdp-color");
const pdpMainColorValue = document.querySelector(".pdp-main-color-value");
const pdpStickyColorValue = document.querySelector(".pdp-sticky-color-value");

function selectPdpColor(colorName) {

    [...pdpMainColorButtons, ...pdpStickyColorButtons].forEach((btn) => {
        btn.classList.toggle("pdp-color-selected", btn.dataset.color === colorName);
    });

    if (pdpMainColorValue) {
        pdpMainColorValue.textContent = colorName;
    }

    if (pdpStickyColorValue) {
        pdpStickyColorValue.textContent = colorName;
    }

}

[...pdpMainColorButtons, ...pdpStickyColorButtons].forEach((btn) => {
    btn.addEventListener("click", () => selectPdpColor(btn.dataset.color));
});

/* What's Included card videos: play on hover, pause otherwise */
const wiCardVideos = document.querySelectorAll(".wi-card-video");

wiCardVideos.forEach((video) => {

    const card = video.closest(".wi-card-image");

    if (!card) {
        return;
    }

    card.addEventListener("mouseenter", () => {
        video.play();
    });

    card.addEventListener("mouseleave", () => {
        video.pause();
        video.currentTime = 0;
    });

});

/* What's Included tabs */
const wiTabs = document.querySelectorAll(".wi-tab");
const wiPanels = document.querySelectorAll(".whats-included-grid");

wiTabs.forEach((tab) => {
    tab.addEventListener("click", () => {

        wiTabs.forEach((t) => t.classList.remove("wi-tab-active"));
        tab.classList.add("wi-tab-active");

        wiPanels.forEach((panel) => {
            panel.hidden = panel.dataset.tabPanel !== tab.dataset.tab;
        });

    });
});
