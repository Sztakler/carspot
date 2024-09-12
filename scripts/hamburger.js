export function initHamburger() {
    const hamburgerButton = document.querySelector(".hamburger-button");
    const hamburgerIcon = hamburgerButton.querySelector(".hamburger-icon");
    const offScreenMenu = document.querySelector(".offscreen-menu");

    function toggleHamburgerMenu() {
        hamburgerIcon.classList.toggle("active");
        offScreenMenu.classList.toggle("active");
    }

    hamburgerButton.addEventListener("click", () => {
        toggleHamburgerMenu();
    });

    const links = offScreenMenu.querySelectorAll("a");
    links.forEach((link) => {
        link.addEventListener("click", (event) => {
            toggleHamburgerMenu();
        });
    });
}
