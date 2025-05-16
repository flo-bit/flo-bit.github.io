<script lang="ts">
  import { onMount } from "svelte";
  import { getUserPosts, getComments, getCommentCount } from "./utils";
  import Comment from "./Comment.svelte";

  let { uri, user, comments, url } = $props();

  let postUri = $state(uri);

  onMount(async () => {
    if (!uri && user) {
      let posts = await getUserPosts(user);

      const post = posts.find((post) => post.post.embed?.external?.uri === url);

      if (post) {
        postUri = post.post.uri;
        comments = await getComments(post.post.uri);
      }
    } else if (uri) {
      comments = await getComments(uri);
    }
  });
</script>

<div class="not-prose mt-8">
  {#if comments.length > 0}
    <div class="text-sm text-base-950 dark:text-base-100 font-semibold">
      {getCommentCount(comments)} comments, sorted by newest first
    </div>
  {/if}

  {#if comments.length > 0}
    <div class="pt-4">
      {#each comments as comment}
        <Comment {comment} />
      {/each}
    </div>
  {/if}
</div>
