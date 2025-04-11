/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#363636",
        secondary: "#EBEBEB",
        hash: "#EBEBEB",
        info: "#363636",
        button: "#363636",
        playground: "#363636",
        "light-gray": "#E7F8FF",
        "green-playground": "#00C38A",
      },
    },
  },
  plugins: [],
};
