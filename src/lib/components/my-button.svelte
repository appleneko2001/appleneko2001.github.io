<script lang="ts">
    import IconSource from "./icon-source.svelte";
    import {type IconProps} from "$lib/components/icon-props";

    let {
        props,
        icon,
        text,
        click
    }: {
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
    <div class="text">{text}</div>
</button>

<style>
    button {
        background: none;
        border: none;
        padding: 8px;
        position: relative;
        display: flex;
        align-items: center;
        align-content: center;
        line-height: 20px;
        gap: 4px;

        user-select: none;
    }

    button > .text {
        display: inline-block;
        font-size: 16px;
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
