<script lang="ts">
  import { onMount } from "svelte";
  import Q5 from "q5";

  onMount(() => {
    let q = new Q5("instance", document.getElementById("pinkCanvas"));

    q.setup = function () {
      // Create canvas
      q.createCanvas(800, 400);
      q.displayMode("maxed");
      q.noStroke();
      q.colorMode("oklch");

      // Enable flexible resizing
      q.flexibleCanvas(1000);

      q.frameRate(60);
    };

    q.draw = function () {
      let stepSize = 50;
      let scl = 0.0005;

      for (let x = -stepSize; x < q.width; x += stepSize) {
        for (let y = -stepSize; y < q.height; y += stepSize) {
          let n =
            (q.noise(
              x * scl + q.noise(x, y) * 0.1,
              y * scl,
              q.frameCount * scl * 10
            ) *
              600) %
            360;
          q.fill(Math.random() * 0.3 + 0.3, 0.4, n, 0.02);
          q.rect(
            x + q.random() * stepSize,
            y + q.random() * stepSize,
            stepSize,
            stepSize
          );
        }
      }
    };

    // q.mousePressed = function () {
    //   if (!document.fullscreenElement) {
    //     document.getElementById("pinkCanvas")?.requestFullscreen();
    //   } else {
    //     if (document.exitFullscreen) {
    //       document.exitFullscreen();
    //     }
    //   }
    // };
  });
</script>

<div
  id="pinkCanvas"
  class="w-full h-full border border-base-800 rounded-3xl overflow-hidden"
></div>
