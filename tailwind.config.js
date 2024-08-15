import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				accent: colors.cyan
			},
			gridTemplateRows: {
				'[auto,auto,1fr]': 'auto auto 1fr'
			}
		}
	},
	plugins: [require('@tailwindcss/aspect-ratio'), require('@tailwindcss/typography')],
	darkMode: 'class'
};
