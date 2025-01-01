<script lang="ts">
  import DesktopNavigation from "./DektopNavigation.svelte";
  import MobileNavigation from "./MobileNavigation.svelte";
  import { type Item, items } from "./items";

  function setActive() {
    // @ts-ignore
    let currentlyActive = mostVisible(document.querySelectorAll(".section"));

    if (currentlyActive && currentlyActive.id) {
      active = currentlyActive.id;
    }
  }

  export let active: Item = "home";
</script>

<svelte:window
  on:scroll={() => {
    setActive();
  }}
/>

<div class="fixed top-6 w-full z-40 pointer-events-none">
  <div class="flex flex-1 justify-end md:justify-center">
    <DesktopNavigation
      items={items}
      bind:active
      class="pointer-events-auto hidden md:block"
    />
  </div>
</div>

<div class="fixed bottom-6 right-0 z-40">
  <MobileNavigation items={items} bind:active class="pointer-events-auto md:hidden mt-10" />
</div>
