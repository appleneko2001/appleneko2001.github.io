<script lang="ts">
    import "$lib/themes/theming.css";

    // icon provider: feather-icons
    let {icon, text = null, href} = $props();
</script>

<a class="link-button" href={href}>
    <!-- {@render icon?.()} -->
    {#if icon}
        <div class="icon"
             style="mask-image: url(https://cdn.jsdelivr.net/npm/feather-icons@v4/dist/icons/{icon}.svg)"></div>
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

    .link-button > .icon {
        width: 32px;
        height: 32px;
        background: var(--foreground-colour);
        mask-size: cover;
    }

    .link-button:focus,
    .link-button:hover {
        border: var(--foreground-colour) 2px solid;
    }
</style>