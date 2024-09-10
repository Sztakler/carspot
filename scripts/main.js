import { initNavbar } from "./navbar";
import { initGallery } from "./gallery";
import { initExpand } from "./expand";
import { initHamburger } from "./hamburger";

document.addEventListener("DOMContentLoaded", () => {
    initNavbar();
    initGallery();
    initExpand();
    initHamburger();
});
