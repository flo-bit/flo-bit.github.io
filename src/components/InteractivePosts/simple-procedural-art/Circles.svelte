<script lang="ts">
  import { onMount } from "svelte";
  import Q5 from "q5";

  onMount(() => {
    let q = new Q5("instance", document.getElementById("circlesCanvas"));

    let scl = 0.2,
      rots = 30,
      rows = 10,
      start = 10,
      rowDist = 20;

    q.setup = function () {
      // Create and position the canvas
      q.createCanvas(1000, 1000);

      q.displayMode("maxed");
      q.background(0);
      q.noStroke();
      q.stroke(256, 12);
      q.fill(256, 4);
      q.flexibleCanvas(1000);
      q.frameRate(60);
    };

    q.draw = function () {
      q.translate(500, 500);

      q.background(0);
      for (let i = 0; i < rots; i++) {
        q.rotate(q.TWO_PI / rots);
        for (let j = 0; j < rows; j++) {
          let n = q.noise(
            i * scl + q.millis() * scl * 0.001,
            j * scl * 0.4,
            q.millis() * scl * 0.0003
          );
          q.circle(
            start + j * rowDist,
            0,
            (n * 600 * (j + 4)) / (rows + 4) + 10
          );
        }
      }
    };

    // q.mousePressed = function () {
    //   if (!document.fullscreenElement) {
    //     document.getElementById("circlesCanvas")?.requestFullscreen();
    //   } else {
    //     if (document.exitFullscreen) {
    //       document.exitFullscreen();
    //     }
    //   }
    // };
  });
</script>

<div
  id="circlesCanvas"
  class="w-full h-full border border-base-800 rounded-3xl overflow-hidden"
></div>
