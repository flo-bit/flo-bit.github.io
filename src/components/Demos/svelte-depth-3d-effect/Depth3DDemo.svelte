<script lang="ts">
  import { Depth3D } from "./depth-3d";

  import girl from "./depth-3d/images/girl.jpg";
  import girldepth from "./depth-3d/images/girl-depth.jpg";

  import napoleon from "./depth-3d/images/napoleon-crossing-the-alps.jpg";
  import napoleondepth from "./depth-3d/images/napoleon-crossing-the-alps-depth.jpg";

  import vanGogh from "./depth-3d/images/van-gogh-self-portrait.webp";
  import vanGoghdepth from "./depth-3d/images/van-gogh-self-portrait-depth.jpg";

  import monaLisa from "./depth-3d/images/mona-lisa.jpg";
  import monaLisadepth from "./depth-3d/images/mona-lisa-depth.jpg";

  let images: {
    image: string;
    depth: string;
  }[] = [
    {
      image: girl.src,
      depth: girldepth.src,
    },
    {
      image: napoleon.src,
      depth: napoleondepth.src,
    },
    {
      image: vanGogh.src,
      depth: vanGoghdepth.src,
    },
    {
      image: monaLisa.src,
      depth: monaLisadepth.src,
    },
  ];

  let currentImage = 0;
</script>

<div
  class="mx-auto aspect-[2/3] h-[75vh] border border-white/10 bg-base-900/20 rounded-3xl max-w-full overflow-hidden lg:col-span-2 lg:row-span-2"
>
  <button
    on:click={() => {
      console.log("clicked");
      currentImage = (currentImage + 1) % images.length;
    }}
    class="h-full w-full"
  >
    {#key currentImage}
      <Depth3D
        image={{
          image: images[currentImage].image,
          depth: images[currentImage].depth,
        }}
        detail={500}
        cameraPosition={[0, 0, 7]}
      />
    {/key}
  </button>
</div>
