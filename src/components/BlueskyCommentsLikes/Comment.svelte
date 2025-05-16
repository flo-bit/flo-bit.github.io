<script lang="ts">
  import {
    atUriToPostUri,
    renderPostAsHtml,
    numberToHumanReadable,
  } from "./utils";
  import { cn } from "../../stylingUtils";
  import Comment from "./Comment.svelte";
  import Avatar from "./Avatar.svelte";
  import RelativeTime from "./relative-time";

  const { comment, depth = 0 } = $props();

  let expanded = $state(true);
</script>

{#snippet top(expand: boolean)}
  <div class="text-sm text-base-600 dark:text-base-500 flex items-center -ml-6">
    <div class="relative size-6">
      <Avatar
        src={comment.post.author.avatar}
        link={`https://bsky.app/profile/${comment.post.author.did}`}
        size="size-6"
      />
      {#if expand}
        <button
          class="absolute inset-0 size-6 bg-black/50 text-white rounded-full flex items-center justify-center"
          onclick={() => (expanded = !expanded)}
        >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-3">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>

          <span class="sr-only">expand comment</span>
        </button>
      {/if}
    </div>
    <a
      target="_blank"
      rel="noopener noreferrer nofollow"
      class="ml-2 dark:text-base-400 hover:text-base-500 hover:dark:text-base-300"
      href={`https://bsky.app/profile/${comment.post.author.did}`}
    >
      {comment.post.author.displayName || comment.post.author.handle}
    </a>

    <div class="text-xs ml-2 text-base-500">
      <RelativeTime
        date={new Date(comment.post.record.createdAt)}
        locale="en"
      />
    </div>
  </div>
{/snippet}

<div class="pl-3 relative">
  <button
    class="group absolute -left-1.5 top-0 w-3 h-full flex items-center"
    onclick={() => (expanded = !expanded)}
  >
    <div
      class="mx-auto w-0.5 h-full bg-base-200 dark:bg-base-900 group-hover:bg-base-300 dark:group-hover:bg-base-800 rounded-full"
    ></div>
    <span class="sr-only">collapse comment</span>
  </button>

  <div class="mt-2 pb-2">
    {#if expanded}
      {@render top(false)}
      <div>{@html renderPostAsHtml(comment.post)}</div>

      <div class="mt-2 flex gap-8 text-base-500 dark:text-base-400">
        <a
          href={atUriToPostUri(comment.post.uri)}
          target="_blank"
          rel="noopener noreferrer nofollow"
          class="group inline-flex items-center gap-2 text-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="-m-1.5 size-7 rounded-full p-1.5 transition-all duration-100 group-hover:bg-accent-500/10 group-hover:text-accent-700 dark:group-hover:text-accent-400"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
            />
          </svg>
          <span class="sr-only">Replies</span>
          {numberToHumanReadable(comment.post.replyCount)}
        </a>

        <a
          href={atUriToPostUri(comment.post.uri)}
          target="_blank"
          rel="noopener noreferrer nofollow"
          class="group inline-flex items-center gap-2 text-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="-m-1.5 size-7 rounded-full p-1.5 transition-all duration-100 group-hover:bg-accent-500/10 group-hover:text-accent-700 dark:group-hover:text-accent-400"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
          <span class="sr-only">Likes</span>
          {numberToHumanReadable(comment.post.likeCount)}
        </a>
      </div>

      {#if comment.replies?.length > 0 && depth > 4}
        <a
          href={atUriToPostUri(comment.post.uri)}
          target="_blank"
          rel="noopener noreferrer nofollow"
          class="text-sm text-base-500 dark:text-base-400 hover:dark:text-base-300 hover:text-base-600 font-medium"
          >View more replies on bluesky</a
        >
      {/if}
    {:else}
      <button onclick={() => (expanded = true)}>
        {@render top(true)}
      </button>
    {/if}
  </div>

  {#if comment.replies?.length > 0 && depth <= 4 && expanded}
    {#each comment.replies.toSorted((a: any, b: any) => new Date(a.post.record.createdAt).getTime() - new Date(b.post.record.createdAt).getTime()) as reply}
      <Comment comment={reply} depth={depth + 1} />
    {/each}
  {/if}
</div>
