<script lang="ts">
  import Editor from "$lib/components/editor/Editor.svelte"

  let markdown = ""
</script>

<div class="flex justify-center items-center gap-4 p-4 h-dvh">
  <div class="basis-full 2xl:basis-1/2 h-full overflow-auto overscroll-none border-2">
    <Editor bind:markdown></Editor>
  </div>
  <div class="hidden lg:block basis-1/2"></div>
</div>
