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
      lightBlueTr: "#dbf0ff",
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
            primary: {
              DEFAULT: "#0068b4",
              foreground: "#dbf0ff",
            },
            secondary: {
              DEFAULT: "#3aacff",
              foreground: "#dbf0ff",
            },
          },
        },
      },
    }),
  ],
};
