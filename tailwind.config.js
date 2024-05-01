import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/svhighlight/**/*.svelte'],
	theme: {
		fontFamily: {
			sans: ['Poppins', ...defaultTheme.fontFamily.sans]
		},
		extend: {
			colors: {
				'apihero-100': '#596171',
				'apihero-200': '#D8DEE4', // 216, 222, 228
				'apihero-300': '#353A44',
				'stripe-400': '#F5F6F8',
				'stripe-500': '#EBEEF1',

				'accent-100': '#675DFF',
				'accent-200': '#5469D4',
				'accent-300': '#4E11E2'
			},
			animation: {
				fade: 'fadeIn .4s cubic-bezier(0.4, 0, 0.2, 1)'
			},

			keyframes: {
				fadeIn: {
					from: { opacity: 0 },
					to: { opacity: 1 }
				}
			}
		}
	},
	plugins: []
};
