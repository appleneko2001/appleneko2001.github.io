<script lang="ts">
    import type {ProjectEntry} from "$lib/apis/project-entry";
    import IconSource from "$lib/components/icon-source.svelte";
    import {getProjectStatusAsIcon} from "$lib/apis/project-status";
    let {data} : { data: ProjectEntry }= $props();

    let date = $state<Date | undefined>();

    date = typeof data.date === "string" ?
            new Date(Date.parse(data.date)) :
            data.date as Date;

</script>

<div class="layout">
    {#if data.cover}
        <div class="cover-host">
            {#if data.cover.isIcon}
                <IconSource icon={data.cover.icon ?? ""} size={48} />
            {:else if data.cover.url}
                <div class="cover-pic" style="--url: {data.cover.url}"></div>
            {/if}
        </div>
    {/if}

    <div class="metadata">
        <div class="header">{data.header}</div>
        <div class="status">
            {#if data.status}
                <span style="display:inline-flex;gap:2px;align-items:baseline">
                    <IconSource icon={getProjectStatusAsIcon(data.status)} size={20}/> {data.status}</span>
            {/if}
            {#if date}
                <span>Posted on {date.toLocaleString(undefined, {timeZone: "UTC"})}</span>
            {/if}
        </div>
        <div>{data.desc}</div>
        <div class="links">
        {#each data.links ?? [] as link}
            <a href={link.url} target="_blank">{link.name}</a>
        {/each}
        </div>
    </div>
</div>

<style>
    .layout {
        display: flex;
        flex-direction: row;
        border-radius: 8px;
        overflow: hidden;
    }

    .cover-host {
        min-width: max(96px, 20%);
        align-content: center;
        transition: transform 0.2s;
    }

    .cover-host > :global(.icon) {
        margin: auto;
    }

    .layout:hover .cover-host {
        transform: scale(1.2) rotate(-10deg);
    }

    .metadata {
        display: flex;
        flex-direction: column;
        margin: 8px 0;
        gap: 8px;
    }

    .metadata .header{
        font-size: 1.25rem;
    }

    .status > :not(:last-child)::after {
        content: '·';
        display: inline;
        margin: 0 8px;
    }

    .status :global(.icon){
        align-self:stretch;
    }

    .status:empty {
        display: none;
    }

    .links {
        display: flex;
        gap: 8px;
    }
</style>