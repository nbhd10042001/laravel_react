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
  	colors: {
  		'dark-custom': '#27272a'
  	},
  	extend: {
  		keyframes: {
  			'fade-in-down': {
  				'from': {
  					transform: 'translateY(-0.75rem)',
  					opacity: '0'
  				},
  				'to': {
  					transform: 'translateY(0rem)',
  					opacity: '1'
  				}
  			}
  		},
  		animation: {
  			'fade-in-down': 'fade-in-down 0.2s ease-in-out both'
  		},
  	}
  },
  plugins: [
    require('@tailwindcss/forms'),
    flowbite.plugin(),
	function ({ addUtilities}){
		const newUtilities = {
			'.no-scrollbar::-webkit-scrollbar': {
				display: "none",
			},
			'.no-scrollbar': {
				'-ms-overflow-style': 'none',  /* IE and Edge */
				'scrollbar-width': 'none',  /* Firefox */
			},
		};
		addUtilities(newUtilities);
	}
],
}

