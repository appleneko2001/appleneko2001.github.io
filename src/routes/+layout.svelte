<script lang="ts">
    export const prerender = true;
    export const trailingSlash = 'always';

    import favicon from '$lib/assets/favicon.svg';
    import ModalHost from '$lib/components/modals/modal-host.svelte';
    import ModalLoading from '$lib/layouts/modal-loading.svelte';

    import "$lib/themes/theming.css";
    import {GlobalVars} from "$lib/global-accessor";
    import {onMount} from "svelte";

    let {children} = $props();
    let modalHost: ModalHost | null = null;

    let isModalFront = $state(false);

    function clicked() {
        console.log("clicked hello!");
        modalHost?.showModal(ModalLoading);
    }

    onMount(() => {
        GlobalVars.set("ModalHost", modalHost);
    });
</script>

<svelte:head>
    <link rel="icon" href={favicon}/>
</svelte:head>

<div class="app-layout"
     class:not-front={isModalFront}>
    <div class="app-background"></div>
    <div class="app-page-host">
        {@render children?.()}
    </div>
</div>

<!--<button onclick={clicked}
        style="z-index: 1; position: fixed; bottom: 0; left: 50%">Hello
</button>-->

<ModalHost bind:this={modalHost}
           bind:isForeground={isModalFront}
/>

<style>
    .app-background {
        background-color: var(--background-colour);
        position: fixed;
        inset: 0;
        z-index: -1;
    }

    .not-front {
        z-index: -1;
    }

    :root {
        font-family: Roboto, sans-serif;
    }

    .app-page-host {
        position: relative;
        inset: 0;
    }

    .app-page-host > :global(div) {
        position: absolute;
        inset: 0;
        z-index: 0;
    }

    .app-page-host > :global(div[inert]) {
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
