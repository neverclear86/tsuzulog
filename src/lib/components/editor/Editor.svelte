<script lang="ts">
  import type { Action } from "svelte/action"
  import "@milkdown/theme-nord/style.css"
  import "prism-themes/themes/prism-nord.css"
  import { Editor, rootCtx, defaultValueCtx, editorViewOptionsCtx } from "@milkdown/core"
  import { commonmark } from "@milkdown/preset-commonmark"
  import { gfm } from "@milkdown/preset-gfm"
  import { nord } from "@milkdown/theme-nord"
  import { history } from "@milkdown/plugin-history"
  import { prism } from "@milkdown/plugin-prism"
  import { cursor } from "@milkdown/plugin-cursor"
  import { clipboard } from "@milkdown/plugin-clipboard"
  import { indent } from "@milkdown/plugin-indent"
  import { upload } from "@milkdown/plugin-upload"
  import { listener, listenerCtx } from "@milkdown/plugin-listener"

  export let markdown = ""
  export let readonly = false

  const setEditor: Action = (node) => {
    // to obtain the editor instance we need to store a reference of the editor.
    Editor.make()
      .config((ctx) => {
        ctx.set(rootCtx, node)
        ctx.set(defaultValueCtx, markdown)
        ctx.get(listenerCtx).markdownUpdated((_, outMd) => {
          markdown = outMd
        })
        ctx.update(editorViewOptionsCtx, (prev) => ({
          ...prev,
          editable: () => !readonly,
        }))
      })
      .config(nord)
      .use(commonmark)
      .use(gfm)
      .use(history)
      .use(prism)
      .use(cursor)
      .use(clipboard)
      .use(indent)
      .use(upload)
      .use(listener)
      .create()
  }
</script>

<div class="min-h-full" use:setEditor />
