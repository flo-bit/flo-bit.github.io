import { projects } from '$lib/projects.js';

export const load = ({ params }) => {
	const project = projects.find((project) => project.key === params.key);

	return {
		project
	};
};
