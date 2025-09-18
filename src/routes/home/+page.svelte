<script lang="ts">
    import {fade} from 'svelte/transition'
    import ProfileEntry from "$lib/components/profile/entry.svelte";
    import ProfileAvatar from "$lib/components/profile/avatar.svelte";
    //import avatar from "$lib/assets/avatar.jpg";
</script>

<svelte:head>
    <title>Portfolio</title>
    <meta name="description" content="Simple interactable portfolio"/>
</svelte:head>

<div class="profile-page"
     in:fade={{ duration: 300, delay: 100 }}
     out:fade={{ duration: 300 }}>
    <ProfileAvatar src="https://avatars.githubusercontent.com/u/38249047"/>

    <div class="entries">

        <!--        <ProfileEntry icon="x" text="Twitter (formerly X)"-->
        <!--                      href="https://twitter.com/appleneko2001"/>-->
        <ProfileEntry icon="discord" text="Discord"
                      href="https://discord.com/users/499588722174459914"/>
        <ProfileEntry icon="bluesky" text="Bluesky"
                      href="https://appleneko2001.bsky.social"/>
        <ProfileEntry icon="github" text="GitHub"
                      href="https://github.com/appleneko2001"/>
        <ProfileEntry icon="osu" text="osu!"
                      href="https://osu.ppy.sh/users/11455502"/>
    </div>

    <div class="entries">
        <ProfileEntry icon="pwa" text="Apps" expanded={true} hint={null}
                      href="/apps"/>
    </div>

    <div class="footer-area">
        Powered by <a href="https://svelte.dev">SvelteKit</a> × <a href="https://workers.cloudflare.com">Cloudflare
        Worker</a>
    </div>
</div>

<style>
    .profile-page {
        min-height: max(560px, 100vh);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 32px;
    }

    .entries {
        display: flex;
        justify-content: center;
        flex-flow: wrap;
        align-content: center;
        gap: 1rem;
    }

    .footer-area {
        position: absolute;
        bottom: 0;
        margin: 16px 8px;
    }

    @media screen and (width < 600px) {
        .entries {
            max-width: 390px;
        }
    }
</style>