<script>
    import {fly} from 'svelte/transition'
    import {page} from '$app/state';

    import ProfileEntry from "$lib/components/profile/entry.svelte";

    let title = "Error!";
    let msgs = page.error?.message ?? ["Nothing to say ?!", "人家无话可说…？！"];

    switch (page.status) {
        case 403:
            msgs = ["No! You can't do that!!!", "您不可以这么做！"];
            break;
        case 404:
            msgs = ["This page doesn't exist at all!", "此页面不存在！"];
            break;
        case 200:
            msgs = ["How did you get here ?", "您…怎么做到的…？"];
            title = "Error...?";
            break;
        case 500:
            msgs = ["Internal server error! Not your fault! 😵", "坏掉了…不是您的错！😵"];
            break;
    }

</script>

<div class="apps-page"
     in:fly={{ y: 100, duration: 300, delay: 100 }}
     out:fly={{ y: -100, duration: 300 }}>
    <div class="card">
        <div class="card-header">{title}</div>
        <div class="card-text">
            {#each msgs as msg}
                <div>{msg}</div>
            {/each}
        </div>


        <ProfileEntry icon="material:home" text="Go home" expanded={true} hint={null}
                      href="/"/>
    </div>
</div>

<style>
    .apps-page {
        min-height: max(560px, 100vh);
        display: flex;
        flex-direction: column;
    }

    .card {
        margin: auto;
        padding: 16px 8px;
        border-radius: 8px;
        background-color: var(--card-background-colour);
        box-shadow: var(--card-shadow);

        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1.5em;
    }

    .card-header {
        font-size: 1.4em;
    }

    .card-text {
        margin: 0 16px;
        display: flex;
        flex-direction: column;
        gap: 4px;
        text-align: center;
    }
</style>
