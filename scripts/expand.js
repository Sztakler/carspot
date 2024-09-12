export function initExpand() {
    const expandableContainers = document.querySelectorAll(
        '[data-container="expand"]',
    );

    expandableContainers.forEach((container, index) => {
        const button = container.querySelector("button");
        const text = container.querySelector("[data-text='expand']");
        const img = button.querySelector("img");
        let maxWidth = text.offsetWidth * 2;
        let originalText = truncateText(text, maxWidth);

        /* Truncate text initially */
        text.classList.toggle("expanded");
        let isTruncated = false;
        toggleText();

        button.addEventListener("click", (event) => {
            const buttonText = button.querySelector("p");
            const buttonIcon = button.querySelector("img");

            toggleText();

            buttonText.textContent = text.classList.contains("expanded")
                ? "Zwiń"
                : "Rozwiń";
            img.alt = text.classList.contains("expanded") ? "Zwiń" : "Rozwiń";
            buttonIcon.classList.toggle("rotate-180");
        });

        function toggleText() {
            console.log(isTruncated, text);
            const screenWidth =
                window.innerWidth || document.documentElement.clientWidth;
            if (isTruncated) {
                text.innerText = originalText;
            } else {
                setTimeout(() => {
                    truncateText(
                        text,
                        screenWidth < 1240 ? maxWidth / 2 : maxWidth,
                    );
                }, 500);
            }
            text.classList.toggle("expanded");
            isTruncated = !isTruncated;
        }
    });

    function truncateText(element, maxWidth) {
        const originalText = element.innerText;
        let truncatedText = originalText;

        const ellipsis = "[...]";

        const measureText = (text) => {
            const testElement = document.createElement("span");
            testElement.style.visibility = "hidden";
            testElement.style.position = "absolute";
            testElement.innerText = text;
            document.body.appendChild(testElement);
            const width = testElement.offsetWidth;
            document.body.removeChild(testElement);
            return width;
        };

        while (measureText(truncatedText + ellipsis) > maxWidth) {
            truncatedText = truncatedText.slice(0, -1);
        }

        element.innerText = truncatedText + ellipsis;

        return originalText;
    }
}
