<script lang="ts">
    import favicon from '$lib/assets/favicon.svg';
    import "$lib/themes/theming.css";

    let {children} = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon}/>
</svelte:head>

<div class="app-layout">
    <div class="app-background"></div>
    <div class="app-page-host">
        {@render children?.()}
    </div>
</div>

<style>
    .app-background{
        background-color: var(--background-colour);
        position: fixed;
        inset: 0;
        z-index: -1;
    }

    :root {
        font-family: Roboto, sans-serif;
    }

    .app-page-host{
        position: relative;
        inset: 0;
    }

    .app-page-host > :global(div){
        position: absolute;
        inset: 0;
        z-index: 0;
    }

    .app-page-host > :global(div[inert]){
        z-index: -1;
    }

    @media screen and (width > 1000px) {
        .app-page-host {
            margin-left: auto;
            margin-right: auto;
            max-width: 1000px;
        }
    }
</style>