<script lang="ts">

  let container;

  let { children } = $props();

  let collapsed = $state(true);
</script>

<div bind:this={container} class="h-80 overflow-y-scroll rounded-xl relative border-base-800">
  {@render children()}

  {#if collapsed}
  <div
    class="absolute inset-0 top-6 bg-gradient-to-b from-transparent via-transparent to-black/80 rounded-xl border-base-800 pointer-events-none"
  >
  </div>
  <button
    onclick={() => {
      container.classList.remove("h-80");

      collapsed = false;
    }}
    class="absolute -bottom-1 left-0 pb-3 right-0 bg-base-900 hover:bg-base-800 p-2 text-xs font-semibold border border-base-800"
  >
    show all
    </button>
  {/if}
</div>
