import { data } from './data.json';

const githubGraphColors = ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'] as const;

// Define a type based on the color values
export type GithubGraphColor = (typeof githubGraphColors)[number];

export type GitHubResponse = {
	login: string;
	contributionsCollection: {
		totalCommitContributions: number;
		totalIssueContributions: number;
		totalPullRequestContributions: number;
		totalPullRequestReviewContributions: number;
		contributionCalendar: {
			totalContributions: number;
			weeks: {
				contributionDays: {
					date: string;
					contributionCount: number;
					color: GithubGraphColor;
				}[];
			}[];
		};
	};
	repositories: {
		totalCount: number;
		nodes: {
			name: string;
			stargazerCount: number;
			forkCount: number;
			watchers: {
				totalCount: number;
			};
			languages: {
				totalSize: number;
				edges: {
					node: {
						name: string;
					};
					size: number;
				}[];
			};
		}[];
	};
	starredRepositories: {
		totalCount: number;
	};
	followers: {
		totalCount: number;
	};
	following: {
		totalCount: number;
	};
	issues_sum: {
		totalCount: number;
	};
	issues_open: {
		totalCount: number;
	};
	issues_closed: {
		totalCount: number;
	};
	pr_sum: {
		totalCount: number;
	};
	pr_open: {
		totalCount: number;
	};
	pr_closed: {
		totalCount: number;
	};
	pr_merged: {
		totalCount: number;
	};
	status: {
		emoji?: string;
		message?: string;
		expiresAt?: string;
		updatedAt?: string;
	} | null;

	totalStars: number;
	totalSize: number;
	totalForks: number;
	totalWatchers: number;
	languages: {
		name: string;
		size: number;
	}[];
};

export function getFallbackGithubData(): GitHubResponse {
	return data as GitHubResponse;
}

export function getCachedGithubData(): GitHubResponse | null {
	// get date of github data
	const date = localStorage.getItem('githubDataDate');
	// if data is older than 1 hour, return null
	if (date && Date.now() - new Date(date).getTime() > 1000 * 60 * 60) {
		return null;
	}

	const data = localStorage.getItem('githubData');
	return data ? JSON.parse(data) : null;
}

export async function getGithubData(): Promise<GitHubResponse | null> {
	// get cached data
	const cachedData = getCachedGithubData();
	if (cachedData) {
		console.log('using cached github data');
		return cachedData;
	}

	try {
		console.log('fetching github data');
		const res = await fetch('https://edge-function-github-contribution.vercel.app/api/github-data');
		const json = await res.json();

		let totalStars = 0;
		let totalSize = 0;
		let totalForks = 0;
		let totalWatchers = 0;

		const languages = new Map<string, number>();

		for (const repo of json.data.viewer.repositories.nodes) {
			totalStars += repo.stargazerCount;
			totalSize += repo.languages.totalSize;
			totalForks += repo.forkCount;
			totalWatchers += repo.watchers.totalCount;

			for (const edge of repo.languages.edges) {
				const language = edge.node.name;
				const size = edge.size;
				languages.set(language, (languages.get(language) ?? 0) + size);
			}
		}

		json.data.viewer.totalStars = totalStars;
		json.data.viewer.totalSize = totalSize;
		json.data.viewer.totalForks = totalForks;
		json.data.viewer.totalWatchers = totalWatchers;
		json.data.viewer.languages = Array.from(languages, ([name, size]) => ({ name, size })).sort(
			(a, b) => b.size - a.size
		);

		// cache data
		localStorage.setItem('githubData', JSON.stringify(json.data.viewer));
		localStorage.setItem('githubDataDate', new Date().toISOString());

		return json.data.viewer as GitHubResponse;
	} catch (error) {
		console.error(error);
		return null;
	}
}
