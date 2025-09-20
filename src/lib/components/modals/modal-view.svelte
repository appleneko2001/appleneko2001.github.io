<script lang="ts">
    import {scale} from 'svelte/transition';
    import 'svelte/easing';
    import {backOut, linear} from "svelte/easing";
    import {type Component, onMount, type Snippet} from 'svelte';
    import IconButton from '../icon-button.svelte';
    import * as focusTrap from 'focus-trap';

    let {children, close, header, isUserCloseable, isFullScreen, properties, dialogProps} = $props();
    let mode = "";
    let MyComponent = $state<Component | null>(null);
    let params = $state<Record<string, any>>(properties);

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

    let modalView: any;

    onMount(() => {

        const view = modalView as Element;
        console.log(view);
        if(view == null){
            return;
        }

        const trap = focusTrap.createFocusTrap(modalView);
        trap.activate();

        return trap.deactivate;
    })
</script>


<div class="modal-view"
     class:full-screen={isFullScreen}
     bind:this={modalView}
     in:scale={{easing: backOut, duration: 200}}
     out:scale={{easing: linear, duration: 200}}
     {...dialogProps}>
    <div class="modal-layout">
        <div class="modal-header">
            <div class="header-left">{header}</div>
            {#if isUserCloseable}
                <IconButton props={{onclick: clickClose}}
                            icon="material:close" size="32"/>
            {/if}
        </div>

        <div class="modal-content">
            {#if mode === "string"}
                {children}
            {:else if mode === "component"}
                <MyComponent {...params}/>
            {:else}
                {@render children?.()}
            {/if}
        </div>
    </div>
</div>

<style>
    .modal-view {
        border-radius: 8px;
        background-color: var(--card-background-colour);
        box-shadow: var(--card-shadow);
    }

    .modal-view:not(.full-screen) {
        margin: 24px;
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