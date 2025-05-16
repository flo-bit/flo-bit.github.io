import type { EmbedsOption } from "astro-custom-embeds";
import LinkMatcher from "./matcher";

const LinkCardEmbed: EmbedsOption = {
    componentName: 'LinkCard',
    urlMatcher: LinkMatcher,
    directiveName: 'link',
    importPath: 'src/embeds',
}

export default LinkCardEmbed;