
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

const text = "KENCHIE SAWADIKA";
const typingElement = document.getElementById("typing");
const proceedButton = document.getElementById("proceedBtn");
const transition = document.getElementById("transition");

let index = 0;

function typeText() {
    if (index < text.length) {
        typingElement.textContent += text.charAt(index);
        index++;
        setTimeout(typeText, 75);
    }
}

window.addEventListener("load", () => {
    setTimeout(typeText, 500);
});

proceedButton.addEventListener("click", () => {
    transition.classList.add("active");

    setTimeout(() => {
        // Change this when your main COF page is ready.
        window.location.href = "/home";
    }, 650);
});
