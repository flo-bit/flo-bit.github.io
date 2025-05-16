<script lang="ts">
  import { jetstreamStore } from "./store.svelte";
  import { cn } from "../../../stylingUtils";

  $effect(() => {
    if (paused) return;

    // if console is not in view, return
    if (jetstreamStore.active !== "console") {
      return;
    }

    messages = jetstreamStore.messages.slice(-10).reverse();

    // scroll to the bottom
    // if (console && !paused && jetstreamStore.messages.length > 0) {
    //   console.scrollTop = console.scrollHeight;
    // }
  });

  let console: HTMLDivElement;

  let messages: any[] = $state([]);

  let paused = $state(false);
</script>

<div
  id="console"
  class="example not-prose h-96 flex flex-col items-start divide-y overflow-hidden divide-base-200 dark:divide-base-500/20 rounded-3xl bg-base-50 dark:bg-black/50 border border-base-200 dark:border-base-500/20 mt-4"
>
  <div
    bind:this={console}
    class="flex-grow h-full overflow-y-scroll overflow-x-hidden w-full divide-y divide-base-200 dark:divide-base-500/20"
  >
    {#each messages as message}
      <div
        class="text-sm text-base-200 py-1 wrap list-none flex-wrap w-full px-2 break-all"
      >
        <!-- <JsonView json={message} /> -->
         {JSON.stringify(message)}
      </div>
    {/each}

    {#if jetstreamStore.messages.length === 0}
      <div
        class="text-sm text-[#E1E4E8] py-4 wrap list-none flex-wrap w-full px-4"
      >
        No messages yet. {!jetstreamStore.connected
          ? "Connect to jetstream to start receiving messages"
          : ""}
      </div>
    {/if}
  </div>

  <div
    class="w-full text-left p-2 px-4 flex justify-between text-sm bg-base-500/10"
  >
    <button onclick={() => (paused = !paused)} class={cn(jetstreamStore.active !== "console" ? 'text-red-500' : 'text-green-500')}>Pause</button>
    <div>{jetstreamStore.messages.length} messages</div>
  </div>
</div>

<style>
  .wrap {
    font-family: monospace;
    font-size: 14px;
  }
</style>
