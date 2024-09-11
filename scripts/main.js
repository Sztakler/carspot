import { initNavbar } from "./navbar.js";
import { initGallery } from "./gallery.js";
import { initExpand } from "./expand.js";
import { initHamburger } from "./hamburger.js";

document.addEventListener("DOMContentLoaded", () => {
    initNavbar();
    initGallery();
    initExpand();
    initHamburger();
});
