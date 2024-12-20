/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
const flowbite = require("flowbite-react/tailwind");

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,jsx,ts,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        '[auto,auto,1fr]': 'auto auto 1fr',
      },
      keyframes: {
        'fade-in-down': {
          "from": {
            transform: "translateY(-0.75rem)",
            opacity: '0'
          },
          "to": {
            transform: "translateY(0rem)",
            opacity: '1'
          },
        },
      },
      animation: {
        'fade-in-down': "fade-in-down 0.2s ease-in-out both",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    flowbite.plugin(),
  ],
}

