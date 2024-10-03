# flo-bit portfolio

this is my portfolio, created using sveltekit, threlte, threejs and tailwind. wip.

## demos

[see it live here](https://flo-bit.github.io/)

[vr version here](https://flo-bit.github.io/vr) (only tested on quest 3)

![screenshot](/static/image.jpg)

demo videos:

https://github.com/user-attachments/assets/757d9b20-2232-4012-8013-68d5997960e6

https://github.com/flo-bit/flo-bit.github.io/assets/45694132/a251ab6f-a416-4a2d-905f-8dffb2e36e0f

## techstack

- sveltekit (static build using `@sveltejs/adapter-static`)
- threlte (svelte wrapper for threejs)
- tailwind
- automatic deployment using github actions to github pages
- typescript

## development

clone the repo, install dependencies and run the dev server:

```bash
git clone https://github.com/flo-bit/flo-bit.github.io.git
npm install
npm run dev
```

when using it for your own portfolio, please remove the posthog analytics script from `src/app.html` (line 3-6)
