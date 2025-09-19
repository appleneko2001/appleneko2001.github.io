<script lang="ts">
    import AnimTypingText from "$lib/components/anim-typing-text.svelte";
    import {onMount} from "svelte";

    let txt: AnimTypingText;

    let stage = 0;

    export function setCloseModalCallback(fn: Function): void {
        // todo
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
            if (stage < 4)
                stage++;

            else
            {
                return false;
            }
        })
    }, 4);
</script>

<div>
    <AnimTypingText bind:this={txt} duration={1000}
                    text="..."
                    repeat={true}
                    playForwardOnLoad={true}/>
</div>

<style>
    div {
        margin: auto;
    }
</style>
