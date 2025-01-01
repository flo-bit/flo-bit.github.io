/**
 * Returns a function that can be used to execute a child function every given number of seconds.
 * @param interval - The interval in seconds.
 * @param [randomMax]- The interval will be random, using this value as the upper bound and the interval param as the lower bound.
 * @example
 *
 * const everyFiveSeconds = interval(5)
 *
 * useTask((delta) => {
 *      everyFiveSeconds(delta, () => {
 *          // called every five seconds
 *      })
 * }
 */
export const interval = (interval: number, randomMax?: number) => {
	let clock = 0;
	let intervalCounter =
		randomMax && randomMax > interval
			? Math.random() * (randomMax - interval) + interval
			: interval;
	let seconds = 0;
	return function (delta: number, fn: () => void) {
		clock += delta;
		if (clock > intervalCounter) {
			seconds = 0;
			intervalCounter +=
				randomMax && randomMax > interval
					? Math.random() * (randomMax - interval) + interval
					: interval;
			fn();
		}
		seconds += delta;
		return seconds;
	};
};

/**
 * Similar behvour to Svelte's spring funtion but can be linked to Threlte's useTask.
 * An example of stiffness and damping values in action here: https://svelte.dev/examples/spring
 * @param [currentValue=0] - The starting value.
 * @param [stiffness=0.15] - Optional custom stiffness value
 * @param [damping=0.8] - Optional custom damping value
 * @param [damping=0.01] - Optional precision value value
 * @example
 *
 * // create spring
 * let sprungValue = 0
 * let newSpring = spring(sprungValue, 0.15, 0.8)
 *
 * // set new value to spring towards
 * newSpring.set(10)
 *
 * useTask((delta) => {
 * 	// update value every frame
 * 		sprungValue = newSpring.update(delta);
 * }
 */
export const spring = <T extends Record<string, number> | number>(
	currentValue: T,
	stiffness = 0.15,
	damping = 0.8,
	precision = 0.001
) => {
	let endValue = currentValue;
	let velocity = 0;
	let settled = false;
	const velocityArray: number[] = [];
	const settledArray: boolean[] = [];
	if (typeof currentValue === 'object' && currentValue) {
		Object.entries(currentValue).forEach(() => {
			velocityArray.push(0);
			settledArray.push(false);
		});
	}

	const set = (value: T) => {
		endValue = value;
		settled = false;
		settledArray.forEach(function (part, index, theArray) {
			theArray[index] = false;
		});
	};
	const update = (delta: number) => {
		if (typeof currentValue === 'number' && typeof endValue === 'number') {
			if (settled) return currentValue;
			const { cv, s, v } = springTick(
				stiffness,
				damping,
				currentValue,
				endValue,
				delta,
				velocity,
				precision
			);
			settled = s;
			velocity = v;
			currentValue = cv as T & number;
		} else if (typeof currentValue === 'object') {
			let s = true;
			settledArray.forEach((settled) => {
				if (!settled) s = false;
			});
			if (s) return currentValue;
			let i = 0;
			Object.entries(currentValue).forEach(([key, value]) => {
				if (typeof endValue === 'number' || typeof currentValue === 'number') return;
				const { cv, s, v } = springTick(
					stiffness,
					damping,
					value,
					endValue[key],
					delta,
					velocityArray[i],
					precision
				);
				settledArray[i] = s;
				velocityArray[i] = v;
				currentValue[key] = cv;
				i++;
			});
		}
		return currentValue;
	};
	return { set, update };
};

function springTick(
	stiffness: number,
	damping: number,
	currentValue: number,
	endValue: number,
	delta: number,
	velocity: number,
	precision: number
) {
	let settled = false;
	const tensionForce = -stiffness * (currentValue - endValue);
	const dampingForce = -damping * velocity;
	const acceleration = tensionForce + dampingForce;
	velocity = velocity + acceleration;
	currentValue += velocity * delta * 60;
	if (Math.abs(velocity) < precision && Math.abs(currentValue - endValue) < precision) {
		settled = true;
	}
	return { cv: currentValue, s: settled, v: velocity };
}

/**
 * Similar behvour to Svelte's tweened funtion but linked to Threlte's useTask.
 * An example of easing functions available here: https://svelte.dev/examples/spring
 * @param currentValue - The starting value
 * @param [duration] - The duration of the tween in seconds
 * @param [easing] - Easing function
 * @example
 *
 * import { cubicInOut } from 'svelte/easing';
 *
 * // create tween
 * let tweenedValue = 0
 * let newTween = spring(tweenedValue, 2, bounceOut)
 *
 * // set new value to move towards
 * newTween.set(10)
 *
 * useTask((delta) => {
 *		// update value every frame
 *		tweenedValue = newTween.update(delta);
 * }
 */
export const tween = <T extends Record<string, number> | number>(
	currentValue: T,
	duration = 1,
	easing = (t: number) => t
) => {
	let elapsed = 0;
	let startValue = currentValue;
	let endValue = currentValue;
	let inter = tweenInterpolator(startValue, endValue);
	const set = (value: T) => {
		elapsed = 0;
		startValue = currentValue;
		endValue = value;
		inter = tweenInterpolator(startValue, endValue);
	};
	const update = (delta: number) => {
		if (elapsed < duration) {
			elapsed += delta;
			currentValue = inter(easing(elapsed / duration)) as T & number;
		} else {
			startValue = currentValue;
		}
		return currentValue;
	};
	return { set, update };
};

function tweenInterpolator<T extends Record<string, number> | number>(a: T, b: T) {
	if (a === b || a !== a) return () => a;
	if (typeof b === 'object' && typeof a === 'object') {
		const keys = Object.keys(b);
		const interpolators: { [key: string]: (t: number) => number } = {};
		keys.forEach((key) => {
			interpolators[key] = tweenInterpolator(a[key], b[key]) as (t: number) => typeof t;
		});
		return (t: number) => {
			const result: { [key: string]: number } | number = {};
			keys.forEach((key) => {
				result[key] = interpolators[key](t);
			});
			return result;
		};
	} else if (typeof a === 'number' && typeof b === 'number') {
		const delta = b - a;
		return (t: number) => a + t * delta;
	} else {
		return (t: number) => t;
	}
}
