export function initNavbar() {
    let lastScrollTop = 0;
    const navbar = document.getElementById("navbar");
    const scrollThreshold = 100;

    window.addEventListener("scroll", (event) => {
        const scrollTop = document.documentElement.scrollTop;
        if (scrollTop < scrollThreshold) {
            navbar.classList.remove("bg-blurred");
            return;
        }

        let currentScroll = document.documentElement.scrollTop;
        if (currentScroll > lastScrollTop) {
            navbar.classList.add("-translate-y-full");
            navbar.classList.remove("bg-blurred");
        } else {
            navbar.classList.remove("-translate-y-full");
            navbar.classList.add("bg-blurred");
        }

        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // mobile or negative scrolling
    });

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth",
            });
        });
    });
}
