<script lang="ts">
	import { onMount } from 'svelte';
	import { CardSwiper } from './CardSwiper';

	//@ts-expect-error - not found
	import person1 from './CardSwiper/images/1.jpg?format=webp&w=512';
	//@ts-expect-error - not found
	import person2 from './CardSwiper/images/2.jpg?format=webp&w=512';
	//@ts-expect-error - not found
	import person3 from './CardSwiper/images/3.jpg?format=webp&w=512';
	//@ts-expect-error - not found
	import person4 from './CardSwiper/images/4.jpg?format=webp&w=512';
	//@ts-expect-error - not found
	import person5 from './CardSwiper/images/5.jpg?format=webp&w=512';
	//@ts-expect-error - not found
	import person6 from './CardSwiper/images/6.jpg?format=webp&w=512';
	//@ts-expect-error - not found
	import person7 from './CardSwiper/images/7.jpg?format=webp&w=512';
	//@ts-expect-error - not found
	import person8 from './CardSwiper/images/8.jpg?format=webp&w=512';
	//@ts-expect-error - not found
	import person9 from './CardSwiper/images/9.jpg?format=webp&w=512';

	let people = [person1, person2, person3, person4, person5, person6, person7, person8, person9];

	function getRandomPerson(): { firstName: string; lastName: string; age: number } {
		const firstNames = ['John', 'Jane', 'Alice', 'Bob', 'Mary', 'Tom'];
		const lastNames = ['Smith', 'Doe', 'Johnson', 'White', 'Brown', 'Davis'];

		const firstNameIndex = Math.floor(Math.random() * firstNames.length);
		const lastNameIndex = Math.floor(Math.random() * lastNames.length);

		const age = Math.floor(Math.random() * (60 - 18 + 1)) + 18;

		return {
			firstName: firstNames[firstNameIndex],
			lastName: lastNames[lastNameIndex],
			age: age
		};
	}

	let data = (index: number) => {
		let person = getRandomPerson();
		return {
			title: `${person.firstName} ${person.lastName}, ${person.age}`,
			description: 'swipe left or right',
			image: people[index % people.length]
		};
	};

	onMount(() => {
		// preload images
		people.forEach((person) => {
			new Image().src = person;
		});
	});
</script>

<div class="mx-auto h-[712px] w-[350px] max-w-full rounded-[60px] bg-cyan-500 relative">
	<div class="absolute top-20 h-8 w-3 bg-cyan-500 -left-0.5 rounded-sm"></div>
	<div class="absolute top-[140px] h-14 w-3 bg-cyan-500 -left-[3px] rounded-sm"></div>
	<div class="absolute top-[210px] h-14 w-3 bg-cyan-500 -left-[3px] rounded-sm"></div>
	<div class="absolute top-[180px] h-20 w-3 bg-cyan-500 -right-[3px] rounded-sm"></div>

	<div class="absolute top-[18px] z-10 flex justify-center w-full">
		<div class="h-7 w-24 bg-black rounded-full"></div>
	</div>

	<div class="absolute top-[180px] h-20 w-3 bg-cyan-500 -right-[3px] rounded-sm"></div>

	<div class="absolute inset-0 w-full h-full p-3">
		<div class="bg-cyan-200 w-full h-full rounded-[50px] overflow-hidden relative">
			<CardSwiper cardData={data} />
		</div>
	</div>
</div>
