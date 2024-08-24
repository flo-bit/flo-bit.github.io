import { tv, type VariantProps } from 'tailwind-variants';
export { default as Badge } from './badge.svelte';

export const badgeVariants = tv({
	base: 'inline-flex items-center gap-x-1.5 px-2 py-1 text-xs font-medium transition-colors select-none ring-inset ring-accent-600/20 dark:ring-accent-500/20',
	variants: {
		variant: {
			default:
				'rounded-xl bg-accent-50 dark:bg-accent-500/10 text-accent-700 dark:text-accent-400 ring-1 fill-accent-500 dark:fill-accent-400',
			pill: 'bg-accent-50 dark:bg-accent-500/10 text-accent-700 dark:text-accent-400 ring-1 fill-accent-500 dark:fill-accent-400 rounded-full',
			dot: 'rounded-md bg-accent-50 dark:bg-accent-500/10 text-accent-700 dark:text-accent-400 ring-1 fill-accent-500 dark:fill-accent-400',
			pill_dot:
				'bg-accent-50 dark:bg-accent-500/10 text-accent-700 dark:text-accent-400 ring-1 fill-accent-500 dark:fill-accent-400 rounded-full',

			flat: 'rounded-md bg-accent-100 dark:bg-accent-500/20 text-accent-700 dark:text-accent-400 ring-0 fill-accent-500 dark:fill-accent-400',
			flat_dot:
				'rounded-md bg-accent-100 dark:bg-accent-500/20 text-accent-700 dark:text-accent-400 ring-0 fill-accent-500 dark:fill-accent-400',
			flat_pill:
				'rounded-full bg-accent-100 dark:bg-accent-500/20 text-accent-700 dark:text-accent-400 ring-0 fill-accent-500 dark:fill-accent-400',
			flat_pill_dot:
				'rounded-full bg-accent-100 dark:bg-accent-500/20 text-accent-700 dark:text-accent-400 ring-0 fill-accent-500 dark:fill-accent-400',

			green:
				'rounded-md bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 ring-1 ring-green-600/20 dark:ring-green-500/20',
			red: 'rounded-md bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400 ring-1 ring-red-600/20 dark:ring-red-500/20',
			blue: 'rounded-md bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 ring-1 ring-blue-600/20 dark:ring-blue-500/20',
			yellow:
				'rounded-md bg-yellow-50 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 ring-1 ring-yellow-600/20 dark:ring-yellow-500/20',
			orange:
				'rounded-md bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400 ring-1 ring-orange-600/20 dark:ring-orange-500/20',
			purple:
				'rounded-md bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400 ring-1 ring-purple-600/20 dark:ring-purple-500/20',
			pink: 'rounded-md bg-pink-50 dark:bg-pink-500/10 text-pink-700 dark:text-pink-400 ring-1 ring-pink-600/20 dark:ring-pink-500/20',
			neutral:
				'rounded-md bg-neutral-50 dark:bg-neutral-500/10 text-neutral-700 dark:text-neutral-400 ring-1 ring-neutral-600/20 dark:ring-neutral-500/20',

			green_pill:
				'rounded-full bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 ring-1 ring-green-600/20 dark:ring-green-500/20',
			red_pill:
				'rounded-full bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400 ring-1 ring-red-600/20 dark:ring-red-500/20',
			blue_pill:
				'rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 ring-1 ring-blue-600/20 dark:ring-blue-500/20',
			yellow_pill:
				'rounded-full bg-yellow-50 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 ring-1 ring-yellow-600/20 dark:ring-yellow-500/20',
			orange_pill:
				'rounded-full bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400 ring-1 ring-orange-600/20 dark:ring-orange-500/20',
			purple_pill:
				'rounded-full bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400 ring-1 ring-purple-600/20 dark:ring-purple-500/20',
			pink_pill:
				'rounded-full bg-pink-50 dark:bg-pink-500/10 text-pink-700 dark:text-pink-400 ring-1 ring-pink-600/20 dark:ring-pink-500/20',
			neutral_pill:
				'rounded-full bg-neutral-50 dark:bg-neutral-500/10 text-neutral-700 dark:text-neutral-400 ring-1 ring-neutral-600/20 dark:ring-neutral-500/20',

			green_pill_dot:
				'rounded-full bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 ring-1 ring-green-600/20 dark:ring-green-500/20 fill-green-500 dark:fill-green-400',
			red_pill_dot:
				'rounded-full bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400 ring-1 ring-red-600/20 dark:ring-red-500/20 fill-red-500 dark:fill-red-400',
			blue_pill_dot:
				'rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 ring-1 ring-blue-600/20 dark:ring-blue-500/20 fill-blue-500 dark:fill-blue-400',
			yellow_pill_dot:
				'rounded-full bg-yellow-50 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 ring-1 ring-yellow-600/20 dark:ring-yellow-500/20 fill-yellow-500 dark:fill-yellow-400',
			orange_pill_dot:
				'rounded-full bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400 ring-1 ring-orange-600/20 dark:ring-orange-500/20 fill-orange-500 dark:fill-orange-400',
			purple_pill_dot:
				'rounded-full bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400 ring-1 ring-purple-600/20 dark:ring-purple-500/20 fill-purple-500 dark:fill-purple-400',
			pink_pill_dot:
				'rounded-full bg-pink-50 dark:bg-pink-500/10 text-pink-700 dark:text-pink-400 ring-1 ring-pink-600/20 dark:ring-pink-500/20 fill-pink-500 dark:fill-pink-400',
			neutral_pill_dot:
				'rounded-full bg-neutral-50 dark:bg-neutral-500/10 text-neutral-700 dark:text-neutral-400 ring-1 ring-neutral-600/20 dark:ring-neutral-500/20 fill-neutral-500 dark:fill-neutral-400',

			green_dot:
				'rounded-md bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 ring-1 ring-green-600/20 dark:ring-green-500/20 fill-green-500 dark:fill-green-400',
			red_dot:
				'rounded-md bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400 ring-1 ring-red-600/20 dark:ring-red-500/20 fill-red-500 dark:fill-red-400',
			blue_dot:
				'rounded-md bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 ring-1 ring-blue-600/20 dark:ring-blue-500/20 fill-blue-500 dark:fill-blue-400',
			yellow_dot:
				'rounded-md bg-yellow-50 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 ring-1 ring-yellow-600/20 dark:ring-yellow-500/20 fill-yellow-500 dark:fill-yellow-400',
			orange_dot:
				'rounded-md bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400 ring-1 ring-orange-600/20 dark:ring-orange-500/20 fill-orange-500 dark:fill-orange-400',
			purple_dot:
				'rounded-md bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400 ring-1 ring-purple-600/20 dark:ring-purple-500/20 fill-purple-500 dark:fill-purple-400',
			pink_dot:
				'rounded-md bg-pink-50 dark:bg-pink-500/10 text-pink-700 dark:text-pink-400 ring-1 ring-pink-600/20 dark:ring-pink-500/20 fill-pink-500 dark:fill-pink-400',
			neutral_dot:
				'rounded-md bg-neutral-50 dark:bg-neutral-500/10 text-neutral-700 dark:text-neutral-400 ring-1 ring-neutral-600/20 dark:ring-neutral-500/20 fill-neutral-500 dark:fill-neutral-400',

			green_flat:
				'rounded-md bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 ring-0 ring-green-600/20 dark:ring-green-500/20',
			red_flat:
				'rounded-md bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400 ring-0 ring-red-600/20 dark:ring-red-500/20',
			blue_flat:
				'rounded-md bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 ring-0 ring-blue-600/20 dark:ring-blue-500/20',
			yellow_flat:
				'rounded-md bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 ring-0 ring-yellow-600/20 dark:ring-yellow-500/20',
			orange_flat:
				'rounded-md bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-400 ring-0 ring-orange-600/20 dark:ring-orange-500/20',
			purple_flat:
				'rounded-md bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-400 ring-0 ring-purple-600/20 dark:ring-purple-500/20',
			pink_flat:
				'rounded-md bg-pink-100 dark:bg-pink-500/20 text-pink-700 dark:text-pink-400 ring-0 ring-pink-600/20 dark:ring-pink-500/20',
			neutral_flat:
				'rounded-md bg-neutral-100 dark:bg-neutral-500/20 text-neutral-700 dark:text-neutral-400 ring-0 ring-neutral-600/20 dark:ring-neutral-500/20',

			green_flat_pill:
				'rounded-full bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 ring-0 ring-green-600/20 dark:ring-green-500/20',
			red_flat_pill:
				'rounded-full bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400 ring-0 ring-red-600/20 dark:ring-red-500/20',
			blue_flat_pill:
				'rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 ring-0 ring-blue-600/20 dark:ring-blue-500/20',
			yellow_flat_pill:
				'rounded-full bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 ring-0 ring-yellow-600/20 dark:ring-yellow-500/20',
			orange_flat_pill:
				'rounded-full bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-400 ring-0 ring-orange-600/20 dark:ring-orange-500/20',
			purple_flat_pill:
				'rounded-full bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-400 ring-0 ring-purple-600/20 dark:ring-purple-500/20',
			pink_flat_pill:
				'rounded-full bg-pink-100 dark:bg-pink-500/20 text-pink-700 dark:text-pink-400 ring-0 ring-pink-600/20 dark:ring-pink-500/20',
			neutral_flat_pill:
				'rounded-full bg-neutral-100 dark:bg-neutral-500/20 text-neutral-700 dark:text-neutral-400 ring-0 ring-neutral-600/20 dark:ring-neutral-500/20',

			green_flat_dot:
				'rounded-md bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 ring-0 ring-green-600/20 dark:ring-green-500/20 fill-green-500 dark:fill-green-400',
			red_flat_dot:
				'rounded-md bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400 ring-0 ring-red-600/20 dark:ring-red-500/20 fill-red-500 dark:fill-red-400',
			blue_flat_dot:
				'rounded-md bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 ring-0 ring-blue-600/20 dark:ring-blue-500/20 fill-blue-500 dark:fill-blue-400',
			yellow_flat_dot:
				'rounded-md bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 ring-0 ring-yellow-600/20 dark:ring-yellow-500/20 fill-yellow-500 dark:fill-yellow-400',
			orange_flat_dot:
				'rounded-md bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-400 ring-0 ring-orange-600/20 dark:ring-orange-500/20 fill-orange-500 dark:fill-orange-400',
			purple_flat_dot:
				'rounded-md bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-400 ring-0 ring-purple-600/20 dark:ring-purple-500/20 fill-purple-500 dark:fill-purple-400',
			pink_flat_dot:
				'rounded-md bg-pink-100 dark:bg-pink-500/20 text-pink-700 dark:text-pink-400 ring-0 ring-pink-600/20 dark:ring-pink-500/20 fill-pink-500 dark:fill-pink-400',
			neutral_flat_dot:
				'rounded-md bg-neutral-100 dark:bg-neutral-500/20 text-neutral-700 dark:text-neutral-400 ring-0 ring-neutral-600/20 dark:ring-neutral-500/20 fill-neutral-500 dark:fill-neutral-400',

			green_flat_pill_dot:
				'rounded-full bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 ring-0 ring-green-600/20 dark:ring-green-500/20 fill-green-500 dark:fill-green-400',
			red_flat_pill_dot:
				'rounded-full bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400 ring-0 ring-red-600/20 dark:ring-red-500/20 fill-red-500 dark:fill-red-400',
			blue_flat_pill_dot:
				'rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 ring-0 ring-blue-600/20 dark:ring-blue-500/20 fill-blue-500 dark:fill-blue-400',
			yellow_flat_pill_dot:
				'rounded-full bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 ring-0 ring-yellow-600/20 dark:ring-yellow-500/20 fill-yellow-500 dark:fill-yellow-400',
			orange_flat_pill_dot:
				'rounded-full bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-400 ring-0 ring-orange-600/20 dark:ring-orange-500/20 fill-orange-500 dark:fill-orange-400',
			purple_flat_pill_dot:
				'rounded-full bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-400 ring-0 ring-purple-600/20 dark:ring-purple-500/20 fill-purple-500 dark:fill-purple-400',
			pink_flat_pill_dot:
				'rounded-full bg-pink-100 dark:bg-pink-500/20 text-pink-700 dark:text-pink-400 ring-0 ring-pink-600/20 dark:ring-pink-500/20 fill-pink-500 dark:fill-pink-400',
			neutral_flat_pill_dot:
				'rounded-full bg-neutral-100 dark:bg-neutral-500/20 text-neutral-700 dark:text-neutral-400 ring-0 ring-neutral-600/20 dark:ring-neutral-500/20 fill-neutral-500 dark:fill-neutral-400'
		},
		size: {
			default: 'text-xs px-2 py-1 font-medium',
			lg: 'text-base px-4 py-1.5'
		}
	},
	defaultVariants: {
		variant: 'default',
		size: 'default'
	}
});

export type Variant = VariantProps<typeof badgeVariants>['variant'];
export type Size = VariantProps<typeof badgeVariants>['size'];
