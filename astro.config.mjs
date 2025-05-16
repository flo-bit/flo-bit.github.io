// @ts-check
import { defineConfig } from 'astro/config';
import { resolve } from "path";

import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import svelte from '@astrojs/svelte';
import { BASE, SITE } from './src/config';

import customEmbeds from 'astro-custom-embeds';

import { transformerMetaHighlight, transformerNotationHighlight } from '@shikijs/transformers'

import LinkCardEmbed from './src/embeds/link-card/embed'
import YoutubeEmbed from './src/embeds/youtube/embed'


// https://astro.build/config
export default defineConfig({
  integrations: [customEmbeds({
    embeds: [
      YoutubeEmbed,
      LinkCardEmbed,
    ],
  }), tailwind(), mdx(), svelte()],
  vite: {
    resolve: {
      alias: {
        $components: resolve("./src/components"),
        $layouts: resolve("./src/layouts"),
        $pages: resolve("./src/pages"),
        $assets: resolve("./src/assets"),
        $content: resolve("./src/content"),
      },
    },
    ssr: {
      noExternal: ["gsap"],
    }
  },

  markdown: {
    shikiConfig: {
      // Choose from Shiki's built-in themes (or add your own)
      // https://shiki.style/themes
      // Alternatively, provide multiple themes
      // See note below for using dual light/dark themes
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
      defaultColor: false,
      transformers: [transformerMetaHighlight(), transformerNotationHighlight()],
      wrap: true
    },
  },

  site: SITE,
  base: BASE
});