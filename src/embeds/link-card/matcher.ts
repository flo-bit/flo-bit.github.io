// Matches any HTTPS URL
const urlPattern = /(https:\/\/[^\s\\]+)/;

// Function to return only the URL part
export default function urlMatcher(url: string): string | undefined {
	const match = url.match(urlPattern);
	return match?.[0];
}