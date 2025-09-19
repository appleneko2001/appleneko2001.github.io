<script>
    import IconSource from "./icon-source.svelte";

    let {props, icon, size} = $props();
</script>

<button {...props}>
    <IconSource icon={icon} size={size}/>
</button>

<style>
    button {
        background: none;
        border: none;
        padding: 6px;
        position: relative;
    }

    button::before {
        content: ' ';
        position: absolute;
        inset: 0;
        display: block;
        border-radius: 50%;
        background-color: var(--foreground-colour);
        opacity: 0;

    }

    button:hover {
        outline: none;
    }

    button:hover::before, button:focus::after {
        opacity: 0.1;
        box-shadow: none;
    }

    button:active::before {
        opacity: 0.25;
    }
</style>