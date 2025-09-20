<script lang="ts">
    import IconSource from "./icon-source.svelte";
    import { type IconProps } from "$lib/components/icon-props";

    let {
        props,
        icon,
        text,
        click
    } : {
        props?: any,
        icon?: IconProps,
        text?: string;
        click?: (ev: EventTarget) => void;
    } = $props();
</script>

<button onclick={click} {...props}>
{#if icon !== undefined}
    <IconSource {...icon}/>
{/if}
    <span>{text}</span>
</button>

<style>
    button {
        background: none;
        border: none;
        padding: 6px;
        position: relative;
        display: flex;
        align-items: center;
        gap: 4px;
    }

    button > span {
        font-size: 1.2em
    }

    button::before {
        content: ' ';
        position: absolute;
        inset: 0;
        display: block;
        border-radius: 8px;
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