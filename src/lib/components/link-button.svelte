<script lang="ts">
    import "$lib/themes/theming.css";
    import IconSource from "./icon-source.svelte";
    import {type IconProps} from "$lib/components/icon-props";

    let {
        icon,
        text,
        href = "",
        target,
        children,
        style,
    }: {
        icon?: IconProps | string;
        text?: string;
        href: string;
        target?: string;
        children?: any;
        style?: any;
    } = $props();

    const iconProps = (() => {
        if (typeof icon === "string") {
            return {
                icon: icon,
            }
        }

        const props = icon as IconProps;
        return props ?? undefined;
    })();
</script>

<a class="link-button" href={href} style={style} target={target}>
    <!-- {@render icon?.()} -->
    {#if icon}
        <IconSource {...iconProps}/>
    {/if}

    {#if text}
        <span class="text">
            <span>{text}</span>
        </span>
    {/if}

    {#if children}
        {@render children()}
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