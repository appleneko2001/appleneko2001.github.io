<script>
    import {fly} from 'svelte/transition'

    import NotReadyPlaceholder from '$lib/components/profile/not-ready-placeholder.svelte';
    import LinkButton from "$lib/components/link-button.svelte";
</script>

<svelte:head>
    <title>Apps</title>
    <meta name="description" content="my PWA apps"/>
</svelte:head>

<div class="apps-page"
     in:fly={{ x: 200, duration: 300, delay: 300 }}
     out:fly={{ x: 200, duration: 300 }}>
    <div class="page-header">
        <LinkButton icon="arrow-left" href="/home"/>
        <div class="header-text">Apps</div>
    </div>

    <NotReadyPlaceholder/>
</div>

<style>
    .apps-page {
        position: sticky;
        min-height: max(560px, 100vh);
    }

    .page-header {
        display: flex;
        align-items: center;
        gap: 1.5em;
    }

    .page-header > .header-text {
        font-size: 1.4em;
    }
</style>