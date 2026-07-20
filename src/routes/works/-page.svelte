<script lang="ts">
    import {fly, fade} from 'svelte/transition';
    import LinkButton from "$lib/components/link-button.svelte";
    import {AvatarSourceUrl} from "$lib/assets/avatar-source";
    import PageContent from '$lib/layouts/page-content.svelte';
    import type {ListingResult} from "$lib/apis/listing-result";
    import type {ProjectEntry} from "$lib/apis/project-entry";
    import ItemTemplate from "./template.svelte";
    import ProgressText from '$lib/components/progress-text.svelte';

    async function fetchData(): Promise<ListingResult<ProjectEntry>> {
        const result = await fetch("/api/project-list");
        return await result.json();
    }

    function unwrapObject(data: any): ListingResult<ProjectEntry> {
        return data as ListingResult<ProjectEntry> ?? {msg: "page broken :("};
    }
</script>

<svelte:head>
    <title>Apps</title>
    <meta name="description" content="my works"/>
    <meta property="og:description" content="my works listing 🫠"/>
    <meta property="og:title" content="Portfolio"/>
    <meta property="og:type" content="profile"/>
    <meta property="og:profile:username" content="appleneko2001"/>
    <meta property="og:image" content={AvatarSourceUrl}/>
</svelte:head>

<div class="projects-page"
     in:fly={{ x: 200, duration: 300, delay: 100 }}
     out:fly={{ x: 200, duration: 300 }}>
    <div class="page-header">
        <LinkButton icon="material:arrow_back" href="/home"/>
        <div class="header-text">Works</div>
    </div>

    <div class="page-content">
        <PageContent>
            {#await fetchData()}
                <div class="presenter"
                     out:fade={{ duration: 200 }}
                     style="text-align: center">
                    Loading
                    <ProgressText/>
                </div>
            {:then data}
                <!--<div>{JSON.stringify(data)}</div>-->
                <div class="presenter"
                     in:fly={{y: 50, duration: 200}}>
                    {#each unwrapObject(data).results ?? [] as item}
                        <div>
                            <ItemTemplate data={item}/>
                        </div>
                    {/each}
                </div>
            {/await}
        </PageContent>
    </div>
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
        z-index: 1;
    }

    .page-header > .header-text {
        font-size: 1.4em;
    }

    .page-content {
        padding-top: 1.5em;
    }

    .presenter {
        position: absolute;
        inset: 0;
        z-index: 0;
    }
</style>