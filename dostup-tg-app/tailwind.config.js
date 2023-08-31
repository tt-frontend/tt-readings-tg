/** @type {import('tailwindcss').Config} */

import { nextui } from "@nextui-org/react";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      darkBlue: "#0E4369",
      lightBlue: "#3aacff",
      lightBlueTr: "#CBE9FF",
    },
    fontFamily: {
      sans: ["Montserrat", "sans-serif"],
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: "#0068b4",
          },
        },
        dark: {
          colors: {},
        },
      },
    }),
  ],
};
