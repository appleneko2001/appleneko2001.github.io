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

<a class="profile-button"
   class:expanded={expanded}
   class:focused={focused}
   title={hint}
   href={focused ? href : null}
   onpointerover={onPointerOver}
   onpointerleave={onPointerLeave}
   onfocusin={onPointerOver}
   onfocusout={onPointerLeave}
   tabindex="0"
>
    <!-- {@render icon?.()} -->
    {#if icon}
        <div class="icon"
             style="mask-image: url(https://cdn.jsdelivr.net/npm/simple-icons@v15/icons/{icon}.svg)"></div>
    {/if}

    <span class="text">
        <span>{text}</span>
    </span>
</a>

<style>
    a {
        text-decoration: none;
        color: var(--foreground-colour);
    }

    .profile-button {
        display: flex;
        flex-wrap: nowrap;
        position: relative;
        padding: 8px;
        align-items: center;

        border: transparent 2px solid;
        border-radius: 8px;
        transition: all 0.25s linear;
    }

    .profile-button > .icon {
        width: 32px;
        height: 32px;
        background: var(--foreground-colour);
        mask-size: cover;
    }

    .profile-button > .text {
        overflow: hidden;
        white-space: nowrap;
        font-size: 1.2em;
    }

    .profile-button > .text > span {
        margin-left: 8px;
    }

    .profile-button:not(.expanded) > .text {
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
</style>