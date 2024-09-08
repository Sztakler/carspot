export function initCarousel() {
    const carousel = document.getElementById("images-container");
    const images = carousel.querySelectorAll("img");
    const dotsContainer = document.getElementById("dots-container");

    const updateActiveDot = (index) => {
        console.log(index);
        dotsContainer.querySelectorAll(".dot").forEach((dot, i) => {
            dot.classList.toggle("dot-active", i === index);
        });
    };

    const scrollToImage = (index) => {
        const imageWidth = images[0].offsetWidth;

        carousel.scrollTo({
            left: imageWidth * index,
            behavior: "smooth",
        });
        updateActiveDot(index);
    };
    let isScrolling = false;
    let scrollAmount = 0;

    carousel.addEventListener("wheel", (event) => {
        event.preventDefault();
        carousel.scrollLeft += event.deltaY * 1.5;
    });

    window.addEventListener("DOMContentLoaded", (event) => {
        images.forEach((_, index) => {
            const dot = document.createElement("button");
            dot.className = "dot" + (index === 0 ? " dot-active" : "");
            dot.dataset.index = index;
            dotsContainer.appendChild(dot);
        });
    });

    let currentIndex = 0;
    dotsContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("dot")) {
            const index = parseInt(event.target.dataset.index);
            currentIndex = index;
            scrollToImage(index);
        }
    });

    /* Autoscroll */
    function moveCarousel() {
        currentIndex = (currentIndex + 1) % images.length;
        scrollToImage(currentIndex);
        console.log("move", currentIndex);
    }

    let interval = setInterval(moveCarousel, 3000);

    carousel.addEventListener("mouseenter", () => {
        clearInterval(interval);
    });

    carousel.addEventListener("mouseleave", () => {
        interval = setInterval(moveCarousel, 3000);
    });

    carousel.addEventListener("touchstart", () => {
        clearInterval(interval);
    });

    carousel.addEventListener("touchend", () => {
        interval = setInterval(moveCarousel, 3000);
    });
}
