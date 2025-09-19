<script>
    import {fly} from 'svelte/transition'
    import {page} from '$app/state';

    import ProfileEntry from "$lib/components/profile/entry.svelte";

    let title = "Error!";
    let msg = page.error?.message ?? "Nothing to say ?!";

    switch (page.status) {
        case 403:
            msg = "No! You can't do that!!!";
            break;
        case 404:
            msg = "This page doesn't exist at all!";
            break;
        case 200:
            msg = "How did you get here ?";
            title = "Error...?";
            break;
        case 500:
            msg = "Internal server error! Not your fault! 😵";
            break;
    }

</script>

<div class="apps-page"
     in:fly={{ y: 100, duration: 300, delay: 100 }}
     out:fly={{ y: -100, duration: 300 }}>
    <div class="card">
        <div class="card-header">{title}</div>
        <div class="card-text">{msg}</div>

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
    }
</style>