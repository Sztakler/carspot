/** @type {import('tailwindcss').Config} */

require("dotenv").config();

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
                hero: `url('${
                    process.env.NODE_ENV === "production"
                        ? "/carspot/assets/images/hero_background.png"
                        : "/assets/images/hero_background.png"
                }')`,
            },
        },
    },
    plugins: [],
};
