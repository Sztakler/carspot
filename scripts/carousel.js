export function initCarousel() {
    const carousel = document.getElementById("carousel");
    const carouselContainer = document.getElementById("carousel-container");
    const images = carousel.querySelectorAll("img");
    const dotsContainer = document.getElementById("dots-container");
    let currentIndex = 0;

    const updateActiveDot = (index) => {
        dotsContainer.querySelectorAll(".dot").forEach((dot, i) => {
            dot.classList.toggle("dot-active", i === index);
        });
    };

    function scrollIntoViewHorizontally(container, child) {
        const itemRect = child.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const scrollLeft =
            itemRect.left -
            containerRect.left +
            container.scrollLeft -
            (containerRect.width - itemRect.width) / 2;

        container.scrollTo({
            left: scrollLeft,
            behavior: "smooth",
        });
    }

    function scrollToImage(index) {
        scrollIntoViewHorizontally(carousel, images[index]);
        updateActiveDot(index);
    }

    carousel.addEventListener("wheel", (event) => {
        event.preventDefault();
        carousel.scrollLeft += event.deltaY * 5;
    });

    window.addEventListener("DOMContentLoaded", (event) => {
        images.forEach((_, index) => {
            const dot = document.createElement("button");
            dot.className = "dot" + (index === 0 ? " dot-active" : "");
            dot.dataset.index = index;
            dotsContainer.appendChild(dot);
        });
    });

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
    }

    const intervalTime = 3000;
    let interval = setInterval(moveCarousel, intervalTime);

    carousel.addEventListener("mouseenter", () => {
        clearInterval(interval);
    });

    carousel.addEventListener("mouseleave", () => {
        interval = setInterval(moveCarousel, intervalTime);
    });

    carousel.addEventListener("touchstart", () => {
        clearInterval(interval);
    });

    carousel.addEventListener("touchend", () => {
        interval = setInterval(moveCarousel, intervalTime);
    });
}
