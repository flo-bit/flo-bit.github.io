import { OGImageRoute } from "astro-og-canvas";
import { DESCRIPTION, TITLE } from "../../config.ts";
import { getBlogPosts } from "src/utils";

const posts = await getBlogPosts();

// turn posts into an object with slugs as keys, and title and description as values
// { slug: { title, description } }

const pages = posts.reduce(
  (acc, post) => {
    acc[post.slug] = {
      title: post.data.noTextInOGImage ? "" : post.data.title,
      description: post.data.noTextInOGImage
        ? ""
        : (post.data.shortDescription ?? post.data.description ?? ""),
      useHero: post.data.useHeroAsOGImage ?? false,
      heroImage: post.data.heroImage?.replace("$assets", "/src/assets"),
    };
    return acc;
  },
  {} as Record<
    string,
    { title: string; description: string; useHero: boolean; heroImage?: string }
  >,
);

export const { getStaticPaths, GET } = OGImageRoute({
  // Tell us the name of your dynamic route segment.
  // In this case it’s `route`, because the file is named `[...route].ts`.
  param: "route",

  // A collection of pages to generate images for.
  // The keys of this object are used to generate the path for that image.
  // In this example, we generate one image at `/open-graph/example.png`.
  pages: {
    main: {
      title: TITLE,
      description: DESCRIPTION,
      useHero: false,
    },
    ...pages,
  },

  // For each page, this callback will be used to customize the OpenGraph image.
  getImageOptions: (_, page) => ({
    title: page.title,
    description: page.description,
    bgImage: {
      path: page.useHero ? "." + page.heroImage : "./src/assets/background.png",
      fit: "cover",
    },
    font: {
      /** Font style for the page title. */
      title: {
        families: ["Inter"],
        color: [255, 255, 255],
        size: 80,
        weight: "SemiBold",
      },
      description: {
        families: ["Inter"],
        color: [255, 255, 255],
      },
    },
    padding: 80,
    fonts: ["./src/assets/InterVariable.ttf"],
  }),
});
