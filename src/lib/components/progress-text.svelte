<script lang="ts">
    import AnimTypingText from "./anim-typing-text.svelte";

    let txt: AnimTypingText;


</script>
<AnimTypingText bind:this={txt} duration={1000}
                text="..."
                repeat={true}
                playForwardOnLoad={true}

/>