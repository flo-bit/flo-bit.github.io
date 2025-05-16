<script lang="ts">
	import { onMount } from "svelte";
	import Q5 from "q5";
  
	onMount(() => {
	  let q = new Q5("instance", document.getElementById("rectanglesCanvas"));
    
	  q.setup = function () {
		// Create and position the canvas
		q.createCanvas(1000, 300);
		q.flexibleCanvas(5000);
		q.background(0);
		q.noStroke();
		q.colorMode('oklch');
		q.fill(0, 0.02);
	  };
  
	  q.draw = function () {
		q.translate(1300, 700);
		q.rotate(q.millis() / 1000);
		q.background(0.5, 0.3, (q.millis() / 100) % 360, 0.01);
  
		for (let j = 0; j < 100; j++) {
		  q.rotate(q.sin(j / 2000));
		  let x = q.sin(j / 100 + q.millis() / 700) * 200;
		  let y = q.cos(j / 100 + q.millis() / 1000) * 330;
  
		  x += q.sin(y / 11) * 10 + q.cos(y / 5) * 15 + q.sin(x / 7) * 30 + q.cos(j / 20) * 15;
  
		  let h = 10;
		  q.rect(0, y, x, h);
		  q.rect(0, y, -x, h);
		  q.rect(0, y, -x * 2, h);
		  q.rect(0, y, x * 2, h);
		  q.rect(0, y, x * 3, h);
		  q.rect(0, y, -x * 3, h);
  
		  q.rect(0, -y, x, h);
		  q.rect(0, -y, -x, h);
		  q.rect(0, -y, -x * 2, h);
		  q.rect(0, -y, x * 2, h);
		  q.rect(0, -y, x * 3, h);
		  q.rect(0, -y, -x * 3, h);
		}
	  };
  
	});
  </script>
  
  <div
	id="rectanglesCanvas"
	class="w-full h-full border border-base-800 rounded-3xl overflow-hidden"
  ></div>
  