/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F17F0C",
        secondary: "#FBD7B4",
        hash: "#FBD7B4",
        info: "#FBD7B4",
        button: "#F17F0C",
        playground: "#E8BD56",
        "light-gray": "#E7F8FF",
        "green-playground": "#00C38A",
      },
    },
  },
  plugins: [],
};
