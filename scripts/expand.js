export function initExpand() {
    const expandableContainers = document.querySelectorAll(
        '[data-container="expand"]',
    );

    expandableContainers.forEach((container) => {
        const button = container.querySelector("button");
        const text = container.querySelector("p");
        button.addEventListener("click", (event) => {
            const buttonText = button.querySelector("p");
            const buttonIcon = button.querySelector("img");

            text.classList.toggle("expanded");
            buttonText.textContent = text.classList.contains("expanded")
                ? "Zwiń"
                : "Rozwiń";
            buttonIcon.classList.toggle("rotate-180");
        });
    });
}
