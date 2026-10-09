
/* ---------- BASIC ANTI-CASUAL-INSPECTION PROTECTION ---------- */
(function () {
    // Disable the context menu (right-click).
    document.addEventListener("contextmenu", function (event) {
        event.preventDefault();
    });

    // Block common browser shortcuts used to open source/DevTools.
    document.addEventListener("keydown", function (event) {
        const key = event.key.toUpperCase();

        if (event.key === "F12" ||
            (event.ctrlKey && event.shiftKey && ["I", "J", "C"].includes(key)) ||
            (event.ctrlKey && key === "U") ||
            (event.metaKey && event.altKey && key === "I")) {
            event.preventDefault();
            event.stopPropagation();
        }
    }, true);
})();

const cards = [...document.querySelectorAll(".member-card")];
const members = document.querySelector(".members");
const pageBg = document.querySelector(".page-bg");
const pagePhoto = document.querySelector(".page-photo");

let activeAudio = null;
let activeCard = null;

const defaultBackground =
    "BACKGROUNDKENCHIE.jpg";

pagePhoto.style.backgroundImage =
    'url("PFP OF MEMBERS/STEPHEN_PFP.jpg")';

pageBg.style.backgroundImage =
    `url("${defaultBackground}")`;

/* ---------- MUSIC ---------- */

function stopMusic() {
    if (!activeAudio) {
        return;
    }

    activeAudio.pause();
    activeAudio.currentTime = 0;
    activeAudio = null;
}

function playMusic(card) {
    const music = card.dataset.music;

    if (!music) {
        return;
    }

    stopMusic();

    const audio = new Audio(music);

    audio.loop = true;
    audio.volume = 0.55;
    activeAudio = audio;

    audio.play().catch(() => {
        /*
         * Browsers can block audio until the user interacts
         * with the page. The card itself can be clicked to
         * satisfy that interaction.
         */
    });
}

/* ---------- BACKGROUND ---------- */

function setBackground(card) {
    const image = card?.dataset.bg || defaultBackground;

    pageBg.style.backgroundImage = `url("${image}")`;
}

/* ---------- CARD INTERACTION ---------- */

cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
        activeCard = card;
        setBackground(card);
        playMusic(card);
    });

    card.addEventListener("click", () => {
        activeCard = card;
        setBackground(card);
        playMusic(card);
    });

    card.addEventListener("focus", () => {
        activeCard = card;
        setBackground(card);
    });
});

members.addEventListener("mouseleave", () => {
    activeCard = null;
    stopMusic();
    setBackground(null);
});

/* Keep the active card selected when moving around inside the card. */
members.addEventListener("mouseenter", () => {
    if (activeCard) {
        setBackground(activeCard);
    }
});

/* ---------- SMOOTH BACKGROUND CLEANUP ---------- */

window.addEventListener("blur", () => {
    stopMusic();
});

document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        stopMusic();
    }
});
