import { defineCollection, z } from "astro:content";
import { authorFeedLoader } from "@ascorbic/bluesky-loader";

const blog = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: z.object({
    // title of the blog post, don't repeat this in the markdown part
    title: z.string(),

    // will be shown in the blog post list
    description: z.string(),

    // date published
    pubDate: z.coerce.date(),

    published: z.boolean(),

    // short description will be used for og image (fallback to description)
    shortDescription: z.string().optional(),

    // date updated
    updatedDate: z.coerce.date().optional(),

    // path to the hero image, HAS TO BE IN /src/assets folder
    // and HAS TO START with `/src/assets/`
    heroImage: z.string().optional(),

    // array of tags
    tags: z.array(z.string()).optional(),

    // whether to hide the hero image in the blog post
    hideHero: z.boolean().optional(),

    // whether to use the hero image as the og image (instead of the default `/src/assets/background.png`)
    useHeroAsOGImage: z.boolean().optional(),
    // wether to show title and short description in the og image
    noTextInOGImage: z.boolean().optional(),
  }),
});

const projects = defineCollection({
  type: "content",
  schema: ({ image }) => z.object({
    name: z.string(),
    thumbnail: image(),
    date: z.coerce.date(),
    featured: z.boolean().optional(),

    video: z.string().optional(),

    mainTags: z.array(z.string()).optional(),

    aspect: z.string().optional(),

    shortDescription: z.string().optional(),

    images: z.array(image()).optional(),
    tags: z.array(z.string()).optional(),

    projectUrl: z.string().optional(),
    codeUrl: z.string().optional(),

    demo: z.string().optional(),
    iframe: z.string().optional(),

    projectLayout: z.enum(['grid', 'full', 'carousel', 'tiered']).optional(),
  }),
});

const posts = defineCollection({
  loader: authorFeedLoader({
    identifier: "flo-bit.dev",
  }),
});

export const collections = { blog, projects, posts };
