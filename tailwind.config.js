const tailwind = require("tailwindcss/colors");
/** @type {import('tailwindcss').Config} */
export default {
    content: ["./resources/views/**/*.ejs", "./resources/ts/**/*.vue"],
    theme: {
        extend: {
            colors: {
                primary: "var(--primary)",
                background: {
                    dark: "#0F0F0F",
                    light: "#fff",
                },
                paper: {
                    dark: "#272727",
                    light: "#F2F2F2",
                },
                terciary: tailwind.gray["400"],
                success: tailwind.green["600"],
                danger: tailwind.red["600"],
            },
            textColor: {
                primary: "var(--primary)",
                secondary: {
                    light: "#fff",
                    dark: "#000",
                },
                terciary: tailwind.gray["400"],
            },
        },
        fontFamily: {
            thin: ["Exo-Thin", "sans"],
            light: ["Exo-Light", "sans"],
            normal: ["Exo-Regular", "sans"],
            bold: ["Exo-Bold", "sans"],
            black: ["Exo-Black", "sans"],
        },
    },
    plugins: [],
    darkMode: ["class"],
};
