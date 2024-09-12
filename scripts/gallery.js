export function initGallery() {
    /* Gallery menu buttons */
    let selectedButton = 0;
    const galleryButtons = document
        .getElementById("gallery-buttons")
        .querySelectorAll("button");

    function updateActiveButton(index) {
        galleryButtons.forEach((button, i) => {
            if (index === i) button.classList.add("button-active");
            else button.classList.remove("button-active");
        });
    }

    galleryButtons.forEach((button, index) => {
        button.addEventListener("click", (event) => {
            selectedButton = index;
            updateActiveButton(selectedButton);
        });
    });

    updateActiveButton(selectedButton); // Initial state

    /* Carousel */
    const track = document.getElementById("carousel");
    const items = track.querySelectorAll("img");
    const itemsCount = items.length;
    let currentIndex = 0;

    for (let i = 0; i < items.length; i++) {
        let firstClone = items[i].cloneNode(true);
        let lastClone = items[i].cloneNode(true);
        track.appendChild(firstClone);
        track.insertBefore(lastClone, items[0]);
    }

    let itemWidth = items[0].getBoundingClientRect().width;
    const gap = 64;
    const offset = items.length;
    let containerWidth = track.getBoundingClientRect().width;
    let currentScroll =
        offset * (itemWidth + gap) - (containerWidth - itemWidth) / 2;

    function updateCenterPosition() {
        itemWidth = items[0].getBoundingClientRect().width;
        containerWidth = track.getBoundingClientRect().width;
        resetCarousel(
            (offset + currentIndex) * (itemWidth + gap) -
                (containerWidth - itemWidth) / 2,
            currentIndex,
        );
    }

    window.addEventListener("resize", updateCenterPosition);

    track.scrollTo({
        left: currentScroll,
        behavior: "smooth",
    });

    function moveToSlide(index) {
        const diff = index - currentIndex;
        currentIndex = index;

        currentScroll += (itemWidth + gap) * diff;
        track.scrollTo({
            left: currentScroll,
            behavior: "smooth",
        });
        checkBounds();
        updateActiveDot(currentIndex);
    }

    function checkBounds() {
        if (currentIndex >= itemsCount) {
            resetCarousel(
                offset * (itemWidth + gap) - (containerWidth - itemWidth) / 2,
                0,
            );
        }

        if (currentIndex <= -1) {
            resetCarousel(
                (offset + itemsCount - 1) * (itemWidth + gap) -
                    (containerWidth - itemWidth) / 2,
                itemsCount - 1,
            );
        }
    }

    function resetCarousel(offset, newIndex) {
        currentScroll = offset;
        currentIndex = newIndex;
        setTimeout(() => {
            track.scrollTo({
                left: offset,
                behavior: "instant",
            });
        }, 500);
    }

    const dotsContainer = document.getElementById("dots-container");
    items.forEach((item, index) => {
        const dot = document.createElement("button");
        dot.classList.add("dot");
        dot.ariaLabel = `Przejdź do zdjęcia numer ${index + 1}`;
        dot.addEventListener("click", (event) => {
            moveToSlide(index);
            updateActiveDot(index);
            currentIndex = index;
        });
        dotsContainer.appendChild(dot);
    });

    function updateActiveDot(selectedIndex) {
        const dots = dotsContainer.querySelectorAll(".dot");
        dots.forEach((dot, i) => {
            if (i === selectedIndex) {
                dot.classList.add("dot-active");
            } else {
                dot.classList.remove("dot-active");
            }
        });
    }

    updateActiveDot(currentIndex);
    let intervalTime = 2000;
    let autoScrollInterval = setInterval(() => {
        moveToSlide(currentIndex + 1);
    }, intervalTime);

    const carousel = document.getElementById("carousel-container");
    carousel.addEventListener("mouseover", () => {
        clearInterval(autoScrollInterval);
    });
    carousel.addEventListener("mouseout", () => {
        autoScrollInterval = setInterval(() => {
            moveToSlide(currentIndex + 1);
        }, intervalTime);
    });

    track.addEventListener("touchstart", () => {
        clearInterval(autoScrollInterval);
    });
    track.addEventListener("touchend", () => {
        autoScrollInterval = setInterval(() => {
            moveToSlide(currentIndex + 1);
        }, intervalTime);
    });

    /* Overwrite default scroll and swipe */
    track.addEventListener("wheel", (event) => {
        event.preventDefault();
        if (event.deltaY < 0) moveToSlide(currentIndex - 1);
        else moveToSlide(currentIndex + 1);
    });

    let touchStartX = 0;
    let touchEndX = 0;
    track.addEventListener("touchstart", (event) => {
        touchStartX = event.touches[0].clientX;
    });
    track.addEventListener("touchmove", (event) => {
        event.preventDefault();
        touchEndX = event.touches[0].clientX;
    });
    track.addEventListener("touchend", (event) => {
        console.log(touchStartX, touchEndX);
        if (touchStartX - touchEndX > 50) moveToSlide(currentIndex + 1);
        else if (touchStartX - touchEndX < -50) moveToSlide(currentIndex - 1);
    });
}
