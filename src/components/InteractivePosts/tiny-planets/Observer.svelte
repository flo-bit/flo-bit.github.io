<script lang="ts">
  import { onMount } from "svelte";
  import { tinyPlanetsStore } from "./store.svelte";

  function setActive() {
    // @ts-ignore
    let currentlyActive = mostVisible(document.querySelectorAll(".example"));

    if (currentlyActive?.id) {
      tinyPlanetsStore.active = currentlyActive.id;
    } else {
      // @ts-ignore
      let currentActiveText = mostVisible(document.querySelectorAll(".instruction"));
      if (currentActiveText?.id) {
        tinyPlanetsStore.active = currentActiveText.id;
      }
    }

	console.log(tinyPlanetsStore.active);
  }

  onMount(() => {
    setActive();
  });
</script>

<svelte:window
  on:scroll={() => {
    setActive();
  }}
/>
