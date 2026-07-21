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
<div class="text">由笨蛋夜星（appleneko2001）制作的极简简历和联系方式卡片</div>
<br/>

<div class="text">由以下技术驱动</div>
<div>
    <LinkButton icon={{icon: "svelte", size: 32, fill: "#FF3E00"}}
                href="https://svelte.dev"
                style="gap: 8px;"
                target="_blank">
        {@render Card("SvelteKit", "开源全栈解决方案")}
    </LinkButton>
    <LinkButton icon={{icon: "cloudflareworkers", size: 32, fill: "#F38020"}}
                href="https://workers.cloudflare.com"
                style="gap: 8px;"
                target="_blank">
        {@render Card("Cloudflare Workers®", "易上手的 serverless 平台")}
    </LinkButton>
    <LinkButton icon={{icon: "github", size: 32}}
                href="https://github.com/appleneko2001/appleneko2001.github.io/tree/sveltekit-ng"
                style="gap: 8px;"
                target="_blank">
        {@render Card("GitHub", "用于存放简历程式码")}
    </LinkButton>
</div>

<div class="text">素材（如矢量图像）来源</div>
<ul>
    {@render linkItem("SimpleIcons", "https://simpleicons.org/")}
    {@render linkItem("Google Fonts 和 Material Icons (Rounded)", "https://fonts.google.com/")}
</ul>

<div class="text">第三方程式库</div>
<ul>
    {@render linkItem(
        "FocusTrap（用于限制键盘导航到指定控件）",
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
