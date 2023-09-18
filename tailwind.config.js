/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");

export default {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.{js,jsx,ts,tsx}",
        "./resources/**/*.vue",
    ],
    theme: {
        fontFamily: {
            display: ["Poppins", ...fontFamily.sans],
            body: ["Montserrat", ...fontFamily.sans],
        },
        extend: {},
    },
    plugins: [],
};
