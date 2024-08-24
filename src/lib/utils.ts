/**
 * 
 * Add this to tailwind.config.js
 * 
import colors from 'tailwindcss/colors';

theme: {
	extend: {
		colors: {
			accent: colors.sky
		}
	}
},
darkMode: 'class',
plugins: [
	require('@tailwindcss/forms'),
	require('@tailwindcss/aspect-ratio'),
	require('@tailwindcss/typography')
]

*
* install npm packages
*
npm i clsx bits-ui tailwind-variants tailwind-merge @tailwindcss/forms @tailwindcss/aspect-ratio @tailwindcss/typography
*/

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
