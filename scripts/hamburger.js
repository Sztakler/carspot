export function initHamburger() {
    const hamburger = document.querySelector(".hamburger-menu");
    const offScreenMenu = document.querySelector(".offscreen-menu");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        offScreenMenu.classList.toggle("active");
    });
}
