<script lang="ts">
  import { Pane, Slider, ThemeUtils, Folder } from "svelte-tweakpane-ui";
  import { noiseSettings } from "../../store.svelte";

  const debounce = (callback: Function, wait = 300) => {
    let timeout: ReturnType<typeof setTimeout>;

    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => callback(...args), wait);
    };
  };

  const debouncedChange = (evt) => {
    console.log(evt);

      debounce(() => {
        noiseSettings.hasChanged = true;
        console.log("changed");

        noiseSettings.max = max;
      }, 1000)();
  };

  let max = noiseSettings.max;
</script>

<div
  class="absolute top-2 right-2 pointer-events-auto z-50 w-full max-w-64 backdrop-blur-sm border border-white/10 rounded-lg"
>
  <Pane title="Settings" position="inline" theme={ThemeUtils.presets.translucent}>
    <Folder title="Noise">
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
  </Pane>
</div>
