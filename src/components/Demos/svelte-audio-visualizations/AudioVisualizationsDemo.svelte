<script lang="ts">
  import DeformedCircleVisualizer from "./visualizations/core/DeformedCircleVisualizer.svelte";
  import InnerGlowVisualizer from "./visualizations/core/InnerGlowVisualizer.svelte";
  import MicrophoneVisualizer from "./visualizations/core/MicrophoneVisualizer.svelte";
  import SpeakerVisualizer from "./visualizations/core/SpeakerVisualizer.svelte";
  import Glow from "./visualizations/core/Glow.svelte";
  import AudioFrequency from "./visualizations/audio/AudioFrequency.svelte";
  import { WavRecorder, AudioFilePlayer } from "./visualizations/wavtools";
  import CircleCirclesVisualizer from "./visualizations/core/CircleCirclesVisualizer.svelte";
  import BarVisualizer from "./visualizations/core/BarVisualizer.svelte";
  import CircleBarVisualizer from "./visualizations/core/CircleBarVisualizer.svelte";
  import { onMount } from "svelte";

  import { UberNoise } from "uber-noise";

  export let wavRecorder: WavRecorder = new WavRecorder({ sampleRate: 24000 });

  export let player = new AudioFilePlayer();

  export let currentlyPlaying: WavRecorder | AudioFilePlayer | null = null;

  let state: "recording" | "music" | null = null;

  let analysisType: "music" | "voice" = "voice";

  $: analysisType = state === "music" ? "music" : "voice";

  async function microphone() {
    if (state === "recording") {
      wavRecorder.end();
      state = null;
      return;
    }
    player.stop();

    await wavRecorder.begin();

    wavRecorder.record();

    currentlyPlaying = wavRecorder;

    state = "recording";
  }

  async function music() {
    if (state === "music") {
      player.stop();
      state = null;
      return;
    }
    if (wavRecorder.recording) wavRecorder.end();

    await player.loadFile("/music.mp3");

    player.play();
    currentlyPlaying = player;

    state = "music";
  }

  let noise = new UberNoise({
    scale: 0.2,
    octaves: 2,
    power: 1.8,
    min: 0,
    max: 1,
    sharpness: -0.5,
  });
  let counter = 0;

  let getRandomValues = (num: number) => {
    return Array.from({ length: num }, (a, i) => noise.get(i));
  };

  onMount(() => {
    setInterval(() => {
      getRandomValues = (num: number) => {
        return Array.from({ length: num }, (a, i) => noise.get(i, counter));
      };
      counter += 0.2;
    }, 33);
  });
</script>

{#snippet visualizations(getValues)}
  <div class="h-44 sm:h-64 w-full rounded-3xl border border-white/10 bg-base-900/20 p-4">
    <CircleBarVisualizer
      values={getValues(50)}
      startHue={150}
      endHue={200}
      rotate={2}
    />
  </div>

  <div class="h-44 sm:h-64 w-full rounded-3xl border border-white/10 bg-base-900/20 p-4">
    <BarVisualizer
      values={getValues(20)}
      barSpacing={8}
      startHue={150}
      endHue={200}
      center
    />
  </div>

  <div class="h-44 sm:h-64 w-full rounded-3xl border border-white/10 bg-base-900/20 p-4">
    <CircleCirclesVisualizer
      values={getValues(50)}
      startHue={150}
      endHue={200}
    />
  </div>

  <div class="h-44 sm:h-64 w-full rounded-3xl border border-white/10 bg-base-900/20 p-4">
    <Glow glow={20}>
      <DeformedCircleVisualizer
        values={getValues(8)}
        startHue={150}
        endHue={200}
      />
    </Glow>
  </div>
  <div
    class="h-44 sm:h-64 w-full rounded-3xl border border-white/10 bg-base-900/20 overflow-hidden"
  >
    <Glow glow={10}>
      <InnerGlowVisualizer values={getValues(32)} startHue={150} endHue={200} />
    </Glow>
  </div>

  <div
    class="h-44 sm:h-64 w-full rounded-3xl border border-white/10 bg-base-900/20 overflow-hidden flex items-center justify-center gap-4"
  >
    <div class="size-14 sm:size-20">
      <MicrophoneVisualizer value={getValues(3)[1]} />
    </div>
    <div class="size-14 sm:size-20">
      <SpeakerVisualizer value={getValues(3)[1]} />
    </div>
  </div>
{/snippet}

<div class="mx-auto mt-6 max-w-2xl px-4 sm:px-6 md:max-w-5xl md:px-8">
  

  <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
    {#if state}
      <AudioFrequency audio={currentlyPlaying} let:getValues {analysisType}>
        {@render visualizations(getValues)}
      </AudioFrequency>
    {:else}
      {@render visualizations(getRandomValues)}
    {/if}
  </div>

  <div class="flex justify-between mt-4">
    <div class="flex gap-2 flex-row">
      <button
        type="button"
        on:click={microphone}
        class="rounded-full px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500 {state ===
        'recording'
          ? 'text-stone-500 bg-stone-500/10 border border-stone-500/20 hover:bg-stone-500/20'
          : 'text-accent-500 bg-accent-500/10 border border-accent-500/20 hover:bg-accent-500/20'}"
        >{state === "recording" ? "stop " : "use "}microphone</button
      >
      <button
        type="button"
        on:click={music}
        class="rounded-full px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500 {state ===
        'music'
          ? 'text-stone-500 bg-stone-500/10 border border-stone-500/20 hover:bg-stone-500/20'
          : 'text-accent-500 bg-accent-500/10 border border-accent-500/20 hover:bg-accent-500/20'}"
        >{state === "music" ? "stop " : "play "}music</button
      >
    </div>
  </div>
</div>
