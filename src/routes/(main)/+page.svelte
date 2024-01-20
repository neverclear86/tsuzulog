<script lang="ts">
  import Editor from "$lib/components/editor/Editor.svelte"
  import type { Database } from "$lib/database/database.ts"
  import { getContext } from "svelte"

  let markdown = ""
  const db = getContext("database") as Database

  function save(db: Database, content: string, tags: string[]) {
    db.save({ content, tags })
  }
</script>

<div class="flex justify-center items-center gap-4 p-4 h-dvh">
  <div class="basis-full 2xl:basis-1/2 h-full flex flex-col gap-4">
    <div class="overflow-auto overscroll-none border-2 flex-grow">
      <Editor bind:markdown></Editor>
    </div>
    <button
      class="btn variant-filled-primary"
      disabled={!markdown}
      on:click={() => save(db, markdown, [])}>ぼやく</button
    >
  </div>
  <div class="hidden lg:block basis-1/2"></div>
</div>
