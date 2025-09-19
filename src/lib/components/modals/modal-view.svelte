<script lang="ts">
    import {scale} from 'svelte/transition';
    import 'svelte/easing';
    import {backOut, linear} from "svelte/easing";
    import type {Component, Snippet} from 'svelte';
    import IconButton from '../icon-button.svelte';

    let {children, close, header, isUserCloseable} = $props();
    let mode = "";
    let MyComponent = $state<Component | null>(null);
    let params = $state<Record<string, any>>({});

    if (typeof children === "string")
        mode = "string";

    if (children as Snippet !== null)
        mode = "snippet"

    if (children as Component !== null) {
        mode = "component";
        MyComponent = children;
    }

    function clickClose(){
        if(!isUserCloseable)
            return;

        close?.();
    }
</script>


<div class="modal-view"
     in:scale={{easing: backOut, duration: 200}}
     out:scale={{easing: linear, duration: 200}}>
    <div class="modal-layout">
        <div class="modal-header">
            <div class="header-left">{header}</div>
            {#if isUserCloseable}
                <IconButton props={{onclick: clickClose}}
                            icon="material:close" size="32"/>
            {/if}
        </div>

        {#if mode === "string"}
            {children}
        {:else if mode === "component"}
            <MyComponent {...params}/>
        {:else}
            {@render children?.()}
        {/if}
    </div>
</div>

<style>
    .modal-view {
        border-radius: 8px;
        background-color: var(--card-background-colour);
        box-shadow: var(--card-shadow);
    }

    .modal-layout {
        display: flex;
        flex-direction: column;
    }

    .modal-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .header-left {
        margin-left: 8px;
        font-size: 1.5em;
    }
</style>