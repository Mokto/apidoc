import tailwindTheme from './tailwind-theme.json';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/svhighlight/**/*.svelte'],
	theme: tailwindTheme,
	plugins: []
};
