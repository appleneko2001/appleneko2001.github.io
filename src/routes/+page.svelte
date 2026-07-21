<script lang="ts">
    import { onMount } from "svelte";

    const linkClickHandler = function(ev: MouseEvent){
      const link = ev.target as HTMLLinkElement;
      if(link == undefined)
        return;

      goto(link.href);
      ev.preventDefault();
    }

    function goto(url: string) {
      window.location.replace(url);
    }

    onMount(() => {
      const locale = navigator.language;
      var country = locale.replace("_", "-").split("-")[0];

      switch(country){
        case "en":
        case "zh":
        break;
        default:
        country = "en";
        break;
      }

      setTimeout(() => goto(`/${country}/home`), 500);
    });
</script>

<div class="page">
    <div class="layout">
        <div>
            <div>Auto-redirecting...</div>
            <div><a href="/en/home" onclick={linkClickHandler}>click here to navigate manually, if not redirecting automatically</a></div>
        </div>

        <div>
            <div>自动传送中...</div>
            <div><a href="/zh/home" onclick={linkClickHandler}>如果未自动传送，请点击此处手动传送</a></div>
        </div>
    </div>
</div>

<style>
    div {
        text-align: center;
        align-content: center;
    }

    .page {
        position: absolute;
        inset: 0;
    }

    .layout {
        display: flex;
        flex-direction: column;
        gap: 8px;
        justify-self: center;
    }
</style>
