<script lang="ts">
    import AnimTypingText from "$lib/components/anim-typing-text.svelte";
    import MyButton from "$lib/components/my-button.svelte";
    import {onMount} from "svelte";

    let { cancel, text } = $props();

    let txt: AnimTypingText;

    function clickCancel() {
        cancel();
    }

    onMount(() => {
        txt.startTextAnimation();
        return() => txt.reset();
    });
</script>

<div class="layout">
    {#if cancel !== undefined}
        <br/>
    {/if}

    <div class="indicator">
        {#if text !== undefined}
            <span>{text}</span>
        {/if}
        <AnimTypingText bind:this={txt} duration={1000}
                        text="..."
                        repeat={true}/>
    </div>

    {#if cancel !== undefined}
        <MyButton click={clickCancel}
                  icon={{ icon: "material:close", size: 24 }}
                  text="Cancel"
                  props={{}}/>
    {/if}
</div>

<style>
    .indicator {
        min-height: 24px;
        vertical-align: bottom;
    }

    .layout {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        position: absolute;
        inset: 0;
        padding: 8px;
    }
</style>
