<script lang="ts">
    import LinkButton from "$lib/components/link-button.svelte";
</script>

{#snippet Card(header: string, description: string)}
    <div class="tech-stack-card">
        <div class="header">{header}</div>
        <div>{description}</div>
    </div>
{/snippet}

{#snippet linkItem(text: string, href: string)}
    <li><a href={href} target="_blank">{text}</a></li>
{/snippet}

<br/>
<div class="text">Portfolio by github@appleneko2001</div>
<br/>

<div class="text">Powered by</div>
<div>
    <LinkButton icon={{icon: "svelte", size: 32, fill: "#FF3E00"}}
                href="https://svelte.dev"
                style="gap: 8px;"
                target="_blank">
        {@render Card("SvelteKit", "Open source full-stack solution")}
    </LinkButton>
    <LinkButton icon={{icon: "cloudflareworkers", size: 32, fill: "#F38020"}}
                href="https://workers.cloudflare.com"
                style="gap: 8px;"
                target="_blank">
        {@render Card("Cloudflare Workers®", "Easy-to-deploy serverless platform")}
    </LinkButton>
    <LinkButton icon={{icon: "github", size: 32}}
                href="https://github.com/appleneko2001/appleneko2001.github.io/tree/sveltekit-ng"
                style="gap: 8px;"
                target="_blank">
        {@render Card("GitHub", "Used for holding the Portfolio source code")}
    </LinkButton>
</div>

<div class="text">Assets (e.g. icon SVGs) source</div>
<ul>
    {@render linkItem("SimpleIcons", "https://simpleicons.org/")}
    {@render linkItem("Google Fonts and Material Icons (Rounded)", "https://fonts.google.com/")}
</ul>

<div class="text">Third-party libraries</div>
<ul>
    {@render linkItem(
        "FocusTrap (used for restrict keyboard navigation to one scope of view)",
        "https://github.com/focus-trap/focus-trap")}
</ul>
<br/>

<style>
    .tech-stack-card {
        display: flex;
        flex-direction: column;
    }

    .tech-stack-card .header {
        font-size: 1.25rem;
    }

    .text {
        margin: 0 8px;
    }
</style>
