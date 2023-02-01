/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#111d29",
                golemblue: "#181ea9",
                input: "#19242f",
                checked: "#5cf0c3",
                button: "#004a66",
            },
        },
    },
    plugins: [],
}
