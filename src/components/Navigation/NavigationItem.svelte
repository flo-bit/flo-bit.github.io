<script lang="ts">
  import { fade } from "svelte/transition";

  export let isActive = false;

  export let href = "";
</script>

<li>
  <a
    {href}
    class={"relative block px-3 py-2.5 transition duration-200 " +
      (isActive
        ? "text-accent-500 dark:text-accent-400"
        : "hover:text-accent-500 dark:hover:text-accent-400")}
  >
    <slot />
    {#if isActive}
      <span
        transition:fade
        class="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-accent-500/0 via-accent-500/40 to-accent-500/0 dark:from-accent-400/0 dark:via-accent-400/40 dark:to-accent-400/0"
      ></span>
    {/if}
  </a>
</li>
