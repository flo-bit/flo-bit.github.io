<script lang="ts">
  import {
    Checkbox,
    Pane,
    Slider,
    Textarea,
    Folder,
    Color,
    ThemeUtils,
    Button,
  } from "svelte-tweakpane-ui";
  import { colorSettings, noiseSettings } from "../../store.svelte";

  const debounce = (callback: Function, wait = 300) => {
    let timeout: ReturnType<typeof setTimeout>;

    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => callback(...args), wait);
    };
  };

  const debouncedChange = (evt) => {
    debounce(() => {
      colorSettings.stops = colorSettings.stops.sort((a, b) => a[0] - b[0]);

      noiseSettings.hasChanged = true;
      console.log("changed");

      noiseSettings.max = max;
    }, 1000)();
  };

  let max = noiseSettings.max;

  let startColor = "#fff000";
  let endColor = "#ff00ff";

  function addStop() {
    // find highest colorstop
    let highest =
      colorSettings.stops.length > 0 ? colorSettings.stops[0][0] : -1.1;

    for (let i = 1; i < colorSettings.stops.length; i++) {
      highest = Math.max(highest, colorSettings.stops[i][0]);
    }

    colorSettings.stops.push([highest + 0.1, "#fff000"]);

    debouncedChange();
  }
</script>

<div
  class="absolute top-2 right-2 pointer-events-auto z-50 w-full max-w-64 backdrop-blur-sm border border-white/10 rounded-lg"
>
  <Pane title="Color" position="inline" theme={ThemeUtils.presets.translucent}>
    <Folder expanded={false} title="Noise">
      <Slider label="min" bind:value={noiseSettings.min} min={-1} max={0} />
      <Slider
        label="max"
        bind:value={max}
        min={0}
        max={1}
        on:change={debouncedChange}
      />

      <Slider
        label="octaves"
        bind:value={noiseSettings.octaves}
        min={0}
        max={5}
        step={1}
        on:change={debouncedChange}
      />
      <Slider
        label="lacunarity"
        bind:value={noiseSettings.lacunarity}
        min={0}
        max={3}
        on:change={debouncedChange}
      />
      <Slider
        label="gain"
        bind:value={noiseSettings.gain}
        min={0}
        max={1}
        on:change={debouncedChange}
      />
      <Slider
        label="warp"
        bind:value={noiseSettings.warp}
        min={0}
        max={1}
        on:change={debouncedChange}
      />
      <Slider
        label="scale"
        bind:value={noiseSettings.scale}
        min={0}
        max={4}
        on:change={debouncedChange}
      />
      <Slider
        label="power"
        bind:value={noiseSettings.power}
        min={0}
        max={4}
        on:change={debouncedChange}
      />
      <Slider
        label="sharpness"
        bind:value={noiseSettings.sharpness}
        min={-1}
        max={1}
        on:change={debouncedChange}
      />
      <Slider
        label="steps"
        bind:value={noiseSettings.steps}
        min={0}
        max={10}
        step={1}
        on:change={debouncedChange}
      />
    </Folder>

    <Folder title="Color">
      {#each colorSettings.stops as stop, index}
        <Folder title={"color " + (index + 1)}>
          <Color
            bind:value={stop[1]}
            label="Color"
            on:change={debouncedChange}
          />
          <Slider
            label="stop"
            bind:value={stop[0]}
            min={-1}
            max={1}
            step={0.01}
            on:change={debouncedChange}
          />
        </Folder>
      {/each}

      <Button on:click={addStop} title="Add Color" />
    </Folder>
  </Pane>
</div>
