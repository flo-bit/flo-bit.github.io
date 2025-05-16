<script lang="ts">
  import { cn } from "src/stylingUtils";
  import { jetstreamStore } from "./store.svelte";
  import { onMount } from "svelte";

  let ws: WebSocket;

  function connect() {
    if (jetstreamStore.connected) {
      jetstreamStore.connected = false;
      jetstreamStore.message = "Disconnected";

      ws.close();
	  jetstreamStore.timeConnected = 0;

      return;
    }

    const url = "wss://jetstream2.us-east.bsky.network/subscribe";

    jetstreamStore.message = "Connecting...";
    ws = new WebSocket(url);
    ws.onopen = () => {
      jetstreamStore.connected = true;
      jetstreamStore.message = "Connected";
	  
	  jetstreamStore.timeConnected = new Date().getTime();
	  console.log(jetstreamStore.timeConnected);
    };
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      jetstreamStore.messages.push(data);
	  jetstreamStore.listeners.forEach(listener => listener(data));
    };
    ws.onclose = () => {
      jetstreamStore.connected = false;
      jetstreamStore.message = "Disconnected";
    };
    ws.onerror = (error) => {
      jetstreamStore.message = "Error! Reconnecting...";
	  jetstreamStore.connected = false;
	  
      setTimeout(connect, 1000);
    };
  }

  onMount(() => {
	connect();
  });


  function setActive() {
    // @ts-ignore
    let currentlyActive = mostVisible(document.querySelectorAll(".example"));

    if (currentlyActive?.id) {
      jetstreamStore.active = currentlyActive.id;
    }
  }

</script>

<svelte:window
  on:scroll={() => {
    setActive();
  }}
/>

<div class="flex flex-row items-center gap-2 hidden">
  <button
    class={cn(
      "inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium transition-colors select-none ring-inset ring-1",
      !jetstreamStore.connected
        ? "bg-accent-500/10 text-accent-400 fill-accent-400 ring-accent-500/20 hover:bg-accent-500/20"
        : "bg-red-500/10 text-red-400 fill-red-400 ring-red-500/20 hover:bg-red-500/20"
    )}
    onclick={connect}
    >{jetstreamStore.connected ? "Disconnect" : "Connect"}</button
  >
  {#if jetstreamStore.messages.length > 0}
    <button
      class={cn(
        "inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium transition-colors select-none ring-inset ring-1",
        "bg-base-500/10 text-base-400 fill-base-400 ring-base-500/20 hover:bg-base-500/20"
      )}
      onclick={() => {
        jetstreamStore.messages = [];
      }}>Clear messages</button
    >
  {/if}
  <span class="text-sm text-base-400 font-medium">
    {jetstreamStore.message}
  </span>
</div>
