<script lang="ts">
    import "$lib/themes/theming.css";
    import IconSource from "./icon-source.svelte";

    let {icon, text = null, href} = $props();
</script>

<a class="link-button" href={href}>
    <!-- {@render icon?.()} -->
    {#if icon}
        <IconSource icon={icon} size="32"/>
    {/if}

    {#if text}
        <span class="text">
            <span>{text}</span>
        </span>
    {/if}
</a>

<style>
    a {
        text-decoration: none;
        color: var(--foreground-colour);
    }

    .link-button {
        display: flex;
        flex-wrap: nowrap;
        padding: 8px;
        align-items: center;

        border: transparent 2px solid;
        border-radius: 8px;
        transition: all 0.25s linear;
    }

    .link-button:focus,
    .link-button:hover {
        border: var(--foreground-colour) 2px solid;
    }
</style>