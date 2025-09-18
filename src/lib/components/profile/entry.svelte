<script lang="ts">
    import "$lib/themes/theming.css";

    // icon provider: simple-icons
    let {
        icon,
        text = "text",
        href,
        expanded = false,
        focused = false,
        hint = text
    }: {
        icon?: any,
        text?: string,
        href?: string,
        expanded?: boolean,
        focused: boolean,
        hint?: string | null
    } = $props();

    function onPointerOver(){
        focused = true;
    }

    function onPointerLeave(){
        focused = false;
    }
</script>

<div class="profile-button"
     class:expanded={expanded}
     class:focused={focused}
     onpointerover={onPointerOver}
     onpointerleave={onPointerLeave}
     onfocusin={onPointerOver}
     onfocusout={onPointerLeave}
     tabindex="0"
>
    <a title={hint}
       href={href}>
        <!-- {@render icon?.()} -->
        {#if icon}
            <div class="icon"
                 style="mask-image: url(https://cdn.jsdelivr.net/npm/simple-icons@v15/icons/{icon}.svg)"></div>
        {/if}

        <span class="text">
        <span>{text}</span>
    </span>
    </a>
</div>

<style>
    a {
        text-decoration: none;
        pointer-events: none;
        color: var(--foreground-colour);

        display: flex;
        flex-wrap: nowrap;
        position: relative;
        align-items: center;
    }

    .profile-button {
        padding: 8px;
        border: transparent 2px solid;
        border-radius: 8px;
        transition: all 0.25s linear;
    }

    .profile-button > a > .icon {
        width: 32px;
        height: 32px;
        background: var(--foreground-colour);
        mask-size: cover;
    }

    .profile-button > a > .text {
        overflow: hidden;
        white-space: nowrap;
        font-size: 1.2em;
        display: block;
    }

    .profile-button > a > .text > span {
        margin-left: 8px;
    }

    .profile-button:not(.expanded) > a > .text {
        max-width: 0;
        transition: max-width 0.25s linear;
    }

    .profile-button.focused {
        border: var(--foreground-colour) 2px solid;
    }

    .profile-button:not(.expanded).focused {
        .text {
            max-width: 200px;
        }
    }

    .profile-button.focused{
        a {
            pointer-events: initial;
        }
    }
</style>