<script lang="ts">
  import * as PIXI from "pixi.js";

  import { onDestroy, onMount } from "svelte";

  import { Body } from "./animals/Body";

  let app: PIXI.Application;

  let totalTime = $state(0);

  let target = { x: 0, y: 0 };

  onMount(async () => {
    app = new PIXI.Application();

    let w = window.innerWidth,
      h = window.innerHeight;

    // set to full screen
    await app.init({
      width: w,
      height: h,
      antialias: true,
      backgroundAlpha: 0,
    });
    document.body.appendChild(app.canvas);

    app.canvas.style.position = "fixed";
    app.canvas.style.width = "100%";
    app.canvas.style.height = "100%";
    app.canvas.style.inset = "0";
	app.canvas.style.zIndex = "-1000";

    target = { x: w / 2, y: h / 2 };

    let length = 10;
	
    let bodyWidth = [
      68 / 84 * 20,
      81 / 84 * 20,
      1 * 20,
      83 / 84 * 20,
      77 / 84 * 20,
      64 / 84 * 20,
      51 / 84 * 20,
      38 / 84 * 20,
      32 / 84 * 20,
      19 / 84 * 20,
    ];

    let snake = new Body({
      origin: new PIXI.Point(-200, 0),
      jointCount: length,
      linkSize: 15,
      angleConstraint: Math.PI / 8,
      bodyWidth: bodyWidth,
      roundTail: 2,
      roundHead: 20,
    });

    app.stage.addChild(snake.container);

    app.ticker.add((ticker) => {
      // get ellapsed time
      const deltaTime = ticker.deltaMS * 0.001;
      totalTime += deltaTime;

      snake.update(deltaTime, totalTime);
      if (target) {
        snake.setTarget(new PIXI.Point(target.x, target.y));
      }
    });

	window.addEventListener("pointermove", (e) => {
		target = { x: e.clientX, y: e.clientY };
	});

    window.addEventListener("resize", () => {
      w = window.innerWidth;
      h = window.innerHeight;
      app.renderer.resize(w, h);
    });
  });

  onDestroy(() => {
    if (!app || !app.canvas) return;
    app.canvas.remove();
    // destroy app
    app.destroy();
  });
</script>
