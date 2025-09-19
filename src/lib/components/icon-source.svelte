<script lang="ts">
    let {icon, size} = $props();

    const isIconSrc = typeof icon === "string" ? icon.includes("://") : false;

    let finalUrl = icon;

    function getIconUrl(src: string, name: string) {
        switch (src) {
            case "material":
                return "https://cdn.jsdelivr.net/npm/@material-symbols/svg-400/rounded/" + name + ".svg";

            case "simpleicons":
                return "https://cdn.jsdelivr.net/npm/simple-icons@v15/icons/" + icon + ".svg";

            default:
                console.error(`Unknown type ${src}, ${name}`);
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
    <div class="icon"
         style="--size: {size}px; mask-image: url({finalUrl})"></div>
{/if}

<style>
    .icon {
        width: var(--size);
        height: var(--size);
        background: var(--foreground-colour);
        mask-size: cover;
    }
</style>