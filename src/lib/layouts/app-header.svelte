<script lang="ts">
    let {children} = $props();
</script>

<div class="app-header">
    {@render children?.()}
</div>

<style>
    .app-header {
        position: sticky;
        top: 0;
    }
</style>