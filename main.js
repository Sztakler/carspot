let lastScrollTop = 0;
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", (event) => {
    let currentScroll = document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop)
        navbar.classList.add("-translate-y-full");
    else navbar.classList.remove("-translate-y-full");

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // mobile or negative scrolling
});

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
        scrollToImage(index);
    }
});

/* Change active dot on user scroll  */
// TODO
// carousel.addEventListener("scroll", (event) => {
//     const containerCenter = carousel.offsetWidth / 2;
//     const images = carousel.querySelectorAll("img");

//     images.forEach((image, index) => {
//         const imageRect = image.getBoundingClientRect();
//         const imageCenter = imageRect.left + imageRect.width / 2;

//         console.log(
//             index,
//             imageCenter,
//             containerCenter,
//             imageCenter - containerCenter,
//             imageRect.width / 2,
//         );
//         if (Math.abs(imageCenter - containerCenter) < imageRect.width / 2) {
//             updateActiveDot(index);
//         }
//     });
// });
