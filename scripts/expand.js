export function initExpand() {
    const expandableContainers = document.querySelectorAll(
        '[data-container="expand"]',
    );

    expandableContainers.forEach((container, index) => {
        const button = container.querySelector("button");
        const text = container.querySelector("[data-text='expand']");
        let maxWidth = text.offsetWidth * 2;
        let originalText = truncateText(text, maxWidth);
        let isTruncated = true;

        button.addEventListener("click", (event) => {
            const buttonText = button.querySelector("p");
            const buttonIcon = button.querySelector("img");

            toggleText(isTruncated, text, originalText);

            buttonText.textContent = text.classList.contains("expanded")
                ? "Zwiń"
                : "Rozwiń";
            buttonIcon.classList.toggle("rotate-180");
        });

        function toggleText() {
            console.log(isTruncated, text);
            if (isTruncated) {
                text.innerText = originalText;
            } else {
                truncateText(text, maxWidth);
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
