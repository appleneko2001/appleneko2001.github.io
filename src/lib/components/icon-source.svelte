<script lang="ts">
    import {type IconProps} from "$lib/components/icon-props";

    let {
        icon,
        size = 24,
        fill = "var(--foreground-colour)",
        wasHidden = false
    }: IconProps = $props();

    const isIconSrc = typeof icon === "string" ? icon.includes("://") : false;

    let finalUrl: string = icon;
    let hidden = $state(wasHidden);

    export function setHidden(v: boolean) {
      hidden = v;
    }

    function getIconUrl(src: string, name: string): string {
        switch (src) {
            case "material":
                return "https://cdn.jsdelivr.net/npm/@material-symbols/svg-400/rounded/" + name + ".svg";

            case "simpleicons":
                return "https://cdn.jsdelivr.net/npm/simple-icons@v15/icons/" + icon + ".svg";

                case "simpleicons@v10":
                    return "https://cdn.jsdelivr.net/npm/simple-icons@v10.0.0/icons/" + icon + ".svg";

            default:
                console.error(`Unknown type ${src}, ${name}`);
                return "";
        }
    }

    if (!isIconSrc) {
        if (icon.includes(":")) {
            const kv = icon.split(':');
            finalUrl = getIconUrl(kv[0], kv[1]);
        } else {
            finalUrl = getIconUrl("simpleicons", "icon");
        }
    }

</script>

{#if icon}
    <div class="icon" class:hidden={hidden}
         style="--size: {size}px; mask-image: url({finalUrl}); background: {fill}"></div>
{/if}

<style>
    .icon {
        min-width: var(--size);
        min-height: var(--size);
        width: var(--size);
        height: var(--size);
        mask-size: cover;
        opacity: 1.0;
        transition: opacity 0.2s linear;
    }

    .hidden{
        opacity: 0.0;
    }
</style>
