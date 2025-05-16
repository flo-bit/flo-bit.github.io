import type { EmbedsOption } from "astro-custom-embeds";
import YoutubeMatcher from "./matcher";

const YoutubeEmbed: EmbedsOption = {
    componentName: 'YouTube',
    urlArgument: 'id',
    urlMatcher: YoutubeMatcher,
    directiveName: 'youtube',
    importPath: 'src/embeds',
}

export default YoutubeEmbed;