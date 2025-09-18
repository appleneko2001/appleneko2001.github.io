<script>
    import {fly} from 'svelte/transition'

    import NotReadyPlaceholder from '$lib/components/profile/not-ready-placeholder.svelte';
    import LinkButton from "$lib/components/link-button.svelte";
    import {AvatarSourceUrl} from "$lib/assets/avatar-source"
</script>

<svelte:head>
    <title>Apps</title>
    <meta name="description" content="my projects"/>
    <meta property="og:description" content="my project listing 🫠"/>
    <meta property="og:title" content="Portfolio"/>
    <meta property="og:type" content="profile"/>
    <meta property="og:profile:username" content="appleneko2001"/>
    <meta property="og:image" content={AvatarSourceUrl}/>
</svelte:head>

<div class="projects-page"
     in:fly={{ x: 200, duration: 300, delay: 100 }}
     out:fly={{ x: 200, duration: 300 }}>
    <div class="page-header">
        <LinkButton icon="arrow-left" href="/home"/>
        <div class="header-text">Projects</div>
    </div>

    <NotReadyPlaceholder/>
</div>

<style>
    .projects-page {
        min-height: max(560px, 100vh);
    }

    .page-header {
        position: sticky;
        display: flex;
        align-items: center;
        gap: 1.5em;
    }

    .page-header > .header-text {
        font-size: 1.4em;
    }
</style>