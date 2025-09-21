<script lang="ts">
    import {onMount} from "svelte";

    let {children} = $props();

    let isEmpty = $state(false);
    let contentView: HTMLElement;

    function updateState(){
        const size = contentView.childElementCount;
        console.log(size);
        isEmpty = size === 0;

    }

    // TODO: find a way to detect content is not empty without MutationObserver
    onMount(() => {
        updateState();
        if(contentView === undefined)
        {
            console.log("ContentView bind failure. Unable to use MutationObserver");
            return;
        }

        const observer = new MutationObserver(() => updateState());
        observer.observe(contentView, {childList: true});

        return () => observer.disconnect();
    })
</script>

<div class="layout"
     class:empty={isEmpty}>
    <div class="content-layout"
         bind:this={contentView}>
        {@render children?.()}
    </div>
    <div class="placeholder">
        <div><i>No contents here, yet...</i></div>
        <div><i>Blame the owner is too lazy 💤</i></div>
    </div>
</div>

<style>
    .content-layout {
        position: relative;
        transition: padding 0.1s;
    }

    .layout:not(.empty) > .placeholder {
        display: none;
    }

    @media screen and (max-width: 1000px) {
        .content-layout {
            padding: 0 16px;
        }
    }

    @media screen and (width > 1000px) {
        .content-layout {
            max-width: 1000px;
            margin-left: auto !important;
            margin-right: auto !important;
        }
    }

    .placeholder {
        width: 100%;
        height: 80vh;
        font-size: 1.5em;

        align-content: center;
        text-align: center;
    }
</style>