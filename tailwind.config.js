/** @type {import('tailwindcss').Config} */
export default {
    content: ["./*.{html,js}"],
    theme: {
        fontFamily: {
            robotoCondensed: ["Roboto Condensed", "sans-serif"],
            robotoFlex: ["Roboto Flex", "sans-serif"],
            bebasNeue: ["Bebas Neue", "sans-serif"],
        },
        extend: {
            backgroundImage: {
                hero: "url('/assets/images/hero_background.png')",
            },
        },
    },
    plugins: [],
};
