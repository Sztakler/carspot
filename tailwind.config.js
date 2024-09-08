/** @type {import('tailwindcss').Config} */
export default {
    content: ["./*.{html,js}", "./scripts/**/*.{js,ts}"],
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
            colors: {
                black: "#282828",
                "blue-600": "#0147FF",
                "blue-800": "#003ddd",
            },
        },
    },
    plugins: [],
};
