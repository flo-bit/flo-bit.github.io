<script lang="ts">
  import { onMount } from "svelte";
  import Q5 from "q5";

  onMount(() => {
    let q = new Q5("instance", document.getElementById("movingMandalaCanvas"));

    let p, v, a;
    let noiseScl = 0.005;
    let noiseShift = 0;

    q.setup = function () {
      // Create and position the canvas
      q.createCanvas(1000, 1000, "2d");
      q.displayMode("maxed");
      q.flexibleCanvas(1000);

      p = q.createVector(0, 0);
      v = q.createVector(0, 0);
      a = q.createVector(0, 0);

      q.background(0);
      q.strokeWeight(0.2);
      q.stroke(256);
      q.frameRate(30);
    };

    q.draw = function () {
      q.translate(500, 500);

      p.set(0, 0);
      v.set(0, 0);

      while (p.mag() < q.width || p.mag() < q.height) {
        let x = p.x;
        let y = p.y;
        a = q
          .createVector(1, 0)
          .setHeading(q.noise(x * noiseScl + noiseShift, y * noiseScl) * 15);
        a.setMag(20);
        v.add(a);
        v.limit(5);
        p.add(v);
        drawMandalaLine(x, y, p.x, p.y, 10);
      }

      noiseShift += 0.02;
      q.background(0, 15);
    };

    function drawMandalaLine(ax, ay, bx, by, rots) {
      for (let i = 0; i < rots; i++) {
        q.line(ax, ay, bx, by);
        q.line(ax, -ay, bx, -by);
        q.rotate((Math.PI * 2) / rots);
      }
    }
  });
</script>

<div
  id="movingMandalaCanvas"
  class="w-full h-full border border-base-800 rounded-3xl overflow-hidden"
></div>
