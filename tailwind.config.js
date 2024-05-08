import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/svhighlight/**/*.svelte'],
	theme: {
		fontFamily: {
			sans: ['"Rethink Sans Variable"', ...defaultTheme.fontFamily.sans],
			mono: ['"Source Code Pro Variable"', ...defaultTheme.fontFamily.mono]
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
				'accent-300': '#4E11E2',

				primary: {
					50: '#f9fcff',
					100: '#e7f0fe',
					200: '#d0dffb',
					300: '#a1bcf7',
					400: '#7196f4',
					500: '#5177e6',
					600: '#3d60e1',
					700: '#2a48ac',
					800: '#1c337d',
					900: '#1f2f61',
					950: '#000f3d'
				},
				'blue-grey': {
					50: '#f6f8fe',
					100: '#edf2fd',
					200: '#dae3f8',
					300: '#becbe9',
					400: '#8a9bc2',
					500: '#68779c',
					600: '#3e4a65',
					700: '#2d374d',
					800: '#1d253a',
					900: '#0c1831',
					950: '#00081a'
				},
				'tinted-grey': {
					50: '#fafbfe',
					100: '#f1f4fb',
					200: '#e3e7f3',
					300: '#c5cad9',
					400: '#a4abc2',
					500: '#8a91a8',
					600: '#6f768b',
					700: '#575c6a',
					800: '#434856',
					900: '#2c2f3a',
					950: '#15171e'
				}
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
