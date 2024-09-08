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

    const scrollToImage = (index) => {
        images[index].scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
        });
        updateActiveDot(index);
    };

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
        console.log("move", currentIndex);
    }

    const intervalTime = 1500;
    let interval = setInterval(moveCarousel, intervalTime);

    carouselContainer.addEventListener("mouseenter", () => {
        clearInterval(interval);
    });

    carouselContainer.addEventListener("mouseleave", () => {
        interval = setInterval(moveCarousel, intervalTime);
    });

    carouselContainer.addEventListener("touchstart", () => {
        clearInterval(interval);
    });

    carouselContainer.addEventListener("touchend", () => {
        interval = setInterval(moveCarousel, intervalTime);
    });
}
