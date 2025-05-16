<script lang="ts">
	import { onMount } from "svelte";
	import Q5 from "q5";
  
	onMount(() => {
	  let q = new Q5("instance", document.getElementById("rotatingRectangleCanvas"));
  
	  let i = 0;
	  let x = 0;
	  let speed = 1;
  
	  q.setup = function () {
		// Create canvas
		q.createCanvas(1000, 1000);
		q.displayMode("maxed");
		q.flexibleCanvas(500);
		q.background(0);
		q.noFill();
		q.stroke(256);
		q.strokeWeight(0.2);
	  };
  
	  q.draw = function () {
		q.translate(250, 250);

		if(Math.random() < 0.005) {
			q.background(0);
		}
  
		i += 0.1;
		x += speed;
		if (x > 100 || x < -100) {
		  speed *= -1;
		}
		q.rotate(i);
		q.rect(-100 + x, -100, 200, 200);
	  };
	});
  </script>
  
  <div
	id="rotatingRectangleCanvas"
	class="w-full h-full border border-base-800 rounded-3xl overflow-hidden"
  ></div>
  