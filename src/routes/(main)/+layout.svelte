<script lang="ts">
  import { Database } from "$lib/database/database"
  import { AppRail, AppRailTile, AppShell } from "@skeletonlabs/skeleton"
  import { setContext } from "svelte"

  let currentTile = 0
  setContext("database", new Database())
</script>

<AppShell>
  <!-- (header) -->
  <svelte:fragment slot="sidebarLeft">
    <div class="hidden lg:block h-full">
      <AppRail width="w-12">
        <!--			<svelte:fragment slot="lead">-->
        <!--				<AppRailAnchor href="/">(icon)</AppRailAnchor>-->
        <!--			</svelte:fragment>-->
        <!-- --- -->
        <AppRailTile
          bind:group={currentTile}
          name="tile-1"
          value={0}
          title="tile-1"
        >
          <svelte:fragment slot="lead">(icon)</svelte:fragment>
          <span>Tile 1</span>
        </AppRailTile>
        <AppRailTile
          bind:group={currentTile}
          name="tile-2"
          value={1}
          title="tile-2"
        >
          <svelte:fragment slot="lead">(icon)</svelte:fragment>
          <span>Tile 2</span>
        </AppRailTile>
        <AppRailTile
          bind:group={currentTile}
          name="tile-3"
          value={2}
          title="tile-3"
        >
          <svelte:fragment slot="lead">(icon)</svelte:fragment>
          <span>Tile 3</span>
        </AppRailTile>
        <!-- --- -->
        <!--			<svelte:fragment slot="trail">-->
        <!--				<AppRailAnchor href="/" target="_blank" title="Account">(icon)</AppRailAnchor>-->
        <!--			</svelte:fragment>-->
      </AppRail>
    </div>
  </svelte:fragment>
  <!-- (sidebarRight) -->
  <!-- (pageHeader) -->
  <!-- Router Slot -->
  <slot />
  <!-- ---- / ---- -->
  <!-- (pageFooter) -->
  <!-- (footer) -->
</AppShell>
