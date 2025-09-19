<script lang="ts">
    import AnimTypingText from "$lib/components/anim-typing-text.svelte";
    import Button from "$lib/components/button.svelte";
    import {onMount} from "svelte";

    let { cancel } = $props();

    let txt: AnimTypingText;

    let stage = 0;

    function clickCancel() {
        cancel();
    }

    onMount(() => {
        return() => txt.reset();
    });

    setTimeout(() => {
        switch (txt) {
            case undefined:
            case null:
                return;
        }

        txt.setPlayEndCallback(() => {
            if (stage < 3)
                stage++;

            else
            {
            }
        })
    }, 4);
</script>

<div>
    <div class="indicator">
        <AnimTypingText bind:this={txt} duration={1000}
                        text="..."
                        repeat={true}
                        playForwardOnLoad={true}/>
    </div>

    {#if cancel !== undefined}
        <Button click={clickCancel}
                icon={undefined}
                text="Cancel"
                props={{}}/>
    {/if}
</div>

<style>
    .indicator {
        min-height: 24px;
    }

    div {
        margin: auto;
        display: flex;
        flex-direction: column;
    }
</style>
